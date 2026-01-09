import { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, Edit2, Save, X } from 'lucide-react';
import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import { sql } from '@codemirror/lang-sql';
import { javascript } from '@codemirror/lang-javascript';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/hooks/useTheme';

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

export const CodeEditor = ({ code, language, isAuthor, onSave }: CodeEditorProps) => {
  const { theme } = useTheme();
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
    <div className="code-container relative h-full">
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
              <Button size="sm" variant="ghost" onClick={handleCancel} className="h-8 gap-1.5">
                <X className="w-4 h-4" />
                Cancel
              </Button>
              <Button size="sm" onClick={handleSave} className="h-8 gap-1.5">
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
                <Button size="sm" onClick={handleCopy} className="h-8 gap-1.5">
                  {copied ? (
                    <>
                      <Check className="w-4 h-4" />
                      Copied!
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
      <div className="overflow-auto max-h-[70vh] scrollbar-thin">
        <CodeMirror
          value={isEditing ? editedCode : code}
          onChange={(value) => setEditedCode(value)}
          extensions={[getLanguageExtension(language)]}
          editable={isEditing}
          theme={theme === 'dark' ? 'dark' : 'light'}
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

// import { useState } from 'react';
// import { motion } from 'framer-motion';
// import { Copy, Check, Edit2, Save, X } from 'lucide-react';
// import CodeMirror from '@uiw/react-codemirror';
// import { python } from '@codemirror/lang-python';
// import { sql } from '@codemirror/lang-sql';
// import { javascript } from '@codemirror/lang-javascript';
// import { Button } from '@/components/ui/button';
// import { useTheme } from '@/hooks/useTheme';

// interface CodeEditorProps {
//   code: string;
//   language: string;
//   isAuthor: boolean;
//   onSave?: (code: string) => void;
// }

// const getLanguageExtension = (language: string) => {
//   const lang = language.toLowerCase();
//   if (lang.includes('python')) return python();
//   if (lang.includes('sql')) return sql();
//   if (lang.includes('scala') || lang.includes('javascript') || lang.includes('java')) {
//     return javascript({ jsx: false, typescript: true });
//   }
//   return python();
// };

// export const CodeEditor = ({ code, language, isAuthor, onSave }: CodeEditorProps) => {
//   const { theme } = useTheme();
//   const [copied, setCopied] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [editedCode, setEditedCode] = useState(code);

//   const handleCopy = async () => {
//     await navigator.clipboard.writeText(code);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };

//   const handleSave = () => {
//     onSave?.(editedCode);
//     setIsEditing(false);
//   };

//   const handleCancel = () => {
//     setEditedCode(code);
//     setIsEditing(false);
//   };

//   return (
//     // Updated container: flex-col to stack header and code, h-full to take parent height
//     <div className="code-container relative h-full flex flex-col bg-card border border-border rounded-lg overflow-hidden">
//       {/* Header - flex-none ensures it doesn't shrink */}
//       <div className="flex-none flex items-center justify-between px-4 py-3 bg-secondary/50 border-b border-border">
//         <div className="flex items-center gap-3">
//           <div className="flex gap-1.5">
//             <div className="w-3 h-3 rounded-full bg-destructive/80" />
//             <div className="w-3 h-3 rounded-full bg-yellow-400" />
//             <div className="w-3 h-3 rounded-full bg-green-500" />
//           </div>
//           <span className="text-sm font-medium text-muted-foreground">{language}</span>
//         </div>
        
//         <div className="flex items-center gap-2">
//           {isEditing ? (
//             <>
//               <Button size="sm" variant="ghost" onClick={handleCancel} className="h-8 gap-1.5">
//                 <X className="w-4 h-4" />
//                 Cancel
//               </Button>
//               <Button size="sm" onClick={handleSave} className="h-8 gap-1.5">
//                 <Save className="w-4 h-4" />
//                 Save
//               </Button>
//             </>
//           ) : (
//             <>
//               {isAuthor && (
//                 <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
//                   <Button
//                     size="sm"
//                     variant="outline"
//                     onClick={() => setIsEditing(true)}
//                     className="h-8 gap-1.5"
//                   >
//                     <Edit2 className="w-4 h-4" />
//                     Edit
//                   </Button>
//                 </motion.div>
//               )}
//               <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
//                 <Button size="sm" onClick={handleCopy} className="h-8 gap-1.5">
//                   {copied ? (
//                     <>
//                       <Check className="w-4 h-4" />
//                       Copied!
//                     </>
//                   ) : (
//                     <>
//                       <Copy className="w-4 h-4" />
//                       Copy
//                     </>
//                   )}
//                 </Button>
//               </motion.div>
//             </>
//           )}
//         </div>
//       </div>

//       {/* Code Area - flex-1 allows it to grow to fill remaining space */}
//       <div className="flex-1 overflow-hidden">
//         <CodeMirror
//           value={isEditing ? editedCode : code}
//           onChange={(value) => setEditedCode(value)}
//           extensions={[getLanguageExtension(language)]}
//           editable={isEditing}
//           theme={theme === 'dark' ? 'dark' : 'light'}
//           height="100%" // Forces CodeMirror to fill the wrapper height
//           basicSetup={{
//             lineNumbers: true,
//             highlightActiveLineGutter: true,
//             highlightActiveLine: isEditing,
//             foldGutter: true,
//           }}
//           className="text-sm h-full"
//         />
//       </div>
//     </div>
//   );
// };