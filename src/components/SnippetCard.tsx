// import { motion } from 'framer-motion';
// import { Star, MessageCircle, Trash2 } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// import { Badge } from '@/components/ui/badge';
// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
// // Import categories from context to look up names
// import { type Snippet, useSnippets, currentUser } from '@/context/SnippetContext';
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from "@/components/ui/alert-dialog";
// import { useToast } from "@/hooks/use-toast";

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
//   // Get categories from context so we can find the name
//   const { deleteSnippet, categories } = useSnippets();
//   const { toast } = useToast();
  
//   const isAuthor = snippet.authorId === currentUser.id;

//   const averageRating = snippet.reviews.length > 0
//     ? snippet.reviews.reduce((sum, r) => sum + r.rating, 0) / snippet.reviews.length
//     : 0;

//   // --- FIX: Look up the category name by ID ---
//   const foundCategory = categories.find(c => c.id === snippet.categoryId);
//   const categoryLabel = foundCategory ? foundCategory.name : snippet.categoryId;
//   // -------------------------------------------

//   const handleDelete = () => {
//     deleteSnippet(snippet.id);
//     toast({
//       title: "Snippet Deleted",
//       description: `"${snippet.title}" has been permanently removed.`,
//       variant: "destructive",
//     });
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
//           {/* Display the looked-up Name, not the ID */}
//           <Badge variant="secondary" className="text-xs uppercase truncate max-w-[120px]">
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

//           <div className="flex items-center gap-3">
//             <div className="flex items-center gap-1">
//               <Star className={`w-4 h-4 ${snippet.reviews.length > 0 ? 'fill-yellow-500 text-yellow-500' : 'text-muted-foreground/30'}`} />
//               <span className="text-xs font-medium">
//                 {averageRating > 0 ? averageRating.toFixed(1) : ''}
//               </span>
//               <span className="text-xs text-muted-foreground ml-0.5">
//                 ({snippet.reviews.length})
//               </span>
//             </div>

//             {/* DELETE BUTTON with Modern Alert Dialog */}
//             {isAuthor && (
//               <AlertDialog>
//                 <AlertDialogTrigger asChild>
//                   <button
//                     onClick={(e) => e.stopPropagation()} 
//                     className="p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-md transition-all ml-1 z-10"
//                     title="Delete Snippet"
//                   >
//                     <Trash2 className="w-4 h-4" />
//                   </button>
//                 </AlertDialogTrigger>
//                 <AlertDialogContent onClick={(e) => e.stopPropagation()}>
//                   <AlertDialogHeader>
//                     <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
//                     <AlertDialogDescription>
//                       This action cannot be undone. This will permanently delete your snippet
//                       "{snippet.title}" from the database.
//                     </AlertDialogDescription>
//                   </AlertDialogHeader>
//                   <AlertDialogFooter>
//                     <AlertDialogCancel onClick={(e) => e.stopPropagation()}>Cancel</AlertDialogCancel>
//                     <AlertDialogAction 
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         handleDelete();
//                       }}
//                       className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
//                     >
//                       Delete
//                     </AlertDialogAction>
//                   </AlertDialogFooter>
//                 </AlertDialogContent>
//               </AlertDialog>
//             )}
//           </div>
//         </div>
//       </motion.div>
//     </motion.div>
//   );
// };

import { motion } from 'framer-motion';
import { Star, Trash2 } from 'lucide-react';
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
import { useToast } from "@/hooks/use-toast";

interface SnippetCardProps {
  snippet: Snippet;
  index: number;
}

// FIX: Expanded color map using Tailwind classes directly
const languageStyles: Record<string, string> = {
  'Python': 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20 dark:text-yellow-400',
  'JavaScript': 'bg-yellow-400/10 text-yellow-600 border-yellow-400/20 dark:text-yellow-300',
  'TypeScript': 'bg-blue-500/10 text-blue-600 border-blue-500/20 dark:text-blue-400',
  'Spark Scala': 'bg-red-500/10 text-red-600 border-red-500/20 dark:text-red-400',
  'SQL': 'bg-slate-500/10 text-slate-600 border-slate-500/20 dark:text-slate-400',
  'Java': 'bg-orange-500/10 text-orange-600 border-orange-500/20 dark:text-orange-400',
  'C++': 'bg-blue-700/10 text-blue-700 border-blue-700/20 dark:text-blue-500',
  'Go': 'bg-cyan-500/10 text-cyan-600 border-cyan-500/20 dark:text-cyan-400',
  'HTML/CSS': 'bg-orange-600/10 text-orange-600 border-orange-600/20 dark:text-orange-400',
};

export const SnippetCard = ({ snippet, index }: SnippetCardProps) => {
  const navigate = useNavigate();
  const { deleteSnippet, categories } = useSnippets();
  const { toast } = useToast();
  
  const isAuthor = snippet.authorId === currentUser.id;

  const averageRating = snippet.reviews.length > 0
    ? snippet.reviews.reduce((sum, r) => sum + r.rating, 0) / snippet.reviews.length
    : 0;

  const foundCategory = categories.find(c => c.id === snippet.categoryId);
  const categoryLabel = foundCategory ? foundCategory.name : snippet.categoryId;

  const handleDelete = () => {
    deleteSnippet(snippet.id);
    toast({
      title: "Snippet Deleted",
      description: `"${snippet.title}" has been permanently removed.`,
      variant: "destructive",
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
          
          {/* FIX: Removed 'truncate' and 'max-w' so full name shows */}
          <Badge variant="secondary" className="text-xs uppercase whitespace-normal text-right">
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

            {isAuthor && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <button
                    onClick={(e) => e.stopPropagation()} 
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