'use client';

import { useEffect, useState } from 'react';
import { Box, Text, Button, Link, HStack, VStack, Icon } from '@chakra-ui/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import styles from './hero.module.css';

export default function Hero() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section id="top" className={styles.wrapper}>
      <div className={styles.overlay} />

      {/* Top spacer for navbar */}
      <Box flexShrink={0} h="4rem" />

      {/* Main content */}
      <VStack flex="1" justify="center" align="center" gap={0} position="relative" zIndex={1} px={{ base: 4, md: 6 }}>
        {/* Use a plain img tag for maximum Safari/cross-browser compatibility */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo-dark.png"
          alt="Drake's Software Solutions"
          className={styles.heroLogo}
          loading="eager"
          decoding="async"
        />

        <Text className={styles.kicker}>Freelance Software Development</Text>

        <h1 className={styles.title}>
          Built to last. Shipped on time.
        </h1>

        <HStack gap={4} flexWrap="wrap" justify="center" mt={5}>
          <Link href="#contact" _hover={{ textDecoration: 'none' }}>
            <Button bg="accentRed" color="white" size="lg" rounded="full" px={8} _hover={{ bg: 'accentRedDeep' }}>
              Start a project
            </Button>
          </Link>
          <Link href="#services" _hover={{ textDecoration: 'none' }}>
            <Button variant="outline" borderColor="borderMedium" color="textPrimary" size="lg" rounded="full" px={8} _hover={{ bg: 'whiteAlpha.100', borderColor: 'accentRed' }}>
              What we build
            </Button>
          </Link>
        </HStack>
      </VStack>

      {/* Scroll chevron */}
      <Box
        flexShrink={0}
        display="flex"
        justifyContent="center"
        pb={6}
        pt={4}
        opacity={scrolled ? 0 : 1}
        transition="opacity 0.4s ease"
        pointerEvents="none"
        position="relative"
        zIndex={1}
      >
        <Icon as={ChevronDownIcon} boxSize={7} color="textMuted" className={styles.bounce} />
      </Box>
    </section>
  );
}
