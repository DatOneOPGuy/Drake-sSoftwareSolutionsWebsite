'use client';

import { PropsWithChildren } from 'react';
import { motion } from 'framer-motion';
import { sectionVariants } from '../../lib/motionConfig';

export function FadeIn({ children }: PropsWithChildren<{}>) {
  return (
    <motion.div
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      {children}
    </motion.div>
  );
}
