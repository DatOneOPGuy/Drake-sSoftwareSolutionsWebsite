'use client';

import { Box, Container, Grid, Heading, Text, VStack, HStack } from '@chakra-ui/react';
import { FadeIn } from '../motion/FadeIn';
import SectionHeading from '../ui/SectionHeading';

const STEPS = [
  {
    num: '01',
    title: 'Discover',
    description: 'Scope the real problem, the constraints, and what success looks like. Fixed-fee discovery for new engagements.',
  },
  {
    num: '02',
    title: 'Design',
    description: 'Technical proposal, architecture sketch, and a realistic plan you can show to stakeholders.',
  },
  {
    num: '03',
    title: 'Build',
    description: 'Iterative delivery with working demos — not surprises at the end. You see progress every week.',
  },
  {
    num: '04',
    title: 'Deliver',
    description: 'Deploy, document, hand off, and offer ongoing support when it makes sense to keep working together.',
  },
];

export default function Process() {
  return (
    <Container as="section" id="process" py={0} maxW="7xl">
      <FadeIn>
        <SectionHeading
          label="Process"
          title="How we work."
          description="A simple four-step process designed around giving you confidence and control at every stage."
        />
        <Grid templateColumns={{ base: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }} gap={5}>
          {STEPS.map(({ num, title, description }, i) => (
            <Box
              key={num}
              position="relative"
              p={6}
              borderRadius="2xl"
              border="1px solid"
              borderColor="whiteAlpha.100"
              bg="rgba(12, 8, 10, 0.68)"
              transition="all .2s ease"
              _hover={{ borderColor: 'accentRed', transform: 'translateY(-2px)' }}
            >
              <VStack align="start" gap={3}>
                <HStack gap={3} align="center">
                  <Text
                    fontSize="sm"
                    fontWeight="700"
                    letterSpacing="0.2em"
                    color="accentRed"
                  >
                    {num}
                  </Text>
                  <Box flex={1} h="1px" bgGradient="linear(to-r, accentRed, transparent)" opacity={0.5} />
                </HStack>
                <Heading as="h3" size="md" color="white">
                  {title}
                </Heading>
                <Text color="gray.400" fontSize="sm" lineHeight="1.7">
                  {description}
                </Text>
              </VStack>
              {i < STEPS.length - 1 && (
                <Box
                  display={{ base: 'none', lg: 'block' }}
                  position="absolute"
                  top="50%"
                  right="-12px"
                  w="24px"
                  h="2px"
                  bg="accentRed"
                  opacity={0.5}
                  transform="translateY(-50%)"
                />
              )}
            </Box>
          ))}
        </Grid>
      </FadeIn>
    </Container>
  );
}
