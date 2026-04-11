'use client';

import { Box, Container, Flex, Text } from '@chakra-ui/react';
import { FadeIn } from '../motion/FadeIn';

const TECH = [
  'Swift',
  'Kotlin',
  'React',
  'Next.js',
  'TypeScript',
  'Python',
  'Node.js',
  'PostgreSQL',
  'AWS',
  'Docker',
];

export default function TechStrip() {
  return (
    <Container as="section" id="tech" py={0} maxW="7xl">
      <FadeIn>
        <Box
          py={8}
          px={6}
          borderRadius="2xl"
          border="1px solid"
          borderColor="whiteAlpha.100"
          bg="rgba(8, 6, 8, 0.72)"
        >
          <Text
            fontSize="xs"
            letterSpacing="0.3em"
            textTransform="uppercase"
            color="accentRed"
            opacity={0.85}
            mb={4}
            textAlign="center"
          >
            Tools of the trade
          </Text>
          <Flex
            wrap="wrap"
            justify="center"
            align="center"
            gap={{ base: 4, md: 8 }}
            fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
          >
            {TECH.map((name) => (
              <Text
                key={name}
                fontSize={{ base: 'sm', md: 'md' }}
                color="gray.400"
                transition="color .2s ease"
                _hover={{ color: 'white' }}
                letterSpacing="0.04em"
              >
                {name}
              </Text>
            ))}
          </Flex>
        </Box>
      </FadeIn>
    </Container>
  );
}
