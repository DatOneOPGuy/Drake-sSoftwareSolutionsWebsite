'use client';

import { Box, Container, Grid, Heading, Text, VStack, Icon } from '@chakra-ui/react';
import {
  CodeBracketSquareIcon,
  DevicePhoneMobileIcon,
  CpuChipIcon,
  ShieldCheckIcon,
  GlobeAltIcon,
} from '@heroicons/react/24/outline';
import { FadeIn } from '../motion/FadeIn';
import SectionHeading from '../ui/SectionHeading';

type Service = {
  icon: typeof CodeBracketSquareIcon;
  title: string;
  description: string;
  highlights: string[];
};

const SERVICES: Service[] = [
  {
    icon: CodeBracketSquareIcon,
    title: 'Custom Software Development',
    description: 'Internal tools, automation, backend services, and APIs built to the shape of your business.',
    highlights: ['Backend services & APIs', 'Internal tools', 'Automation & integrations'],
  },
  {
    icon: DevicePhoneMobileIcon,
    title: 'Mobile App Development',
    description: 'Native iOS (Swift/SwiftUI) and Android (Kotlin) applications — and cross-platform when that fits better.',
    highlights: ['iOS: Swift / SwiftUI', 'Android: Kotlin', 'App Store & Play launch'],
  },
  {
    icon: CpuChipIcon,
    title: 'AI Integration',
    description: 'Add LLM features, RAG pipelines, and workflow automation to existing products — pragmatic, not hype-driven.',
    highlights: ['LLM features & chat', 'RAG / search over your data', 'Workflow automation'],
  },
  {
    icon: ShieldCheckIcon,
    title: 'Cybersecurity Solutions',
    description: 'Security reviews, hardening, and secure-by-default architecture for products that handle real user data.',
    highlights: ['Security reviews & audits', 'Auth & secrets hardening', 'Threat modeling'],
  },
  {
    icon: GlobeAltIcon,
    title: 'Web Development',
    description: 'Marketing sites, web apps, and dashboards with a focus on performance, accessibility, and polish.',
    highlights: ['Marketing & product sites', 'Dashboards & admin UIs', 'Next.js / React stack'],
  },
];

export default function Services() {
  return (
    <Container as="section" id="services" py={0} maxW="7xl">
      <FadeIn>
        <SectionHeading
          label="Services"
          title="What we build."
          description="Five focused practices, all delivered by the same person who wrote the proposal — no handoffs, no hidden subcontractors."
        />
        <Grid
          templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }}
          gap={5}
        >
          {SERVICES.map(({ icon, title, description, highlights }) => (
            <Box
              key={title}
              p={6}
              borderRadius="2xl"
              border="1px solid"
              borderColor="borderSoft"
              bg="bgCard"
              transition="all .2s ease"
              _hover={{
                borderColor: 'accentRed',
                transform: 'translateY(-2px)',
                boxShadow: '0 20px 40px rgba(220, 38, 38, 0.08)',
              }}
            >
              <VStack align="start" gap={4}>
                <Box
                  p={2.5}
                  borderRadius="xl"
                  bg="rgba(220, 38, 38, 0.12)"
                  border="1px solid"
                  borderColor="rgba(220, 38, 38, 0.3)"
                >
                  <Icon as={icon} boxSize={6} color="accentRed" />
                </Box>
                <Heading as="h3" size="md" color="textPrimary">
                  {title}
                </Heading>
                <Text color="textMuted" fontSize="sm" lineHeight="1.7">
                  {description}
                </Text>
                <VStack align="start" gap={1.5} pt={1}>
                  {highlights.map((h) => (
                    <Text key={h} color="textSubtle" fontSize="xs">
                      — {h}
                    </Text>
                  ))}
                </VStack>
              </VStack>
            </Box>
          ))}
        </Grid>
      </FadeIn>
    </Container>
  );
}
