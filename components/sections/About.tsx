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
            title="A studio built to ship, not to stall."
            description="Drake's Software Solutions is a freelance software development studio based in South Carolina, helping founders and teams turn ideas into precise, maintainable software."
          />

          <Text fontSize="lg" color="textMuted" lineHeight="1.8">
            I&apos;m Drake — a software engineer and Computer Science student at Wofford College with hands-on
            experience building security software, native mobile apps, and AI-powered tools. I partner with
            founders, small teams, and non-technical clients from first sketch all the way through shipping
            and support.
          </Text>

          <Box pl={4} borderLeft="2px solid" borderColor="accentRed" opacity={0.95}>
            <VStack align="start" gap={3}>
              <Text color="textMuted" fontSize="md">— Custom software, internal tools, and backend services</Text>
              <Text color="textMuted" fontSize="md">— Native iOS (Swift/SwiftUI) and Android (Kotlin) development</Text>
              <Text color="textMuted" fontSize="md">— AI integration: LLM features, RAG pipelines, workflow automation</Text>
              <Text color="textMuted" fontSize="md">— Security reviews, hardening, and secure-by-default architecture</Text>
            </VStack>
          </Box>
        </VStack>
      </FadeIn>
    </Container>
  );
}
