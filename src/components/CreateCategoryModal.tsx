import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Zap, Globe, FolderCode, Database, Server, Code2 } from 'lucide-react';
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
];

const gradientOptions = [
  { name: 'gradient-jet', label: 'Blue-Purple', preview: 'bg-gradient-to-r from-blue-500 to-purple-500' },
  { name: 'gradient-omnia', label: 'Green-Teal', preview: 'bg-gradient-to-r from-green-500 to-teal-500' },
  { name: 'gradient-create', label: 'Orange-Red', preview: 'bg-gradient-to-r from-orange-500 to-red-500' },
];

export const CreateCategoryModal = ({ isOpen, onClose }: CreateCategoryModalProps) => {
  const { addCategory } = useSnippets();
  const { toast } = useToast();
  
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('FolderCode');
  const [selectedGradient, setSelectedGradient] = useState('gradient-jet');

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

    addCategory({
      name: name.trim(),
      description: description.trim() || `Snippets for ${name}`,
      icon: selectedIcon,
      gradient: selectedGradient,
    });

    toast({
      title: 'Category Created',
      description: `"${name}" has been added successfully.`,
    });

    // Reset and close
    setName('');
    setDescription('');
    setSelectedIcon('FolderCode');
    setSelectedGradient('gradient-jet');
    onClose();
  };

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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="relative bg-card border border-border rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', duration: 0.5 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="text-xl font-heading font-bold text-foreground">
                Create New Category
              </h2>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-muted transition-colors"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Category Name</Label>
                <Input
                  id="name"
                  placeholder="e.g., Data Engineering"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-background"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Brief description of this category..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="bg-background resize-none"
                  rows={3}
                />
              </div>

              {/* Icon Selection */}
              <div className="space-y-2">
                <Label>Icon</Label>
                <div className="flex gap-2">
                  {iconOptions.map(({ name: iconName, icon: IconComponent }) => (
                    <button
                      key={iconName}
                      type="button"
                      onClick={() => setSelectedIcon(iconName)}
                      className={`p-3 rounded-lg border transition-all ${
                        selectedIcon === iconName
                          ? 'border-primary bg-primary/10'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <IconComponent className="w-5 h-5" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Gradient Selection */}
              <div className="space-y-2">
                <Label>Color Theme</Label>
                <div className="flex gap-2">
                  {gradientOptions.map(({ name: gradName, label, preview }) => (
                    <button
                      key={gradName}
                      type="button"
                      onClick={() => setSelectedGradient(gradName)}
                      className={`flex-1 p-3 rounded-lg border transition-all ${
                        selectedGradient === gradName
                          ? 'border-primary ring-2 ring-primary/20'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <div className={`h-8 rounded ${preview} mb-2`} />
                      <span className="text-xs text-muted-foreground">{label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={onClose}
                >
                  Cancel
                </Button>
                <Button type="submit" className="flex-1">
                  Create Category
                </Button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
