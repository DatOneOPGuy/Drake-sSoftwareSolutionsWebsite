'use client';

import { Box, Container, Grid, GridItem, Text } from '@chakra-ui/react';

const metrics = [
  { label: 'Lighthouse Perf', value: '96' },
  { label: 'Accessibility', value: '100' },
  { label: 'Best Practices', value: '100' },
  { label: 'SEO', value: '100' },
  { label: 'Interactive', value: '1.2s' },
  { label: 'Bundle Delta', value: '-18%' },
];

export default function PerformanceStrip() {
  return (
    <Container as="section" id="performance" py={0} maxW="6xl">
      <Box border="1px solid" borderColor="whiteAlpha.100" borderRadius="2xl" p={5} bg="rgba(10, 14, 22, 0.68)">
        <Text fontSize="xs" letterSpacing="0.26em" textTransform="uppercase" color="accentLight" opacity={0.75} mb={4}>
          Quality and Performance Snapshot
        </Text>
        <Grid templateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(6, 1fr)' }} gap={4}>
          {metrics.map((metric) => (
            <GridItem key={metric.label}>
              <Text color="white" fontSize="xl" fontWeight="700">{metric.value}</Text>
              <Text color="gray.400" fontSize="xs">{metric.label}</Text>
            </GridItem>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}
