// components/Revealer.tsx
'use client';

import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export function Revealer({ children }: { children: React.ReactNode }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-20% 0px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="opacity-0"
    >
      {children}
    </motion.div>
  );
}