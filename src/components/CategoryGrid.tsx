import { motion } from 'framer-motion';
import { Zap, Globe, Plus, ArrowRight, FolderCode, Database, Server, Code2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSnippets, Category } from '@/context/SnippetContext';
import { useState } from 'react';
import { CreateCategoryModal } from './CreateCategoryModal';

const iconMap: Record<string, React.ReactNode> = {
  Zap: <Zap className="w-8 h-8 text-primary-foreground" />,
  Globe: <Globe className="w-8 h-8 text-primary-foreground" />,
  FolderCode: <FolderCode className="w-8 h-8 text-primary-foreground" />,
  Database: <Database className="w-8 h-8 text-primary-foreground" />,
  Server: <Server className="w-8 h-8 text-primary-foreground" />,
  Code2: <Code2 className="w-8 h-8 text-primary-foreground" />,
};

interface CategoryCardProps {
  category: Category;
  index: number;
  snippetCount: number;
}

const CategoryCard = ({ category, index, snippetCount }: CategoryCardProps) => {
  const navigate = useNavigate();

  return (
    <motion.div
      className="relative group cursor-pointer"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      onClick={() => navigate(`/category/${category.id}`)}
    >
      <motion.div
        className="relative overflow-hidden rounded-2xl bg-card border border-border p-8 h-full card-spotlight"
        whileHover={{ 
          scale: 1.02,
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)'
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Gradient Background on hover */}
        <motion.div
          className={`absolute inset-0 ${category.gradient} opacity-0`}
          whileHover={{ opacity: 0.08 }}
          transition={{ duration: 0.3 }}
        />

        {/* Icon */}
        <motion.div
          className={`w-16 h-16 rounded-xl ${category.gradient} flex items-center justify-center mb-6 relative`}
          whileHover={{ scale: 1.1, y: -5 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          {iconMap[category.icon] || <FolderCode className="w-8 h-8 text-primary-foreground" />}
        </motion.div>

        {/* Content */}
        <h3 className="font-heading text-2xl font-bold text-foreground mb-2">
          {category.name}
        </h3>
        <p className="text-muted-foreground leading-relaxed mb-4 line-clamp-2">
          {category.description}
        </p>
        
        {/* Snippet count */}
        <p className="text-sm text-muted-foreground mb-4">
          {snippetCount} snippet{snippetCount !== 1 ? 's' : ''}
        </p>

        {/* CTA */}
        <motion.div 
          className="flex items-center gap-2 text-primary font-medium"
          whileHover={{ x: 5 }}
        >
          <span>Explore</span>
          <ArrowRight className="w-4 h-4" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const CreateCategoryCard = ({ index, onClick }: { index: number; onClick: () => void }) => {
  return (
    <motion.div
      className="relative group cursor-pointer pulse-animation rounded-2xl"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      onClick={onClick}
    >
      <motion.div
        className="relative overflow-hidden rounded-2xl bg-card border border-border border-dashed p-8 h-full flex flex-col items-center justify-center text-center min-h-[280px]"
        whileHover={{ 
          scale: 1.02,
          borderStyle: 'solid',
          boxShadow: '0 25px 50px -12px rgba(249, 115, 22, 0.15)'
        }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="w-16 h-16 rounded-xl gradient-create flex items-center justify-center mb-6"
          whileHover={{ scale: 1.1, rotate: 90 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <Plus className="w-8 h-8 text-primary-foreground" />
        </motion.div>

        <h3 className="font-heading text-2xl font-bold text-foreground mb-2">
          Create Category
        </h3>
        <p className="text-muted-foreground leading-relaxed">
          Add a new category to organize your snippets
        </p>
      </motion.div>
    </motion.div>
  );
};

interface CategoryGridProps {
  maxVisible?: number;
  showAll?: boolean;
}

export const CategoryGrid = ({ maxVisible = 3, showAll = false }: CategoryGridProps) => {
  const { categories, snippets } = useSnippets();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const getSnippetCount = (categoryId: string) => {
    return snippets.filter(s => s.categoryId === categoryId).length;
  };

  // Show all categories or limit to maxVisible (not counting the create card)
  const visibleCategories = showAll ? categories : categories.slice(0, maxVisible);

  return (
    <>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {visibleCategories.map((category, index) => (
          <CategoryCard
            key={category.id}
            category={category}
            index={index}
            snippetCount={getSnippetCount(category.id)}
          />
        ))}
        <CreateCategoryCard 
          index={visibleCategories.length} 
          onClick={() => setIsCreateModalOpen(true)}
        />
      </div>

      <CreateCategoryModal 
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </>
  );
};
