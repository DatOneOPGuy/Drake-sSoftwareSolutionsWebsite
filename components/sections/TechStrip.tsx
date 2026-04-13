'use client';

import { Box, Container, Flex, Text } from '@chakra-ui/react';
import { FadeIn } from '../motion/FadeIn';

const TECH = [
  'Python',
  'TypeScript',
  'Swift',
  'Rust',
  'C#',
  'React',
  'Next.js',
  'FastAPI',
  'Docker',
  'Godot',
  'NumPy',
  '.NET',
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
          borderColor="borderSoft"
          bg="bgCardStrong"
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
                color="textSubtle"
                transition="color .2s ease"
                _hover={{ color: 'textPrimary' }}
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
