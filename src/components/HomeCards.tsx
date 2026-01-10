// import { useState } from 'react';
// import { motion } from 'framer-motion';
// import { Zap, Globe, FolderPlus, ArrowRight } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// import { CreateCategoryModal } from '@/components/CreateCategoryModal';

// interface HomeCardProps {
//   title: string;
//   description: string;
//   icon: React.ReactNode;
//   gradient: string;
//   delay: number;
//   onClick: () => void;
//   isCreate?: boolean;
// }

// const HomeCard = ({ title, description, icon, gradient, delay, onClick, isCreate }: HomeCardProps) => {
//   // Check if the gradient is a custom CSS string (e.g. "linear-gradient(...)") or a preset class ID
//   const isCustomGradient = gradient.includes('linear-gradient') || gradient.startsWith('#');
  
//   // Style object: used for custom colors
//   const styleObj = isCustomGradient ? { background: gradient } : {};
  
//   // Class string: used for presets (e.g. "gradient-jet" needs to map to a real class if defined in CSS, 
//   // or if you updated the preset to return "bg-gradient-to-r...", pass that here).
//   // Assuming existing presets return names like "gradient-jet", we keep them in className.
//   const gradientClass = isCustomGradient ? '' : gradient;

//   return (
//     <motion.div
//       className={`relative group cursor-pointer ${isCreate ? 'pulse-animation rounded-2xl' : ''}`}
//       initial={{ opacity: 0, y: 30 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
//       onClick={onClick}
//     >
//       <motion.div
//         className="relative overflow-hidden rounded-2xl bg-card border border-border p-8 h-full"
//         whileHover={{ 
//           scale: 1.02,
//           boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)'
//         }}
//         transition={{ duration: 0.3 }}
//       >
//         {/* Gradient Background */}
//         <motion.div
//           className={`absolute inset-0 ${gradientClass} opacity-0`}
//           style={styleObj}
//           whileHover={{ opacity: 0.05 }}
//           transition={{ duration: 0.3 }}
//         />

//         {/* Icon with parallax effect */}
//         <motion.div
//           className={`w-16 h-16 rounded-xl flex items-center justify-center mb-6 relative ${gradientClass}`}
//           style={styleObj}
//           whileHover={{ 
//             scale: 1.1,
//             rotate: isCreate ? 10 : 0,
//             y: -5
//           }}
//           transition={{ duration: 0.4, ease: 'easeOut' }}
//         >
//           <motion.div
//             className="absolute inset-0 rounded-xl blur-xl opacity-50"
//             // For custom gradients, use the same gradient. For presets, try to use the var variable or fallback to inheritance
//             style={isCustomGradient ? { background: gradient } : { background: `var(--${gradient.replace('gradient-', '')}-gradient)` }}
//             whileHover={{ scale: 1.5, opacity: 0.3 }}
//           />
//           {icon}
//         </motion.div>

//         {/* Content */}
//         <h3 className="font-heading text-2xl font-bold text-foreground mb-3">
//           {title}
//         </h3>
//         <p className="text-muted-foreground leading-relaxed mb-6">
//           {description}
//         </p>

//         {/* CTA */}
//         <motion.div 
//           className="flex items-center gap-2 text-primary font-medium"
//           whileHover={{ x: 5 }}
//         >
//           <span>{isCreate ? 'Create New' : 'Explore'}</span>
//           <ArrowRight className="w-4 h-4" />
//         </motion.div>

//         {/* Decorative elements */}
//         <motion.div
//           className={`absolute -bottom-20 -right-20 w-40 h-40 rounded-full blur-3xl opacity-0 ${gradientClass}`}
//           style={styleObj}
//           whileHover={{ opacity: 0.2 }}
//           transition={{ duration: 0.5 }}
//         />
//       </motion.div>
//     </motion.div>
//   );
// };

// export const HomeCards = () => {
//   const navigate = useNavigate();
//   const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

//   return (
//     <>
//       <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
//         <HomeCard
//           title="JET Snippets"
//           description="Browse and create data processing snippets for JET pipelines and transformations."
//           icon={<Zap className="w-8 h-8 text-primary-foreground" />}
//           gradient="gradient-jet"
//           delay={0.1}
//           onClick={() => navigate('/category/jet')}
//         />
        
//         <HomeCard
//           title="Omnia Snippets"
//           description="Browse and create analytics snippets for Omnia workflows. Query templates and data utilities."
//           icon={<Globe className="w-8 h-8 text-primary-foreground" />}
//           gradient="gradient-omnia"
//           delay={0.2}
//           onClick={() => navigate('/category/omnia')}
//         />
        
//         <HomeCard
//           title="Create Category"
//           description="Add a new category to organize your code snippets efficiently. Define themes and icons."
//           icon={<FolderPlus className="w-8 h-8 text-primary-foreground" />}
//           gradient="gradient-create"
//           delay={0.3}
//           onClick={() => setIsCategoryModalOpen(true)}
//           isCreate
//         />
//       </div>

//       <CreateCategoryModal 
//         isOpen={isCategoryModalOpen} 
//         onClose={() => setIsCategoryModalOpen(false)} 
//       />
//     </>
//   );
// };

// import { useState } from 'react';
// import { motion } from 'framer-motion';
// import { FolderPlus, ArrowRight, Zap, Globe, FolderCode, Database, Server, Code2, Terminal, Cloud, Cpu, Box, GitBranch, Brain, Layout, Lock } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// import { CreateCategoryModal } from '@/components/CreateCategoryModal';
// import { useSnippets } from '@/context/SnippetContext';

// // Icon mapping (same as used elsewhere)
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

// interface HomeCardProps {
//   title: string;
//   description: string;
//   icon: React.ReactNode;
//   gradient: string;
//   delay: number;
//   onClick: () => void;
//   isCreate?: boolean;
// }

// const HomeCard = ({ title, description, icon, gradient, delay, onClick, isCreate }: HomeCardProps) => {
//   const isCustomGradient = gradient.includes('linear-gradient') || gradient.startsWith('#');
//   const styleObj = isCustomGradient ? { background: gradient } : {};
//   const gradientClass = isCustomGradient ? '' : gradient;

//   return (
//     <motion.div
//       className={`relative group cursor-pointer ${isCreate ? 'pulse-animation rounded-2xl' : ''}`}
//       initial={{ opacity: 0, y: 30 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
//       onClick={onClick}
//     >
//       <motion.div
//         className="relative overflow-hidden rounded-2xl bg-card border border-border p-8 h-full flex flex-col"
//         whileHover={{ scale: 1.02, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)' }}
//         transition={{ duration: 0.3 }}
//       >
//         <motion.div className={`absolute inset-0 ${gradientClass} opacity-0`} style={styleObj} whileHover={{ opacity: 0.05 }} />
//         <motion.div
//           className={`w-16 h-16 rounded-xl flex items-center justify-center mb-6 relative ${gradientClass}`}
//           style={styleObj}
//           whileHover={{ scale: 1.1, rotate: isCreate ? 10 : 0, y: -5 }}
//           transition={{ duration: 0.4 }}
//         >
//           {icon}
//         </motion.div>
//         <h3 className="font-heading text-2xl font-bold text-foreground mb-3">{title}</h3>
//         <p className="text-muted-foreground leading-relaxed mb-6 flex-grow">{description}</p>
//         <motion.div className="flex items-center gap-2 text-primary font-medium" whileHover={{ x: 5 }}>
//           <span>{isCreate ? 'Create New' : 'Explore'}</span>
//           <ArrowRight className="w-4 h-4" />
//         </motion.div>
//       </motion.div>
//     </motion.div>
//   );
// };

// export const HomeCards = ({ showAll = false }: { showAll?: boolean }) => {
//   const navigate = useNavigate();
//   const { categories } = useSnippets();
//   const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

//   // If NOT showing all, we only show the first 2 categories + the Create Card
//   const displayCategories = showAll ? categories : categories.slice(0, 2);

//   return (
//     <>
//       <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
//         {displayCategories.map((cat, index) => (
//           <HomeCard
//             key={cat.id}
//             title={`${cat.name} Snippets`}
//             description={cat.description}
//             icon={iconMap[cat.icon] || <FolderCode className="w-8 h-8 text-white" />}
//             gradient={cat.gradient}
//             delay={index * 0.1}
//             onClick={() => navigate(`/category/${cat.id}`)}
//           />
//         ))}
        
//         {/* Only show Create Card if NOT on "Show All" page, OR if you want it always at the end */}
//         <HomeCard
//           title="Create Category"
//           description="Add a new category to organize your code snippets efficiently."
//           icon={<FolderPlus className="w-8 h-8 text-white" />}
//           gradient="gradient-create"
//           delay={0.3}
//           onClick={() => setIsCategoryModalOpen(true)}
//           isCreate
//         />
//       </div>

//       <CreateCategoryModal 
//         isOpen={isCategoryModalOpen} 
//         onClose={() => setIsCategoryModalOpen(false)} 
//       />
//     </>
//   );
// };

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FolderPlus, ArrowRight, Zap, Globe, FolderCode, Database, Server, Code2, Terminal, Cloud, Cpu, Box, GitBranch, Brain, Layout, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { CreateCategoryModal } from '@/components/CreateCategoryModal';
import { useSnippets } from '@/context/SnippetContext';

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
  const isCustomGradient = gradient.includes('linear-gradient') || gradient.startsWith('#');
  
  // Logic: If it's custom, use inline style. If it's a class string (bg-gradient...), use it as class.
  const styleObj = isCustomGradient ? { background: gradient } : {};
  const gradientClass = isCustomGradient ? '' : gradient;

  return (
    <motion.div
      className={`relative group cursor-pointer ${isCreate ? 'pulse-animation rounded-2xl' : ''}`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      onClick={onClick}
    >
      <motion.div
        className="relative overflow-hidden rounded-2xl bg-card border border-border p-8 h-full flex flex-col"
        whileHover={{ scale: 1.02, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)' }}
        transition={{ duration: 0.3 }}
      >
        {/* Background Gradient */}
        <motion.div 
          className={`absolute inset-0 ${gradientClass} opacity-0`} 
          style={styleObj} 
          whileHover={{ opacity: 0.05 }} 
        />
        
        {/* Icon Container */}
        <motion.div
          className={`w-16 h-16 rounded-xl flex items-center justify-center mb-6 relative ${gradientClass}`}
          style={styleObj}
          whileHover={{ scale: 1.1, rotate: isCreate ? 10 : 0, y: -5 }}
          transition={{ duration: 0.4 }}
        >
           {/* --- FIX: Generic Blur Glow Effect --- */}
           <motion.div
            className={`absolute inset-0 rounded-xl blur-xl opacity-50 ${gradientClass}`}
            style={styleObj} // Apply same gradient to the blur layer
            whileHover={{ scale: 1.5, opacity: 0.3 }}
          />
          <div className="relative z-10">{icon}</div>
        </motion.div>
        
        <h3 className="font-heading text-2xl font-bold text-foreground mb-3">{title}</h3>
        <p className="text-muted-foreground leading-relaxed mb-6 flex-grow">{description}</p>
        <motion.div className="flex items-center gap-2 text-primary font-medium" whileHover={{ x: 5 }}>
          <span>{isCreate ? 'Create New' : 'Explore'}</span>
          <ArrowRight className="w-4 h-4" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export const HomeCards = ({ showAll = false }: { showAll?: boolean }) => {
  const navigate = useNavigate();
  const { categories } = useSnippets();
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

  const displayCategories = showAll ? categories : categories.slice(0, 2);

  return (
    <>
      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {displayCategories.map((cat, index) => (
          <HomeCard
            key={cat.id}
            title={`${cat.name} Snippets`}
            description={cat.description}
            icon={iconMap[cat.icon] || <FolderCode className="w-8 h-8 text-white" />}
            gradient={cat.gradient} // This will now be a proper Tailwind class or custom gradient
            delay={index * 0.1}
            onClick={() => navigate(`/category/${cat.id}`)}
          />
        ))}
        
        <HomeCard
          title="Create Category"
          description="Add a new category to organize your code snippets efficiently."
          icon={<FolderPlus className="w-8 h-8 text-white" />}
          gradient="gradient-create" // This relies on your CSS, but new categories won't use this
          delay={0.3}
          onClick={() => setIsCategoryModalOpen(true)}
          isCreate
        />
      </div>

      <CreateCategoryModal 
        isOpen={isCategoryModalOpen} 
        onClose={() => setIsCategoryModalOpen(false)} 
      />
    </>
  );
};