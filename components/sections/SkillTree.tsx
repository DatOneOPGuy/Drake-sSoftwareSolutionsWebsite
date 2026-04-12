'use client';

import {
  Box,
  Text,
  Button,
  Icon,
  Grid,
  VStack,
} from '@chakra-ui/react';
import { Collapse } from '@chakra-ui/transition';
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import { useState } from 'react';
import SectionHeading from '../ui/SectionHeading';

type Skill = {
  skill: string;
  summary: string;
  techStack: Record<string, string[]>;
};

const skills: Skill[] = [
  {
    skill: 'Custom Software',
    summary: 'Internal tools, automation, backend services, and APIs that disappear into the business once they ship.',
    techStack: {
      TypeScript: ['Node.js', 'Express', 'Next.js API routes'],
      Python: ['FastAPI', 'Scripting', 'Data pipelines'],
      Databases: ['PostgreSQL', 'SQLite', 'Firestore'],
    },
  },
  {
    skill: 'Mobile Development',
    summary: 'Native iOS and Android apps built for performance and a first-class feel on each platform.',
    techStack: {
      iOS: ['Swift', 'SwiftUI', 'UIKit'],
      Android: ['Kotlin', 'Jetpack Compose'],
      'Cross-platform': ['React Native (when it fits)'],
    },
  },
  {
    skill: 'AI Integration',
    summary: 'Adding LLM features, RAG pipelines, and workflow automation to existing products without the fluff.',
    techStack: {
      LLMs: ['OpenAI', 'Anthropic', 'Local models'],
      Tooling: ['Vector stores', 'Embeddings', 'Function calling'],
      Python: ['LangChain alternatives', 'Agent frameworks'],
    },
  },
  {
    skill: 'Cybersecurity',
    summary: 'Security reviews, hardening, and secure-by-default architecture for products that handle real user data.',
    techStack: {
      Areas: ['Threat modeling', 'Auth & session design', 'Secrets management'],
      Tooling: ['Wireshark', 'Linux', 'Burp Suite'],
      Networking: ['TCP/IP', 'DNS', 'TLS'],
    },
  },
  {
    skill: 'Web Development',
    summary: 'Marketing sites, dashboards, and web apps with a focus on performance, accessibility, and polish.',
    techStack: {
      Frontend: ['React', 'Next.js', 'TypeScript'],
      Styling: ['Tailwind', 'Chakra UI', 'Framer Motion'],
      Infra: ['Vercel', 'Cloudflare', 'Docker'],
    },
  },
];

export default function SkillTree() {
  const [openSkills, setOpenSkills] = useState<Set<string>>(new Set());
  const [openSubskills, setOpenSubskills] = useState<Set<string>>(new Set());

  const toggleSkill = (skill: string) => {
    const newSet = new Set(openSkills);
    newSet.has(skill) ? newSet.delete(skill) : newSet.add(skill);
    setOpenSkills(newSet);
  };

  const toggleSub = (key: string) => {
    const newSet = new Set(openSubskills);
    newSet.has(key) ? newSet.delete(key) : newSet.add(key);
    setOpenSubskills(newSet);
  };

  return (
    <Box as="section" id="stack" py={0} px={0}>
      <Box maxW="6xl" mx="auto">
        <SectionHeading
          label="Capabilities"
          title="A focused stack across product, platform, and security work."
          description="Breadth only where it helps. Depth where it matters — shipping the right thing in the right place."
          align="center"
        />
      </Box>
      <Grid
        templateColumns={{ base: '1fr', md: 'repeat(auto-fit, minmax(300px, 1fr))' }}
        gap={5}
        maxW="6xl"
        mx="auto"
      >
        {skills.map(({ skill, summary, techStack }) => (
          <Box
            key={skill}
            p={5}
            borderRadius="2xl"
            border="1px solid"
            borderColor="borderSoft"
            bg="bgCard"
            _hover={{ borderColor: 'accentRed', transform: 'translateY(-2px)' }}
            transition="all 0.2s ease"
            boxShadow="0 12px 30px rgba(0, 0, 0, 0.18)"
          >
            <Box h="2px" w="2.5rem" mb={3} bgGradient="linear(to-r, accentRed, accentFlame)" />
            <Button
              variant="ghost"
              onClick={() => toggleSkill(skill)}
              width="100%"
              justifyContent="space-between"
              fontWeight="bold"
              fontSize="lg"
              color="textPrimary"
              display="flex"
              alignItems="center"
              _hover={{ color: 'accentRed' }}
            >
              <span style={{ flex: 1, textAlign: 'left' }}>{skill}</span>
              <Icon
                as={openSkills.has(skill) ? ChevronDownIcon : ChevronRightIcon}
                ml={2}
                boxSize={4}
              />
            </Button>

            <Collapse in={openSkills.has(skill)} animateOpacity>
              <Text fontSize="sm" mt={3} mb={3} color="textMuted" lineHeight="1.7">
                {summary}
              </Text>
              <VStack align="start" gap={2}>
                {Object.entries(techStack).map(([tech, libs]) => {
                  const key = `${skill}-${tech}`;
                  const isExpandable = libs.length > 0;
                  return (
                    <Box key={key} width="100%">
                      <Button
                        variant="ghost"
                        color="accentRed"
                        fontWeight="normal"
                        size="sm"
                        justifyContent="start"
                        onClick={isExpandable ? () => toggleSub(key) : undefined}
                        cursor={isExpandable ? 'pointer' : 'default'}
                      >
                        {isExpandable && (
                          <Icon
                            as={
                              openSubskills.has(key)
                                ? ChevronDownIcon
                                : ChevronRightIcon
                            }
                            boxSize={4}
                            mr={2}
                          />
                        )}
                        {tech}
                      </Button>
                      {isExpandable && (
                        <Collapse in={openSubskills.has(key)}>
                          <VStack
                            pl={6}
                            pt={1}
                            align="start"
                            gap={1}
                            fontSize="sm"
                            color="textMuted"
                          >
                            {libs.map((lib: string) => (
                              <Text key={lib}>— {lib}</Text>
                            ))}
                          </VStack>
                        </Collapse>
                      )}
                    </Box>
                  );
                })}
              </VStack>
            </Collapse>
          </Box>
        ))}
      </Grid>
    </Box>
  );
}
