'use client';

import { Box, Text, Button, Link, HStack, VStack, Grid, GridItem } from '@chakra-ui/react';
import Image from 'next/image';
import styles from './hero.module.css';

const PILLS = ['Custom Software', 'Mobile', 'AI Integration', 'Cybersecurity', 'Web'];

export default function Hero() {
  return (
    <section id="top" className={styles.wrapper}>
      <div className={styles.overlay} />
      <Grid className={styles.heroGrid} templateColumns={{ base: '1fr', lg: '2.1fr 1fr' }} gap={{ base: 10, lg: 12 }}>
        <GridItem>
          <VStack className={styles.titleBox} gap={5} align="start">
            <Text className={styles.kicker}>Freelance software development</Text>
            <Box w="100%" mt={{ base: 2, md: 4 }} mb={{ base: 2, md: 4 }}>
              <Image
                src="/logo-dark.png"
                alt="Drake's Software Solutions"
                width={900}
                height={466}
                priority
                sizes="(max-width: 768px) 90vw, (max-width: 1280px) 70vw, 900px"
                style={{
                  width: 'clamp(320px, 68vw, 900px)',
                  height: 'auto',
                  display: 'block',
                }}
              />
            </Box>
            <h1 className={styles.title}>Precision-built software.<br />Delivered.</h1>
            <Text className={styles.subtitle}>
              A freelance software studio shipping custom software, mobile apps, AI-powered tools, and
              cybersecurity work for founders and small teams that need it done right.
            </Text>
            <HStack gap={3} flexWrap="wrap">
              {PILLS.map((p) => (
                <Text key={p} className={styles.pill}>{p}</Text>
              ))}
            </HStack>
            <HStack gap={3} pt={2} flexWrap="wrap">
              <Link href="#contact" _hover={{ textDecoration: 'none' }}>
                <Button bg="accentRed" color="white" size="md" rounded="full" _hover={{ bg: 'accentRedDeep' }}>
                  Start a project
                </Button>
              </Link>
              <Link href="#work" _hover={{ textDecoration: 'none' }}>
                <Button variant="outline" borderColor="whiteAlpha.400" color="white" size="md" rounded="full" _hover={{ bg: 'whiteAlpha.100', borderColor: 'accentRed' }}>
                  See our work
                </Button>
              </Link>
            </HStack>
          </VStack>
        </GridItem>
        <GridItem>
          <Box className={styles.metaPanel}>
            <Text className={styles.metaLabel}>Principal</Text>
            <Text className={styles.metaValue}>Drake Lesher</Text>
            <Text className={styles.metaDetail}>Software engineer · CS student at Wofford College</Text>

            <Box className={styles.metaDivider} />

            <Text className={styles.metaLabel}>Location</Text>
            <Text className={styles.metaValue}>South Carolina, USA</Text>
            <Text className={styles.metaDetail}>Remote clients welcome.</Text>

            <Box className={styles.metaDivider} />

            <Text className={styles.metaLabel}>Focus areas</Text>
            <VStack align="start" gap={1.5} mt={2}>
              <Text className={styles.metaBullet}>— Security software &amp; secure-by-default systems</Text>
              <Text className={styles.metaBullet}>— Native iOS and Android apps</Text>
              <Text className={styles.metaBullet}>— AI-powered tools and integrations</Text>
            </VStack>
          </Box>
        </GridItem>
      </Grid>
    </section>
  );
}
