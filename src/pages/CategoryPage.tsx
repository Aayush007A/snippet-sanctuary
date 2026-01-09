import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Zap, Globe, FolderCode } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { SubtleBackground } from '@/components/SubtleBackground';
import { SnippetGrid } from '@/components/SnippetGrid';
import { useSnippets } from '@/context/SnippetContext';
import { useState } from 'react';
import { CreateSnippetModal } from '@/components/CreateSnippetModal';

const iconMap: Record<string, React.ReactNode> = {
  Zap: <Zap className="w-8 h-8 text-primary-foreground" />,
  Globe: <Globe className="w-8 h-8 text-primary-foreground" />,
  FolderCode: <FolderCode className="w-8 h-8 text-primary-foreground" />,
};

const CategoryPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const { getCategoryById, getSnippetsByCategory } = useSnippets();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const category = getCategoryById(categoryId || '');
  const snippets = getSnippetsByCategory(categoryId || '');

  if (!category) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-heading font-bold text-foreground mb-4">Category Not Found</h1>
          <button
            onClick={() => navigate('/')}
            className="text-primary hover:underline"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <SubtleBackground />
      <Navbar />
      
      <main className="relative z-10 pt-24 pb-16 px-4 md:px-8">
        {/* Back Button */}
        <motion.button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 max-w-6xl mx-auto"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Categories</span>
        </motion.button>

        {/* Category Header */}
        <motion.div
          className="max-w-6xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-4 mb-4">
            <div className={`w-16 h-16 rounded-xl ${category.gradient} flex items-center justify-center`}>
              {iconMap[category.icon] || <FolderCode className="w-8 h-8 text-primary-foreground" />}
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
                {category.name} Snippets
              </h1>
              <p className="text-muted-foreground">{category.description}</p>
            </div>
          </div>
          
          <div className="text-sm text-muted-foreground">
            {snippets.length} snippet{snippets.length !== 1 ? 's' : ''} in this category
          </div>
        </motion.div>

        {/* Snippet Grid */}
        <div className="max-w-6xl mx-auto">
          <SnippetGrid 
            snippets={snippets} 
            onCreateClick={() => setIsCreateModalOpen(true)}
          />
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
