import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { SubtleBackground } from '@/components/SubtleBackground';
import { CategoryGrid } from '@/components/CategoryGrid';

const AllCategories = () => {
  const navigate = useNavigate();

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
          <span>Back to Home</span>
        </motion.button>

        {/* Header */}
        <motion.div
          className="max-w-6xl mx-auto mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
            All Categories
          </h1>
          <p className="text-muted-foreground">
            Browse all available snippet categories
          </p>
        </motion.div>

        {/* All Categories Grid */}
        <CategoryGrid showAll />
      </main>
    </div>
  );
};

export default AllCategories;
