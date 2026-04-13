'use client';

import { useState, useEffect, useRef } from 'react';
import { Box, Container, Text, HStack } from '@chakra-ui/react';
import { FadeIn } from '../motion/FadeIn';

type Snippet = {
  label: string;
  lang: string;
  code: string;
};

const SNIPPETS: Snippet[] = [
  {
    label: 'resistine/vpn.py',
    lang: 'python',
    code: `class VPNManager:
    """Cross-platform VPN tunnel controller."""

    def __init__(self, platform: str):
        self.platform = platform
        self._handlers = {
            "darwin": self._macos_connect,
            "linux": self._linux_connect,
            "win32": self._windows_connect,
        }

    async def connect(self, config: TunnelConfig):
        handler = self._handlers[self.platform]
        tunnel = await handler(config)
        await self._verify_handshake(tunnel)
        return tunnel`,
  },
  {
    label: 'crowd/websocket.ts',
    lang: 'typescript',
    code: `export class RealtimeCheckinService {
  private ws: WebSocket;
  private listeners = new Map<string, Set<Function>>();

  async connect(venueId: string): Promise<void> {
    this.ws = new WebSocket(
      \`wss://api.crowd.app/ws/venue/\${venueId}\`
    );

    this.ws.onmessage = (event) => {
      const { type, payload } = JSON.parse(event.data);
      this.listeners.get(type)?.forEach(fn => fn(payload));
    };
  }

  onCheckin(callback: (user: CheckinEvent) => void) {
    this.subscribe("checkin", callback);
  }
}`,
  },
  {
    label: 'montecarlo/engine.py',
    lang: 'python',
    code: `def simulate(model, distributions, n_trials=100_000, seed=42):
    """Vectorized Monte Carlo engine."""
    rng = np.random.default_rng(seed)

    samples = {
        name: dist.sample(rng, n_trials)
        for name, dist in distributions.items()
    }

    results = model(samples)

    return SimulationResult(
        mean=np.mean(results),
        std=np.std(results),
        percentiles=np.percentile(results, [5, 25, 50, 75, 95]),
        se=np.std(results) / np.sqrt(n_trials),
    )`,
  },
  {
    label: 'clamav/scanner.rs',
    lang: 'rust',
    code: `pub struct Scanner {
    engine: *mut cl_engine,
    db_path: PathBuf,
}

impl Scanner {
    pub fn scan_file(&self, path: &Path) -> ScanResult {
        let c_path = CString::new(
            path.to_str().expect("valid UTF-8")
        ).unwrap();

        let mut virname: *const c_char = ptr::null();
        let ret = unsafe {
            cl_scanfile(
                c_path.as_ptr(),
                &mut virname,
                ptr::null_mut(),
                self.engine,
                &self.options,
            )
        };

        match ret {
            CL_CLEAN => ScanResult::Clean,
            CL_VIRUS => ScanResult::Threat(
                unsafe { CStr::from_ptr(virname) }.to_string()
            ),
            _ => ScanResult::Error(ret),
        }
    }
}`,
  },
];

// Simple syntax highlighting via regex
function highlight(code: string, lang: string): string {
  let html = code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // Comments
  html = html.replace(/(#.*$|\/\/.*$)/gm, '<span style="color:#6b7280">$1</span>');
  // Multi-line strings/docstrings
  html = html.replace(/("""[\s\S]*?"""|`[\s\S]*?`)/g, '<span style="color:#86efac">$1</span>');
  // Strings
  html = html.replace(/(["'])(?:(?=(\\?))\2.)*?\1/g, '<span style="color:#86efac">$&</span>');
  // Keywords
  const kwPy = /\b(class|def|async|await|return|import|from|if|else|for|in|self|None|True|False|match|case)\b/g;
  const kwTs = /\b(export|class|const|let|new|async|await|return|import|from|function|get|private|this|type|void)\b/g;
  const kwRs = /\b(pub|struct|impl|fn|let|mut|unsafe|match|self|use|mod|crate|where|trait|enum)\b/g;
  const kw = lang === 'rust' ? kwRs : lang === 'typescript' ? kwTs : kwPy;
  html = html.replace(kw, '<span style="color:#f87171">$1</span>');
  // Types/classes
  html = html.replace(/\b([A-Z][A-Za-z0-9_]+)\b/g, '<span style="color:#fbbf24">$1</span>');
  // Numbers
  html = html.replace(/\b(\d[\d_]*\.?\d*)\b/g, '<span style="color:#c084fc">$1</span>');
  // Function calls
  html = html.replace(/\b([a-z_]\w*)\s*\(/g, '<span style="color:#60a5fa">$1</span>(');

  return html;
}

export default function CodeTerminal() {
  const [snippetIdx, setSnippetIdx] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [done, setDone] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const snippet = SNIPPETS[snippetIdx];
    setCharCount(0);
    setDone(false);

    intervalRef.current = setInterval(() => {
      setCharCount((prev) => {
        if (prev >= snippet.code.length) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          setDone(true);
          return prev;
        }
        return prev + 1;
      });
    }, 18);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [snippetIdx]);

  // Auto-cycle after typing finishes
  useEffect(() => {
    if (!done) return;
    const timeout = setTimeout(() => {
      setSnippetIdx((prev) => (prev + 1) % SNIPPETS.length);
    }, 4000);
    return () => clearTimeout(timeout);
  }, [done]);

  const snippet = SNIPPETS[snippetIdx];
  const visibleCode = snippet.code.slice(0, charCount);
  const highlighted = highlight(visibleCode, snippet.lang);

  return (
    <Container as="section" py={0} maxW="4xl">
      <FadeIn>
        <Box
          borderRadius="xl"
          border="1px solid"
          borderColor="borderSoft"
          bg="bgCard"
          overflow="hidden"
          boxShadow="0 20px 50px rgba(0, 0, 0, 0.4)"
        >
          {/* Title bar */}
          <HStack px={4} py={2.5} bg="rgba(0,0,0,0.3)" borderBottom="1px solid" borderColor="borderSoft" justify="space-between">
            <HStack gap={2}>
              <Box w="12px" h="12px" borderRadius="full" bg="#ef4444" opacity={0.8} />
              <Box w="12px" h="12px" borderRadius="full" bg="#f59e0b" opacity={0.8} />
              <Box w="12px" h="12px" borderRadius="full" bg="#22c55e" opacity={0.8} />
            </HStack>
            <Text fontSize="xs" color="textSubtle" fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace">
              {snippet.label}
            </Text>
            <HStack gap={1.5}>
              {SNIPPETS.map((_, i) => (
                <Box
                  key={i}
                  as="button"
                  w="6px"
                  h="6px"
                  borderRadius="full"
                  bg={i === snippetIdx ? 'accentRed' : 'whiteAlpha.200'}
                  cursor="pointer"
                  onClick={() => setSnippetIdx(i)}
                  transition="background .2s"
                />
              ))}
            </HStack>
          </HStack>

          {/* Code area */}
          <Box
            px={5}
            py={4}
            minH="320px"
            fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
            fontSize={{ base: '11px', md: '13px' }}
            lineHeight="1.7"
            overflowX="auto"
          >
            <pre style={{ margin: 0 }}>
              <code
                dangerouslySetInnerHTML={{ __html: highlighted }}
              />
              {!done && (
                <span
                  style={{
                    display: 'inline-block',
                    width: '2px',
                    height: '1em',
                    background: '#dc2626',
                    marginLeft: '1px',
                    verticalAlign: 'text-bottom',
                    animation: 'blink 0.8s step-end infinite',
                  }}
                />
              )}
            </pre>
          </Box>
        </Box>
      </FadeIn>

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </Container>
  );
}
