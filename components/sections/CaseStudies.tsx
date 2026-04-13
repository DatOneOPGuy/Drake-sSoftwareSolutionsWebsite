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

const CASE_STUDIES: CaseStudy[] = [
  {
    title: 'Resistine Security Platform',
    tag: 'Security · Cross-Platform',
    problem: 'A multi-platform endpoint security suite with a Python desktop app (macOS/Linux/Windows), native iOS client, Rust-based ClamAV antivirus integration, VPN management, and centralized SIEM monitoring via Wazuh.',
    stack: ['Python', 'Swift', 'Rust', 'FastAPI', 'ClamAV', 'Wazuh', 'Briefcase'],
    outcomes: [
      'Cross-platform desktop app with plugin architecture (chat, VPN, dashboard, endpoint mgmt)',
      'Rust-wrapped ClamAV engine with macOS Endpoint Security Framework integration',
      'Native Swift iOS client with ODOO API, network permissions, and WiFi/carrier detection',
      'Wazuh SIEM server for centralized threat monitoring and iPhone log collection',
    ],
  },
  {
    title: 'Crowd',
    tag: 'Full-Stack Platform',
    problem: 'A containerized social nightlife platform that lets users discover venues, see who\'s attending before arriving, check in in real-time, and connect through WebSocket messaging.',
    stack: ['React', 'TypeScript', 'FastAPI', 'SQLAlchemy', 'Docker', 'WebSockets'],
    outcomes: [
      'Real-time check-ins and social visibility for venue discovery',
      'OAuth authentication with granular privacy controls',
      'Dockerized deployment with nginx proxy and comprehensive test suite',
    ],
  },
  {
    title: 'Monte Carlo Simulation Toolkit',
    tag: 'Data Science · Finance',
    problem: 'A production-quality Monte Carlo simulation framework with an interactive Streamlit dashboard, REST API, CLI, and a specialized DCF valuation app for financial modeling.',
    stack: ['Python', 'NumPy', 'FastAPI', 'Streamlit', 'Plotly', 'SciPy'],
    outcomes: [
      'Vectorized NumPy engine supporting 200K+ trial runs with seed-based reproducibility',
      'Interactive Streamlit UI with real-time parameter controls and convergence plots',
      'Specialized DCF valuation application for financial uncertainty analysis',
    ],
  },
  {
    title: 'Serpent\'s Ladder',
    tag: 'Game Development',
    problem: 'An original game built from scratch in the Godot engine with custom physics, advanced camera systems using the Phantom Camera addon, and full scene/level management.',
    stack: ['Godot', 'GDScript', 'Phantom Camera', 'Custom Physics'],
    outcomes: [
      'Full game loop: menus, levels, scoring, and progression',
      'Custom 2D and 3D camera systems with noise emitters and tween directors',
      'Player movement, collision, and interactive game environments',
    ],
  },
  {
    title: 'Personal Finance Tracker',
    tag: 'Desktop · .NET',
    problem: 'A feature-rich console and web application suite for personal finance management. A .NET 8 console app and a companion ASP.NET Razor Pages web app with budget tracking, trend analysis, and smart insights.',
    stack: ['C#', '.NET 8/9', 'ASP.NET', 'Razor Pages', 'SQLite'],
    outcomes: [
      'Transaction CRUD with search, categorization, and budget alerts',
      'Visual budget tracking with progress bars and monthly trend reports',
      'Web companion app with dedicated controllers for budgets and transactions',
    ],
  },
  {
    title: 'UFC Analytics Dashboard',
    tag: 'Web Development',
    problem: 'A Next.js analytics dashboard for exploring UFC fighter statistics, bout history, and performance metrics with server-side rendering and responsive data visualizations.',
    stack: ['Next.js', 'TypeScript', 'React', 'Tailwind CSS'],
    outcomes: [
      'Fighter comparison and statistical breakdowns',
      'Server-side rendering for fast initial page loads',
      'Responsive design for desktop and mobile viewing',
    ],
  },
];

export default function CaseStudies() {
  return (
    <Container as="section" id="work" py={0} maxW="7xl">
      <FadeIn>
        <SectionHeading
          label="Selected work"
          title="Projects."
          description="A selection of professional, personal, and academic projects across security software, full-stack development, data science, and game design."
        />
        <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} gap={5}>
          {CASE_STUDIES.map((cs, i) => (
            <Box
              key={i}
              p={6}
              borderRadius="2xl"
              border="1px solid"
              borderColor="borderSoft"
              bg="bgCard"
              transition="all .2s ease"
              _hover={{ borderColor: 'accentRed', transform: 'translateY(-2px)' }}
            >
              <VStack align="start" gap={4}>
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
                <Heading as="h3" size="md" color="textPrimary">
                  {cs.title}
                </Heading>
                <Text color="textMuted" fontSize="sm" lineHeight="1.7">
                  {cs.problem}
                </Text>
                <Box>
                  <Text fontSize="xs" color="textFaint" letterSpacing="0.12em" textTransform="uppercase" mb={2}>
                    Stack
                  </Text>
                  <HStack gap={2} flexWrap="wrap">
                    {cs.stack.map((t) => (
                      <Text
                        key={t}
                        fontSize="xs"
                        color="textMuted"
                        px={2}
                        py={1}
                        bg="bgCardStrong"
                        borderRadius="md"
                      >
                        {t}
                      </Text>
                    ))}
                  </HStack>
                </Box>
                <Box>
                  <Text fontSize="xs" color="textFaint" letterSpacing="0.12em" textTransform="uppercase" mb={2}>
                    Highlights
                  </Text>
                  <VStack align="start" gap={1.5}>
                    {cs.outcomes.map((o) => (
                      <Text key={o} fontSize="xs" color="textSubtle">
{o}
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
