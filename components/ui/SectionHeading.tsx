'use client';

import { Box, Heading, Text, VStack } from '@chakra-ui/react';
import ScrambleText from './ScrambleText';

type SectionHeadingProps = {
  label: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
};

export default function SectionHeading({
  label,
  title,
  description,
  align = 'left',
}: SectionHeadingProps) {
  return (
    <VStack align={align === 'center' ? 'center' : 'start'} gap={3} mb={8} maxW="3xl">
      <Box h="2px" w="3.5rem" bgGradient="linear(to-r, accentRed, accentFlame)" opacity={0.9} />
      <Text
        fontSize="xs"
        letterSpacing="0.3em"
        textTransform="uppercase"
        color="accentRed"
        opacity={0.85}
      >
        {label}
      </Text>
      <Heading as="h2" fontSize={{ base: '2xl', md: '3xl' }} lineHeight="1.05" color="textPrimary" textAlign={align}>
        <ScrambleText text={title} speed={25} />
      </Heading>
      {description && (
        <Text fontSize={{ base: 'md', md: 'lg' }} color="textMuted" maxW="2xl" textAlign={align}>
          {description}
        </Text>
      )}
    </VStack>
  );
}
