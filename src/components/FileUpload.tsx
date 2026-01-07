import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Upload, FileSpreadsheet, X, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

interface FileUploadProps {
  label: string;
  value: string;
  onChange: (data: string) => void;
  accept?: string;
}

const parseCSVContent = (content: string): string => {
  return content.trim();
};

const parseExcelFile = async (file: File): Promise<string> => {
  // For Excel files, we'll read as text if possible, or show a message
  // In a real app, you'd use a library like xlsx
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        // If it's actually CSV content saved as xlsx, it might work
        resolve(content);
      } catch {
        reject(new Error('Could not parse Excel file'));
      }
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });
};

export const FileUpload = ({ label, value, onChange, accept = '.csv,.xlsx,.xls' }: FileUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    const validTypes = [
      'text/csv',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'text/plain'
    ];
    
    const isValidExtension = /\.(csv|xlsx|xls)$/i.test(file.name);
    
    if (!validTypes.includes(file.type) && !isValidExtension) {
      toast({
        title: 'Invalid file type',
        description: 'Please upload a CSV or Excel file (.csv, .xlsx, .xls)',
        variant: 'destructive'
      });
      return;
    }

    try {
      let content: string;
      
      if (file.name.endsWith('.csv') || file.type === 'text/csv' || file.type === 'text/plain') {
        content = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (e) => resolve(e.target?.result as string);
          reader.onerror = () => reject(new Error('Failed to read file'));
          reader.readAsText(file);
        });
      } else {
        content = await parseExcelFile(file);
      }

      const parsedContent = parseCSVContent(content);
      onChange(parsedContent);
      setFileName(file.name);
      
      toast({
        title: 'File uploaded',
        description: `${file.name} has been loaded successfully`,
      });
    } catch (error) {
      toast({
        title: 'Error reading file',
        description: 'Could not parse the file. Please check the format.',
        variant: 'destructive'
      });
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const clearFile = () => {
    setFileName(null);
    onChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground">{label}</label>
      
      <motion.div
        className={`
          relative border-2 border-dashed rounded-xl p-6 text-center transition-all cursor-pointer
          ${isDragging 
            ? 'border-primary bg-primary/5' 
            : fileName 
              ? 'border-green-500/50 bg-green-500/5 dark:border-green-400/50 dark:bg-green-400/5' 
              : 'border-border hover:border-primary/50 hover:bg-secondary/30'
          }
        `}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => fileInputRef.current?.click()}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleInputChange}
          className="hidden"
        />

        {fileName ? (
          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <Check className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <div className="text-left">
              <p className="text-sm font-medium text-foreground">{fileName}</p>
              <p className="text-xs text-muted-foreground">Click to replace or drag a new file</p>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="ml-2"
              onClick={(e) => {
                e.stopPropagation();
                clearFile();
              }}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-xl bg-secondary mx-auto flex items-center justify-center">
              {isDragging ? (
                <Upload className="w-6 h-6 text-primary animate-bounce" />
              ) : (
                <FileSpreadsheet className="w-6 h-6 text-muted-foreground" />
              )}
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">
                {isDragging ? 'Drop your file here' : 'Upload CSV or Excel file'}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Drag and drop or click to browse
              </p>
            </div>
            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <span className="px-2 py-0.5 bg-secondary rounded">.csv</span>
              <span className="px-2 py-0.5 bg-secondary rounded">.xlsx</span>
              <span className="px-2 py-0.5 bg-secondary rounded">.xls</span>
            </div>
          </div>
        )}
      </motion.div>

      {value && (
        <div className="mt-3 p-3 bg-secondary/50 rounded-lg border border-border">
          <p className="text-xs text-muted-foreground mb-2">Preview (first 5 lines):</p>
          <pre className="text-xs font-mono text-foreground overflow-x-auto">
            {value.split('\n').slice(0, 5).join('\n')}
            {value.split('\n').length > 5 && '\n...'}
          </pre>
        </div>
      )}
    </div>
  );
};
