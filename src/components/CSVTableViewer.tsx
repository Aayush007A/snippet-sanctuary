import { motion } from 'framer-motion';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

interface CSVTableViewerProps {
  title: string;
  data: string;
  className?: string;
}

const parseCSVData = (data: string): { headers: string[]; rows: string[][] } => {
  const lines = data.trim().split('\n').filter(line => line.trim());
  
  if (lines.length === 0) {
    return { headers: [], rows: [] };
  }

  // Check if it's pipe-separated (markdown table format)
  const isPipeFormat = lines[0].includes('|');
  
  if (isPipeFormat) {
    // Parse markdown table format
    const cleanLines = lines.filter(line => !line.match(/^[\s|:-]+$/)); // Remove separator lines
    const headers = cleanLines[0]
      .split('|')
      .map(cell => cell.trim())
      .filter(cell => cell);
    
    const rows = cleanLines.slice(1).map(line =>
      line
        .split('|')
        .map(cell => cell.trim())
        .filter(cell => cell)
    );
    
    return { headers, rows };
  }
  
  // Parse CSV format
  const headers = lines[0].split(',').map(h => h.trim());
  const rows = lines.slice(1).map(line => 
    line.split(',').map(cell => cell.trim())
  );
  
  return { headers, rows };
};

export const CSVTableViewer = ({ title, data, className = '' }: CSVTableViewerProps) => {
  const { headers, rows } = parseCSVData(data);

  if (headers.length === 0) {
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
        <div className="flex-1 bg-card rounded-b-xl border border-border p-4 flex items-center justify-center">
          <p className="text-muted-foreground text-sm">No data available</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className={`flex flex-col h-full ${className}`}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-center justify-between px-4 py-2 bg-secondary/50 rounded-t-xl border border-b-0 border-border">
        <span className="text-sm font-medium text-foreground">{title}</span>
        <span className="text-xs text-muted-foreground">{rows.length} rows</span>
      </div>
      <ScrollArea className="flex-1 rounded-b-xl border border-border bg-card">
        <div className="min-w-max">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50 hover:bg-muted/50">
                {headers.map((header, i) => (
                  <TableHead 
                    key={i} 
                    className="text-xs font-semibold text-foreground whitespace-nowrap px-3 py-2"
                  >
                    {header}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((row, rowIndex) => (
                <TableRow 
                  key={rowIndex}
                  className="hover:bg-muted/30 transition-colors"
                >
                  {row.map((cell, cellIndex) => (
                    <TableCell 
                      key={cellIndex} 
                      className="text-xs font-mono text-muted-foreground whitespace-nowrap px-3 py-2"
                    >
                      {cell}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </motion.div>
  );
};
