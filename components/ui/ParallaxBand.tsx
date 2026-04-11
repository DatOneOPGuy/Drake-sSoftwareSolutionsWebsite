'use client';

import { Box, Container, useBreakpointValue } from '@chakra-ui/react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const MotionBox = motion.create(Box);

interface Props {
  readonly image: string;
  readonly height?: number;
  readonly flip?: boolean;
  readonly children?: React.ReactNode;
}

export default function ParallaxBand({
  image,
  height = 72,
  flip,
  children,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], flip ? ['-10%', '10%'] : ['10%', '-10%']);

  const gradientOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.45]);

  // responsive height
  const responsiveHeight = useBreakpointValue({ base: `${height * 0.7}vh`, md: `${height}vh` });

  return (
    <Box
      ref={ref}
      position="relative"
      h={responsiveHeight}
      overflow="hidden"
      isolation="isolate"
    >
      <MotionBox
        style={{ y }}
        bgImage={`url(${image})`}
        bgSize="cover"
        bgPos="center"
        transform="scale(1.1)"
        pos="absolute"
        top={0}
        left={0}
        w="100%"
        h="100%"
      >
        <MotionBox
          pos="absolute"
          top={0}
          left={0}
          w="full"
          h="full"
          bgGradient="linear(to-b, rgba(4, 7, 13, 0.38), #070a11 84%)"
          style={{ opacity: gradientOpacity }}
        />
      </MotionBox>

      {children && (
        <Container
          pos="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          textAlign="center"
          px={8}
          color="white"
          maxW="3xl"
        >
          {children}
        </Container>
      )}
    </Box>
  );
}
