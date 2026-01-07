import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Save, X } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
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

const CreateSnippet = () => {
  const navigate = useNavigate();
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

    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 pt-24 pb-16 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="mb-6 gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Button>

          <div className="mb-8">
            <h1 className="font-heading text-3xl font-bold text-foreground mb-2">
              Create New Snippet
            </h1>
            <p className="text-muted-foreground">
              Share your code solution with the team
            </p>
          </div>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          className="space-y-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          {/* Basic Info Card */}
          <div className="bg-card rounded-xl border border-border p-6 space-y-6">
            <h2 className="font-heading font-semibold text-lg">Basic Information</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Convert XLS to CSV"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Type *</Label>
                  <Select value={type} onValueChange={(val) => setType(val as 'JET' | 'Omnia')}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="JET">JET</SelectItem>
                      <SelectItem value="Omnia">Omnia</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Language *</Label>
                  <Select value={language} onValueChange={(val) => setLanguage(val as Language)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Python">Python</SelectItem>
                      <SelectItem value="Spark Scala">Spark Scala</SelectItem>
                      <SelectItem value="SQL">SQL</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe what this snippet does and when to use it..."
                rows={3}
              />
            </div>

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
                <div className="flex flex-wrap gap-2 mt-3">
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
          </div>

          {/* Sample Data Card */}
          <div className="bg-card rounded-xl border border-border p-6 space-y-6">
            <h2 className="font-heading font-semibold text-lg">Sample Data</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="inputSample">Sample Input</Label>
                <Textarea
                  id="inputSample"
                  value={inputSample}
                  onChange={(e) => setInputSample(e.target.value)}
                  placeholder="Paste sample input data..."
                  rows={6}
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
                  rows={6}
                  className="font-mono text-sm"
                />
              </div>
            </div>
          </div>

          {/* Code Card */}
          <div className="bg-card rounded-xl border border-border p-6 space-y-6">
            <h2 className="font-heading font-semibold text-lg">Code *</h2>
            
            <Textarea
              id="code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Paste your code here..."
              rows={15}
              className="font-mono text-sm"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-4 pt-4">
            <Button type="button" variant="outline" onClick={() => navigate('/')}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting} className="gap-2">
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
        </motion.form>
      </div>
    </div>
  );
};

export default CreateSnippet;
