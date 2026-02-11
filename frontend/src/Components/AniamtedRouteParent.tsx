import { motion } from 'motion/react';
import type React from 'react';

export default function AniamtedRouteParent({ children }: { children: React.ReactElement }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      className="w-full h-full"
    >
      {children}
    </motion.div>
  );
}
