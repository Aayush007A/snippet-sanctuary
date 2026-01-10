// import { useState, useMemo } from 'react'; // Added useMemo for performance
// import { useSearchParams } from 'react-router-dom'; // Added for reading search query
// import { motion } from 'framer-motion';
// import { Code2, Sparkles } from 'lucide-react';
// import { Navbar } from '@/components/Navbar';
// import { HomeCards } from '@/components/HomeCards';
// import { TagFilter } from '@/components/TagFilter';
// import { SnippetCard } from '@/components/SnippetCard';
// import { SubtleBackground } from '@/components/SubtleBackground';
// import { useSnippets } from '@/context/SnippetContext'; // Use Context instead of mockData directly

// const Index = () => {
//   const { snippets, categories } = useSnippets(); // Get real data from context
//   const [selectedTags, setSelectedTags] = useState<string[]>([]);
//   const [searchParams] = useSearchParams();
  
//   // Get search query from URL
//   const searchQuery = searchParams.get('search')?.toLowerCase() || '';

//   // Get all unique tags from snippets
//   const allTags = useMemo(() => {
//     return [...new Set(snippets.flatMap(s => s.tags))];
//   }, [snippets]);

//   // Combined Filtering Logic
//   const filteredSnippets = useMemo(() => {
//     return snippets.filter(snippet => {
//       // 1. Tag Filter
//       const matchesTags = selectedTags.length === 0 || 
//         selectedTags.some(tag => snippet.tags.includes(tag));

//       if (!matchesTags) return false;

//       // 2. Text Search (if query exists)
//       if (!searchQuery) return true;

//       const category = categories.find(c => c.id === snippet.categoryId);
//       const categoryName = category ? category.name.toLowerCase() : '';

//       return (
//         snippet.title.toLowerCase().includes(searchQuery) ||
//         snippet.description.toLowerCase().includes(searchQuery) ||
//         snippet.language.toLowerCase().includes(searchQuery) ||
//         snippet.tags.some(tag => tag.toLowerCase().includes(searchQuery)) ||
//         categoryName.includes(searchQuery)
//       );
//     });
//   }, [snippets, categories, selectedTags, searchQuery]);

//   return (
//     <div className="min-h-screen bg-background relative">
//       <SubtleBackground />
//       <Navbar />
      
//       {/* Hero Section */}
//       <section className="pt-24 pb-16 px-4">
//         <div className="container mx-auto text-center">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="mb-6"
//           >
//             <motion.div 
//               className="inline-flex items-center gap-2 px-4 py-2 bg-primary/5 rounded-full border border-primary/10 mb-6"
//               initial={{ scale: 0.9, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               transition={{ delay: 0.2 }}
//             >
//               <Sparkles className="w-4 h-4 text-primary" />
//               <span className="text-sm font-medium text-primary">Your Team's Code Repository</span>
//             </motion.div>
            
//             <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
//               Find, Test & Share
//               <br />
//               <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
//                 Code Snippets
//               </span>
//             </h1>
            
//             <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
//               A centralized repository for JET and Omnia code snippets. 
//               Discover tested solutions, review code quality, and share your expertise.
//             </p>
//           </motion.div>
//         </div>
//       </section>

//       {/* Main Cards Section */}
//       <section className="py-8 px-4">
//         <div className="container mx-auto">
//           <HomeCards />
//         </div>
//       </section>

//       {/* Featured/Search Results Section */}
//       <section className={`px-4 ${searchQuery ? 'pt-24 pb-16' : 'py-16'}`}>
//         <div className="container mx-auto">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.5 }}
//             className="flex items-center justify-between mb-8"
//           >
//             <div>
//               <h2 className="font-heading text-2xl font-bold text-foreground mb-1">
//                 {searchQuery ? `Search Results for "${searchQuery}"` : 'Featured Snippets'}
//               </h2>
//               <p className="text-muted-foreground">
//                 {searchQuery 
//                   ? `Found ${filteredSnippets.length} matches` 
//                   : 'Browse recent and popular code solutions'}
//               </p>
//             </div>
//             <div className="hidden md:flex items-center gap-2 text-muted-foreground">
//               <Code2 className="w-5 h-5" />
//               <span className="text-sm">{filteredSnippets.length} snippets</span>
//             </div>
//           </motion.div>

//           <div className="grid lg:grid-cols-4 gap-6">
//             {/* Filter Sidebar */}
//             <motion.div
//               initial={{ opacity: 0, x: -20 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.4 }}
//               className="lg:col-span-1"
//             >
//               <div className="sticky top-24">
//                 <TagFilter
//                   allTags={allTags}
//                   selectedTags={selectedTags}
//                   onTagsChange={setSelectedTags}
//                 />
//               </div>
//             </motion.div>

//             {/* Snippets Grid */}
//             <div className="lg:col-span-3">
//               <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
//                 {filteredSnippets.map((snippet, index) => (
//                   <SnippetCard 
//                     key={snippet.id} 
//                     snippet={snippet} 
//                     index={index}
//                   />
//                 ))}
//               </div>

//               {filteredSnippets.length === 0 && (
//                 <motion.div
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   className="text-center py-16 bg-card border border-border rounded-xl border-dashed"
//                 >
//                   <Code2 className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
//                   <p className="text-muted-foreground mb-2">
//                     No snippets found matching "{searchQuery}"
//                   </p>
//                   <button 
//                     onClick={() => {
//                         window.history.pushState({}, '', '/');
//                         // Force a re-render or use navigation
//                         window.location.reload(); 
//                     }}
//                     className="text-primary hover:underline text-sm"
//                   >
//                     Clear search
//                   </button>
//                 </motion.div>
//               )}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="py-8 border-t border-border">
//         <div className="container mx-auto px-4 text-center">
//           <p className="text-sm text-muted-foreground">
//             © 2026 Snippet Finder. Built for developers, by developers.
//           </p>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default Index;

import { useState, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Code2, Sparkles, ArrowRight } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { HomeCards } from '@/components/HomeCards';
import { TagFilter } from '@/components/TagFilter';
import { SnippetCard } from '@/components/SnippetCard';
import { SubtleBackground } from '@/components/SubtleBackground';
import { useSnippets } from '@/context/SnippetContext';
import { Button } from '@/components/ui/button';

const Index = () => {
  const { snippets, categories } = useSnippets(); // Get real data from context
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchParams] = useSearchParams();
  
  // Get search query from URL
  const searchQuery = searchParams.get('search')?.toLowerCase() || '';

  const allTags = useMemo(() => [...new Set(snippets.flatMap(s => s.tags))], [snippets]);

  const filteredSnippets = useMemo(() => {
    return snippets.filter(snippet => {
      // 1. Tag Filter
      const matchesTags = selectedTags.length === 0 || 
        selectedTags.some(tag => snippet.tags.includes(tag));

      if (!matchesTags) return false;
      if (!searchQuery) return true;
      const category = categories.find(c => c.id === snippet.categoryId);
      const categoryName = category ? category.name.toLowerCase() : '';
      return snippet.title.toLowerCase().includes(searchQuery) || snippet.description.toLowerCase().includes(searchQuery) || snippet.language.toLowerCase().includes(searchQuery) || snippet.tags.some(tag => tag.toLowerCase().includes(searchQuery)) || categoryName.includes(searchQuery);
    });
  }, [snippets, categories, selectedTags, searchQuery]);

  return (
    <div className="min-h-screen bg-background relative">
      <SubtleBackground />
      <Navbar />
      
      {/* Hero Section - Hide if searching to focus on results */}
      {!searchQuery && (
        <section className="pt-24 pb-16 px-4">
          <div className="container mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6"
            >
              <motion.div 
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary/5 rounded-full border border-primary/10 mb-6"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">Your Team's Code Repository</span>
              </motion.div>
              
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
                Find, Test & Share
                <br />
                <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  Code Snippets
                </span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Discover tested solutions, review code quality, and share your expertise.</p>
            </motion.div>
          </div>
        </section>}

      {/* Main Cards Section - Hide if searching */}
      {!searchQuery && (
        <section className="py-8 px-4">
          <div className="container mx-auto">
            <HomeCards showAll={false} />
            
            {/* Explore More Button */}
            <div className="text-center mt-8">
              <Button variant="outline" className="gap-2" onClick={() => navigate('/categories')}>
                Explore all categories <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </section>}

      {/* Snippets Section */}
      <section className={`px-4 ${searchQuery ? 'pt-24 pb-16' : 'py-16'}`}>
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-between mb-8"
          >
            <div>
              <h2 className="font-heading text-2xl font-bold text-foreground mb-1">
                {searchQuery ? `Search Results` : 'Featured Snippets'}
              </h2>
              <p className="text-muted-foreground">
                {searchQuery 
                  ? `Found ${filteredSnippets.length} matches` 
                  : 'Browse recent and popular code solutions'}
              </p>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-4 gap-6">
            {/* Filter Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="lg:col-span-1"
            >
              <div className="sticky top-24">
                <TagFilter
                  allTags={allTags}
                  selectedTags={selectedTags}
                  onTagsChange={setSelectedTags}
                />
              </div>
            </motion.div>

            {/* Snippets Grid */}
            <div className="lg:col-span-3">
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {filteredSnippets.map((snippet, index) => (
                  <SnippetCard 
                    key={snippet.id} 
                    snippet={snippet} 
                    index={index}
                  />
                ))}
              </div>
              
              {filteredSnippets.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-16 bg-card border border-border rounded-xl border-dashed"
                >
                  <Code2 className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
                  <p className="text-muted-foreground mb-2">
                    No snippets found matching "{searchQuery}"
                  </p>
                  <button 
                    onClick={() => {
                        window.history.pushState({}, '', '/');
                        // Force a re-render or use navigation
                        window.location.reload(); 
                    }}
                    className="text-primary hover:underline text-sm"
                  >
                    Clear search
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            © 2024 Snippet Finder. Built for developers, by developers.
          </p>
        </div>
      </footer>
    </div>
  );
};
export default Index;