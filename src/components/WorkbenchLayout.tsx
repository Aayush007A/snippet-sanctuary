import { motion } from 'framer-motion';
import { ArrowLeft, Star, Clock, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Snippet, useSnippets, currentUser } from '@/context/SnippetContext';
import { CSVTableViewer } from './CSVTableViewer';
import { CodeEditor } from './CodeEditor';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

interface WorkbenchLayoutProps {
  snippet: Snippet;
}

const getLanguageBadgeClass = (language: string): string => {
  const langLower = language.toLowerCase();
  if (langLower.includes('python')) return 'language-badge-python';
  if (langLower.includes('scala')) return 'language-badge-scala';
  if (langLower.includes('sql')) return 'language-badge-sql';
  if (langLower.includes('javascript')) return 'language-badge-javascript';
  if (langLower.includes('java')) return 'language-badge-java';
  if (langLower.includes('c++')) return 'language-badge-cpp';
  if (langLower.includes('go')) return 'language-badge-go';
  if (langLower.includes('html')) return 'language-badge-html';
  return 'bg-muted text-muted-foreground';
};

const StarRating = ({ rating, onRate }: { rating: number; onRate?: (r: number) => void }) => {
  const [hovered, setHovered] = useState(0);

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onRate?.(star)}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          className={`transition-transform ${onRate ? 'cursor-pointer hover:scale-110' : 'cursor-default'}`}
          disabled={!onRate}
        >
          <Star
            className={`w-5 h-5 ${
              star <= (hovered || rating)
                ? 'star-filled fill-current'
                : 'star-empty'
            }`}
          />
        </button>
      ))}
    </div>
  );
};

const ReviewCard = ({ review }: { review: Snippet['reviews'][0] }) => {
  const timeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diff < 60) return 'just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  };

  return (
    <motion.div
      className="comment-card"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-start gap-3">
        <img
          src={review.userAvatar}
          alt={review.userName}
          className="w-10 h-10 rounded-full border-2 border-border"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <span className="font-medium text-foreground">{review.userName}</span>
            <span className="text-xs text-muted-foreground">{timeAgo(review.createdAt)}</span>
          </div>
          <StarRating rating={review.rating} />
          <p className="mt-2 text-sm text-foreground/90 leading-relaxed">
            {review.comment}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export const WorkbenchLayout = ({ snippet }: WorkbenchLayoutProps) => {
  const navigate = useNavigate();
  const { addReview, updateSnippet, getCategoryById } = useSnippets();
  const { toast } = useToast();
  
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const category = getCategoryById(snippet.categoryId);
  const isAuthor = snippet.authorId === currentUser.id;

  const handleSaveCode = (code: string) => {
    updateSnippet(snippet.id, { code });
    toast({
      title: 'Code Updated',
      description: 'Your changes have been saved.',
    });
  };

  const handleSubmitReview = async () => {
    if (!newComment.trim() || newRating === 0) {
      toast({
        title: 'Missing Information',
        description: 'Please add a rating and comment.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);
    
    // Optimistic UI update
    addReview(snippet.id, {
      userId: currentUser.id,
      userName: currentUser.name,
      userAvatar: currentUser.avatar,
      rating: newRating,
      comment: newComment.trim(),
    });

    setNewComment('');
    setNewRating(0);
    setIsSubmitting(false);

    toast({
      title: 'Review Added',
      description: 'Thank you for your feedback!',
    });
  };

  const avgRating = snippet.reviews.length > 0
    ? snippet.reviews.reduce((sum, r) => sum + r.rating, 0) / snippet.reviews.length
    : 0;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <motion.div
        className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="max-w-[1800px] mx-auto px-6 py-4">
          <button
            onClick={() => navigate(`/category/${snippet.categoryId}`)}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to {category?.name || 'Category'}</span>
          </button>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Badge className={`${getLanguageBadgeClass(snippet.language)} border`}>
                  {snippet.language}
                </Badge>
                {category && (
                  <Badge variant="outline">{category.name}</Badge>
                )}
              </div>
              <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground">
                {snippet.title}
              </h1>
              <p className="text-muted-foreground mt-1">{snippet.description}</p>
            </div>

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <img
                  src={snippet.authorAvatar}
                  alt={snippet.authorName}
                  className="w-8 h-8 rounded-full"
                />
                <span>{snippet.authorName}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{new Date(snippet.updatedAt).toLocaleDateString()}</span>
              </div>
              {avgRating > 0 && (
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 star-filled fill-current" />
                  <span>{avgRating.toFixed(1)}</span>
                </div>
              )}
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-4">
            {snippet.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </motion.div>

      {/* 3-Column Workbench Layout */}
      <div className="max-w-[1800px] mx-auto px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Column: Data Panels (25%) */}
          <motion.div
            className="lg:col-span-1 space-y-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="h-[calc(50vh-100px)]">
              <h3 className="font-heading font-semibold text-foreground mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500" />
                Sample Input
              </h3>
              <CSVTableViewer data={snippet.inputSample} title="Input Data" />
            </div>
            <div className="h-[calc(50vh-100px)]">
              <h3 className="font-heading font-semibold text-foreground mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500" />
                Sample Output
              </h3>
              <CSVTableViewer data={snippet.outputSample} title="Output Data" />
            </div>
          </motion.div>

          {/* Center Column: Code Editor (50%) */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <CodeEditor
              code={snippet.code}
              language={snippet.language}
              isAuthor={isAuthor}
              onSave={handleSaveCode}
            />
          </motion.div>

          {/* Right Column: Reviews (25%) */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="font-heading font-semibold text-foreground mb-4">
              Reviews ({snippet.reviews.length})
            </h3>

            {/* Add Review Form */}
            <div className="comment-card mb-4">
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-10 h-10 rounded-full border-2 border-border"
                />
                <div>
                  <span className="font-medium text-foreground">{currentUser.name}</span>
                  <StarRating rating={newRating} onRate={setNewRating} />
                </div>
              </div>
              <Textarea
                placeholder="Share your thoughts..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="mb-3 bg-background resize-none"
                rows={3}
              />
              <Button
                onClick={handleSubmitReview}
                disabled={isSubmitting || !newComment.trim() || newRating === 0}
                className="w-full"
              >
                Post Review
              </Button>
            </div>

            {/* Reviews List */}
            <div className="space-y-3 max-h-[60vh] overflow-y-auto scrollbar-thin">
              {snippet.reviews.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  No reviews yet. Be the first!
                </p>
              ) : (
                snippet.reviews
                  .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                  .map((review) => (
                    <ReviewCard key={review.id} review={review} />
                  ))
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
