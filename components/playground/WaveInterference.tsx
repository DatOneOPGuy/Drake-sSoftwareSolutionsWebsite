'use client';

import { useEffect, useRef } from 'react';
import { Box, Text, VStack } from '@chakra-ui/react';

const W = 600;
const H = 400;
const RES = 2;

export default function WaveInterference() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sourcesRef = useRef<{ x: number; y: number }[]>([
    { x: W * 0.3, y: H * 0.5 },
    { x: W * 0.7, y: H * 0.5 },
  ]);
  const rafRef = useRef(0);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    const imgData = ctx.createImageData(W, H);

    const draw = () => {
      timeRef.current += 0.08;
      const t = timeRef.current;
      const sources = sourcesRef.current;
      const data = imgData.data;

      for (let py = 0; py < H; py += RES) {
        for (let px = 0; px < W; px += RES) {
          let amplitude = 0;

          for (const src of sources) {
            const dx = px - src.x;
            const dy = py - src.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const wave = Math.sin(dist * 0.15 - t) / (1 + dist * 0.008);
            amplitude += wave;
          }

          // Map amplitude to color
          const normalized = (amplitude + 2) / 4; // roughly 0-1
          let r: number, g: number, b: number;

          if (amplitude > 0) {
            // Constructive: red/orange
            r = Math.min(255, Math.round(220 * normalized * normalized));
            g = Math.min(255, Math.round(50 * normalized));
            b = Math.round(15 * normalized);
          } else {
            // Destructive: deep blue/black
            r = Math.round(10 * normalized);
            g = Math.round(15 * normalized);
            b = Math.min(255, Math.round(80 * normalized * normalized));
          }

          for (let dy = 0; dy < RES && py + dy < H; dy++) {
            for (let dx = 0; dx < RES && px + dx < W; dx++) {
              const idx = ((py + dy) * W + (px + dx)) * 4;
              data[idx] = r;
              data[idx + 1] = g;
              data[idx + 2] = b;
              data[idx + 3] = 255;
            }
          }
        }
      }

      ctx.putImageData(imgData, 0, 0);

      // Draw source indicators
      for (const src of sources) {
        ctx.beginPath();
        ctx.arc(src.x, src.y, 5, 0, Math.PI * 2);
        ctx.fillStyle = '#fff';
        ctx.fill();
        ctx.beginPath();
        ctx.arc(src.x, src.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = '#dc2626';
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    const onClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) * (W / rect.width);
      const y = (e.clientY - rect.top) * (H / rect.height);
      sourcesRef.current.push({ x, y });
      if (sourcesRef.current.length > 6) sourcesRef.current.shift();
    };

    const onMove = (e: MouseEvent) => {
      if (sourcesRef.current.length > 0) {
        const rect = canvas.getBoundingClientRect();
        const last = sourcesRef.current[sourcesRef.current.length - 1];
        last.x = (e.clientX - rect.left) * (W / rect.width);
        last.y = (e.clientY - rect.top) * (H / rect.height);
      }
    };

    canvas.addEventListener('click', onClick);
    canvas.addEventListener('mousemove', onMove);
    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      canvas.removeEventListener('click', onClick);
      canvas.removeEventListener('mousemove', onMove);
    };
  }, []);

  return (
    <VStack gap={3}>
      <Box borderRadius="xl" border="1px solid" borderColor="borderSoft" overflow="hidden" cursor="crosshair">
        <canvas ref={canvasRef} width={W} height={H} style={{ display: 'block', width: '100%', maxWidth: W, height: 'auto' }} />
      </Box>
      <Text fontSize="xs" color="textFaint">Wave interference pattern · Move the last source with your mouse · Click to add new sources (max 6)</Text>
    </VStack>
  );
}
