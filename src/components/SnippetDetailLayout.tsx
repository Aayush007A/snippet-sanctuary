import { motion } from 'framer-motion';
import { ArrowLeft, Clock, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CodeEditor } from './CodeEditor';
import { CSVTableViewer } from './CSVTableViewer';
import { CommentCard } from './CommentCard';
import { AddReviewForm } from './AddReviewForm';
import { currentUser, type Snippet } from '@/data/mockData';
import { formatDistanceToNow } from 'date-fns';

interface SnippetDetailLayoutProps {
  snippet: Snippet;
}

const languageStyles: Record<string, string> = {
  'Python': 'language-badge-python',
  'Spark Scala': 'language-badge-scala',
  'SQL': 'language-badge-sql',
};

export const SnippetDetailLayout = ({ snippet }: SnippetDetailLayoutProps) => {
  const navigate = useNavigate();
  const isAuthor = snippet.authorId === currentUser.id;

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button & Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-4 gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>

          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <Badge 
                  variant="outline" 
                  className={`${languageStyles[snippet.language]} border font-medium`}
                >
                  {snippet.language}
                </Badge>
                <Badge variant="secondary">{snippet.type}</Badge>
              </div>
              <h1 className="font-heading text-3xl font-bold text-foreground mb-2">
                {snippet.title}
              </h1>
              <p className="text-muted-foreground max-w-2xl">
                {snippet.description}
              </p>
            </div>

            {/* Author Info */}
            <div className="flex items-center gap-3 p-4 bg-secondary/30 rounded-xl">
              <Avatar className="h-12 w-12 border-2 border-primary/10">
                <AvatarImage src={snippet.authorAvatar} alt={snippet.authorName} />
                <AvatarFallback>
                  {snippet.authorName.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-muted-foreground" />
                  <span className="font-medium text-sm">{snippet.authorName}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  Updated {formatDistanceToNow(new Date(snippet.updatedAt), { addSuffix: true })}
                </div>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-4">
            {snippet.tags.map((tag) => (
              <span 
                key={tag} 
                className="text-sm px-3 py-1 bg-secondary text-secondary-foreground rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Main Content Grid - 25/50/25 */}
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Left Column - Sample Data (25%) */}
          <motion.div
            className="lg:col-span-1 space-y-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <div className="h-[250px]">
              <CSVTableViewer title="Sample Input (CSV/Excel)" data={snippet.inputSample} />
            </div>
            <div className="h-[250px]">
              <CSVTableViewer title="Expected Output (CSV/Excel)" data={snippet.outputSample} />
            </div>
          </motion.div>

          {/* Center Column - Code (50%) */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <CodeEditor 
              code={snippet.code}
              language={snippet.language}
              isAuthor={isAuthor}
              onSave={(newCode) => console.log('Saved:', newCode)}
            />
          </motion.div>

          {/* Right Column - Comments (25%) */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <div className="bg-card rounded-xl border border-border p-4">
              <h3 className="font-heading font-semibold text-lg mb-4">
                Reviews & Comments
              </h3>
              
              {snippet.reviews.length > 0 ? (
                <div className="space-y-4 mb-6 max-h-[400px] overflow-y-auto scrollbar-thin pr-2">
                  {snippet.reviews.map((review, index) => (
                    <CommentCard key={review.id} review={review} index={index} />
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground text-center py-8">
                  No reviews yet. Be the first to review!
                </p>
              )}

              <div className="pt-4 border-t border-border">
                <AddReviewForm snippetId={snippet.id} />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
