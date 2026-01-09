import { motion } from 'framer-motion';
import { Zap, Globe, Plus, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface HomeCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
  delay: number;
  onClick: () => void;
  isCreate?: boolean;
}

const HomeCard = ({ title, description, icon, gradient, delay, onClick, isCreate }: HomeCardProps) => {
  return (
    <motion.div
      className={`relative group cursor-pointer ${isCreate ? 'pulse-animation rounded-2xl' : ''}`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      onClick={onClick}
    >
      <motion.div
        className="relative overflow-hidden rounded-2xl bg-card border border-border p-8 h-full"
        whileHover={{ 
          scale: 1.02,
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)'
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Gradient Background */}
        <motion.div
          className={`absolute inset-0 ${gradient} opacity-0`}
          whileHover={{ opacity: 0.05 }}
          transition={{ duration: 0.3 }}
        />

        {/* Icon with parallax effect */}
        <motion.div
          className={`w-16 h-16 rounded-xl ${gradient} flex items-center justify-center mb-6 relative`}
          whileHover={{ 
            scale: 1.1,
            rotate: isCreate ? 90 : 0,
            y: -5
          }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <motion.div
            className="absolute inset-0 rounded-xl blur-xl opacity-50"
            style={{ background: `var(--${gradient.replace('gradient-', '')}-gradient)` }}
            whileHover={{ scale: 1.5, opacity: 0.3 }}
          />
          {icon}
        </motion.div>

        {/* Content */}
        <h3 className="font-heading text-2xl font-bold text-foreground mb-3">
          {title}
        </h3>
        <p className="text-muted-foreground leading-relaxed mb-6">
          {description}
        </p>

        {/* CTA */}
        <motion.div 
          className="flex items-center gap-2 text-primary font-medium"
          whileHover={{ x: 5 }}
        >
          <span>{isCreate ? 'Start Creating' : 'Explore'}</span>
          <ArrowRight className="w-4 h-4" />
        </motion.div>

        {/* Decorative elements */}
        <motion.div
          className={`absolute -bottom-20 -right-20 w-40 h-40 ${gradient} rounded-full blur-3xl opacity-0`}
          whileHover={{ opacity: 0.2 }}
          transition={{ duration: 0.5 }}
        />
      </motion.div>
    </motion.div>
  );
};

export const HomeCards = () => {
  const navigate = useNavigate();

  return (
    <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
      <HomeCard
        title="JET Snippets"
        description="Browse and create data processing snippets for JET pipelines. Spark, Python, and SQL transformations."
        icon={<Zap className="w-8 h-8 text-primary-foreground" />}
        gradient="gradient-jet"
        delay={0.1}
        onClick={() => navigate('/category/jet')}
      />
      
      <HomeCard
        title="Omnia Snippets"
        description="Browse and create analytics snippets for Omnia workflows. Query templates and data utilities."
        icon={<Globe className="w-8 h-8 text-primary-foreground" />}
        gradient="gradient-omnia"
        delay={0.2}
        onClick={() => navigate('/category/omnia')}
      />
      
      <HomeCard
        title="Create Snippet"
        description="Add new code snippets under JET or Omnia categories. Share your solutions with the team."
        icon={<Plus className="w-8 h-8 text-primary-foreground" />}
        gradient="gradient-create"
        delay={0.3}
        onClick={() => navigate('/category/jet')}
        isCreate
      />
    </div>
  );
};
