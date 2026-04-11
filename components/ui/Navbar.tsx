'use client';

import { useState, useEffect } from 'react';
import { Box, Flex, Link, IconButton, Icon } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { ArrowUpIcon } from '@heroicons/react/24/outline';

const MotionHeader = motion.create(Box);

export default function Navbar() {
  const [hidden, setHidden] = useState(false);

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

  return (
    <MotionHeader
      animate={{ y: hidden ? -100 : 0 }}
      transition={{ type: 'spring', stiffness: 260, damping: 30 }}
      position="fixed"
      top="0"
      w="100%"
      bg="rgba(7,10,17,0.72)"
      backdropFilter="blur(16px)"
      borderBottom="1px solid"
      borderColor="whiteAlpha.100"
      zIndex={50}
    >
      <Flex
        maxW="7xl"
        mx="auto"
        px={6}
        py={3.5}
        align="center"
        justify="space-between"
        color="accentLight"
      >
        <Link
          href="/"
          fontSize="sm"
          fontWeight="700"
          letterSpacing="0.32em"
          textTransform="uppercase"
          _hover={{ color: 'accentGreen' }}
        >
          Mahmoud Elfeel
        </Link>
        <Flex as="nav" gap={5} fontSize="xs" fontWeight="600" letterSpacing="0.16em" textTransform="uppercase">
          {['about', 'experience', 'projects', 'contact'].map((id) => (
            <Link
              key={id}
              href={`#${id}`}
              _hover={{ color: 'accentGreen' }}
            >
              {id[0].toUpperCase() + id.slice(1)}
            </Link>
          ))}
        </Flex>
      </Flex>

      {hidden && (
        <IconButton
          position="fixed"
          bottom={6}
          right={6}
          aria-label="Back to top"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          bg="rgba(0,224,166,0.16)"
          _hover={{ bg: 'rgba(0,224,166,0.28)' }}
          backdropFilter="blur(10px)"
          size="md"
        >
          <Icon as={ArrowUpIcon} boxSize={5} />
        </IconButton>
      )}
    </MotionHeader>
  );
}
