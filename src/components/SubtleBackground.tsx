import { motion } from 'framer-motion';

export const SubtleBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Large Gradient Orbs - More visible */}
      <motion.div
        className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full opacity-60 dark:opacity-40"
        style={{
          background: 'radial-gradient(circle, hsl(var(--primary) / 0.3) 0%, transparent 70%)',
        }}
        animate={{
          x: [0, 40, 0],
          y: [0, -30, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      <motion.div
        className="absolute top-1/4 -left-40 w-[450px] h-[450px] rounded-full opacity-50 dark:opacity-30"
        style={{
          background: 'radial-gradient(circle, hsl(142 71% 45% / 0.25) 0%, transparent 70%)',
        }}
        animate={{
          x: [0, -30, 0],
          y: [0, 40, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
      />
      
      <motion.div
        className="absolute bottom-10 right-1/4 w-[400px] h-[400px] rounded-full opacity-40 dark:opacity-25"
        style={{
          background: 'radial-gradient(circle, hsl(25 95% 53% / 0.2) 0%, transparent 70%)',
        }}
        animate={{
          x: [0, 35, 0],
          y: [0, -25, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 4,
        }}
      />

      {/* Secondary smaller orbs */}
      <motion.div
        className="absolute top-1/2 right-10 w-[200px] h-[200px] rounded-full opacity-30 dark:opacity-20"
        style={{
          background: 'radial-gradient(circle, hsl(262 83% 58% / 0.3) 0%, transparent 70%)',
        }}
        animate={{
          y: [-20, 20, -20],
          x: [-10, 10, -10],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
      />

      {/* Grid Pattern - More visible */}
      <div 
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06]"
        style={{
          backgroundImage: `
            linear-gradient(to right, hsl(var(--foreground)) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(var(--foreground)) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Floating Particles - Larger and more visible */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-primary/40 dark:bg-primary/30"
          style={{
            width: `${4 + (i % 3) * 2}px`,
            height: `${4 + (i % 3) * 2}px`,
            left: `${8 + i * 7.5}%`,
            top: `${15 + (i % 4) * 20}%`,
          }}
          animate={{
            y: [-30, 30, -30],
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 5 + i * 0.4,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.25,
          }}
        />
      ))}

      {/* Subtle Gradient Overlay */}
      <div 
        className="absolute inset-0 opacity-30 dark:opacity-20"
        style={{
          background: 'radial-gradient(ellipse at top, transparent 0%, hsl(var(--background)) 70%)',
        }}
      />
    </div>
  );
};
