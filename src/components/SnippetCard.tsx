import { motion } from 'framer-motion';
import { Star, MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import type { Snippet } from '@/data/mockData';

interface SnippetCardProps {
  snippet: Snippet;
  index: number;
}

const languageStyles: Record<string, string> = {
  'Python': 'language-badge-python',
  'Spark Scala': 'language-badge-scala',
  'SQL': 'language-badge-sql',
};

export const SnippetCard = ({ snippet, index }: SnippetCardProps) => {
  const navigate = useNavigate();
  
  const averageRating = snippet.reviews.length > 0
    ? snippet.reviews.reduce((sum, r) => sum + r.rating, 0) / snippet.reviews.length
    : 0;

  return (
    <motion.div
      className="group cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      onClick={() => navigate(`/snippet/${snippet.id}`)}
    >
      <motion.div
        className="h-full bg-card rounded-xl border border-border p-6 transition-all duration-300"
        whileHover={{ 
          y: -4,
          boxShadow: '0 20px 40px -12px rgba(0, 0, 0, 0.1)',
          borderColor: 'hsl(var(--primary) / 0.2)'
        }}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <Badge 
            variant="outline" 
            className={`${languageStyles[snippet.language]} border font-medium`}
          >
            {snippet.language}
          </Badge>
          <Badge variant="secondary" className="text-xs">
            {snippet.type}
          </Badge>
        </div>

        {/* Title */}
        <h3 className="font-heading text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
          {snippet.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {snippet.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {snippet.tags.slice(0, 3).map((tag) => (
            <span 
              key={tag} 
              className="text-xs px-2 py-0.5 bg-secondary text-secondary-foreground rounded-full"
            >
              {tag}
            </span>
          ))}
          {snippet.tags.length > 3 && (
            <span className="text-xs px-2 py-0.5 text-muted-foreground">
              +{snippet.tags.length - 3} more
            </span>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-4 h-4 ${
                  star <= averageRating ? 'star-filled fill-current' : 'star-empty'
                }`}
              />
            ))}
            <span className="text-xs text-muted-foreground ml-1">
              ({snippet.reviews.length})
            </span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <MessageCircle className="w-4 h-4" />
            <span className="text-xs">{snippet.reviews.length}</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
