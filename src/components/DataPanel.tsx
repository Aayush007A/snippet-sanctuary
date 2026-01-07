import { motion } from 'framer-motion';

interface DataPanelProps {
  title: string;
  data: string;
  className?: string;
}

export const DataPanel = ({ title, data, className = '' }: DataPanelProps) => {
  return (
    <motion.div
      className={`flex flex-col h-full ${className}`}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-center justify-between px-4 py-2 bg-secondary/50 rounded-t-xl border border-b-0 border-border">
        <span className="text-sm font-medium text-foreground">{title}</span>
      </div>
      <div className="flex-1 data-panel rounded-t-none overflow-auto scrollbar-thin">
        <pre className="text-xs text-foreground whitespace-pre-wrap break-words font-mono leading-relaxed">
          {data}
        </pre>
      </div>
    </motion.div>
  );
};
