'use client';

import { useState, useEffect } from 'react';
import { Box, Flex, Link, IconButton, Icon, HStack, Text, VStack } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const MotionHeader = motion.create(Box);
const MotionBox = motion.create(Box);

const NAV_SECTIONS = ['about', 'services', 'process', 'work', 'faq', 'contact'] as const;

export default function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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

  const closeMenu = () => setMenuOpen(false);

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
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo-dark.png"
            alt=""
            width={36}
            height={19}
            style={{ flexShrink: 0 }}
          />
          <Text
            fontSize="sm"
            fontWeight="700"
            letterSpacing="0.28em"
            textTransform="uppercase"
            color="textPrimary"
            display={{ base: 'none', sm: 'block' }}
          >
            Drake&apos;s Software Solutions
          </Text>
        </Link>

        {/* Desktop nav */}
        <HStack as="nav" gap={5} fontSize="xs" fontWeight="600" letterSpacing="0.16em" textTransform="uppercase" display={{ base: 'none', md: 'flex' }}>
          {NAV_SECTIONS.map((id) => (
            <Link
              key={id}
              href={`#${id}`}
              color="textMuted"
              _hover={{ color: 'accentRed' }}
            >
              {id[0].toUpperCase() + id.slice(1)}
            </Link>
          ))}
        </HStack>

        {/* Mobile hamburger */}
        <IconButton
          display={{ base: 'flex', md: 'none' }}
          aria-label="Toggle menu"
          variant="ghost"
          color="textPrimary"
          onClick={() => setMenuOpen(!menuOpen)}
          size="sm"
        >
          <Icon as={menuOpen ? XMarkIcon : Bars3Icon} boxSize={6} />
        </IconButton>
      </Flex>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <MotionBox
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            overflow="hidden"
            bg="bgNav"
            borderTop="1px solid"
            borderColor="borderSoft"
            display={{ base: 'block', md: 'none' }}
          >
            <VStack as="nav" gap={0} py={2}>
              {NAV_SECTIONS.map((id) => (
                <Link
                  key={id}
                  href={`#${id}`}
                  onClick={closeMenu}
                  width="100%"
                  px={6}
                  py={3}
                  fontSize="sm"
                  fontWeight="600"
                  letterSpacing="0.16em"
                  textTransform="uppercase"
                  color="textMuted"
                  _hover={{ color: 'accentRed', bg: 'rgba(220, 38, 38, 0.06)' }}
                >
                  {id[0].toUpperCase() + id.slice(1)}
                </Link>
              ))}
            </VStack>
          </MotionBox>
        )}
      </AnimatePresence>

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
