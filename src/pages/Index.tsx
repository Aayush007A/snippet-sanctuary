import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { SubtleBackground } from '@/components/SubtleBackground';
import { CategoryGrid } from '@/components/CategoryGrid';
import { useSnippets } from '@/context/SnippetContext';
import { Button } from '@/components/ui/button';

const Index = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  const { categories, snippets } = useSnippets();

  // Filter snippets based on search
  const filteredSnippets = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();
    return snippets.filter(s =>
      s.title.toLowerCase().includes(query) ||
      s.description.toLowerCase().includes(query) ||
      s.tags.some(t => t.toLowerCase().includes(query)) ||
      s.language.toLowerCase().includes(query)
    );
  }, [searchQuery, snippets]);

  const showSearchResults = searchQuery.trim().length > 0;
  const showExploreAll = categories.length > 3;

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <SubtleBackground />
      <Navbar />
      
      <main className="relative z-10 pt-24 pb-16 px-4 md:px-8">
        {/* Hero Section */}
        <motion.div
          className="text-center max-w-4xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
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
          
          <motion.h1
            className="text-4xl md:text-6xl font-heading font-bold text-foreground mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            Code Snippet
            <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent"> Repository</span>
          </motion.h1>
          
          <motion.p
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Browse, create, and share code snippets across categories. 
            Collaborate with your team on reusable solutions.
          </motion.p>
        </motion.div>

        {/* Search Results or Category Grid */}
        {showSearchResults ? (
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <h2 className="text-2xl font-heading font-bold text-foreground mb-2">
                Search Results for "{searchQuery}"
              </h2>
              <p className="text-muted-foreground">
                Found {filteredSnippets.length} snippet{filteredSnippets.length !== 1 ? 's' : ''}
              </p>
            </motion.div>

            {filteredSnippets.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredSnippets.map((snippet, index) => (
                  <motion.div
                    key={snippet.id}
                    className="relative group cursor-pointer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => navigate(`/snippet/${snippet.id}`)}
                  >
                    <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow">
                      <span className="inline-block px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded mb-3">
                        {snippet.language}
                      </span>
                      <h3 className="font-heading font-bold text-foreground mb-2">{snippet.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">{snippet.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-muted-foreground">No snippets found matching your search.</p>
              </div>
            )}
          </div>
        ) : (
          <>
            <CategoryGrid maxVisible={3} />
            
            {/* Explore All Categories Button */}
            {showExploreAll && (
              <motion.div 
                className="text-center mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => navigate('/categories')}
                  className="gap-2"
                >
                  Explore All Categories
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </motion.div>
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-8 text-center text-muted-foreground text-sm border-t border-border">
        <p>&copy; {new Date().getFullYear()} Snippet Repository. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Index;
