'use client';

import { useState, useEffect } from 'react';
import { Box, Flex, Text, Link, IconButton, Icon, VStack, HStack } from '@chakra-ui/react';
import {
  ArrowUpIcon,
  EnvelopeIcon,
} from '@heroicons/react/24/outline';
import { FaLinkedin } from 'react-icons/fa';

const EMAIL = 'drake@drakesdev.com';
const LINKEDIN = 'https://linkedin.com/in/drakelesher';

export default function Footer() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const year = new Date().getFullYear();

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
        <VStack align={{ base: 'center', md: 'start' }} gap={0}>
          <Text fontWeight="600" color="textPrimary">Drake&apos;s Software Solutions</Text>
          <Text fontSize="xs" opacity={0.7}>
            &copy; {year} | Built to last. Shipped on time.
          </Text>
        </VStack>

        <Flex align="center" gap={4}>
          <Link href={`mailto:${EMAIL}`} _hover={{ color: 'accentRed' }} aria-label="Email">
            <Icon as={EnvelopeIcon} boxSize={5} />
          </Link>
          <Link href={LINKEDIN} target="_blank" rel="noopener noreferrer" _hover={{ color: 'accentRed' }} aria-label="LinkedIn">
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
