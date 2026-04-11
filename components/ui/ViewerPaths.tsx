'use client';

import { Box, Button, Container, HStack, Text, VStack } from '@chakra-ui/react';

function scrollToId(id: string) {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

export default function ViewerPaths() {
  return (
    <Container as="section" id="viewer-paths" py={0} maxW="6xl">
      <Box border="1px solid" borderColor="whiteAlpha.100" borderRadius="2xl" p={5} bg="rgba(10, 14, 22, 0.68)">
        <VStack align="start" gap={3}>
          <Text fontSize="xs" letterSpacing="0.26em" textTransform="uppercase" color="accentLight" opacity={0.75}>
            Guided Paths
          </Text>
          <Text color="gray.300">
            Pick a route based on what you want to evaluate first.
          </Text>
          <HStack gap={3} wrap="wrap">
            <Button size="sm" bg="accentGreen" color="black" _hover={{ bg: 'accentLight' }} onClick={() => scrollToId('experience')}>
              For Recruiters
            </Button>
            <Button size="sm" variant="outline" borderColor="whiteAlpha.300" color="white" _hover={{ bg: 'whiteAlpha.100' }} onClick={() => scrollToId('projects')}>
              For Engineers
            </Button>
          </HStack>
        </VStack>
      </Box>
    </Container>
  );
}
