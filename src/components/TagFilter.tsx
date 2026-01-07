import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Search, Filter } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface TagFilterProps {
  allTags: string[];
  selectedTags: string[];
  onTagsChange: (tags: string[]) => void;
}

export const TagFilter = ({ allTags, selectedTags, onTagsChange }: TagFilterProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const filteredTags = allTags.filter(
    tag => 
      tag.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !selectedTags.includes(tag)
  );

  const addTag = (tag: string) => {
    onTagsChange([...selectedTags, tag]);
  };

  const removeTag = (tag: string) => {
    onTagsChange(selectedTags.filter(t => t !== tag));
  };

  return (
    <div className="bg-card rounded-xl border border-border p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <span className="font-medium text-sm">Filter by Tags</span>
        </div>
        {selectedTags.length > 0 && (
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-xs h-7"
            onClick={() => onTagsChange([])}
          >
            Clear all
          </Button>
        )}
      </div>

      {/* Selected Tags */}
      <AnimatePresence mode="popLayout">
        {selectedTags.length > 0 && (
          <motion.div 
            className="flex flex-wrap gap-2 mb-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            {selectedTags.map((tag) => (
              <motion.div
                key={tag}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                layout
              >
                <Badge 
                  variant="default" 
                  className="gap-1 cursor-pointer hover:bg-primary/80"
                  onClick={() => removeTag(tag)}
                >
                  {tag}
                  <X className="w-3 h-3" />
                </Badge>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search and Add */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search tags..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsExpanded(true)}
          className="pl-10"
        />
      </div>

      {/* Available Tags */}
      <AnimatePresence>
        {(isExpanded || searchQuery) && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-3 pt-3 border-t border-border"
          >
            <p className="text-xs text-muted-foreground mb-2">Available tags:</p>
            <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto scrollbar-thin">
              {filteredTags.slice(0, 20).map((tag) => (
                <motion.button
                  key={tag}
                  className="inline-flex items-center gap-1 text-xs px-2 py-1 bg-secondary text-secondary-foreground rounded-full hover:bg-secondary/80 transition-colors"
                  onClick={() => addTag(tag)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Plus className="w-3 h-3" />
                  {tag}
                </motion.button>
              ))}
              {filteredTags.length === 0 && (
                <p className="text-xs text-muted-foreground">No matching tags</p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
