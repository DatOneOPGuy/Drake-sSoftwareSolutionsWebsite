'use client';

import { useState, useEffect, useRef } from 'react';
import { Box, Container, Text, VStack, HStack, Icon } from '@chakra-ui/react';
import { CpuChipIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { FadeIn } from '../motion/FadeIn';
import SectionHeading from '../ui/SectionHeading';

type Prompt = {
  label: string;
  question: string;
  answer: string;
};

const PROMPTS: Prompt[] = [
  {
    label: 'Summarize a doc',
    question: 'Summarize this 40-page contract into key terms and risks.',
    answer:
      'Key terms: 24-month engagement, net-30 payment, $120K cap. IP assigns on payment. Non-compete limited to 12 months, Southeast US only. Risks flagged: auto-renewal clause (§4.2) — no exit window. Liability cap excludes gross negligence. Recommend negotiating a 60-day termination notice and narrowing the non-compete geography.',
  },
  {
    label: 'Classify support tickets',
    question: 'Route this ticket: "App crashes when I upload a photo larger than 5MB on Android."',
    answer:
      'Category: Bug — Mobile (Android)\nPriority: High (crash, data loss risk)\nComponent: Media upload pipeline\nSuggested owner: Mobile team\nRelated tickets: #1847, #2031 (image processing OOM)\nRecommended action: Check heap allocation in ImageCompressor.kt, test with 8MP+ images on low-RAM devices.',
  },
  {
    label: 'Generate SQL',
    question: 'Show me monthly revenue by product for the last quarter, ranked by growth rate.',
    answer:
      "SELECT product_name,\n  DATE_TRUNC('month', order_date) AS month,\n  SUM(amount) AS revenue,\n  LAG(SUM(amount)) OVER (\n    PARTITION BY product_name ORDER BY DATE_TRUNC('month', order_date)\n  ) AS prev_month,\n  ROUND((SUM(amount) - LAG(SUM(amount)) OVER (...)) / LAG(...) * 100, 1) AS growth_pct\nFROM orders\nWHERE order_date >= NOW() - INTERVAL '3 months'\nGROUP BY product_name, month\nORDER BY growth_pct DESC;",
  },
  {
    label: 'Extract from email',
    question: 'Extract action items from this email thread between the client and PM.',
    answer:
      'Action items extracted:\n1. Drake — send revised wireframes by Friday EOD\n2. Client (Sarah) — confirm payment terms with legal, reply by Wed\n3. PM (James) — schedule kickoff call for week of 4/21\n4. Drake — set up staging environment and share credentials\n5. Client — provide brand assets (logo SVG, color palette, fonts)\n\nDeadline summary: 2 items due this week, 3 due next week.',
  },
];

export default function AiDemo() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const handleClick = (idx: number) => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    if (activeIdx === idx) {
      setActiveIdx(null);
      setDisplayedText('');
      setIsTyping(false);
      return;
    }

    setActiveIdx(idx);
    setDisplayedText('');
    setIsTyping(true);

    const fullText = PROMPTS[idx].answer;
    let charIdx = 0;

    intervalRef.current = setInterval(() => {
      charIdx++;
      setDisplayedText(fullText.slice(0, charIdx));
      if (charIdx >= fullText.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setIsTyping(false);
      }
    }, 12);
  };

  return (
    <Container as="section" id="ai-demo" py={0} maxW="4xl">
      <FadeIn>
        <SectionHeading
          label="AI integration"
          title="What it looks like in practice."
          description="Click a scenario to see the kind of AI-powered features we build into products — document analysis, ticket routing, natural-language queries, and structured data extraction."
        />

        {/* Prompt cards */}
        <HStack gap={3} flexWrap="wrap" mb={6}>
          {PROMPTS.map((p, i) => (
            <Box
              key={i}
              as="button"
              onClick={() => handleClick(i)}
              px={4}
              py={2}
              borderRadius="full"
              border="1px solid"
              borderColor={activeIdx === i ? 'accentRed' : 'borderSoft'}
              bg={activeIdx === i ? 'rgba(220, 38, 38, 0.12)' : 'bgCard'}
              color={activeIdx === i ? 'accentRed' : 'textMuted'}
              fontSize="sm"
              fontWeight="500"
              cursor="pointer"
              transition="all .2s ease"
              _hover={{ borderColor: 'accentRed', color: 'accentRed' }}
            >
              {p.label}
            </Box>
          ))}
        </HStack>

        {/* Chat window */}
        <Box
          borderRadius="xl"
          border="1px solid"
          borderColor="borderSoft"
          bg="bgCard"
          overflow="hidden"
          minH="220px"
        >
          {/* Header bar */}
          <HStack px={4} py={2.5} borderBottom="1px solid" borderColor="borderSoft" gap={2}>
            <Icon as={CpuChipIcon} boxSize={4} color="accentRed" />
            <Text fontSize="xs" fontWeight="600" letterSpacing="0.16em" textTransform="uppercase" color="textSubtle">
              AI Engine
            </Text>
            {isTyping && (
              <Box ml="auto" display="flex" alignItems="center" gap={1}>
                <Box w="6px" h="6px" borderRadius="full" bg="accentRed" className="pulse" />
                <Text fontSize="xs" color="accentRed">processing</Text>
              </Box>
            )}
          </HStack>

          <Box px={5} py={4}>
            {activeIdx === null ? (
              <VStack py={8} gap={2} opacity={0.5}>
                <Icon as={SparklesIcon} boxSize={8} color="textSubtle" />
                <Text fontSize="sm" color="textSubtle" textAlign="center">
                  Select a scenario above to see AI in action
                </Text>
              </VStack>
            ) : (
              <VStack align="start" gap={4}>
                {/* User message */}
                <Box
                  alignSelf="flex-end"
                  maxW="80%"
                  px={4}
                  py={2.5}
                  borderRadius="xl"
                  borderBottomRightRadius="sm"
                  bg="rgba(220, 38, 38, 0.15)"
                  border="1px solid"
                  borderColor="rgba(220, 38, 38, 0.3)"
                >
                  <Text fontSize="sm" color="textPrimary" lineHeight="1.6">
                    {PROMPTS[activeIdx].question}
                  </Text>
                </Box>

                {/* AI response */}
                <HStack align="start" gap={3} maxW="90%">
                  <Box
                    flexShrink={0}
                    p={1.5}
                    borderRadius="lg"
                    bg="rgba(220, 38, 38, 0.12)"
                    mt={0.5}
                  >
                    <Icon as={SparklesIcon} boxSize={3.5} color="accentRed" />
                  </Box>
                  <Text
                    fontSize="sm"
                    color="textMuted"
                    lineHeight="1.7"
                    whiteSpace="pre-wrap"
                    fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
                  >
                    {displayedText}
                    {isTyping && (
                      <Box as="span" display="inline-block" w="2px" h="1em" bg="accentRed" ml="1px" verticalAlign="text-bottom" className="blink" />
                    )}
                  </Text>
                </HStack>
              </VStack>
            )}
          </Box>
        </Box>
      </FadeIn>

      <style>{`
        .pulse {
          animation: pulse 1.2s ease-in-out infinite;
        }
        .blink {
          animation: blink 0.8s step-end infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </Container>
  );
}
