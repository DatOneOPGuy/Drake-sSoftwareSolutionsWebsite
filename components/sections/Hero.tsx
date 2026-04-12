'use client';

import { useEffect, useState } from 'react';
import { Box, Text, Button, Link, HStack, VStack, Grid, GridItem, Icon } from '@chakra-ui/react';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import styles from './hero.module.css';

const PILLS = ['Custom Software', 'Mobile', 'AI Integration', 'Cybersecurity', 'Web'];

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();
  useEffect(() => setMounted(true), []);

  const isLight = mounted && resolvedTheme === 'light';
  const logoSrc = isLight ? '/logo-light.png' : '/logo-dark.png';

  return (
    <section id="top" className={`${styles.wrapper} ${isLight ? styles.wrapperLight : ''}`}>
      <div className={styles.overlay} />

      <Box className={styles.heroGrid}>
        {/* Kicker + logo full width on top */}
        <VStack align="start" gap={{ base: 4, md: 6 }}>
          <Text className={styles.kicker}>Freelance software development</Text>

          <Box w="100%" display="flex" justifyContent={{ base: 'center', lg: 'flex-start' }}>
            {mounted && (
              <Image
                src={logoSrc}
                alt="Drake's Software Solutions"
                width={2790}
                height={1504}
                priority
                quality={95}
                sizes="(max-width: 768px) 92vw, (max-width: 1280px) 80vw, 1100px"
                style={{
                  width: 'clamp(320px, 76vw, 1100px)',
                  height: 'auto',
                  display: 'block',
                }}
              />
            )}
          </Box>
        </VStack>

        {/* Two-column content below the logo */}
        <Grid
          templateColumns={{ base: '1fr', lg: '1.6fr 1fr' }}
          gap={{ base: 10, lg: 14 }}
          alignItems="center"
          mt={{ base: 8, md: 10 }}
        >
          <GridItem>
            <VStack align="start" gap={6}>
              <h1 className={styles.title}>
                Precision-built software.
                <br />
                Delivered.
              </h1>
              <Text className={styles.subtitle}>
                A freelance software studio shipping custom software, mobile apps, AI-powered
                tools, and cybersecurity work for founders and small teams that need it done
                right.
              </Text>
              <HStack gap={3} flexWrap="wrap">
                {PILLS.map((p) => (
                  <Text key={p} className={styles.pill}>
                    {p}
                  </Text>
                ))}
              </HStack>
              <HStack gap={3} pt={1} flexWrap="wrap">
                <Link href="#contact" _hover={{ textDecoration: 'none' }}>
                  <Button
                    bg="accentRed"
                    color="white"
                    size="md"
                    rounded="full"
                    _hover={{ bg: 'accentRedDeep' }}
                  >
                    Start a project
                  </Button>
                </Link>
                <Link href="#work" _hover={{ textDecoration: 'none' }}>
                  <Button
                    variant="outline"
                    borderColor="borderMedium"
                    color="textPrimary"
                    size="md"
                    rounded="full"
                    _hover={{ bg: 'whiteAlpha.100', borderColor: 'accentRed' }}
                  >
                    See our work
                  </Button>
                </Link>
              </HStack>
            </VStack>
          </GridItem>

          <GridItem>
            <VStack gap={4} align="stretch">
              {/* Meta card */}
              <Box className={styles.metaPanel}>
                <Text className={styles.metaLabel}>Principal</Text>
                <Text className={styles.metaValue}>Drake Lesher</Text>
                <Text className={styles.metaDetail}>
                  Software engineer · CS student at Wofford College
                </Text>

                <Box className={styles.metaDivider} />

                <Text className={styles.metaLabel}>Location</Text>
                <Text className={styles.metaValue}>South Carolina, USA</Text>
                <Text className={styles.metaDetail}>Remote clients welcome.</Text>

                <Box className={styles.metaDivider} />

                <Text className={styles.metaLabel}>Focus areas</Text>
                <VStack align="start" gap={1.5} mt={2}>
                  <Text className={styles.metaBullet}>
                    — Security software &amp; secure-by-default systems
                  </Text>
                  <Text className={styles.metaBullet}>— Native iOS and Android apps</Text>
                  <Text className={styles.metaBullet}>— AI-powered tools and integrations</Text>
                </VStack>
              </Box>

              {/* Availability card */}
              <Box className={styles.availabilityCard}>
                <HStack gap={2.5} align="start">
                  <Icon as={CheckCircleIcon} boxSize={5} color="accentRed" mt="2px" />
                  <VStack align="start" gap={0.5}>
                    <Text className={styles.availLabel}>Availability</Text>
                    <Text className={styles.availValue}>
                      Taking on new projects
                    </Text>
                    <Text className={styles.availDetail}>
                      Currently booking a limited number of engagements. Mention your timeline
                      in the first email.
                    </Text>
                  </VStack>
                </HStack>
              </Box>
            </VStack>
          </GridItem>
        </Grid>
      </Box>
    </section>
  );
}
