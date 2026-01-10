// import { useParams, useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { 
//   ArrowLeft, Zap, Globe, FolderCode, Database, Server, Code2,
//   Terminal, Cloud, Cpu, Box, GitBranch, Brain, Layout, Lock, User, Trash2
// } from 'lucide-react';
// import { Navbar } from '@/components/Navbar';
// import { SubtleBackground } from '@/components/SubtleBackground';
// import { SnippetCard } from '@/components/SnippetCard';
// import { useSnippets, currentUser } from '@/context/SnippetContext';
// import { useState } from 'react';
// import { CreateSnippetModal } from '@/components/CreateSnippetModal';
// import { Button } from '@/components/ui/button';
// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
// import { useToast } from '@/hooks/use-toast';
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

// const iconMap: Record<string, React.ReactNode> = {
//   Zap: <Zap className="w-8 h-8 text-white" />,
//   Globe: <Globe className="w-8 h-8 text-white" />,
//   FolderCode: <FolderCode className="w-8 h-8 text-white" />,
//   Database: <Database className="w-8 h-8 text-white" />,
//   Server: <Server className="w-8 h-8 text-white" />,
//   Code2: <Code2 className="w-8 h-8 text-white" />,
//   Terminal: <Terminal className="w-8 h-8 text-white" />,
//   Cloud: <Cloud className="w-8 h-8 text-white" />,
//   Cpu: <Cpu className="w-8 h-8 text-white" />,
//   Box: <Box className="w-8 h-8 text-white" />,
//   GitBranch: <GitBranch className="w-8 h-8 text-white" />,
//   Brain: <Brain className="w-8 h-8 text-white" />,
//   Layout: <Layout className="w-8 h-8 text-white" />,
//   Lock: <Lock className="w-8 h-8 text-white" />,
// };

// const CategoryPage = () => {
//   const { categoryId } = useParams<{ categoryId: string }>();
//   const navigate = useNavigate();
//   const { getCategoryById, getSnippetsByCategory, deleteCategory } = useSnippets();
//   const { toast } = useToast();
//   const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

//   const category = getCategoryById(categoryId || '');
//   const snippets = getSnippetsByCategory(categoryId || '');

//   if (!category) {
//     return (
//       <div className="min-h-screen bg-background flex items-center justify-center">
//         <div className="text-center">
//           <h1 className="text-2xl font-heading font-bold text-foreground mb-4">Category Not Found</h1>
//           <Button onClick={() => navigate('/')}>Back to Home</Button>
//         </div>
//       </div>
//     );
//   }

//   // --- DELETE LOGIC ---
//   const isAuthor = category.authorId === currentUser.id;
//   const canDelete = !category.isDefault && isAuthor;

//   const handleDeleteCategory = () => {
//     deleteCategory(category.id);
//     toast({
//       title: "Category Deleted",
//       description: `"${category.name}" and all its snippets have been removed.`,
//       variant: "destructive"
//     });
//     navigate('/');
//   };
//   // --------------------

//   const isCustomGradient = category.gradient.includes('linear-gradient') || category.gradient.startsWith('#');
//   const gradientStyle = isCustomGradient ? { background: category.gradient } : {};
//   const gradientClass = isCustomGradient ? '' : category.gradient;

//   return (
//     <div className="min-h-screen bg-background relative overflow-hidden">
//       <SubtleBackground />
//       <Navbar />
      
//       <main className="relative z-10 pt-24 pb-16 px-4 md:px-8">
//         <motion.button
//           onClick={() => navigate('/')}
//           className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 max-w-6xl mx-auto"
//           initial={{ opacity: 0, x: -20 }}
//           animate={{ opacity: 1, x: 0 }}
//         >
//           <ArrowLeft className="w-4 h-4" />
//           <span>Back to Categories</span>
//         </motion.button>

//         <motion.div className="max-w-6xl mx-auto mb-12" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
//           <div className="flex items-start justify-between">
//             <div className="flex items-center gap-4 mb-4">
//               <div 
//                 className={`w-16 h-16 rounded-xl flex items-center justify-center shadow-lg ${gradientClass}`} 
//                 style={gradientStyle}
//               >
//                 {iconMap[category.icon] || <FolderCode className="w-8 h-8 text-white" />}
//               </div>
              
//               <div>
//                 <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground">{category.name} Snippets</h1>
//                 <p className="text-muted-foreground">{category.description}</p>
                
//                 <div className="flex items-center gap-2 mt-2 bg-secondary/50 w-fit px-2 py-1 rounded-full border border-border/50">
//                   <Avatar className="w-4 h-4">
//                     <AvatarImage src={currentUser.avatar} />
//                     <AvatarFallback><User className="w-3 h-3" /></AvatarFallback>
//                   </Avatar>
//                   <span className="text-xs text-muted-foreground">Created by <span className="font-medium text-foreground">{category.authorId === currentUser.id ? 'You' : (category.authorId === 'system' ? 'System' : 'Unknown')}</span></span>
//                 </div>
//               </div>
//             </div>

//             <div className="flex items-center gap-2">
//               {/* DELETE BUTTON (Conditional) */}
//               {canDelete && (
//                 <AlertDialog>
//                   <AlertDialogTrigger asChild>
//                     <Button variant="destructive" size="icon" title="Delete Category">
//                       <Trash2 className="w-4 h-4" />
//                     </Button>
//                   </AlertDialogTrigger>
//                   <AlertDialogContent>
//                     <AlertDialogHeader>
//                       <AlertDialogTitle>Delete Category?</AlertDialogTitle>
//                       <AlertDialogDescription>
//                         This will permanently delete the category <strong>"{category.name}"</strong> and 
//                         <strong> ALL {snippets.length} snippets</strong> inside it. This action cannot be undone.
//                       </AlertDialogDescription>
//                     </AlertDialogHeader>
//                     <AlertDialogFooter>
//                       <AlertDialogCancel>Cancel</AlertDialogCancel>
//                       <AlertDialogAction 
//                         onClick={handleDeleteCategory}
//                         className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
//                       >
//                         Delete Category
//                       </AlertDialogAction>
//                     </AlertDialogFooter>
//                   </AlertDialogContent>
//                 </AlertDialog>
//               )}

//               <Button onClick={() => setIsCreateModalOpen(true)}>Create Snippet</Button>
//             </div>
//           </div>
          
//           <div className="text-sm text-muted-foreground mt-4">
//             {snippets.length} snippet{snippets.length !== 1 ? 's' : ''} in this category
//           </div>
//         </motion.div>

//         <div className="max-w-6xl mx-auto">
//           <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {snippets.map((snippet, index) => (
//               <SnippetCard key={snippet.id} snippet={snippet} index={index} />
//             ))}
//             {snippets.length === 0 && (
//                <div className="col-span-full text-center py-12 border border-dashed border-border rounded-xl">
//                  <p className="text-muted-foreground">No snippets yet in this category.</p>
//                </div>
//             )}
//           </div>
//         </div>
//       </main>

//       <CreateSnippetModal 
//         isOpen={isCreateModalOpen}
//         onClose={() => setIsCreateModalOpen(false)}
//         defaultCategoryId={categoryId}
//       />
//     </div>
//   );
// };

// export default CategoryPage;

// import { useParams, useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { 
//   ArrowLeft, Zap, Globe, FolderCode, Database, Server, Code2,
//   Terminal, Cloud, Cpu, Box, GitBranch, Brain, Layout, Lock, User, Trash2
// } from 'lucide-react';
// import { Navbar } from '@/components/Navbar';
// import { SubtleBackground } from '@/components/SubtleBackground';
// import { SnippetCard } from '@/components/SnippetCard';
// import { useSnippets, currentUser } from '@/context/SnippetContext';
// import { useState } from 'react';
// import { CreateSnippetModal } from '@/components/CreateSnippetModal';
// import { Button } from '@/components/ui/button';
// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
// import { useToast } from '@/hooks/use-toast';
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

// const iconMap: Record<string, React.ReactNode> = {
//   Zap: <Zap className="w-8 h-8 text-white" />,
//   Globe: <Globe className="w-8 h-8 text-white" />,
//   FolderCode: <FolderCode className="w-8 h-8 text-white" />,
//   Database: <Database className="w-8 h-8 text-white" />,
//   Server: <Server className="w-8 h-8 text-white" />,
//   Code2: <Code2 className="w-8 h-8 text-white" />,
//   Terminal: <Terminal className="w-8 h-8 text-white" />,
//   Cloud: <Cloud className="w-8 h-8 text-white" />,
//   Cpu: <Cpu className="w-8 h-8 text-white" />,
//   Box: <Box className="w-8 h-8 text-white" />,
//   GitBranch: <GitBranch className="w-8 h-8 text-white" />,
//   Brain: <Brain className="w-8 h-8 text-white" />,
//   Layout: <Layout className="w-8 h-8 text-white" />,
//   Lock: <Lock className="w-8 h-8 text-white" />,
// };

// const CategoryPage = () => {
//   const { categoryId } = useParams<{ categoryId: string }>();
//   const navigate = useNavigate();
//   const { getCategoryById, getSnippetsByCategory, deleteCategory } = useSnippets();
//   const { toast } = useToast();
//   const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

//   const category = getCategoryById(categoryId || '');
//   const snippets = getSnippetsByCategory(categoryId || '');

//   if (!category) {
//     return (
//       <div className="min-h-screen bg-background flex items-center justify-center">
//         <div className="text-center">
//           <h1 className="text-2xl font-heading font-bold text-foreground mb-4">Category Not Found</h1>
//           <Button onClick={() => navigate('/')}>Back to Home</Button>
//         </div>
//       </div>
//     );
//   }

//   // --- DELETE LOGIC ---
//   const isAuthor = category.authorId === currentUser.id;
//   const canDelete = !category.isDefault && isAuthor;

//   const handleDeleteCategory = () => {
//     deleteCategory(category.id);
//     toast({
//       title: "Category Deleted",
//       description: `"${category.name}" and all its snippets have been removed.`,
//       variant: "destructive"
//     });
//     navigate('/');
//   };

//   // Logic for gradients
//   const isCustomGradient = category.gradient.includes('linear-gradient') || category.gradient.startsWith('#');
//   const gradientStyle = isCustomGradient ? { background: category.gradient } : {};
//   const gradientClass = isCustomGradient ? '' : category.gradient;

//   return (
//     <div className="min-h-screen bg-background relative overflow-hidden">
//       <SubtleBackground />
//       <Navbar />
      
//       <main className="relative z-10 pt-24 pb-16 px-4 md:px-8">
//         <motion.button
//           onClick={() => navigate('/')}
//           className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 max-w-6xl mx-auto"
//           initial={{ opacity: 0, x: -20 }}
//           animate={{ opacity: 1, x: 0 }}
//         >
//           <ArrowLeft className="w-4 h-4" />
//           <span>Back to Categories</span>
//         </motion.button>

//         <motion.div className="max-w-6xl mx-auto mb-12" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
//           <div className="flex items-start justify-between">
//             <div className="flex items-center gap-4 mb-4">
//               <div 
//                 className={`w-16 h-16 rounded-xl flex items-center justify-center shadow-lg ${gradientClass}`} 
//                 style={gradientStyle}
//               >
//                 {iconMap[category.icon] || <FolderCode className="w-8 h-8 text-white" />}
//               </div>
              
//               <div>
//                 <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground">{category.name} Snippets</h1>
//                 <p className="text-muted-foreground">{category.description}</p>
                
//                 {/* Author Badge */}
//                 <div className="flex items-center gap-2 mt-2 bg-secondary/50 w-fit px-2 py-1 rounded-full border border-border/50">
//                   <Avatar className="w-4 h-4">
//                     <AvatarImage src={currentUser.avatar} />
//                     <AvatarFallback><User className="w-3 h-3" /></AvatarFallback>
//                   </Avatar>
//                   <span className="text-xs text-muted-foreground">
//                     Created by <span className="font-medium text-foreground">
//                       {/* Logic: Show 'You' if ID matches, otherwise show stored authorName */}
//                       {category.authorId === currentUser.id ? 'You' : category.authorName}
//                     </span>
//                   </span>
//                 </div>
//               </div>
//             </div>

//             <div className="flex items-center gap-2">
//               {/* DELETE BUTTON - Only shows if allowed */}
//               {canDelete && (
//                 <AlertDialog>
//                   <AlertDialogTrigger asChild>
//                     <Button variant="destructive" size="icon" title="Delete Category">
//                       <Trash2 className="w-4 h-4" />
//                     </Button>
//                   </AlertDialogTrigger>
//                   <AlertDialogContent>
//                     <AlertDialogHeader>
//                       <AlertDialogTitle>Delete Category?</AlertDialogTitle>
//                       <AlertDialogDescription>
//                         This will permanently delete <strong>"{category.name}"</strong> and 
//                         <strong> ALL {snippets.length} snippets</strong> inside it. This action cannot be undone.
//                       </AlertDialogDescription>
//                     </AlertDialogHeader>
//                     <AlertDialogFooter>
//                       <AlertDialogCancel>Cancel</AlertDialogCancel>
//                       <AlertDialogAction 
//                         onClick={handleDeleteCategory}
//                         className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
//                       >
//                         Delete
//                       </AlertDialogAction>
//                     </AlertDialogFooter>
//                   </AlertDialogContent>
//                 </AlertDialog>
//               )}
              
//               <Button onClick={() => setIsCreateModalOpen(true)}>Create Snippet</Button>
//             </div>
//           </div>
          
//           <div className="text-sm text-muted-foreground mt-4">
//             {snippets.length} snippet{snippets.length !== 1 ? 's' : ''} in this category
//           </div>
//         </motion.div>

//         <div className="max-w-6xl mx-auto">
//           <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {snippets.map((snippet, index) => (
//               <SnippetCard key={snippet.id} snippet={snippet} index={index} />
//             ))}
//             {snippets.length === 0 && (
//                <div className="col-span-full text-center py-12 border border-dashed border-border rounded-xl">
//                  <p className="text-muted-foreground">No snippets yet in this category.</p>
//                </div>
//             )}
//           </div>
//         </div>
//       </main>

//       <CreateSnippetModal 
//         isOpen={isCreateModalOpen}
//         onClose={() => setIsCreateModalOpen(false)}
//         defaultCategoryId={categoryId}
//       />
//     </div>
//   );
// };

// export default CategoryPage;

import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, Zap, Globe, FolderCode, Database, Server, Code2,
  Terminal, Cloud, Cpu, Box, GitBranch, Brain, Layout, Lock, User, Trash2, Shield
} from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { SubtleBackground } from '@/components/SubtleBackground';
import { SnippetCard } from '@/components/SnippetCard';
import { useSnippets, currentUser } from '@/context/SnippetContext';
import { useState } from 'react';
import { CreateSnippetModal } from '@/components/CreateSnippetModal';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
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

// Icon mapping (same as before)
const iconMap: Record<string, React.ReactNode> = {
  Zap: <Zap className="w-8 h-8 text-white" />,
  Globe: <Globe className="w-8 h-8 text-white" />,
  FolderCode: <FolderCode className="w-8 h-8 text-white" />,
  Database: <Database className="w-8 h-8 text-white" />,
  Server: <Server className="w-8 h-8 text-white" />,
  Code2: <Code2 className="w-8 h-8 text-white" />,
  Terminal: <Terminal className="w-8 h-8 text-white" />,
  Cloud: <Cloud className="w-8 h-8 text-white" />,
  Cpu: <Cpu className="w-8 h-8 text-white" />,
  Box: <Box className="w-8 h-8 text-white" />,
  GitBranch: <GitBranch className="w-8 h-8 text-white" />,
  Brain: <Brain className="w-8 h-8 text-white" />,
  Layout: <Layout className="w-8 h-8 text-white" />,
  Lock: <Lock className="w-8 h-8 text-white" />,
};

const CategoryPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const { getCategoryById, getSnippetsByCategory, deleteCategory } = useSnippets();
  const { toast } = useToast();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const category = getCategoryById(categoryId || '');
  const snippets = getSnippetsByCategory(categoryId || '');

  if (!category) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-heading font-bold text-foreground mb-4">Category Not Found</h1>
          <Button onClick={() => navigate('/')}>Back to Home</Button>
        </div>
      </div>
    );
  }

  // Delete Logic
  const isAuthor = category.authorId === currentUser.id;
  const canDelete = !category.isDefault && isAuthor;

  const handleDeleteCategory = () => {
    deleteCategory(category.id);
    toast({
      title: "Category Deleted",
      description: `"${category.name}" and all its snippets have been removed.`,
      variant: "destructive"
    });
    navigate('/');
  };

  const isCustomGradient = category.gradient.includes('linear-gradient') || category.gradient.startsWith('#');
  const gradientStyle = isCustomGradient ? { background: category.gradient } : {};
  const gradientClass = isCustomGradient ? '' : category.gradient;

  // Determine Display Name and Avatar
  const displayName = category.authorId === currentUser.id ? 'You' : (category.authorName || 'System');
  const isSystem = category.authorId === 'system';

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <SubtleBackground />
      <Navbar />
      
      <main className="relative z-10 pt-24 pb-16 px-4 md:px-8">
        <motion.button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 max-w-6xl mx-auto"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Categories</span>
        </motion.button>

        <motion.div className="max-w-6xl mx-auto mb-12" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4 mb-4">
              <div 
                className={`w-16 h-16 rounded-xl flex items-center justify-center shadow-lg ${gradientClass}`} 
                style={gradientStyle}
              >
                {iconMap[category.icon] || <FolderCode className="w-8 h-8 text-white" />}
              </div>
              
              <div>
                <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground">{category.name} Snippets</h1>
                <p className="text-muted-foreground">{category.description}</p>
                
                <div className="flex items-center gap-2 mt-2 bg-secondary/50 w-fit px-2 py-1 rounded-full border border-border/50">
                  <Avatar className="w-4 h-4">
                    {/* Use category avatar, or fallback if system */}
                    <AvatarImage src={category.authorAvatar} />
                    <AvatarFallback>
                      {isSystem ? <Shield className="w-3 h-3" /> : <User className="w-3 h-3" />}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-xs text-muted-foreground">
                    Created by <span className="font-medium text-foreground">{displayName}</span>
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* DELETE BUTTON */}
              {canDelete && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="icon" title="Delete Category">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Category?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will permanently delete <strong>"{category.name}"</strong> and 
                        <strong> ALL {snippets.length} snippets</strong> inside it. This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction 
                        onClick={handleDeleteCategory}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
              
              <Button onClick={() => setIsCreateModalOpen(true)}>Create Snippet</Button>
            </div>
          </div>
          
          <div className="text-sm text-muted-foreground mt-4">
            {snippets.length} snippet{snippets.length !== 1 ? 's' : ''} in this category
          </div>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {snippets.map((snippet, index) => (
              <SnippetCard key={snippet.id} snippet={snippet} index={index} />
            ))}
            {snippets.length === 0 && (
               <div className="col-span-full text-center py-12 border border-dashed border-border rounded-xl">
                 <p className="text-muted-foreground">No snippets yet in this category.</p>
               </div>
            )}
          </div>
        </div>
      </main>

      <CreateSnippetModal 
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        defaultCategoryId={categoryId}
      />
    </div>
  );
};

export default CategoryPage;