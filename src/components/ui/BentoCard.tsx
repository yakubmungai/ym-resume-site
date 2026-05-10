import { motion } from 'motion/react';
import { cn } from '../../lib/utils';

interface BentoCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  id?: string;
}

export function BentoCard({ children, className, delay = 0, id }: BentoCardProps) {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <motion.div
      id={id}
      initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      whileInView={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
      whileHover={!isMobile ? {
        y: -4,
        scale: 1.01,
        transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
      } : {}}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: isMobile ? 0 : delay, ease: [0.16, 1, 0.3, 1] }}


      className={cn("bento-card group", className)}
    >
      {children}
    </motion.div>
  );
}
