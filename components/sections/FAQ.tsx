'use client';

import { useState } from 'react';
import { Box, Container, VStack, Text, Button, Icon } from '@chakra-ui/react';
import { Collapse } from '@chakra-ui/transition';
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import { FadeIn } from '../motion/FadeIn';
import SectionHeading from '../ui/SectionHeading';

const FAQS = [
  {
    q: 'Do you work with startups and non-technical founders?',
    a: 'Yes. A lot of my engagements are with founders who need a technical partner they can trust to translate an idea into a shipped product. I handle the technical decisions, you stay focused on the business.',
  },
  {
    q: 'What does a typical engagement look like?',
    a: 'Most projects start with a short, fixed-fee discovery phase (scope, architecture, timeline) followed by an iterative build phase billed weekly or by milestone. You&rsquo;ll see working demos every week, and you can stop at any point with everything delivered so far.',
  },
  {
    q: 'How do you handle NDAs and IP?',
    a: 'I&rsquo;m happy to sign a mutual NDA before we discuss specifics. All work product is assigned to you upon payment. Nothing about your project gets published or added to a portfolio without your explicit written consent.',
  },
  {
    q: 'Can you take over or extend an existing codebase?',
    a: 'Yes — a lot of engagements start this way. I usually begin with a short audit to understand the code, document what&rsquo;s there, flag risks, and propose a realistic path forward before touching anything in production.',
  },
  {
    q: 'Do you offer ongoing support after launch?',
    a: 'Yes. Most clients keep me on a lightweight retainer after launch for maintenance, bug fixes, and incremental improvements. You&rsquo;re never locked in — retainers are month-to-month.',
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<Set<number>>(new Set([0]));

  const toggle = (i: number) => {
    const next = new Set(open);
    next.has(i) ? next.delete(i) : next.add(i);
    setOpen(next);
  };

  return (
    <Container as="section" id="faq" py={0} maxW="4xl">
      <FadeIn>
        <SectionHeading
          label="FAQ"
          title="Common questions."
          description="The things prospective clients usually ask in the first email — answered up front so you don&rsquo;t have to."
        />
        <VStack align="stretch" gap={3}>
          {FAQS.map(({ q, a }, i) => {
            const isOpen = open.has(i);
            return (
              <Box
                key={i}
                borderRadius="xl"
                border="1px solid"
                borderColor={isOpen ? 'accentRed' : 'borderSoft'}
                bg="bgCard"
                transition="border-color .2s ease"
              >
                <Button
                  onClick={() => toggle(i)}
                  variant="ghost"
                  width="100%"
                  justifyContent="space-between"
                  py={5}
                  px={5}
                  fontSize="md"
                  fontWeight="600"
                  color="textPrimary"
                  textAlign="left"
                  _hover={{ bg: 'blackAlpha.50' }}
                >
                  <Text as="span" flex={1} textAlign="left">
                    {q}
                  </Text>
                  <Icon as={isOpen ? ChevronDownIcon : ChevronRightIcon} boxSize={5} color="accentRed" />
                </Button>
                <Collapse in={isOpen} animateOpacity>
                  <Box px={5} pb={5}>
                    <Text color="textMuted" fontSize="sm" lineHeight="1.8" dangerouslySetInnerHTML={{ __html: a }} />
                  </Box>
                </Collapse>
              </Box>
            );
          })}
        </VStack>
      </FadeIn>
    </Container>
  );
}
