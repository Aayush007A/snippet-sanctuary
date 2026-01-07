import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Zap, Globe } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { SnippetCard } from '@/components/SnippetCard';
import { Button } from '@/components/ui/button';
import { mockSnippets } from '@/data/mockData';

const SnippetList = () => {
  const { type } = useParams<{ type: string }>();
  const navigate = useNavigate();

  const snippets = useMemo(() => {
    const snippetType = type?.toUpperCase() === 'JET' ? 'JET' : 'Omnia';
    return mockSnippets.filter(s => s.type === snippetType);
  }, [type]);

  const isJet = type?.toLowerCase() === 'jet';

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 pt-24 pb-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="mb-6 gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Button>

          <div className="flex items-center gap-4">
            <motion.div
              className={`w-14 h-14 rounded-xl ${isJet ? 'gradient-jet' : 'gradient-omnia'} flex items-center justify-center`}
              whileHover={{ scale: 1.05 }}
            >
              {isJet ? (
                <Zap className="w-7 h-7 text-primary-foreground" />
              ) : (
                <Globe className="w-7 h-7 text-primary-foreground" />
              )}
            </motion.div>
            <div>
              <h1 className="font-heading text-3xl font-bold text-foreground">
                {isJet ? 'JET' : 'Omnia'} Snippets
              </h1>
              <p className="text-muted-foreground">
                {isJet 
                  ? 'High-performance data processing code for JET pipelines'
                  : 'Analytics and reporting solutions for Omnia workflows'
                }
              </p>
            </div>
          </div>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex items-center gap-6 mb-8 p-4 bg-secondary/30 rounded-xl"
        >
          <div>
            <span className="text-2xl font-bold text-foreground">{snippets.length}</span>
            <span className="text-sm text-muted-foreground ml-2">Total Snippets</span>
          </div>
          <div className="h-8 w-px bg-border" />
          <div>
            <span className="text-2xl font-bold text-foreground">
              {snippets.filter(s => s.language === 'Python').length}
            </span>
            <span className="text-sm text-muted-foreground ml-2">Python</span>
          </div>
          <div className="h-8 w-px bg-border" />
          <div>
            <span className="text-2xl font-bold text-foreground">
              {snippets.filter(s => s.language === 'Spark Scala').length}
            </span>
            <span className="text-sm text-muted-foreground ml-2">Spark Scala</span>
          </div>
          <div className="h-8 w-px bg-border" />
          <div>
            <span className="text-2xl font-bold text-foreground">
              {snippets.filter(s => s.language === 'SQL').length}
            </span>
            <span className="text-sm text-muted-foreground ml-2">SQL</span>
          </div>
        </motion.div>

        {/* Snippets Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {snippets.map((snippet, index) => (
            <SnippetCard key={snippet.id} snippet={snippet} index={index} />
          ))}
        </div>

        {snippets.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <p className="text-muted-foreground">
              No {isJet ? 'JET' : 'Omnia'} snippets found
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default SnippetList;
