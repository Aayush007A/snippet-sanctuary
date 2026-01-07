import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import type { Language } from '@/data/mockData';

interface CreateSnippetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateSnippetModal = ({ isOpen, onClose }: CreateSnippetModalProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [language, setLanguage] = useState<Language | ''>('');
  const [type, setType] = useState<'JET' | 'Omnia' | ''>('');
  const [code, setCode] = useState('');
  const [inputSample, setInputSample] = useState('');
  const [outputSample, setOutputSample] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addTag = () => {
    const trimmedTag = tagInput.trim().toLowerCase();
    if (trimmedTag && !tags.includes(trimmedTag)) {
      setTags([...tags, trimmedTag]);
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !description || !language || !type || !code) {
      toast({
        title: 'Missing fields',
        description: 'Please fill in all required fields',
        variant: 'destructive'
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: 'Snippet created!',
      description: 'Your snippet has been published successfully',
    });

    // Reset form
    setTitle('');
    setDescription('');
    setLanguage('');
    setType('');
    setCode('');
    setInputSample('');
    setOutputSample('');
    setTags([]);
    setIsSubmitting(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-3xl md:w-full md:max-h-[90vh] bg-background rounded-2xl shadow-2xl z-50 overflow-hidden flex flex-col"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <h2 className="font-heading text-xl font-bold">Create New Snippet</h2>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Title & Type */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g., Convert XLS to CSV"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Type *</Label>
                  <Select value={type} onValueChange={(val) => setType(val as 'JET' | 'Omnia')}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="JET">JET</SelectItem>
                      <SelectItem value="Omnia">Omnia</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe what this snippet does..."
                  rows={2}
                />
              </div>

              {/* Language */}
              <div className="space-y-2">
                <Label>Language *</Label>
                <Select value={language} onValueChange={(val) => setLanguage(val as Language)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Python">Python</SelectItem>
                    <SelectItem value="Spark Scala">Spark Scala</SelectItem>
                    <SelectItem value="SQL">SQL</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Tags */}
              <div className="space-y-2">
                <Label>Tags</Label>
                <div className="flex gap-2">
                  <Input
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Add a tag and press Enter"
                    className="flex-1"
                  />
                  <Button type="button" variant="outline" onClick={addTag}>
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {tags.map((tag) => (
                      <Badge 
                        key={tag} 
                        variant="secondary"
                        className="gap-1 cursor-pointer hover:bg-destructive/10"
                        onClick={() => removeTag(tag)}
                      >
                        {tag}
                        <X className="w-3 h-3" />
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              {/* Sample Input/Output */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="inputSample">Sample Input</Label>
                  <Textarea
                    id="inputSample"
                    value={inputSample}
                    onChange={(e) => setInputSample(e.target.value)}
                    placeholder="Paste sample input data..."
                    rows={4}
                    className="font-mono text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="outputSample">Expected Output</Label>
                  <Textarea
                    id="outputSample"
                    value={outputSample}
                    onChange={(e) => setOutputSample(e.target.value)}
                    placeholder="Paste expected output..."
                    rows={4}
                    className="font-mono text-sm"
                  />
                </div>
              </div>

              {/* Code */}
              <div className="space-y-2">
                <Label htmlFor="code">Code *</Label>
                <Textarea
                  id="code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Paste your code here..."
                  rows={10}
                  className="font-mono text-sm"
                />
              </div>
            </form>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-border bg-secondary/30">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button onClick={handleSubmit} disabled={isSubmitting} className="gap-2">
                {isSubmitting ? (
                  <>Saving...</>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Publish Snippet
                  </>
                )}
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
