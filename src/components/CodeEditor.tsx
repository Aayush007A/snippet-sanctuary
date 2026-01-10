import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, Edit2, Save, X } from 'lucide-react';
import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import { sql } from '@codemirror/lang-sql';
import { javascript } from '@codemirror/lang-javascript';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/hooks/useTheme';
import { EditorView } from "@codemirror/view";
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

interface CodeEditorProps {
  code: string;
  language: string;
  isAuthor: boolean;
  onSave?: (code: string) => void;
}

const getLanguageExtension = (language: string) => {
  const lang = language.toLowerCase();
  if (lang.includes('python')) return python();
  if (lang.includes('sql')) return sql();
  if (lang.includes('scala') || lang.includes('javascript') || lang.includes('java')) {
    return javascript({ jsx: false, typescript: true });
  }
  return python();
};

const languageColors: Record<string, string> = {
  'Python': 'text-yellow-600 dark:text-yellow-400',
  'JavaScript': 'text-yellow-500 dark:text-yellow-300',
  'TypeScript': 'text-blue-600 dark:text-blue-400',
  'Spark Scala': 'text-red-600 dark:text-red-400',
  'SQL': 'text-slate-600 dark:text-slate-400',
  'Java': 'text-orange-600 dark:text-orange-400',
  'C++': 'text-blue-700 dark:text-blue-500',
  'Go': 'text-cyan-600 dark:text-cyan-400',
  'HTML/CSS': 'text-orange-600 dark:text-orange-400',
};

export const CodeEditor = ({ code, language, isAuthor, onSave }: CodeEditorProps) => {
  const { theme } = useTheme();
  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedCode, setEditedCode] = useState(code);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(isEditing ? editedCode : code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = () => {
    if (onSave) {
      onSave(editedCode);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedCode(code);
    setIsEditing(false);
  };

  // --- Dynamic Theme Logic ---
  const editorTheme = useMemo(() => {
    const isDark = theme === 'dark';
    const bg = isDark ? '#282c34' : '#ffffff';
    const fg = isDark ? '#abb2bf' : '#333333';
    const gutterBg = isDark ? '#282c34' : '#f8f9fa';
    const gutterFg = isDark ? '#5c6370' : '#a0a0a0';
    const border = isDark ? '#3e4451' : '#e2e8f0';

    return EditorView.theme({
      "&": {
        height: "100%",
        backgroundColor: bg,
        color: fg,
        transition: "background-color 0.3s ease, color 0.3s ease" // Add transition to CodeMirror itself
      },
      ".cm-scroller": {
        fontFamily: "monospace",
        lineHeight: "1.6",
        overflow: "auto"
      },
      ".cm-gutters": {
        backgroundColor: gutterBg,
        color: gutterFg,
        borderRight: `1px solid ${border}`,
        transition: "background-color 0.3s ease, border-color 0.3s ease" // Add transition to gutters
      },
      ".cm-content": {
        paddingBottom: "20px"
      },
      "&.cm-focused": {
        outline: "none"
      }
    }, { dark: isDark });
  }, [theme]);

  return (
    // FIX: Using 'transition-theme' and Tailwind dark classes instead of JS conditionals
    <div className="code-container relative h-full flex flex-col border rounded-lg overflow-hidden transition-theme bg-white dark:bg-[#282c34] border-gray-200 dark:border-gray-700">
      
      {/* Header */}
      <div className="flex-none flex items-center justify-between px-4 py-3 border-b transition-theme bg-gray-50 dark:bg-[#21252b] border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3">
          {/* Window Controls */}
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          
          {/* Language Label */}
          <span className={`text-sm font-bold font-mono transition-colors duration-300 ${languageColors[language] || 'text-muted-foreground'}`}>
            {language}
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          {isEditing ? (
            <>
              <Button size="sm" variant="ghost" onClick={handleCancel} className="h-8 gap-1.5 hover:bg-destructive/10 hover:text-destructive transition-colors">
                <X className="w-4 h-4" />
                Cancel
              </Button>
              <Button size="sm" onClick={handleSave} className="h-8 gap-1.5 bg-green-600 hover:bg-green-700 text-white shadow-sm transition-all hover:scale-105">
                <Save className="w-4 h-4" />
                Save
              </Button>
            </>
          ) : (
            <>
              {isAuthor && (
                <motion.div whileTap={{ scale: 0.95 }}>
                  <Button
                    size="sm"
                    onClick={() => setIsEditing(true)}
                    className="
                      h-8 px-4 gap-2 rounded-md
                      bg-primary text-primary-foreground
                      shadow-sm
                      hover:shadow-[0_0_0_3px_rgba(34,197,94,0.25)]
                      hover:brightness-110
                      transition-all duration-300
                      font-semibold group
                    "
                  >
                    <Edit2 className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-6" />
                    Edit
                  </Button>



                </motion.div>
              )}
              <motion.div whileTap={{ scale: 0.95 }}>
                <Button size="sm" onClick={handleCopy} className="h-8 gap-1.5 bg-yellow-400 hover:bg-yellow-500 text-white border-0 shadow-sm transition-all hover:scale-105">
                  {copied ? (
                    <>
                      <Check className="w-4 h-4" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copy
                    </>
                  )}
                </Button>
              </motion.div>
            </>
          )}
        </div>
      </div>

      {/* Code Area */}
      <div className="flex-1 overflow-hidden">
        
        <CodeMirror
          value={isEditing ? editedCode : code}
          onChange={(value) => setEditedCode(value)}
          extensions={[getLanguageExtension(language), editorTheme]}
          editable={isEditing}
          theme={theme === 'dark' ? 'dark' : 'light'}
          height="100%"
          basicSetup={{
            lineNumbers: true,
            highlightActiveLineGutter: true,
            highlightActiveLine: isEditing,
            foldGutter: true,
          }}
          className="text-sm h-full"
        />
      </div>
    </div>
  );
};