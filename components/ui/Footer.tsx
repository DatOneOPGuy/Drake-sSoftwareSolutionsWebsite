'use client';

import { useState, useEffect } from 'react';
import { Box, Flex, Text, Link, IconButton, Icon, VStack, HStack } from '@chakra-ui/react';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import {
  ArrowUpIcon,
  EnvelopeIcon,
} from '@heroicons/react/24/outline';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

// TODO: replace with real contact info before deploying
const EMAIL = 'hello@drakessoftwaresolutions.com';
const GITHUB = 'https://github.com/TODO';
const LINKEDIN = 'https://linkedin.com/in/TODO';

export default function Footer() {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const year = new Date().getFullYear();
  const isLight = mounted && resolvedTheme === 'light';
  const logoSrc = isLight ? '/logo-light.png' : '/logo-dark.png';

  return (
    <Box
      as="footer"
      mt={32}
      borderTop="1px solid"
      borderColor="borderSoft"
      bg="bgFooter"
      py={12}
      fontSize="sm"
      color="textMuted"
    >
      <Flex
        maxW="5xl"
        mx="auto"
        px={6}
        direction={{ base: 'column', md: 'row' }}
        align="center"
        justify="space-between"
        gap={6}
      >
        <HStack gap={3} align="center">
          {mounted && (
            <Image
              src={logoSrc}
              alt="Drake's Software Solutions"
              width={36}
              height={36}
              style={{ borderRadius: 6, height: 'auto' }}
            />
          )}
          <VStack align={{ base: 'center', md: 'start' }} gap={0}>
            <Text fontWeight="600" color="textPrimary">Drake&apos;s Software Solutions</Text>
            <Text fontSize="xs" opacity={0.7}>
              © {year} — Precision-built software. Delivered.
            </Text>
          </VStack>
        </HStack>

        <Flex align="center" gap={4}>
          <Link
            href={`mailto:${EMAIL}`}
            _hover={{ color: 'accentRed' }}
            aria-label="Email"
          >
            <Icon as={EnvelopeIcon} boxSize={5} />
          </Link>
          <Link
            href={GITHUB}
            target="_blank"
            rel="noopener noreferrer"
            _hover={{ color: 'accentRed' }}
            aria-label="GitHub"
          >
            <Icon as={FaGithub} boxSize={5} />
          </Link>
          <Link
            href={LINKEDIN}
            target="_blank"
            rel="noopener noreferrer"
            _hover={{ color: 'accentRed' }}
            aria-label="LinkedIn"
          >
            <Icon as={FaLinkedin} boxSize={5} />
          </Link>
        </Flex>
      </Flex>

      {visible && (
        <IconButton
          position="fixed"
          bottom={6}
          right={6}
          zIndex={50}
          aria-label="Back to top"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          bg="rgba(220,38,38,0.18)"
          _hover={{ bg: 'rgba(220,38,38,0.32)' }}
          backdropFilter="blur(10px)"
          size="md"
        >
          <Icon as={ArrowUpIcon} boxSize={5} />
        </IconButton>
      )}
    </Box>
  );
}
