import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { Review } from '@/data/mockData';
import { formatDistanceToNow } from 'date-fns';

interface CommentCardProps {
  review: Review;
  index: number;
}

export const CommentCard = ({ review, index }: CommentCardProps) => {
  return (
    <motion.div
      className="comment-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      {/* Header */}
      <div className="flex items-start gap-3 mb-3">
        <Avatar className="h-10 w-10 border border-border">
          <AvatarImage src={review.userAvatar} alt={review.userName} />
          <AvatarFallback className="bg-primary/10 text-primary text-sm">
            {review.userName.split(' ').map(n => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <p className="font-medium text-sm text-foreground truncate">
            {review.userName}
          </p>
          <p className="text-xs text-muted-foreground">
            {formatDistanceToNow(new Date(review.createdAt), { addSuffix: true })}
          </p>
        </div>
      </div>

      {/* Rating */}
      <div className="flex items-center gap-1 mb-3">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= review.rating 
                ? 'star-filled fill-current' 
                : 'star-empty'
            }`}
          />
        ))}
      </div>

      {/* Comment */}
      <p className="text-sm text-foreground leading-relaxed">
        {review.comment}
      </p>
    </motion.div>
  );
};
