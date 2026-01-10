// import { useState } from 'react';
// import { motion } from 'framer-motion';
// import { Star, Send } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Textarea } from '@/components/ui/textarea';
// import { toast } from '@/hooks/use-toast';

// interface AddReviewFormProps {
//   snippetId: string;
// }

// export const AddReviewForm = ({ snippetId }: AddReviewFormProps) => {
//   const [rating, setRating] = useState(0);
//   const [hoverRating, setHoverRating] = useState(0);
//   const [comment, setComment] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     if (rating === 0) {
//       toast({
//         title: 'Rating required',
//         description: 'Please select a star rating',
//         variant: 'destructive'
//       });
//       return;
//     }

//     if (!comment.trim()) {
//       toast({
//         title: 'Comment required',
//         description: 'Please write a comment',
//         variant: 'destructive'
//       });
//       return;
//     }

//     setIsSubmitting(true);
    
//     // Simulate API call
//     await new Promise(resolve => setTimeout(resolve, 1000));
    
//     toast({
//       title: 'Review submitted!',
//       description: 'Thank you for your feedback',
//     });

//     setRating(0);
//     setComment('');
//     setIsSubmitting(false);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <div>
//         <label className="text-sm font-medium text-foreground mb-2 block">
//           Your Rating
//         </label>
//         <div className="flex gap-1">
//           {[1, 2, 3, 4, 5].map((star) => (
//             <motion.button
//               key={star}
//               type="button"
//               onClick={() => setRating(star)}
//               onMouseEnter={() => setHoverRating(star)}
//               onMouseLeave={() => setHoverRating(0)}
//               whileHover={{ scale: 1.2 }}
//               whileTap={{ scale: 0.9 }}
//               className="focus:outline-none"
//             >
//               <Star
//                 className={`w-6 h-6 transition-colors ${
//                   star <= (hoverRating || rating)
//                     ? 'star-filled fill-current'
//                     : 'star-empty'
//                 }`}
//               />
//             </motion.button>
//           ))}
//         </div>
//       </div>

//       <div>
//         <label className="text-sm font-medium text-foreground mb-2 block">
//           Your Comment
//         </label>
//         <Textarea
//           value={comment}
//           onChange={(e) => setComment(e.target.value)}
//           placeholder="Share your thoughts about this snippet..."
//           className="resize-none"
//           rows={3}
//         />
//       </div>

//       <Button 
//         type="submit" 
//         className="w-full gap-2"
//         disabled={isSubmitting}
//       >
//         {isSubmitting ? (
//           <>Submitting...</>
//         ) : (
//           <>
//             <Send className="w-4 h-4" />
//             Submit Review
//           </>
//         )}
//       </Button>
//     </form>
//   );
// };

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useSnippets, currentUser } from '@/context/SnippetContext';

interface AddReviewFormProps {
  snippetId: string;
}

export const AddReviewForm = ({ snippetId }: AddReviewFormProps) => {
  const { addReview } = useSnippets();
  const { toast } = useToast();
  
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (rating === 0) {
      toast({
        title: 'Rating required',
        description: 'Please select a star rating',
        variant: 'destructive'
      });
      return;
    }

    if (!comment.trim()) {
      toast({
        title: 'Comment required',
        description: 'Please write a comment',
        variant: 'destructive'
      });
      return;
    }

    // Use Context to add real review
    addReview(snippetId, {
      userId: currentUser.id,
      userName: currentUser.name,
      userAvatar: currentUser.avatar,
      rating,
      comment: comment.trim(),
    });
    
    toast({
      title: 'Review submitted!',
      description: 'Thank you for your feedback',
    });

    // Reset Form
    setRating(0);
    setHoverRating(0);
    setComment('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 pb-4 border-b border-border">
      <p className="text-xs text-muted-foreground mb-2">Your Rating</p>
      
      {/* Stars */}
      <div className="flex gap-1 mb-3 mt-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <motion.button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            onMouseEnter={() => setHoverRating(star)}
            onMouseLeave={() => setHoverRating(0)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="focus:outline-none"
          >
            <Star
              className={`w-5 h-5 transition-colors ${
                star <= (hoverRating || rating)
                  ? 'text-yellow-500 fill-current'
                  : 'text-muted-foreground/20'
              }`}
            />
          </motion.button>
        ))}
      </div>

      {/* Comment Box */}
      <Textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Share your thoughts..."
        className="min-h-[60px] text-xs resize-none mb-5 mt-5"
        rows={2}
      />

      {/* Submit Button */}
      <Button 
        type="submit" 
        size="sm"
        className="w-full gap-2 "
      >
        <Send className="w-3 h-3" />
        Submit Review
      </Button>
    </form>
  );
};