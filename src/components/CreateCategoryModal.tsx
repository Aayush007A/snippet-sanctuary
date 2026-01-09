// import { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { X, Zap, Globe, FolderCode, Database, Server, Code2 } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Textarea } from '@/components/ui/textarea';
// import { Label } from '@/components/ui/label';
// import { useSnippets } from '@/context/SnippetContext';
// import { useToast } from '@/hooks/use-toast';

// interface CreateCategoryModalProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

// const iconOptions = [
//   { name: 'Zap', icon: Zap },
//   { name: 'Globe', icon: Globe },
//   { name: 'FolderCode', icon: FolderCode },
//   { name: 'Database', icon: Database },
//   { name: 'Server', icon: Server },
//   { name: 'Code2', icon: Code2 },
// ];

// const gradientOptions = [
//   { name: 'gradient-jet', label: 'Blue-Purple', preview: 'bg-gradient-to-r from-blue-500 to-purple-500' },
//   { name: 'gradient-omnia', label: 'Green-Teal', preview: 'bg-gradient-to-r from-green-500 to-teal-500' },
//   { name: 'gradient-create', label: 'Orange-Red', preview: 'bg-gradient-to-r from-orange-500 to-red-500' },
// ];

// export const CreateCategoryModal = ({ isOpen, onClose }: CreateCategoryModalProps) => {
//   const { addCategory } = useSnippets();
//   const { toast } = useToast();
  
//   const [name, setName] = useState('');
//   const [description, setDescription] = useState('');
//   const [selectedIcon, setSelectedIcon] = useState('FolderCode');
//   const [selectedGradient, setSelectedGradient] = useState('gradient-jet');

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
    
//     if (!name.trim()) {
//       toast({
//         title: 'Error',
//         description: 'Please enter a category name',
//         variant: 'destructive',
//       });
//       return;
//     }

//     addCategory({
//       name: name.trim(),
//       description: description.trim() || `Snippets for ${name}`,
//       icon: selectedIcon,
//       gradient: selectedGradient,
//     });

//     toast({
//       title: 'Category Created',
//       description: `"${name}" has been added successfully.`,
//     });

//     // Reset and close
//     setName('');
//     setDescription('');
//     setSelectedIcon('FolderCode');
//     setSelectedGradient('gradient-jet');
//     onClose();
//   };

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <motion.div
//           className="fixed inset-0 z-50 flex items-center justify-center p-4"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//         >
//           {/* Backdrop */}
//           <motion.div
//             className="absolute inset-0 bg-black/60 backdrop-blur-sm"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             onClick={onClose}
//           />

//           {/* Modal */}
//           <motion.div
//             className="relative bg-card border border-border rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
//             initial={{ opacity: 0, scale: 0.95, y: 20 }}
//             animate={{ opacity: 1, scale: 1, y: 0 }}
//             exit={{ opacity: 0, scale: 0.95, y: 20 }}
//             transition={{ type: 'spring', duration: 0.5 }}
//           >
//             {/* Header */}
//             <div className="flex items-center justify-between p-6 border-b border-border">
//               <h2 className="text-xl font-heading font-bold text-foreground">
//                 Create New Category
//               </h2>
//               <button
//                 onClick={onClose}
//                 className="p-2 rounded-lg hover:bg-muted transition-colors"
//               >
//                 <X className="w-5 h-5 text-muted-foreground" />
//               </button>
//             </div>

//             {/* Form */}
//             <form onSubmit={handleSubmit} className="p-6 space-y-6">
//               <div className="space-y-2">
//                 <Label htmlFor="name">Category Name</Label>
//                 <Input
//                   id="name"
//                   placeholder="e.g., Data Engineering"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                   className="bg-background"
//                 />
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="description">Description</Label>
//                 <Textarea
//                   id="description"
//                   placeholder="Brief description of this category..."
//                   value={description}
//                   onChange={(e) => setDescription(e.target.value)}
//                   className="bg-background resize-none"
//                   rows={3}
//                 />
//               </div>

//               {/* Icon Selection */}
//               <div className="space-y-2">
//                 <Label>Icon</Label>
//                 <div className="flex gap-2">
//                   {iconOptions.map(({ name: iconName, icon: IconComponent }) => (
//                     <button
//                       key={iconName}
//                       type="button"
//                       onClick={() => setSelectedIcon(iconName)}
//                       className={`p-3 rounded-lg border transition-all ${
//                         selectedIcon === iconName
//                           ? 'border-primary bg-primary/10'
//                           : 'border-border hover:border-primary/50'
//                       }`}
//                     >
//                       <IconComponent className="w-5 h-5" />
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               {/* Gradient Selection */}
//               <div className="space-y-2">
//                 <Label>Color Theme</Label>
//                 <div className="flex gap-2">
//                   {gradientOptions.map(({ name: gradName, label, preview }) => (
//                     <button
//                       key={gradName}
//                       type="button"
//                       onClick={() => setSelectedGradient(gradName)}
//                       className={`flex-1 p-3 rounded-lg border transition-all ${
//                         selectedGradient === gradName
//                           ? 'border-primary ring-2 ring-primary/20'
//                           : 'border-border hover:border-primary/50'
//                       }`}
//                     >
//                       <div className={`h-8 rounded ${preview} mb-2`} />
//                       <span className="text-xs text-muted-foreground">{label}</span>
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               {/* Actions */}
//               <div className="flex gap-3 pt-4">
//                 <Button
//                   type="button"
//                   variant="outline"
//                   className="flex-1"
//                   onClick={onClose}
//                 >
//                   Cancel
//                 </Button>
//                 <Button type="submit" className="flex-1">
//                   Create Category
//                 </Button>
//               </div>
//             </form>
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// };


import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Zap, Globe, FolderCode, Database, Server, Code2, 
  Terminal, Cloud, Cpu, Box, GitBranch, Brain, Layout, Lock,
  Palette, Check
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useSnippets } from '@/context/SnippetContext';
import { useToast } from '@/hooks/use-toast';

interface CreateCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const iconOptions = [
  { name: 'Zap', icon: Zap },
  { name: 'Globe', icon: Globe },
  { name: 'FolderCode', icon: FolderCode },
  { name: 'Database', icon: Database },
  { name: 'Server', icon: Server },
  { name: 'Code2', icon: Code2 },
  { name: 'Terminal', icon: Terminal },
  { name: 'Cloud', icon: Cloud },
  { name: 'Cpu', icon: Cpu },
  { name: 'Box', icon: Box },
  { name: 'GitBranch', icon: GitBranch },
  { name: 'Brain', icon: Brain },
  { name: 'Layout', icon: Layout },
  { name: 'Lock', icon: Lock },
];

const gradientOptions = [
  { id: 'gradient-jet', label: 'Blue-Purple', class: 'bg-gradient-to-r from-blue-500 to-purple-500' },
  { id: 'gradient-omnia', label: 'Green-Teal', class: 'bg-gradient-to-r from-green-500 to-teal-500' },
  { id: 'gradient-create', label: 'Orange-Red', class: 'bg-gradient-to-r from-orange-500 to-red-500' },
  { id: 'gradient-pink', label: 'Pink-Rose', class: 'bg-gradient-to-r from-pink-500 to-rose-500' },
  { id: 'gradient-indigo', label: 'Indigo-Cyan', class: 'bg-gradient-to-r from-indigo-500 to-cyan-500' },
];

export const CreateCategoryModal = ({ isOpen, onClose }: CreateCategoryModalProps) => {
  const { addCategory } = useSnippets();
  const { toast } = useToast();
  
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('FolderCode');
  
  // Color Logic
  const [selectedPreset, setSelectedPreset] = useState('gradient-jet');
  const [isCustomColor, setIsCustomColor] = useState(false);
  const [customColors, setCustomColors] = useState({ start: '#6366f1', end: '#a855f7' });

  // Reset state when opening
  useEffect(() => {
    if (isOpen) {
      setName('');
      setDescription('');
      setSelectedIcon('FolderCode');
      setSelectedPreset('gradient-jet');
      setIsCustomColor(false);
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter a category name',
        variant: 'destructive',
      });
      return;
    }

    const finalGradient = isCustomColor 
      ? `linear-gradient(135deg, ${customColors.start}, ${customColors.end})`
      : selectedPreset;

    addCategory({
      name: name.trim(),
      description: description.trim() || `Snippets for ${name}`,
      icon: selectedIcon,
      gradient: finalGradient,
    });

    toast({
      title: 'Category Created',
      description: `"${name}" has been added successfully.`,
    });

    onClose();
  };

  const currentGradientPreview = isCustomColor 
    ? { background: `linear-gradient(to right, ${customColors.start}, ${customColors.end})` }
    : {}; 

  // --- FIX START: Safely retrieve the icon component ---
  const SelectedIconComp = iconOptions.find(i => i.name === selectedIcon)?.icon || FolderCode;
  // --- FIX END ---

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          />

          {/* Modal */}
          <motion.div
            className="relative bg-card border border-border rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border shrink-0 bg-card/50 backdrop-blur-sm z-10">
              <h2 className="text-xl font-heading font-bold text-foreground flex items-center gap-2">
                <div 
                  className={`w-8 h-8 rounded-lg flex items-center justify-center ${!isCustomColor ? gradientOptions.find(g => g.id === selectedPreset)?.class : ''}`}
                  style={currentGradientPreview}
                >
                  {/* --- FIX START: Render as Component instead of function call --- */}
                  <SelectedIconComp className="w-5 h-5 text-white" />
                  {/* --- FIX END --- */}
                </div>
                Create New Category
              </h2>
              <button onClick={onClose} className="p-2 rounded-lg hover:bg-muted transition-colors">
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="overflow-y-auto p-6 space-y-8">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Category Name</Label>
                    <Input
                      id="name"
                      placeholder="e.g., Data Engineering"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Brief description..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={4}
                      className="resize-none"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Icon</Label>
                  <div className="grid grid-cols-5 gap-2 p-1">
                    {iconOptions.map(({ name: iconName, icon: IconComponent }) => (
                      <button
                        key={iconName}
                        type="button"
                        onClick={() => setSelectedIcon(iconName)}
                        className={`aspect-square rounded-xl border flex items-center justify-center transition-all ${
                          selectedIcon === iconName
                            ? 'border-primary bg-primary/10 text-primary ring-2 ring-primary/20'
                            : 'border-border hover:border-primary/50 text-muted-foreground hover:bg-accent'
                        }`}
                      >
                        <IconComponent className="w-5 h-5" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Label>Color Theme</Label>
                
                {/* Presets */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                  {gradientOptions.map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => {
                        setSelectedPreset(option.id);
                        setIsCustomColor(false);
                      }}
                      className={`relative group rounded-xl border transition-all overflow-hidden h-20 ${
                        !isCustomColor && selectedPreset === option.id
                          ? 'border-primary ring-2 ring-primary/20 scale-105 shadow-lg'
                          : 'border-border hover:border-primary/50 opacity-80 hover:opacity-100'
                      }`}
                    >
                      <div className={`absolute inset-0 ${option.class}`} />
                      <div className="absolute inset-x-0 bottom-0 p-2 bg-black/40 backdrop-blur-[2px] text-xs text-white text-center font-medium">
                        {option.label}
                      </div>
                      {!isCustomColor && selectedPreset === option.id && (
                        <div className="absolute top-2 right-2 bg-white text-black rounded-full p-0.5">
                          <Check className="w-3 h-3" />
                        </div>
                      )}
                    </button>
                  ))}
                  
                  {/* Custom Color Button */}
                  <button
                    type="button"
                    onClick={() => setIsCustomColor(true)}
                    className={`relative group rounded-xl border transition-all overflow-hidden h-20 flex flex-col items-center justify-center gap-2 ${
                      isCustomColor
                        ? 'border-primary ring-2 ring-primary/20 scale-105 shadow-lg bg-accent'
                        : 'border-border hover:border-primary/50 border-dashed'
                    }`}
                  >
                     <div 
                      className="absolute inset-0 opacity-20"
                      style={{ background: `linear-gradient(135deg, ${customColors.start}, ${customColors.end})` }} 
                     />
                     <Palette className="w-6 h-6 text-foreground" />
                     <span className="text-xs font-medium">Custom</span>
                  </button>
                </div>

                {/* Custom Color Pickers */}
                <AnimatePresence>
                  {isCustomColor && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-4 rounded-xl border border-border bg-accent/30 flex items-center gap-6 mt-2">
                        <div className="flex-1 space-y-2">
                          <Label className="text-xs uppercase text-muted-foreground">Start Color</Label>
                          <div className="flex items-center gap-3">
                            <input 
                              type="color" 
                              value={customColors.start}
                              onChange={(e) => setCustomColors(prev => ({ ...prev, start: e.target.value }))}
                              className="w-10 h-10 rounded cursor-pointer border-0 p-0"
                            />
                            <span className="text-sm font-mono text-muted-foreground">{customColors.start}</span>
                          </div>
                        </div>
                        <div className="flex-1 space-y-2">
                          <Label className="text-xs uppercase text-muted-foreground">End Color</Label>
                          <div className="flex items-center gap-3">
                            <input 
                              type="color" 
                              value={customColors.end}
                              onChange={(e) => setCustomColors(prev => ({ ...prev, end: e.target.value }))}
                              className="w-10 h-10 rounded cursor-pointer border-0 p-0"
                            />
                            <span className="text-sm font-mono text-muted-foreground">{customColors.end}</span>
                          </div>
                        </div>
                        
                        {/* Live Preview Bar */}
                        <div className="flex-[2] h-12 rounded-lg border border-border shadow-inner"
                             style={{ background: `linear-gradient(to right, ${customColors.start}, ${customColors.end})` }} 
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-border bg-card flex gap-3 shrink-0">
              <Button type="button" variant="outline" className="flex-1" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" className="flex-1" onClick={handleSubmit}>
                Create Category
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};