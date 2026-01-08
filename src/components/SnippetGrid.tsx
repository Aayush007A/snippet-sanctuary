import { motion } from 'framer-motion';
import { Plus, ArrowRight, Star, MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Snippet } from '@/context/SnippetContext';
import { Badge } from '@/components/ui/badge';

interface SnippetCardProps {
  snippet: Snippet;
  index: number;
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

const SnippetCard = ({ snippet, index }: SnippetCardProps) => {
  const navigate = useNavigate();
  
  const avgRating = snippet.reviews.length > 0
    ? snippet.reviews.reduce((sum, r) => sum + r.rating, 0) / snippet.reviews.length
    : 0;

  return (
    <motion.div
      className="relative group cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      onClick={() => navigate(`/snippet/${snippet.id}`)}
    >
      <motion.div
        className="relative overflow-hidden rounded-xl bg-card border border-border p-6 h-full card-spotlight"
        whileHover={{ 
          scale: 1.02,
          boxShadow: '0 20px 40px -12px rgba(0, 0, 0, 0.12)'
        }}
        transition={{ duration: 0.2 }}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <Badge className={`${getLanguageBadgeClass(snippet.language)} border`}>
            {snippet.language}
          </Badge>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            {avgRating > 0 && (
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 star-filled fill-current" />
                <span>{avgRating.toFixed(1)}</span>
              </div>
            )}
            {snippet.reviews.length > 0 && (
              <div className="flex items-center gap-1">
                <MessageCircle className="w-4 h-4" />
                <span>{snippet.reviews.length}</span>
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <h3 className="font-heading text-lg font-bold text-foreground mb-2 line-clamp-1">
          {snippet.title}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-2">
          {snippet.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {snippet.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
          {snippet.tags.length > 3 && (
            <Badge variant="secondary" className="text-xs">
              +{snippet.tags.length - 3}
            </Badge>
          )}
        </div>

        {/* Author */}
        <div className="flex items-center gap-2 pt-4 border-t border-border">
          <img
            src={snippet.authorAvatar}
            alt={snippet.authorName}
            className="w-6 h-6 rounded-full"
          />
          <span className="text-sm text-muted-foreground">{snippet.authorName}</span>
        </div>

        {/* CTA Arrow */}
        <motion.div 
          className="absolute bottom-6 right-6 text-primary opacity-0 group-hover:opacity-100 transition-opacity"
          whileHover={{ x: 3 }}
        >
          <ArrowRight className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

interface CreateSnippetCardProps {
  index: number;
  onClick: () => void;
}

export const CreateSnippetCard = ({ index, onClick }: CreateSnippetCardProps) => {
  return (
    <motion.div
      className="relative group cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      onClick={onClick}
    >
      <motion.div
        className="relative overflow-hidden rounded-xl bg-card border border-border border-dashed p-6 h-full min-h-[220px] flex flex-col items-center justify-center text-center"
        whileHover={{ 
          scale: 1.02,
          borderStyle: 'solid',
          boxShadow: '0 20px 40px -12px rgba(59, 130, 246, 0.15)'
        }}
        transition={{ duration: 0.2 }}
      >
        <motion.div
          className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4"
          whileHover={{ scale: 1.1, rotate: 90 }}
          transition={{ duration: 0.3 }}
        >
          <Plus className="w-6 h-6 text-primary" />
        </motion.div>

        <h3 className="font-heading text-lg font-bold text-foreground mb-1">
          Create Snippet
        </h3>
        <p className="text-muted-foreground text-sm">
          Add a new code snippet
        </p>
      </motion.div>
    </motion.div>
  );
};

interface SnippetGridProps {
  snippets: Snippet[];
  onCreateClick: () => void;
}

export const SnippetGrid = ({ snippets, onCreateClick }: SnippetGridProps) => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {snippets.map((snippet, index) => (
        <SnippetCard key={snippet.id} snippet={snippet} index={index} />
      ))}
      <CreateSnippetCard index={snippets.length} onClick={onCreateClick} />
    </div>
  );
};
