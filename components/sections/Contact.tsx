'use client';

import { Container, VStack, Text, Link as ChakraLink, Icon, HStack } from '@chakra-ui/react';
import { EnvelopeIcon } from '@heroicons/react/24/outline';
import { FaLinkedin } from 'react-icons/fa';
import { FadeIn } from '../motion/FadeIn';
import SectionHeading from '../ui/SectionHeading';

// TODO: replace EMAIL with real contact email before deploying
const EMAIL = 'hello@drakessoftwaresolutions.com';
const LINKEDIN = 'https://linkedin.com/in/drakelesher';

export default function Contact() {
  return (
    <Container as="section" id="contact" py={0} maxW="4xl">
      <FadeIn>
        <SectionHeading
          label="Contact"
          title="Have a project in mind?"
          description="Email is the fastest way to reach the studio. Tell me about your goals, timeline, and what you&rsquo;d like built — I&rsquo;ll reply within one business day."
        />
        <VStack align="start" gap={5} fontSize="lg">
          <HStack gap={3}>
            <Icon as={EnvelopeIcon} boxSize={5} color="accentRed" />
            <ChakraLink
              href={`mailto:${EMAIL}`}
              textDecoration="underline"
              _hover={{ color: 'accentRed' }}
            >
              {EMAIL}
            </ChakraLink>
          </HStack>
          <HStack gap={3}>
            <Icon as={FaLinkedin} boxSize={5} color="accentRed" />
            <ChakraLink
              href={LINKEDIN}
              target="_blank"
              rel="noopener noreferrer"
              textDecoration="underline"
              _hover={{ color: 'accentRed' }}
            >
              LinkedIn
            </ChakraLink>
          </HStack>
          <Text fontSize="sm" color="textSubtle" pt={2}>
            Currently taking on a limited number of new projects. Mention your timeline in the first email.
          </Text>
        </VStack>
      </FadeIn>
    </Container>
  );
}
