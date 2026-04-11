'use client';

import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Experience from '../components/sections/Experience';
import CareerCalendar from '../components/sections/CareerCalendar';
import SkillTree from '../components/sections/SkillTree';
import Contact from '../components/sections/Contact';
import Footer from '../components/ui/Footer';
import { Box, VStack } from '@chakra-ui/react';
import { siteTheme } from '../lib/siteTheme';
import ScrollStory from '../components/ui/ScrollStory';
import ViewerPaths from '../components/ui/ViewerPaths';
import PerformanceStrip from '../components/sections/PerformanceStrip';
import '../styles/globals.css';

export default function HomePage() {
  return (
    <main>
      <Hero />

      <VStack gap={siteTheme.sectionGap} align="stretch" px={siteTheme.sectionPx} py={siteTheme.sectionPy}>
        <ViewerPaths />

        <About />

        <ScrollStory />

        <Box borderTop="1px solid" borderColor={siteTheme.colors.borderSoft} opacity={0.8} />
        <Experience />

        <Box borderTop="1px solid" borderColor={siteTheme.colors.borderSoft} opacity={0.8} />
        <CareerCalendar />

        <Box borderTop="1px solid" borderColor={siteTheme.colors.borderSoft} opacity={0.8} />
        <PerformanceStrip />

        <Box borderTop="1px solid" borderColor={siteTheme.colors.borderSoft} opacity={0.8} />
        <SkillTree />

        <Box borderTop="1px solid" borderColor={siteTheme.colors.borderSoft} opacity={0.8} />
        <Contact />
      </VStack>

      <Footer />
    </main>
  );
}
