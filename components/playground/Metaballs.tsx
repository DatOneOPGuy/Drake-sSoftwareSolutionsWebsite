'use client';

import { useEffect, useRef } from 'react';
import { Box, Text, VStack } from '@chakra-ui/react';

const W = 600;
const H = 400;
const RESOLUTION = 3; // pixel skip for performance

type Blob = { x: number; y: number; vx: number; vy: number; r: number };

export default function Metaballs() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: W / 2, y: H / 2 });
  const rafRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;

    const blobs: Blob[] = Array.from({ length: 8 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      r: 40 + Math.random() * 50,
    }));

    const imgData = ctx.createImageData(W, H);

    const draw = () => {
      const mouse = mouseRef.current;

      // Update blob positions
      for (const b of blobs) {
        b.x += b.vx;
        b.y += b.vy;
        if (b.x < 0 || b.x > W) b.vx *= -1;
        if (b.y < 0 || b.y > H) b.vy *= -1;

        // Attract slightly to mouse
        const dx = mouse.x - b.x;
        const dy = mouse.y - b.y;
        const d = Math.sqrt(dx * dx + dy * dy) || 1;
        b.vx += (dx / d) * 0.03;
        b.vy += (dy / d) * 0.03;
        // Dampen
        b.vx *= 0.995;
        b.vy *= 0.995;
      }

      // Compute metaball field
      const data = imgData.data;
      for (let py = 0; py < H; py += RESOLUTION) {
        for (let px = 0; px < W; px += RESOLUTION) {
          let sum = 0;
          for (const b of blobs) {
            const dx = px - b.x;
            const dy = py - b.y;
            sum += (b.r * b.r) / (dx * dx + dy * dy + 1);
          }

          // Color based on field value
          const t = Math.min(sum, 2);
          let r = 0, g = 0, b = 0;

          if (t > 1.0) {
            // Inside blob: bright red/orange
            const inner = (t - 1.0);
            r = Math.min(255, 220 + inner * 80);
            g = Math.min(255, 38 + inner * 100);
            b = Math.min(255, 38 + inner * 30);
          } else if (t > 0.7) {
            // Edge glow
            const edge = (t - 0.7) / 0.3;
            r = Math.round(220 * edge * edge);
            g = Math.round(20 * edge);
            b = Math.round(10 * edge);
          } else {
            // Background
            r = 7;
            g = 7;
            b = 8;
          }

          // Fill resolution block
          for (let dy = 0; dy < RESOLUTION && py + dy < H; dy++) {
            for (let dx = 0; dx < RESOLUTION && px + dx < W; dx++) {
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
      rafRef.current = requestAnimationFrame(draw);
    };

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: (e.clientX - rect.left) * (W / rect.width),
        y: (e.clientY - rect.top) * (H / rect.height),
      };
    };

    canvas.addEventListener('mousemove', onMove);
    rafRef.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(rafRef.current);
      canvas.removeEventListener('mousemove', onMove);
    };
  }, []);

  return (
    <VStack gap={3}>
      <Box borderRadius="xl" border="1px solid" borderColor="borderSoft" overflow="hidden" cursor="crosshair">
        <canvas ref={canvasRef} width={W} height={H} style={{ display: 'block', width: '100%', maxWidth: W, height: 'auto' }} />
      </Box>
      <Text fontSize="xs" color="textFaint">Metaballs: implicit surface rendering via scalar field evaluation · Mouse attracts the blobs</Text>
    </VStack>
  );
}
