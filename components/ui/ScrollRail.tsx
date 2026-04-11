'use client';

import { Box, chakra } from '@chakra-ui/react';
import { motion, useScroll, useSpring } from 'framer-motion';

const MotionDiv = chakra(motion.div);

export default function ScrollRail() {
  const { scrollYProgress } = useScroll();
  const height = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 30,
  });

  return (
    <Box
      position="fixed"
      left="1.5rem"           // Tailwind's left-6
      top="6rem"             // Tailwind's top-24
      h="calc(100vh - 6rem)"
      w="1px"
      bg="rgba(16,16,16,0.4)" // primaryMid/40
    >
      <MotionDiv
        style={{ scaleY: height, originY: 0 }}
        w="full"
        h="full"
        bgGradient="linear(to-b, accentRed, accentRedDeep, accentFlame)"
      />
    </Box>
  );
}
