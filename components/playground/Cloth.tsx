'use client';

import { useEffect, useRef } from 'react';
import { Box, Text, VStack } from '@chakra-ui/react';

const W = 600;
const H = 450;
const COLS = 30;
const ROWS = 20;
const SPACING = 16;
const GRAVITY = 0.3;
const DAMPING = 0.98;
const ITERATIONS = 5;

type Point = {
  x: number; y: number;
  ox: number; oy: number;
  pinned: boolean;
};

type Stick = {
  a: number; b: number;
  len: number;
};

export default function Cloth() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, down: false });
  const rafRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;

    const offsetX = (W - (COLS - 1) * SPACING) / 2;
    const offsetY = 40;

    // Create points
    const points: Point[] = [];
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const x = offsetX + c * SPACING;
        const y = offsetY + r * SPACING;
        points.push({ x, y, ox: x, oy: y, pinned: r === 0 && c % 3 === 0 });
      }
    }

    // Create sticks (constraints)
    const sticks: Stick[] = [];
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const idx = r * COLS + c;
        if (c < COLS - 1) {
          sticks.push({ a: idx, b: idx + 1, len: SPACING });
        }
        if (r < ROWS - 1) {
          sticks.push({ a: idx, b: idx + COLS, len: SPACING });
        }
      }
    }

    const draw = () => {
      ctx.fillStyle = '#070708';
      ctx.fillRect(0, 0, W, H);

      const mouse = mouseRef.current;

      // Verlet integration
      for (const p of points) {
        if (p.pinned) continue;
        const vx = (p.x - p.ox) * DAMPING;
        const vy = (p.y - p.oy) * DAMPING;
        p.ox = p.x;
        p.oy = p.y;
        p.x += vx;
        p.y += vy + GRAVITY;

        // Mouse interaction
        if (mouse.down) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 40) {
            p.x = mouse.x + (dx / d) * 40;
            p.y = mouse.y + (dy / d) * 40;
          }
        } else {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 60 && d > 0) {
            const force = (60 - d) * 0.02;
            p.x += (dx / d) * force;
            p.y += (dy / d) * force;
          }
        }

        // Keep in bounds
        if (p.y > H - 5) { p.y = H - 5; p.oy = p.y; }
        if (p.x < 5) { p.x = 5; }
        if (p.x > W - 5) { p.x = W - 5; }
      }

      // Constraint solving
      for (let iter = 0; iter < ITERATIONS; iter++) {
        for (const s of sticks) {
          const a = points[s.a];
          const b = points[s.b];
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          const diff = (s.len - dist) / dist * 0.5;
          const ox = dx * diff;
          const oy = dy * diff;
          if (!a.pinned) { a.x -= ox; a.y -= oy; }
          if (!b.pinned) { b.x += ox; b.y += oy; }
        }
      }

      // Render cloth as filled triangles with shading
      for (let r = 0; r < ROWS - 1; r++) {
        for (let c = 0; c < COLS - 1; c++) {
          const i = r * COLS + c;
          const p0 = points[i];
          const p1 = points[i + 1];
          const p2 = points[i + COLS];
          const p3 = points[i + COLS + 1];

          // Compute normal for shading (cross product of two edges)
          const ax = p1.x - p0.x, ay = p1.y - p0.y;
          const bx = p2.x - p0.x, by = p2.y - p0.y;
          const cross = ax * by - ay * bx;
          const shade = Math.abs(cross) / (SPACING * SPACING);
          const brightness = Math.min(1, shade * 0.7 + 0.3);

          // Triangle 1
          ctx.beginPath();
          ctx.moveTo(p0.x, p0.y);
          ctx.lineTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.closePath();
          ctx.fillStyle = `rgba(220, ${Math.round(38 * brightness)}, ${Math.round(38 * brightness)}, ${brightness * 0.6})`;
          ctx.fill();

          // Triangle 2
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p3.x, p3.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.closePath();
          ctx.fillStyle = `rgba(200, ${Math.round(30 * brightness)}, ${Math.round(30 * brightness)}, ${brightness * 0.55})`;
          ctx.fill();
        }
      }

      // Draw grid lines
      ctx.strokeStyle = 'rgba(220, 38, 38, 0.25)';
      ctx.lineWidth = 0.5;
      for (const s of sticks) {
        const a = points[s.a];
        const b = points[s.b];
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }

      // Draw pin points
      for (const p of points) {
        if (p.pinned) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
          ctx.fillStyle = '#f97316';
          ctx.fill();
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = (e.clientX - rect.left) * (W / rect.width);
      mouseRef.current.y = (e.clientY - rect.top) * (H / rect.height);
    };
    const onDown = () => { mouseRef.current.down = true; };
    const onUp = () => { mouseRef.current.down = false; };

    canvas.addEventListener('mousemove', onMove);
    canvas.addEventListener('mousedown', onDown);
    canvas.addEventListener('mouseup', onUp);
    canvas.addEventListener('mouseleave', onUp);
    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      canvas.removeEventListener('mousemove', onMove);
      canvas.removeEventListener('mousedown', onDown);
      canvas.removeEventListener('mouseup', onUp);
      canvas.removeEventListener('mouseleave', onUp);
    };
  }, []);

  return (
    <VStack gap={3}>
      <Box borderRadius="xl" border="1px solid" borderColor="borderSoft" overflow="hidden" cursor="grab">
        <canvas ref={canvasRef} width={W} height={H} style={{ display: 'block', width: '100%', maxWidth: W, height: 'auto' }} />
      </Box>
      <Text fontSize="xs" color="textFaint">Verlet integration cloth simulation · Hover to push, click-drag to grab · Pinned at top, gravity pulls down</Text>
    </VStack>
  );
}
