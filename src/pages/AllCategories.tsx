import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { HomeCards } from '@/components/HomeCards';
import { SubtleBackground } from '@/components/SubtleBackground';
import { Button } from '@/components/ui/button';

const AllCategories = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background relative">
      <SubtleBackground />
      <Navbar />

      <main className="container mx-auto px-4 pt-24 pb-16">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <Button 
            variant="ghost" 
            className="pl-0 hover:pl-2 gap-2 text-muted-foreground mb-8"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>

          <h1 className="text-3xl font-heading font-bold text-foreground mb-2">All Categories</h1>
          <p className="text-muted-foreground mb-12">Browse all available code categories</p>

          <HomeCards showAll={true} />
        </motion.div>
      </main>
    </div>
  );
};

export default AllCategories;