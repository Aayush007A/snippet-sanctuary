// import { useMemo } from 'react';
// import { useParams, Navigate } from 'react-router-dom';
// import { Navbar } from '@/components/Navbar';
// import { SubtleBackground } from '@/components/SubtleBackground';
// import { SnippetDetailLayout } from '@/components/SnippetDetailLayout';
// // import { mockSnippets } from '@/data/mockData';
// import { useSnippets } from '@/context/SnippetContext';

// const SnippetDetail = () => {
//   const { id } = useParams<{ id: string }>();
//   const { getSnippetById } = useSnippets();

//   const snippet = useMemo(() => {
//     return getSnippetById(id || '');
//   }, [id, getSnippetById]);

//   if (!snippet) {
//     return <Navigate to="/" replace />;
//   }

//   return (
//     <div className="min-h-screen bg-background relative">
//       <SubtleBackground />
//       <Navbar />
//       <SnippetDetailLayout snippet={snippet} />
//     </div>
//   );
// };

// export default SnippetDetail;


// import { useParams, useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { ArrowLeft, MessageSquare, Star, Share2, Calendar, User, Copy } from 'lucide-react';
// import { Navbar } from '@/components/Navbar';
// import { SubtleBackground } from '@/components/SubtleBackground';
// import { CodeEditor } from '@/components/CodeEditor';
// import { Badge } from '@/components/ui/badge';
// import { Button } from '@/components/ui/button';
// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
// import { useSnippets, currentUser } from '@/context/SnippetContext';
// import { formatDistanceToNow } from 'date-fns';
// import { useState } from 'react';
// import { Textarea } from '@/components/ui/textarea';
// import { useToast } from '@/hooks/use-toast';

// // --- Helper Component to Render CSV Data as Table ---
// const CsvTable = ({ title, data }: { title: string, data?: string }) => {
//   if (!data) return null;
  
//   const rows = data.trim().split('\n');
//   const headers = rows[0].split(',');
//   const body = rows.slice(1);

//   return (
//     <div className="bg-card border border-border rounded-xl overflow-hidden flex flex-col h-full max-h-[300px]">
//       <div className="bg-secondary/30 px-4 py-2 border-b border-border flex justify-between items-center">
//         <span className="text-sm font-semibold text-foreground">{title}</span>
//         <Badge variant="outline" className="text-[10px] h-5">{body.length} rows</Badge>
//       </div>
//       <div className="overflow-auto p-0 scrollbar-thin">
//         <table className="w-full text-left text-xs">
//           <thead className="bg-muted/50 text-muted-foreground sticky top-0">
//             <tr>
//               {headers.map((h, i) => (
//                 <th key={i} className="px-3 py-2 font-medium whitespace-nowrap">{h}</th>
//               ))}
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-border">
//             {body.map((row, i) => (
//               <tr key={i} className="hover:bg-muted/20">
//                 {row.split(',').map((cell, j) => (
//                   <td key={j} className="px-3 py-2 text-foreground/80 whitespace-nowrap">{cell}</td>
//                 ))}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// const SnippetDetail = () => {
//   const { id } = useParams<{ id: string }>();
//   const navigate = useNavigate();
//   const { snippets, addReview } = useSnippets();
//   const { toast } = useToast();
  
//   const snippet = snippets.find(s => s.id === id);

//   const [newComment, setNewComment] = useState('');
//   const [rating, setRating] = useState(0); // FIX: Start with 0 stars

//   if (!snippet) {
//     return (
//       <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
//         <h1 className="text-2xl font-bold">Snippet Not Found</h1>
//         <Button onClick={() => navigate('/')}>Go Home</Button>
//       </div>
//     );
//   }

//   const handleReviewSubmit = () => {
//     if (!newComment.trim() || rating === 0) {
//       toast({
//         title: "Error",
//         description: "Please provide a rating and a comment.",
//         variant: "destructive"
//       });
//       return;
//     }
    
//     addReview(snippet.id, {
//       userId: currentUser.id,
//       userName: currentUser.name,
//       userAvatar: currentUser.avatar,
//       rating,
//       comment: newComment,
//     });
    
//     setNewComment('');
//     setRating(0); // Reset to 0
    
//     toast({
//       title: "Review Added",
//       description: "Thank you for your feedback!",
//     });
//   };

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

//               {/* Share Button (Feature from New Layout) */}
//               <Button variant="outline" size="sm" className="gap-2" onClick={handleShare}>
//                 <Share2 className="w-4 h-4" />
//                 Share
//               </Button>
//             </div>
//           </div>

//           {/* 3-Column Grid Layout (Restoring Old Layout Structure) */}
//           <div className="grid lg:grid-cols-12 gap-6 h-full items-start">
            
//             {/* COLUMN 1: Input / Output Tables (Left - 3 Cols) */}
//             <div className="lg:col-span-3 flex flex-col gap-4">
//               <CsvTable title="Sample Input (CSV)" data={snippet.inputSample} />
//               <CsvTable title="Expected Output (CSV)" data={snippet.outputSample} />
//             </div>

//             {/* COLUMN 2: Code Editor (Middle - 6 Cols) */}
//             <div className="lg:col-span-6 h-[600px] border border-border rounded-xl overflow-hidden shadow-sm bg-[#282c34]">
//                <CodeEditor 
//                   code={snippet.code} 
//                   language={snippet.language} 
//                   isAuthor={snippet.authorId === currentUser.id} 
//                 />
//             </div>

//             {/* COLUMN 3: Author & Reviews (Right - 3 Cols) */}
//             <div className="lg:col-span-3 flex flex-col gap-6">
              
//               {/* Author Card (High Visibility) */}
//               <div className="bg-card border border-border rounded-xl p-4 shadow-sm">
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

//               {/* Reviews Panel */}
//               <div className="bg-card border border-border rounded-xl p-4 flex flex-col flex-1 shadow-sm h-[440px]">
//                 <div className="flex items-center justify-between mb-4">
//                   <h3 className="font-semibold text-foreground">Reviews</h3>
//                   <div className="flex items-center gap-1 text-yellow-500 text-sm font-bold">
//                     <Star className="w-3.5 h-3.5 fill-current" />
//                     {snippet.reviews.length > 0 
//                       ? (snippet.reviews.reduce((acc, r) => acc + r.rating, 0) / snippet.reviews.length).toFixed(1) 
//                       : '0.0'}
//                   </div>
//                 </div>

//                 {/* Submit Review */}
//                 <div className="mb-4 pb-4 border-b border-border">
//                    <p className="text-xs text-muted-foreground mb-2">Your Rating</p>
//                    <div className="flex gap-1 mb-3">
//                       {[1, 2, 3, 4, 5].map((star) => (
//                         <button 
//                           key={star}
//                           onClick={() => setRating(star)}
//                           className={`transition-colors ${star <= rating ? 'text-yellow-500' : 'text-muted-foreground/20'}`}
//                         >
//                           <Star className={`w-5 h-5 ${star <= rating ? 'fill-current' : ''}`} />
//                         </button>
//                       ))}
//                    </div>
//                    <Textarea 
//                       placeholder="Share your thoughts..." 
//                       value={newComment}
//                       onChange={(e) => setNewComment(e.target.value)}
//                       className="min-h-[60px] text-xs resize-none mb-2"
//                    />
//                    <Button size="sm" onClick={handleReviewSubmit} className="w-full">
//                       Submit Review
//                    </Button>
//                 </div>

//                 {/* Scrollable Reviews List */}
//                 <div className="overflow-y-auto pr-1 flex-1 scrollbar-thin">
//                   {snippet.reviews.length === 0 ? (
//                     <p className="text-center text-muted-foreground text-xs py-4">No reviews yet.</p>
//                   ) : (
//                     <div className="space-y-4">
//                       {snippet.reviews.slice().reverse().map((review) => (
//                         <div key={review.id} className="border-b border-border last:border-0 pb-3 last:pb-0">
//                           <div className="flex justify-between items-start mb-1">
//                              <div className="flex items-center gap-2">
//                                 <Avatar className="w-5 h-5">
//                                   <AvatarImage src={review.userAvatar} />
//                                   <AvatarFallback className="text-[9px]">{review.userName[0]}</AvatarFallback>
//                                 </Avatar>
//                                 <span className="text-xs font-medium truncate w-20">{review.userName}</span>
//                              </div>
//                              <div className="flex text-yellow-500">
//                                 {[...Array(5)].map((_, i) => (
//                                   <Star key={i} className={`w-2.5 h-2.5 ${i < review.rating ? 'fill-current' : 'text-muted-foreground/20'}`} />
//                                 ))}
//                              </div>
//                           </div>
//                           <p className="text-xs text-muted-foreground leading-relaxed">{review.comment}</p>
//                         </div>
//                       ))}
//                     </div>
//                   )}
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
import { ArrowLeft, Star, Share2, Calendar, User } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { SubtleBackground } from '@/components/SubtleBackground';
import { CodeEditor } from '@/components/CodeEditor';
import { CSVTableViewer } from '@/components/CSVTableViewer'; // Importing your existing component
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useSnippets, currentUser } from '@/context/SnippetContext';
import { formatDistanceToNow } from 'date-fns';
import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const SnippetDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { snippets, addReview } = useSnippets();
  const { toast } = useToast();
  
  const snippet = snippets.find(s => s.id === id);

  const [newComment, setNewComment] = useState('');
  const [rating, setRating] = useState(0);

  if (!snippet) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">Snippet Not Found</h1>
        <Button onClick={() => navigate('/')}>Go Home</Button>
      </div>
    );
  }

  const handleReviewSubmit = () => {
    if (!newComment.trim() || rating === 0) {
      toast({
        title: "Error",
        description: "Please provide a rating and a comment.",
        variant: "destructive"
      });
      return;
    }
    
    addReview(snippet.id, {
      userId: currentUser.id,
      userName: currentUser.name,
      userAvatar: currentUser.avatar,
      rating,
      comment: newComment,
    });
    
    setNewComment('');
    setRating(0); 
    
    toast({
      title: "Review Added",
      description: "Thank you for your feedback!",
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

              {/* Share Button */}
              <Button variant="outline" size="sm" className="gap-2" onClick={handleShare}>
                <Share2 className="w-4 h-4" />
                Share
              </Button>
            </div>
          </div>

          {/* 3-Column Grid Layout */}
          <div className="grid lg:grid-cols-12 gap-6 h-full items-start">
            
            {/* COLUMN 1: Input / Output Tables (Left - 3 Cols) */}
            {/* Added h-[600px] to match code editor height, and flex-col to stack them evenly */}
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

            {/* COLUMN 2: Code Editor (Middle - 6 Cols) */}
            <div className="lg:col-span-6 h-[600px] border border-border rounded-xl overflow-hidden shadow-sm bg-[#282c34]">
               <CodeEditor 
                  code={snippet.code} 
                  language={snippet.language} 
                  isAuthor={snippet.authorId === currentUser.id} 
                />
            </div>

            {/* COLUMN 3: Author & Reviews (Right - 3 Cols) */}
            <div className="lg:col-span-3 flex flex-col gap-6">
              
              {/* Author Card */}
              <div className="bg-card border border-border rounded-xl p-4 shadow-sm">
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
              <div className="bg-card border border-border rounded-xl p-4 flex flex-col flex-1 shadow-sm h-[440px]">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-foreground">Reviews</h3>
                  <div className="flex items-center gap-1 text-yellow-500 text-sm font-bold">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    {snippet.reviews.length > 0 
                      ? (snippet.reviews.reduce((acc, r) => acc + r.rating, 0) / snippet.reviews.length).toFixed(1) 
                      : '0.0'}
                  </div>
                </div>

                {/* Submit Review */}
                <div className="mb-4 pb-4 border-b border-border">
                   <p className="text-xs text-muted-foreground mb-2">Your Rating</p>
                   <div className="flex gap-1 mb-3">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button 
                          key={star}
                          onClick={() => setRating(star)}
                          className={`transition-colors ${star <= rating ? 'text-yellow-500' : 'text-muted-foreground/20'}`}
                        >
                          <Star className={`w-5 h-5 ${star <= rating ? 'fill-current' : ''}`} />
                        </button>
                      ))}
                   </div>
                   <Textarea 
                      placeholder="Share your thoughts..." 
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="min-h-[60px] text-xs resize-none mb-2"
                   />
                   <Button size="sm" onClick={handleReviewSubmit} className="w-full">
                      Submit Review
                   </Button>
                </div>

                {/* Scrollable Reviews List */}
                <div className="overflow-y-auto pr-1 flex-1 scrollbar-thin">
                  {snippet.reviews.length === 0 ? (
                    <p className="text-center text-muted-foreground text-xs py-4">No reviews yet.</p>
                  ) : (
                    <div className="space-y-4">
                      {snippet.reviews.slice().reverse().map((review) => (
                        <div key={review.id} className="border-b border-border last:border-0 pb-3 last:pb-0">
                          <div className="flex justify-between items-start mb-1">
                             <div className="flex items-center gap-2">
                                <Avatar className="w-5 h-5">
                                  <AvatarImage src={review.userAvatar} />
                                  <AvatarFallback className="text-[9px]">{review.userName[0]}</AvatarFallback>
                                </Avatar>
                                <span className="text-xs font-medium truncate w-20">{review.userName}</span>
                             </div>
                             <div className="flex text-yellow-500">
                                {[...Array(5)].map((_, i) => (
                                  <Star key={i} className={`w-2.5 h-2.5 ${i < review.rating ? 'fill-current' : 'text-muted-foreground/20'}`} />
                                ))}
                             </div>
                          </div>
                          <p className="text-xs text-muted-foreground leading-relaxed">{review.comment}</p>
                        </div>
                      ))}
                    </div>
                  )}
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