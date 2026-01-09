import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Zap, Globe, FolderCode, Database, Server, Code2, Trash2, Pencil, X, Check } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { SubtleBackground } from '@/components/SubtleBackground';
import { SnippetGrid } from '@/components/SnippetGrid';
import { useSnippets } from '@/context/SnippetContext';
import { CreateSnippetModal } from '@/components/CreateSnippetModal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';

const iconMap: Record<string, React.ReactNode> = {
  Zap: <Zap className="w-8 h-8 text-primary-foreground" />,
  Globe: <Globe className="w-8 h-8 text-primary-foreground" />,
  FolderCode: <FolderCode className="w-8 h-8 text-primary-foreground" />,
  Database: <Database className="w-8 h-8 text-primary-foreground" />,
  Server: <Server className="w-8 h-8 text-primary-foreground" />,
  Code2: <Code2 className="w-8 h-8 text-primary-foreground" />,
};

const CategoryPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const { getCategoryById, getSnippetsByCategory, deleteCategory, updateCategory } = useSnippets();
  const { toast } = useToast();
  
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const category = getCategoryById(categoryId || '');
  const snippets = getSnippetsByCategory(categoryId || '');

  if (!category) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-heading font-bold text-foreground mb-4">Category Not Found</h1>
          <button
            onClick={() => navigate('/')}
            className="text-primary hover:underline"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const handleStartEdit = () => {
    setEditName(category.name);
    setEditDescription(category.description);
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    if (!editName.trim()) {
      toast({ title: 'Error', description: 'Name cannot be empty', variant: 'destructive' });
      return;
    }
    updateCategory(category.id, { name: editName.trim(), description: editDescription.trim() });
    setIsEditing(false);
    toast({ title: 'Category Updated', description: 'Changes saved successfully.' });
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleDelete = () => {
    deleteCategory(category.id);
    toast({ title: 'Category Deleted', description: `"${category.name}" has been removed.` });
    navigate('/');
  };

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
          <span>Back to Categories</span>
        </motion.button>

        {/* Category Header */}
        <motion.div
          className="max-w-6xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-4 flex-1">
              <div className={`w-16 h-16 rounded-xl ${category.gradient} flex items-center justify-center shrink-0`}>
                {iconMap[category.icon] || <FolderCode className="w-8 h-8 text-primary-foreground" />}
              </div>
              <div className="flex-1">
                {isEditing ? (
                  <div className="space-y-3">
                    <Input
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="text-2xl font-heading font-bold"
                      placeholder="Category name"
                    />
                    <Textarea
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                      className="resize-none"
                      placeholder="Category description"
                      rows={2}
                    />
                    <div className="flex gap-2">
                      <Button size="sm" onClick={handleSaveEdit} className="gap-1">
                        <Check className="w-4 h-4" /> Save
                      </Button>
                      <Button size="sm" variant="outline" onClick={handleCancelEdit} className="gap-1">
                        <X className="w-4 h-4" /> Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
                      {category.name} Snippets
                    </h1>
                    <p className="text-muted-foreground">{category.description}</p>
                  </>
                )}
              </div>
            </div>

            {/* Edit/Delete buttons for custom categories */}
            {!category.isDefault && !isEditing && (
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={handleStartEdit} className="gap-1">
                  <Pencil className="w-4 h-4" /> Rename
                </Button>
                <Button size="sm" variant="destructive" onClick={() => setShowDeleteDialog(true)} className="gap-1">
                  <Trash2 className="w-4 h-4" /> Delete
                </Button>
              </div>
            )}
          </div>
          
          <div className="text-sm text-muted-foreground mt-4">
            {snippets.length} snippet{snippets.length !== 1 ? 's' : ''} in this category
          </div>
        </motion.div>

        {/* Snippet Grid */}
        <div className="max-w-6xl mx-auto">
          <SnippetGrid 
            snippets={snippets} 
            onCreateClick={() => setIsCreateModalOpen(true)}
          />
        </div>
      </main>

      <CreateSnippetModal 
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        defaultCategoryId={categoryId}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Category</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{category.name}"? This will also delete all {snippets.length} snippet{snippets.length !== 1 ? 's' : ''} in this category. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default CategoryPage;
