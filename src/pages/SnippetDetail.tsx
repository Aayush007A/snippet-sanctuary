// import { useParams, useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { ArrowLeft, Star, Share2, Calendar, User, MessageSquare } from 'lucide-react';
// import { Navbar } from '@/components/Navbar';
// import { SubtleBackground } from '@/components/SubtleBackground';
// import { CodeEditor } from '@/components/CodeEditor';
// import { CSVTableViewer } from '@/components/CSVTableViewer';
// import { AddReviewForm } from '@/components/AddReviewForm';
// import { Badge } from '@/components/ui/badge';
// import { Button } from '@/components/ui/button';
// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
// import { useSnippets, currentUser } from '@/context/SnippetContext';
// import { formatDistanceToNow } from 'date-fns';
// import { useToast } from '@/hooks/use-toast';

// const SnippetDetail = () => {
//   const { id } = useParams<{ id: string }>();
//   const navigate = useNavigate();
//   const { snippets } = useSnippets();
//   const { toast } = useToast();
  
//   const snippet = snippets.find(s => s.id === id);

//   if (!snippet) {
//     return (
//       <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
//         <h1 className="text-2xl font-bold">Snippet Not Found</h1>
//         <Button onClick={() => navigate('/')}>Go Home</Button>
//       </div>
//     );
//   }

//   const handleShare = () => {
//     navigator.clipboard.writeText(window.location.href);
//     toast({ title: "Link Copied", description: "Snippet link copied to clipboard." });
//   }

//   return (
//     <div className="min-h-screen bg-background relative flex flex-col">
//       <SubtleBackground />
//       <Navbar />

//       <main className="flex-1 container mx-auto px-4 pt-24 pb-8">
//         <motion.div
//           initial={{ opacity: 0, y: 10 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="h-full flex flex-col"
//         >
//           {/* Top Navigation & Header */}
//           <div className="mb-6">
//             <Button 
//               variant="ghost" 
//               className="pl-0 hover:pl-2 gap-2 text-muted-foreground mb-4"
//               onClick={() => navigate(-1)}
//             >
//               <ArrowLeft className="w-4 h-4" />
//               Back
//             </Button>

//             <div className="flex items-start justify-between">
//               <div>
//                 <h1 className="text-3xl font-heading font-bold text-foreground mb-2">{snippet.title}</h1>
//                 <p className="text-muted-foreground max-w-3xl">{snippet.description}</p>
                
//                 <div className="flex items-center gap-3 mt-4">
//                   <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-primary/20">
//                     {snippet.language}
//                   </Badge>
//                   {snippet.tags.map(tag => (
//                     <Badge key={tag} variant="secondary" className="text-xs">#{tag}</Badge>
//                   ))}
//                   <span className="text-xs text-muted-foreground flex items-center gap-1 ml-2">
//                      <Calendar className="w-3 h-3" />
//                      {formatDistanceToNow(new Date(snippet.createdAt))} ago
//                   </span>
//                 </div>
//               </div>

//               <Button variant="outline" size="sm" className="gap-2" onClick={handleShare}>
//                 <Share2 className="w-4 h-4" />
//                 Share
//               </Button>
//             </div>
//           </div>

//           {/* 3-Column Grid Layout */}
//           <div className="grid lg:grid-cols-12 gap-6 h-full items-start">
            
//             {/* COLUMN 1: Input / Output Tables */}
//             <div className="lg:col-span-3 flex flex-col gap-4 h-[600px]">
//               <CSVTableViewer 
//                 title="Sample Input (CSV)" 
//                 data={snippet.inputSample || ""} 
//                 className="flex-1 min-h-0 shadow-sm"
//               />
//               <CSVTableViewer 
//                 title="Expected Output (CSV)" 
//                 data={snippet.outputSample || ""} 
//                 className="flex-1 min-h-0 shadow-sm"
//               />
//             </div>

//             {/* COLUMN 2: Code Editor */}
//             <div className="lg:col-span-6 h-[600px] border border-border rounded-xl overflow-hidden shadow-sm bg-[#282c34]">
//                <CodeEditor 
//                   code={snippet.code} 
//                   language={snippet.language} 
//                   isAuthor={snippet.authorId === currentUser.id} 
//                 />
//             </div>

//             {/* COLUMN 3: Author & Reviews (Right - 3 Cols) */}
//             <div className="lg:col-span-3 flex flex-col gap-4 h-[600px]">
              
//               {/* Author Card */}
//               <div className="bg-card border border-border rounded-xl p-4 shadow-sm shrink-0">
//                 <h3 className="text-xs font-semibold text-muted-foreground uppercase mb-3">Author</h3>
//                 <div className="flex items-center gap-3">
//                   <Avatar className="w-10 h-10 border border-border">
//                     <AvatarImage src={snippet.authorAvatar} />
//                     <AvatarFallback><User /></AvatarFallback>
//                   </Avatar>
//                   <div>
//                     <p className="font-medium text-foreground text-sm">{snippet.authorName}</p>
//                     <p className="text-xs text-muted-foreground">Contributor</p>
//                   </div>
//                 </div>
//               </div>

//               {/* Reviews Panel (Updated Layout) */}
//               <div className="bg-card border border-border rounded-xl p-4 flex flex-col flex-1 shadow-sm overflow-hidden">
//                 <div className="flex items-center justify-between mb-4 shrink-0">
//                   <h3 className="font-semibold text-foreground">Reviews & Comments</h3>
//                 </div>

//                 {/* 1. SCROLLABLE REVIEWS LIST (Now on Top) */}
//                 <div className="flex-1 overflow-y-auto pr-2 space-y-3 mb-4 scrollbar-thin">
//                   {snippet.reviews.length === 0 ? (
//                     <div className="h-full flex flex-col items-center justify-center text-center p-4 border border-dashed border-border rounded-xl bg-secondary/5">
//                         <MessageSquare className="w-8 h-8 text-muted-foreground/30 mb-2" />
//                         <p className="text-muted-foreground text-xs">No reviews yet.</p>
//                         <p className="text-muted-foreground text-[10px]">Be the first to review!</p>
//                     </div>
//                   ) : (
//                     snippet.reviews.slice().reverse().map((review) => (
//                       <div 
//                         key={review.id} 
//                         className="bg-secondary/10 border border-border rounded-xl p-3 shadow-sm hover:border-primary/20 transition-colors"
//                       >
//                         {/* Review Header */}
//                         <div className="flex items-start gap-3 mb-2">
//                            <Avatar className="w-8 h-8 border border-border/50">
//                              <AvatarImage src={review.userAvatar} />
//                              <AvatarFallback className="text-[9px]">{review.userName[0]}</AvatarFallback>
//                            </Avatar>
//                            <div className="flex-1 min-w-0">
//                              <h4 className="text-xs font-bold text-foreground truncate">{review.userName}</h4>
//                              <p className="text-[10px] text-muted-foreground">
//                                {formatDistanceToNow(new Date(review.createdAt))} ago
//                              </p>
//                            </div>
//                         </div>

//                         {/* Review Stars */}
//                         <div className="flex text-yellow-500 mb-2">
//                            {[...Array(5)].map((_, i) => (
//                              <Star 
//                                key={i} 
//                                className={`w-3 h-3 ${i < review.rating ? 'fill-current' : 'text-muted-foreground/20'}`} 
//                              />
//                            ))}
//                         </div>

//                         {/* Review Text */}
//                         <p className="text-xs text-muted-foreground leading-relaxed break-words">
//                           {review.comment}
//                         </p>
//                       </div>
//                     ))
//                   )}
//                 </div>

//                 {/* 2. ADD REVIEW FORM (Now pinned to bottom) */}
//                 <div className="pt-4 border-t border-border shrink-0">
//                     <AddReviewForm snippetId={snippet.id} />
//                 </div>
//               </div>
//             </div>

//           </div>
//         </motion.div>
//       </main>
//     </div>
//   );
// };

// export default SnippetDetail;

import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Star, Share2, Calendar, User, MessageSquare } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { SubtleBackground } from '@/components/SubtleBackground';
import { CodeEditor } from '@/components/CodeEditor';
import { CSVTableViewer } from '@/components/CSVTableViewer';
import { AddReviewForm } from '@/components/AddReviewForm';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useSnippets, currentUser } from '@/context/SnippetContext';
import { formatDistanceToNow } from 'date-fns';
import { useToast } from '@/hooks/use-toast';

const SnippetDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  // FIX: Import updateSnippet from context
  const { snippets, updateSnippet } = useSnippets();
  const { toast } = useToast();
  
  const snippet = snippets.find(s => s.id === id);

  if (!snippet) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">Snippet Not Found</h1>
        <Button onClick={() => navigate('/')}>Go Home</Button>
      </div>
    );
  }

  // FIX: Logic to save the code when user clicks Save in Editor
  const handleCodeSave = (newCode: string) => {
    updateSnippet(snippet.id, { code: newCode });
    toast({
      title: "Snippet Updated",
      description: "Code changes have been saved successfully.",
    });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({ title: "Link Copied", description: "Snippet link copied to clipboard." });
  }

  return (
    <div className="min-h-screen bg-background relative flex flex-col">
      <SubtleBackground />
      <Navbar />

      <main className="flex-1 container mx-auto px-4 pt-24 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="h-full flex flex-col"
        >
          {/* Top Navigation & Header */}
          <div className="mb-6">
            <Button 
              variant="ghost" 
              className="pl-0 hover:pl-2 gap-2 text-muted-foreground mb-4"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>

            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-3xl font-heading font-bold text-foreground mb-2">{snippet.title}</h1>
                <p className="text-muted-foreground max-w-3xl">{snippet.description}</p>
                
                <div className="flex items-center gap-3 mt-4">
                  <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-primary/20">
                    {snippet.language}
                  </Badge>
                  {snippet.tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="text-xs">#{tag}</Badge>
                  ))}
                  <span className="text-xs text-muted-foreground flex items-center gap-1 ml-2">
                     <Calendar className="w-3 h-3" />
                     {formatDistanceToNow(new Date(snippet.createdAt))} ago
                  </span>
                </div>
              </div>

              <Button variant="outline" size="sm" className="gap-2" onClick={handleShare}>
                <Share2 className="w-4 h-4" />
                Share
              </Button>
            </div>
          </div>

          {/* 3-Column Grid Layout */}
          <div className="grid lg:grid-cols-12 gap-6 h-full items-start">
            
            {/* COLUMN 1: Input / Output Tables */}
            <div className="lg:col-span-3 flex flex-col gap-4 h-[600px]">
              <CSVTableViewer 
                title="Sample Input (CSV)" 
                data={snippet.inputSample || ""} 
                className="flex-1 min-h-0 shadow-sm"
              />
              <CSVTableViewer 
                title="Expected Output (CSV)" 
                data={snippet.outputSample || ""} 
                className="flex-1 min-h-0 shadow-sm"
              />
            </div>

            {/* COLUMN 2: Code Editor */}
            <div className="lg:col-span-6 h-[600px] border border-border rounded-xl overflow-hidden shadow-sm">
               <CodeEditor 
                  code={snippet.code} 
                  language={snippet.language} 
                  isAuthor={snippet.authorId === currentUser.id}
                  onSave={handleCodeSave} // FIX: Pass the save handler
                />
            </div>

            {/* COLUMN 3: Author & Reviews */}
            <div className="lg:col-span-3 flex flex-col gap-4 h-[600px]">
              
              {/* Author Card */}
              <div className="bg-card border border-border rounded-xl p-4 shadow-sm shrink-0">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase mb-3">Author</h3>
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10 border border-border">
                    <AvatarImage src={snippet.authorAvatar} />
                    <AvatarFallback><User /></AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-foreground text-sm">{snippet.authorName}</p>
                    <p className="text-xs text-muted-foreground">Contributor</p>
                  </div>
                </div>
              </div>

              {/* Reviews Panel */}
              <div className="bg-card border border-border rounded-xl p-4 flex flex-col flex-1 shadow-sm overflow-hidden">
                <div className="flex items-center justify-between mb-4 shrink-0">
                  <h3 className="font-semibold text-foreground">Reviews & Comments</h3>
                </div>

                {/* SCROLLABLE REVIEWS LIST */}
                <div className="flex-1 overflow-y-auto pr-2 space-y-3 mb-4 scrollbar-thin">
                  {snippet.reviews.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center p-4 border border-dashed border-border rounded-xl bg-secondary/5">
                        <MessageSquare className="w-8 h-8 text-muted-foreground/30 mb-2" />
                        <p className="text-muted-foreground text-xs">No reviews yet.</p>
                        <p className="text-muted-foreground text-[10px]">Be the first to review!</p>
                    </div>
                  ) : (
                    snippet.reviews.slice().reverse().map((review) => (
                      <div 
                        key={review.id} 
                        className="bg-secondary/10 border border-border rounded-xl p-3 shadow-sm hover:border-primary/20 transition-colors"
                      >
                        <div className="flex items-start gap-3 mb-2">
                           <Avatar className="w-8 h-8 border border-border/50">
                             <AvatarImage src={review.userAvatar} />
                             <AvatarFallback className="text-[9px]">{review.userName[0]}</AvatarFallback>
                           </Avatar>
                           <div className="flex-1 min-w-0">
                             <h4 className="text-xs font-bold text-foreground truncate">{review.userName}</h4>
                             <p className="text-[10px] text-muted-foreground">
                               {formatDistanceToNow(new Date(review.createdAt))} ago
                             </p>
                           </div>
                        </div>

                        <div className="flex text-yellow-500 mb-2">
                           {[...Array(5)].map((_, i) => (
                             <Star 
                               key={i} 
                               className={`w-3 h-3 ${i < review.rating ? 'fill-current' : 'text-muted-foreground/20'}`} 
                             />
                           ))}
                        </div>

                        <p className="text-xs text-muted-foreground leading-relaxed break-words">
                          {review.comment}
                        </p>
                      </div>
                    ))
                  )}
                </div>

                {/* ADD REVIEW FORM */}
                <div className="pt-4 border-t border-border shrink-0">
                    <AddReviewForm snippetId={snippet.id} />
                </div>
              </div>
            </div>

          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default SnippetDetail;