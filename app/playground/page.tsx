'use client';

import { Box, Container, VStack, Text, Link, HStack, Icon, Heading } from '@chakra-ui/react';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import dynamic from 'next/dynamic';

// Dynamic imports to avoid SSR issues with canvas
const Kaleidoscope = dynamic(() => import('../../components/playground/Kaleidoscope'), { ssr: false });
const Metaballs = dynamic(() => import('../../components/playground/Metaballs'), { ssr: false });
const WaveInterference = dynamic(() => import('../../components/playground/WaveInterference'), { ssr: false });
const FlockingSim = dynamic(() => import('../../components/playground/FlockingSim'), { ssr: false });
const Cloth = dynamic(() => import('../../components/playground/Cloth'), { ssr: false });
const Pendulum = dynamic(() => import('../../components/playground/Pendulum'), { ssr: false });

type DemoSection = {
  title: string;
  subtitle: string;
  concepts: string[];
  component: React.ComponentType;
};

const DEMOS: DemoSection[] = [
  {
    title: 'Kaleidoscope',
    subtitle: 'Generative art with rotational symmetry',
    concepts: ['12-fold symmetry', 'Particle systems', 'Polar coordinate transforms', 'Generative geometry'],
    component: Kaleidoscope,
  },
  {
    title: 'Cloth Simulation',
    subtitle: 'Verlet integration physics engine',
    concepts: ['Verlet integration', 'Distance constraints', 'Iterative solver', 'Surface normal shading'],
    component: Cloth,
  },
  {
    title: 'Pendulum Wave',
    subtitle: 'Harmonic motion and phase relationships',
    concepts: ['Simple harmonic motion', 'Phase offset', 'Frequency ratios', 'Energy conservation'],
    component: Pendulum,
  },
  {
    title: 'Metaballs',
    subtitle: 'Implicit surface rendering via scalar fields',
    concepts: ['Scalar field evaluation', 'Implicit surfaces', 'Pixel-level rendering', 'Distance functions'],
    component: Metaballs,
  },
  {
    title: 'Wave Interference',
    subtitle: 'Superposition of circular wavefronts',
    concepts: ['Wave superposition', 'Constructive/destructive interference', 'Point sources', 'Amplitude mapping'],
    component: WaveInterference,
  },
  {
    title: 'Flocking Simulation',
    subtitle: 'Emergent behavior from simple rules',
    concepts: ['Boids algorithm', 'Separation', 'Alignment', 'Cohesion'],
    component: FlockingSim,
  },
];

export default function PlaygroundPage() {
  return (
    <Box minH="100vh" pt={24} pb={20}>
      <Container maxW="5xl" px={{ base: 6, md: 10 }}>
        {/* Header */}
        <VStack align="start" gap={4} mb={16}>
          <Link href="/" display="inline-flex" alignItems="center" gap={2} color="textMuted" fontSize="sm" _hover={{ color: 'accentRed' }}>
            <Icon as={ArrowLeftIcon} boxSize={4} />
            Back to home
          </Link>
          <Box h="2px" w="3.5rem" bgGradient="linear(to-r, accentRed, accentFlame)" opacity={0.9} />
          <Text fontSize="xs" letterSpacing="0.3em" textTransform="uppercase" color="accentRed" opacity={0.85}>
            Code playground
          </Text>
          <Heading as="h1" fontSize={{ base: '3xl', md: '4xl' }} color="textPrimary" lineHeight="1.1">
            Interactive simulations.
          </Heading>
          <Text color="textMuted" fontSize="lg" maxW="2xl" lineHeight="1.7">
            Six physics and generative art demos, all written from scratch with pure HTML5 Canvas
            and React. No libraries, no dependencies. Move your mouse, click, and play.
          </Text>
        </VStack>

        {/* Demos */}
        <VStack gap={20} align="stretch">
          {DEMOS.map(({ title, subtitle, concepts, component: Component }, i) => (
            <VStack key={title} align="stretch" gap={5}>
              <HStack gap={4} align="baseline" flexWrap="wrap">
                <Text
                  fontSize="sm"
                  fontWeight="700"
                  letterSpacing="0.2em"
                  color="accentRed"
                  fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
                >
                  {String(i + 1).padStart(2, '0')}
                </Text>
                <Heading as="h2" fontSize={{ base: 'xl', md: '2xl' }} color="textPrimary">
                  {title}
                </Heading>
                <Text color="textSubtle" fontSize="sm">
{subtitle}
                </Text>
              </HStack>

              <Component />

              <HStack gap={2} flexWrap="wrap">
                {concepts.map((c) => (
                  <Text
                    key={c}
                    fontSize="xs"
                    color="textMuted"
                    px={2.5}
                    py={1}
                    bg="bgCard"
                    borderRadius="md"
                    border="1px solid"
                    borderColor="borderSoft"
                  >
                    {c}
                  </Text>
                ))}
              </HStack>
            </VStack>
          ))}
        </VStack>

        {/* Footer note */}
        <Box mt={20} pt={10} borderTop="1px solid" borderColor="borderSoft">
          <Text fontSize="sm" color="textSubtle" textAlign="center">
            All simulations are original code. Pure Canvas API, React state, and requestAnimationFrame.
            <br />
            No external physics engines, animation libraries, or WebGL required.
          </Text>
          <HStack justify="center" mt={4}>
            <Link href="/" color="accentRed" fontSize="sm" _hover={{ textDecoration: 'underline' }}>
              ← Back to Drake&apos;s Software Solutions
            </Link>
          </HStack>
        </Box>
      </Container>
    </Box>
  );
}
