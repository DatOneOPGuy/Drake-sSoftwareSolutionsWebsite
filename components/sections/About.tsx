'use client';

import { Container, Text, Box, VStack } from '@chakra-ui/react';
import { FadeIn } from '../motion/FadeIn';
import SectionHeading from '../ui/SectionHeading';

export default function About() {
  return (
    <Container as="section" id="about" py={0} maxW="4xl">
      <FadeIn>
        <VStack gap={6} align="start">
          <SectionHeading
            label="About"
            title="I build practical software across product and infrastructure."
            description="From system-level tooling to user-facing apps, I focus on software that performs well and stays clear to use."
          />

          <Text fontSize="lg" color="gray.300" lineHeight="1.8">
            My background spans C, Python, Swift, React, and systems work around networking and computer vision.
            I like projects that sit between product and infrastructure, where the code has to be useful and the UI still matters.
          </Text>

          <Box pl={4} borderLeft="2px solid" borderColor="accentGreen" opacity={0.9}>
            <VStack align="start" gap={3}>
              <Text color="gray.300" fontSize="md"> Bridging desktop apps, mobile apps, and backend services</Text>
              <Text color="gray.300" fontSize="md"> Building real time pipelines for vision and network data</Text>
              <Text color="gray.300" fontSize="md"> Designing interfaces that stay clear under heavy use</Text>
              <Text color="gray.300" fontSize="md"> Automating repeat work with scripts and internal tools</Text>
            </VStack>
          </Box>
        </VStack>
      </FadeIn>
    </Container>
  );
}
