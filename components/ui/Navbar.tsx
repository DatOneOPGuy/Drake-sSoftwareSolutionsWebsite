'use client';

import { useState, useEffect } from 'react';
import { Box, Flex, Link, IconButton, Icon, HStack, Text } from '@chakra-ui/react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpIcon, SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { useTheme } from 'next-themes';

const MotionHeader = motion.create(Box);

const NAV_SECTIONS = ['about', 'services', 'process', 'work', 'faq', 'contact'] as const;

export default function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const currY = window.scrollY;
      setHidden(currY > lastY && currY > 80);
      lastY = currY;
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isLight = mounted && resolvedTheme === 'light';
  const logoSrc = isLight ? '/logo-light.png' : '/logo-dark.png';

  return (
    <MotionHeader
      animate={{ y: hidden ? -100 : 0 }}
      transition={{ type: 'spring', stiffness: 260, damping: 30 }}
      position="fixed"
      top="0"
      w="100%"
      bg="bgNav"
      backdropFilter="blur(16px)"
      borderBottom="1px solid"
      borderColor="borderSoft"
      zIndex={50}
    >
      <Flex
        maxW="7xl"
        mx="auto"
        px={6}
        py={3.5}
        align="center"
        justify="space-between"
        color="textMuted"
      >
        <Link
          href="#top"
          display="inline-flex"
          alignItems="center"
          gap={2.5}
          _hover={{ color: 'accentRed', textDecoration: 'none' }}
        >
          {mounted && (
            <Image
              src={logoSrc}
              alt="Drake's Software Solutions"
              width={28}
              height={28}
              style={{ borderRadius: 6, height: 'auto' }}
            />
          )}
          <Text
            fontSize="sm"
            fontWeight="700"
            letterSpacing="0.28em"
            textTransform="uppercase"
            display={{ base: 'none', sm: 'block' }}
            color="textPrimary"
          >
            Drake&apos;s Software Solutions
          </Text>
        </Link>
        <HStack as="nav" gap={5} fontSize="xs" fontWeight="600" letterSpacing="0.16em" textTransform="uppercase">
          {NAV_SECTIONS.map((id) => (
            <Link
              key={id}
              href={`#${id}`}
              color="textMuted"
              _hover={{ color: 'accentRed' }}
              display={{ base: id === 'contact' ? 'inline' : 'none', md: 'inline' }}
            >
              {id[0].toUpperCase() + id.slice(1)}
            </Link>
          ))}
          {mounted && (
            <IconButton
              aria-label="Toggle theme"
              onClick={() => setTheme(isLight ? 'dark' : 'light')}
              variant="ghost"
              size="sm"
              color="textMuted"
              _hover={{ color: 'accentRed', bg: 'transparent' }}
            >
              <Icon as={isLight ? MoonIcon : SunIcon} boxSize={4} />
            </IconButton>
          )}
        </HStack>
      </Flex>

      {hidden && (
        <IconButton
          position="fixed"
          bottom={6}
          right={6}
          aria-label="Back to top"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          bg="rgba(220,38,38,0.18)"
          _hover={{ bg: 'rgba(220,38,38,0.32)' }}
          backdropFilter="blur(10px)"
          size="md"
          color="textPrimary"
        >
          <Icon as={ArrowUpIcon} boxSize={5} />
        </IconButton>
      )}
    </MotionHeader>
  );
}
