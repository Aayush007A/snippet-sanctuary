import { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, Edit2, Save, X } from 'lucide-react';
import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import { sql } from '@codemirror/lang-sql';
import { javascript } from '@codemirror/lang-javascript';
import { Button } from '@/components/ui/button';
import type { Language } from '@/data/mockData';

interface CodeEditorProps {
  code: string;
  language: Language;
  isAuthor: boolean;
  onSave?: (code: string) => void;
}

const getLanguageExtension = (language: Language) => {
  switch (language) {
    case 'Python':
      return python();
    case 'SQL':
      return sql();
    case 'Spark Scala':
      return javascript({ jsx: false, typescript: true });
    default:
      return python();
  }
};

export const CodeEditor = ({ code, language, isAuthor, onSave }: CodeEditorProps) => {
  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedCode, setEditedCode] = useState(code);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = () => {
    onSave?.(editedCode);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedCode(code);
    setIsEditing(false);
  };

  return (
    <div className="code-container relative">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-secondary/50 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-destructive/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <span className="text-sm font-medium text-muted-foreground">{language}</span>
        </div>
        
        <div className="flex items-center gap-2">
          {isEditing ? (
            <>
              <Button
                size="sm"
                variant="ghost"
                onClick={handleCancel}
                className="h-8 gap-1.5"
              >
                <X className="w-4 h-4" />
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={handleSave}
                className="h-8 gap-1.5"
              >
                <Save className="w-4 h-4" />
                Save
              </Button>
            </>
          ) : (
            <>
              {isAuthor && (
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setIsEditing(true)}
                    className="h-8 gap-1.5"
                  >
                    <Edit2 className="w-4 h-4" />
                    Edit
                  </Button>
                </motion.div>
              )}
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="sm"
                  onClick={handleCopy}
                  className="h-8 gap-1.5"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copy Code
                    </>
                  )}
                </Button>
              </motion.div>
            </>
          )}
        </div>
      </div>

      {/* Code Area */}
      <div className="overflow-auto max-h-[500px] scrollbar-thin">
        <CodeMirror
          value={isEditing ? editedCode : code}
          onChange={(value) => setEditedCode(value)}
          extensions={[getLanguageExtension(language)]}
          editable={isEditing}
          theme="light"
          basicSetup={{
            lineNumbers: true,
            highlightActiveLineGutter: true,
            highlightActiveLine: isEditing,
            foldGutter: true,
          }}
          className="text-sm"
        />
      </div>
    </div>
  );
};
