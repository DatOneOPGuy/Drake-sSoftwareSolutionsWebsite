'use client';

import { Box, Heading, Text, VStack } from '@chakra-ui/react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const MotionBox = motion.create(Box);

type ScrollOverlayPanelProps = {
  label: string;
  title: string;
  description: string;
  image?: string;
  video?: string;
  align?: 'left' | 'right';
};

export default function ScrollOverlayPanel({
  label,
  title,
  description,
  image,
  video,
  align = 'left',
}: ScrollOverlayPanelProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['8%', '-8%']);
  const scale = useTransform(scrollYProgress, [0, 1], [1.08, 1]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.7, 0.55, 0.7]);

  return (
    <Box ref={ref} as="section" h={{ base: '120vh', md: '135vh' }}>
      <Box
        position="sticky"
        top={0}
        h="100vh"
        overflow="hidden"
        borderTop="1px solid"
        borderBottom="1px solid"
        borderColor="whiteAlpha.100"
      >
        {video ? (
          <motion.video
            style={{ y, scale, position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
            src={video}
            autoPlay
            muted
            loop
            playsInline
          />
        ) : (
          <MotionBox
            style={{ y, scale }}
            position="absolute"
            inset={0}
            bgImage={`url(${image})`}
            bgSize="cover"
            bgPos="center"
          />
        )}

        <MotionBox
          style={{ opacity: overlayOpacity }}
          position="absolute"
          inset={0}
          bgGradient="linear(to-b, rgba(5, 6, 8, 0.62), rgba(5, 6, 8, 0.92))"
        />

        <Box
          position="absolute"
          inset={0}
          display="flex"
          alignItems="end"
          justifyContent={align === 'right' ? 'flex-end' : 'flex-start'}
          px={{ base: 5, md: 10 }}
          pb={{ base: 10, md: 14 }}
        >
          <VStack
            align="start"
            gap={3}
            maxW="2xl"
            bg="rgba(8, 10, 14, 0.72)"
            border="1px solid"
            borderColor="whiteAlpha.200"
            borderRadius="2xl"
            p={{ base: 5, md: 7 }}
            backdropFilter="blur(8px)"
          >
            <Text fontSize="xs" letterSpacing="0.26em" textTransform="uppercase" color="accentLight" opacity={0.78}>
              {label}
            </Text>
            <Heading as="h3" fontSize={{ base: '2xl', md: '4xl' }} lineHeight="1.04" color="white">
              {title}
            </Heading>
            <Text color="gray.300" fontSize={{ base: 'md', md: 'lg' }} lineHeight="1.75">
              {description}
            </Text>
          </VStack>
        </Box>
      </Box>
    </Box>
  );
}
