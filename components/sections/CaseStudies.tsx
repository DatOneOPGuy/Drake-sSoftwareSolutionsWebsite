'use client';

import { Box, Container, Grid, Heading, Text, VStack, HStack, Badge } from '@chakra-ui/react';
import { FadeIn } from '../motion/FadeIn';
import SectionHeading from '../ui/SectionHeading';

type CaseStudy = {
  title: string;
  tag: string;
  problem: string;
  stack: string[];
  outcomes: string[];
};

// TODO: replace with real case studies before launch.
// Each card keeps the same shape: title, tag, problem, stack, outcomes.
const CASE_STUDIES: CaseStudy[] = [
  {
    title: 'Case study coming soon',
    tag: 'Mobile · iOS',
    problem: 'A short one-line description of the client problem you solved.',
    stack: ['Swift', 'SwiftUI', 'CoreData'],
    outcomes: [
      'Outcome metric one (e.g. shipped in 6 weeks)',
      'Outcome metric two (e.g. 30% faster workflow)',
      'Outcome metric three (e.g. launched on App Store)',
    ],
  },
  {
    title: 'Case study coming soon',
    tag: 'AI Integration',
    problem: 'A short one-line description of the client problem you solved.',
    stack: ['Next.js', 'OpenAI', 'PostgreSQL'],
    outcomes: [
      'Outcome metric one',
      'Outcome metric two',
      'Outcome metric three',
    ],
  },
  {
    title: 'Case study coming soon',
    tag: 'Security Software',
    problem: 'A short one-line description of the client problem you solved.',
    stack: ['Python', 'Linux', 'Networking'],
    outcomes: [
      'Outcome metric one',
      'Outcome metric two',
      'Outcome metric three',
    ],
  },
];

export default function CaseStudies() {
  return (
    <Container as="section" id="work" py={0} maxW="7xl">
      <FadeIn>
        <SectionHeading
          label="Selected work"
          title="Case studies."
          description="A handful of representative projects. Real client case studies are being prepared — ask for references if you need them sooner."
        />
        <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} gap={5}>
          {CASE_STUDIES.map((cs, i) => (
            <Box
              key={i}
              p={6}
              borderRadius="2xl"
              border="1px dashed"
              borderColor="whiteAlpha.200"
              bg="rgba(12, 8, 10, 0.6)"
              transition="all .2s ease"
              _hover={{ borderColor: 'accentRed', transform: 'translateY(-2px)' }}
            >
              <VStack align="start" gap={4}>
                <HStack justify="space-between" w="full">
                  <Badge
                    bg="rgba(220, 38, 38, 0.12)"
                    color="accentRed"
                    px={2.5}
                    py={1}
                    borderRadius="full"
                    fontSize="xs"
                    letterSpacing="0.12em"
                    textTransform="uppercase"
                    border="1px solid"
                    borderColor="rgba(220, 38, 38, 0.3)"
                  >
                    {cs.tag}
                  </Badge>
                  <Text fontSize="xs" color="gray.500" letterSpacing="0.12em" textTransform="uppercase">
                    Placeholder
                  </Text>
                </HStack>
                <Heading as="h3" size="md" color="white">
                  {cs.title}
                </Heading>
                <Text color="gray.400" fontSize="sm" lineHeight="1.7">
                  {cs.problem}
                </Text>
                <Box>
                  <Text fontSize="xs" color="gray.500" letterSpacing="0.12em" textTransform="uppercase" mb={2}>
                    Stack
                  </Text>
                  <HStack gap={2} flexWrap="wrap">
                    {cs.stack.map((t) => (
                      <Text
                        key={t}
                        fontSize="xs"
                        color="gray.300"
                        px={2}
                        py={1}
                        bg="whiteAlpha.50"
                        borderRadius="md"
                      >
                        {t}
                      </Text>
                    ))}
                  </HStack>
                </Box>
                <Box>
                  <Text fontSize="xs" color="gray.500" letterSpacing="0.12em" textTransform="uppercase" mb={2}>
                    Outcomes
                  </Text>
                  <VStack align="start" gap={1.5}>
                    {cs.outcomes.map((o) => (
                      <Text key={o} fontSize="xs" color="gray.400">
                        — {o}
                      </Text>
                    ))}
                  </VStack>
                </Box>
              </VStack>
            </Box>
          ))}
        </Grid>
      </FadeIn>
    </Container>
  );
}
