'use client';

import { Box, VStack } from '@chakra-ui/react';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Stats from '../components/sections/Stats';
import Services from '../components/sections/Services';
import AiDemo from '../components/sections/AiDemo';
import Process from '../components/sections/Process';
import CaseStudies from '../components/sections/CaseStudies';
import CodeTerminal from '../components/sections/CodeTerminal';
import PathfinderGame from '../components/sections/PathfinderGame';
import TechStrip from '../components/sections/TechStrip';
import SkillTree from '../components/sections/SkillTree';
import FAQ from '../components/sections/FAQ';
import Contact from '../components/sections/Contact';
import Footer from '../components/ui/Footer';
import ParticleNetwork from '../components/ui/ParticleNetwork';
import { siteTheme } from '../lib/siteTheme';
import '../styles/globals.css';

export default function HomePage() {
  return (
    <main>
      <Hero />

      <VStack
        gap={siteTheme.sectionGap}
        align="stretch"
        px={siteTheme.sectionPx}
        py={siteTheme.sectionPy}
      >
        <About />

        <Stats />

        <Box borderTop="1px solid" borderColor={siteTheme.colors.borderSoft} opacity={0.8} />
        <Services />

        <Box borderTop="1px solid" borderColor={siteTheme.colors.borderSoft} opacity={0.8} />
        <AiDemo />

        <Box borderTop="1px solid" borderColor={siteTheme.colors.borderSoft} opacity={0.8} />
        <Process />

        <Box borderTop="1px solid" borderColor={siteTheme.colors.borderSoft} opacity={0.8} />
        <CaseStudies />

        <CodeTerminal />

        <Box borderTop="1px solid" borderColor={siteTheme.colors.borderSoft} opacity={0.8} />
        <PathfinderGame />

        <TechStrip />

        {/* SkillTree with particle network background */}
        <Box borderTop="1px solid" borderColor={siteTheme.colors.borderSoft} opacity={0.8} />
        <Box position="relative">
          <ParticleNetwork />
          <Box position="relative" zIndex={1}>
            <SkillTree />
          </Box>
        </Box>

        <Box borderTop="1px solid" borderColor={siteTheme.colors.borderSoft} opacity={0.8} />
        <FAQ />

        <Box borderTop="1px solid" borderColor={siteTheme.colors.borderSoft} opacity={0.8} />
        <Contact />
      </VStack>

      <Footer />
    </main>
  );
}
