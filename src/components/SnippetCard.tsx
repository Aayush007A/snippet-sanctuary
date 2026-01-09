// import { motion } from 'framer-motion';
// import { Star, MessageCircle } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// import { Badge } from '@/components/ui/badge';
// import type { Snippet } from '@/data/mockData';

// interface SnippetCardProps {
//   snippet: Snippet;
//   index: number;
// }

// const languageStyles: Record<string, string> = {
//   'Python': 'language-badge-python',
//   'Spark Scala': 'language-badge-scala',
//   'SQL': 'language-badge-sql',
// };

// export const SnippetCard = ({ snippet, index }: SnippetCardProps) => {
//   const navigate = useNavigate();
  
//   const averageRating = snippet.reviews.length > 0
//     ? snippet.reviews.reduce((sum, r) => sum + r.rating, 0) / snippet.reviews.length
//     : 0;

//   return (
//     <motion.div
//       className="group cursor-pointer"
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.4, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
//       onClick={() => navigate(`/snippet/${snippet.id}`)}
//     >
//       <motion.div
//         className="h-full bg-card rounded-xl border border-border p-6 transition-all duration-300"
//         whileHover={{ 
//           y: -4,
//           boxShadow: '0 20px 40px -12px rgba(0, 0, 0, 0.1)',
//           borderColor: 'hsl(var(--primary) / 0.2)'
//         }}
//       >
//         {/* Header */}
//         <div className="flex items-start justify-between gap-4 mb-4">
//           <Badge 
//             variant="outline" 
//             className={`${languageStyles[snippet.language]} border font-medium`}
//           >
//             {snippet.language}
//           </Badge>
//           <Badge variant="secondary" className="text-xs">
//             {snippet.type}
//           </Badge>
//         </div>

//         {/* Title */}
//         <h3 className="font-heading text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
//           {snippet.title}
//         </h3>

//         {/* Description */}
//         <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
//           {snippet.description}
//         </p>

//         {/* Tags */}
//         <div className="flex flex-wrap gap-1.5 mb-4">
//           {snippet.tags.slice(0, 3).map((tag) => (
//             <span 
//               key={tag} 
//               className="text-xs px-2 py-0.5 bg-secondary text-secondary-foreground rounded-full"
//             >
//               {tag}
//             </span>
//           ))}
//           {snippet.tags.length > 3 && (
//             <span className="text-xs px-2 py-0.5 text-muted-foreground">
//               +{snippet.tags.length - 3} more
//             </span>
//           )}
//         </div>

//         {/* Footer */}
//         <div className="flex items-center justify-between pt-4 border-t border-border">
//           <div className="flex items-center gap-1">
//             {[1, 2, 3, 4, 5].map((star) => (
//               <Star
//                 key={star}
//                 className={`w-4 h-4 ${
//                   star <= averageRating ? 'star-filled fill-current' : 'star-empty'
//                 }`}
//               />
//             ))}
//             <span className="text-xs text-muted-foreground ml-1">
//               ({snippet.reviews.length})
//             </span>
//           </div>
//           <div className="flex items-center gap-1 text-muted-foreground">
//             <MessageCircle className="w-4 h-4" />
//             <span className="text-xs">{snippet.reviews.length}</span>
//           </div>
//         </div>
//       </motion.div>
//     </motion.div>
//   );
// };

// import { motion } from 'framer-motion';
// import { Star, MessageCircle, Trash2 } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// import { Badge } from '@/components/ui/badge';
// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
// import { type Snippet, useSnippets, currentUser } from '@/context/SnippetContext';

// interface SnippetCardProps {
//   snippet: Snippet;
//   index: number;
// }

// const languageStyles: Record<string, string> = {
//   'Python': 'language-badge-python',
//   'Spark Scala': 'language-badge-scala',
//   'SQL': 'language-badge-sql',
// };

// export const SnippetCard = ({ snippet, index }: SnippetCardProps) => {
//   const navigate = useNavigate();
//   const { deleteSnippet } = useSnippets();
  
//   // Check if the current logged-in user is the author
//   const isAuthor = snippet.authorId === currentUser.id;

//   const averageRating = snippet.reviews.length > 0
//     ? snippet.reviews.reduce((sum, r) => sum + r.rating, 0) / snippet.reviews.length
//     : 0;

//   const categoryLabel = snippet.categoryId === 'jet' ? 'JET' : 
//                         snippet.categoryId === 'omnia' ? 'Omnia' : 
//                         snippet.categoryId;

//   // Handle Delete Action
//   const handleDelete = (e: React.MouseEvent) => {
//     e.stopPropagation(); // Prevent the card click event (navigation)
    
//     if (window.confirm("Are you sure you want to delete this snippet? This action cannot be undone.")) {
//       deleteSnippet(snippet.id);
//     }
//   };

//   return (
//     <motion.div
//       className="group cursor-pointer h-full"
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.4, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
//       onClick={() => navigate(`/snippet/${snippet.id}`)}
//     >
//       <motion.div
//         className="h-full flex flex-col bg-card rounded-xl border border-border p-6 transition-all duration-300 relative hover:border-primary/20 hover:shadow-lg"
//         whileHover={{ y: -4 }}
//       >
//         {/* Header */}
//         <div className="flex items-start justify-between gap-4 mb-4">
//           <Badge 
//             variant="outline" 
//             className={`${languageStyles[snippet.language] || 'border-border'} border font-medium`}
//           >
//             {snippet.language}
//           </Badge>
//           <Badge variant="secondary" className="text-xs uppercase">
//             {categoryLabel}
//           </Badge>
//         </div>

//         {/* Title */}
//         <h3 className="font-heading text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-1">
//           {snippet.title}
//         </h3>

//         {/* Description */}
//         <p className="text-sm text-muted-foreground line-clamp-2 mb-4 min-h-[2.5rem]">
//           {snippet.description}
//         </p>

//         {/* Tags */}
//         <div className="flex flex-wrap gap-1.5 mb-6">
//           {snippet.tags.slice(0, 3).map((tag) => (
//             <span 
//               key={tag} 
//               className="text-xs px-2 py-0.5 bg-secondary text-secondary-foreground rounded-full"
//             >
//               {tag}
//             </span>
//           ))}
//           {snippet.tags.length > 3 && (
//             <span className="text-xs px-2 py-0.5 text-muted-foreground">
//               +{snippet.tags.length - 3} more
//             </span>
//           )}
//         </div>

//         {/* Footer */}
//         <div className="flex items-center justify-between pt-4 border-t border-border mt-auto">
//           {/* Author Info */}
//           <div className="flex items-center gap-2">
//             <Avatar className="w-6 h-6">
//               <AvatarImage src={snippet.authorAvatar} />
//               <AvatarFallback className="text-[10px]">
//                 {snippet.authorName?.charAt(0) || 'U'}
//               </AvatarFallback>
//             </Avatar>
//             <span className="text-sm text-muted-foreground truncate max-w-[100px]">
//               {snippet.authorName}
//             </span>
//           </div>

//           {/* Right Side: Rating & Delete Button */}
//           <div className="flex items-center gap-3">
//             {/* Rating */}
//             <div className="flex items-center gap-1">
//               <Star className={`w-4 h-4 ${snippet.reviews.length > 0 ? 'fill-yellow-500 text-yellow-500' : 'text-muted-foreground/30'}`} />
//               <span className="text-xs font-medium">
//                 {averageRating > 0 ? averageRating.toFixed(1) : ''}
//               </span>
//               <span className="text-xs text-muted-foreground ml-0.5">
//                 ({snippet.reviews.length})
//               </span>
//             </div>

//             {/* Delete Button - Only visible if user is author */}
//             {isAuthor && (
//               <button
//                 onClick={handleDelete}
//                 className="p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-md transition-all ml-1 z-10"
//                 title="Delete Snippet"
//               >
//                 <Trash2 className="w-4 h-4" />
//               </button>
//             )}
//           </div>
//         </div>
//       </motion.div>
//     </motion.div>
//   );
// };

import { motion } from 'framer-motion';
import { Star, MessageCircle, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { type Snippet, useSnippets, currentUser } from '@/context/SnippetContext';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast"; // Import toast hook

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
  const { deleteSnippet } = useSnippets();
  const { toast } = useToast();
  
  const isAuthor = snippet.authorId === currentUser.id;

  const averageRating = snippet.reviews.length > 0
    ? snippet.reviews.reduce((sum, r) => sum + r.rating, 0) / snippet.reviews.length
    : 0;

  const categoryLabel = snippet.categoryId === 'jet' ? 'JET' : 
                        snippet.categoryId === 'omnia' ? 'Omnia' : 
                        snippet.categoryId;

  const handleDelete = () => {
    deleteSnippet(snippet.id);
    toast({
      title: "Snippet Deleted",
      description: `"${snippet.title}" has been permanently removed.`,
      variant: "destructive", // Red color for delete action
    });
  };

  return (
    <motion.div
      className="group cursor-pointer h-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      onClick={() => navigate(`/snippet/${snippet.id}`)}
    >
      <motion.div
        className="h-full flex flex-col bg-card rounded-xl border border-border p-6 transition-all duration-300 relative hover:border-primary/20 hover:shadow-lg"
        whileHover={{ y: -4 }}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <Badge 
            variant="outline" 
            className={`${languageStyles[snippet.language] || 'border-border'} border font-medium`}
          >
            {snippet.language}
          </Badge>
          <Badge variant="secondary" className="text-xs uppercase">
            {categoryLabel}
          </Badge>
        </div>

        {/* Title */}
        <h3 className="font-heading text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-1">
          {snippet.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4 min-h-[2.5rem]">
          {snippet.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-6">
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
        <div className="flex items-center justify-between pt-4 border-t border-border mt-auto">
          <div className="flex items-center gap-2">
            <Avatar className="w-6 h-6">
              <AvatarImage src={snippet.authorAvatar} />
              <AvatarFallback className="text-[10px]">
                {snippet.authorName?.charAt(0) || 'U'}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm text-muted-foreground truncate max-w-[100px]">
              {snippet.authorName}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Star className={`w-4 h-4 ${snippet.reviews.length > 0 ? 'fill-yellow-500 text-yellow-500' : 'text-muted-foreground/30'}`} />
              <span className="text-xs font-medium">
                {averageRating > 0 ? averageRating.toFixed(1) : ''}
              </span>
              <span className="text-xs text-muted-foreground ml-0.5">
                ({snippet.reviews.length})
              </span>
            </div>

            {/* DELETE BUTTON with Modern Alert Dialog */}
            {isAuthor && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <button
                    onClick={(e) => e.stopPropagation()} // Stop click from navigating to detail page
                    className="p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-md transition-all ml-1 z-10"
                    title="Delete Snippet"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </AlertDialogTrigger>
                <AlertDialogContent onClick={(e) => e.stopPropagation()}>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete your snippet
                      "{snippet.title}" from the database.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel onClick={(e) => e.stopPropagation()}>Cancel</AlertDialogCancel>
                    <AlertDialogAction 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete();
                      }}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};