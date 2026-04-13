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
    skill: 'Security Software',
    summary: 'Endpoint protection, antivirus integration, VPN management, and SIEM monitoring. Built professionally at Resistine.',
    techStack: {
      'Antivirus': ['ClamAV', 'Rust bindings', 'macOS Endpoint Security Framework'],
      'Monitoring': ['Wazuh SIEM', 'Log collection', 'Threat detection'],
      'Networking': ['VPN (macOS/Linux/Windows)', 'TCP/IP', 'DNS', 'TLS'],
    },
  },
  {
    skill: 'Full-Stack Web',
    summary: 'Production web apps and APIs with modern frameworks, real-time features, and containerized deployment.',
    techStack: {
      Backend: ['FastAPI', 'Node.js', 'Express', 'SQLAlchemy'],
      Frontend: ['React', 'Next.js', 'TypeScript', 'Tailwind'],
      Infra: ['Docker', 'nginx', 'WebSockets', 'OAuth'],
    },
  },
  {
    skill: 'Mobile Development',
    summary: 'Native iOS apps built at Resistine with ODOO API integration, network permissions, and WiFi/carrier detection.',
    techStack: {
      iOS: ['Swift', 'SwiftUI', 'UIKit', 'ODOO API'],
    },
  },
  {
    skill: 'Data Science & AI',
    summary: 'Monte Carlo simulations, statistical modeling, sports analytics, and LLM integrations with interactive dashboards.',
    techStack: {
      Simulation: ['NumPy', 'SciPy', 'Monte Carlo methods'],
      Visualization: ['Streamlit', 'Plotly', 'Matplotlib'],
      AI: ['LLM APIs', 'Embeddings', 'Agent frameworks'],
    },
  },
  {
    skill: 'Desktop & Games',
    summary: 'Cross-platform desktop apps with plugin architectures and original games built in Godot.',
    techStack: {
      Desktop: ['Python (Briefcase)', 'C# / .NET 8', 'Rust'],
      Games: ['Godot', 'GDScript', 'Phantom Camera'],
      'CLI Tools': ['Typer', 'Rich', 'Click'],
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
          description="Breadth only where it helps. Depth where it matters. Shipping the right thing in the right place."
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
                              <Text key={lib}>{lib}</Text>
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
