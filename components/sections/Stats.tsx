'use client';

import { useEffect, useRef, useState } from 'react';
import { Box, Container, Grid, Text, VStack } from '@chakra-ui/react';
import { FadeIn } from '../motion/FadeIn';

type Stat = {
  value: number;
  suffix: string;
  label: string;
};

const STATS: Stat[] = [
  { value: 6, suffix: '+', label: 'Projects shipped' },
  { value: 7, suffix: '', label: 'Languages' },
  { value: 4, suffix: '', label: 'Platforms' },
  { value: 100, suffix: 'K+', label: 'Lines of code' },
];

function AnimatedNumber({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          animate();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasAnimated]);

  const animate = () => {
    const duration = 1500;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    };

    requestAnimationFrame(tick);
  };

  return (
    <Text
      ref={ref}
      fontSize={{ base: '3xl', md: '5xl' }}
      fontWeight="800"
      color="accentRed"
      lineHeight="1"
      fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
    >
      {count}{suffix}
    </Text>
  );
}

export default function Stats() {
  return (
    <Container as="section" py={0} maxW="5xl">
      <FadeIn>
        <Grid
          templateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }}
          gap={{ base: 8, md: 6 }}
        >
          {STATS.map((stat) => (
            <VStack key={stat.label} gap={1} textAlign="center">
              <AnimatedNumber target={stat.value} suffix={stat.suffix} />
              <Text
                fontSize="xs"
                fontWeight="600"
                letterSpacing="0.2em"
                textTransform="uppercase"
                color="textSubtle"
              >
                {stat.label}
              </Text>
            </VStack>
          ))}
        </Grid>
      </FadeIn>
    </Container>
  );
}
