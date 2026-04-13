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
            I&apos;m Drake Lesher — a software engineer and Computer Science graduate of Wofford College
            currently building cross-platform security software at Resistine, where I work across
            Python desktop apps, native iOS (Swift), Rust-based antivirus integration, VPN systems,
            and SIEM monitoring. I partner with founders, small teams, and non-technical clients
            from first sketch all the way through shipping and support.
          </Text>

          <Box pl={4} borderLeft="2px solid" borderColor="accentRed" opacity={0.95}>
            <VStack align="start" gap={3}>
              <Text color="textMuted" fontSize="md">— Security software: endpoint protection, ClamAV, Wazuh SIEM, VPN, encryption</Text>
              <Text color="textMuted" fontSize="md">— Full-stack web: React, Next.js, FastAPI, TypeScript, Docker, WebSockets</Text>
              <Text color="textMuted" fontSize="md">— Native mobile: Swift/SwiftUI (iOS), Kotlin (Android)</Text>
              <Text color="textMuted" fontSize="md">— Data &amp; AI: Monte Carlo simulations, xG models, LLM integrations, NumPy pipelines</Text>
              <Text color="textMuted" fontSize="md">— Desktop &amp; games: Python (Briefcase), C#/.NET, Rust, Godot (GDScript)</Text>
            </VStack>
          </Box>
        </VStack>
      </FadeIn>
    </Container>
  );
}
