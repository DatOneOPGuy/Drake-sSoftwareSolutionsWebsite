'use client';

import { useEffect, useRef } from 'react';
import { Box, Text, VStack } from '@chakra-ui/react';

const W = 600;
const H = 600;
const SEGMENTS = 12;

export default function Kaleidoscope() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: W / 2, y: H / 2 });
  const rafRef = useRef(0);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;

    const particles: { x: number; y: number; vx: number; vy: number; life: number; maxLife: number; size: number }[] = [];

    const draw = () => {
      timeRef.current += 0.016;
      const t = timeRef.current;
      const mouse = mouseRef.current;

      // Semi-transparent overlay for trails
      ctx.fillStyle = 'rgba(7, 7, 8, 0.08)';
      ctx.fillRect(0, 0, W, H);

      const cx = W / 2;
      const cy = H / 2;
      const mx = mouse.x - cx;
      const my = mouse.y - cy;
      const mDist = Math.sqrt(mx * mx + my * my);
      const mAngle = Math.atan2(my, mx);

      // Spawn particles from cursor
      for (let i = 0; i < 3; i++) {
        particles.push({
          x: mx + (Math.random() - 0.5) * 20,
          y: my + (Math.random() - 0.5) * 20,
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5,
          life: 0,
          maxLife: 60 + Math.random() * 60,
          size: 1 + Math.random() * 3,
        });
      }

      // Limit particles
      while (particles.length > 400) particles.shift();

      // Draw kaleidoscope segments
      ctx.save();
      ctx.translate(cx, cy);

      for (let seg = 0; seg < SEGMENTS; seg++) {
        ctx.save();
        ctx.rotate((seg * Math.PI * 2) / SEGMENTS);
        if (seg % 2 === 1) {
          ctx.scale(1, -1); // Mirror alternate segments
        }

        // Draw geometric shapes based on cursor
        const shapes = 5;
        for (let s = 0; s < shapes; s++) {
          const offset = s * 0.4 + t * 0.3;
          const radius = 20 + mDist * 0.4 + Math.sin(offset) * 30;
          const angle = mAngle + s * 0.3 + t * 0.1;
          const sx = Math.cos(angle) * radius * 0.5;
          const sy = Math.sin(angle) * radius * 0.3;
          const size = 3 + Math.sin(t + s) * 2 + mDist * 0.02;

          const hue = (s * 30 + t * 20) % 360;
          ctx.fillStyle = `hsla(${hue}, 70%, 55%, 0.6)`;
          ctx.beginPath();

          // Alternate between shapes
          if (s % 3 === 0) {
            // Diamond
            ctx.moveTo(sx, sy - size);
            ctx.lineTo(sx + size, sy);
            ctx.lineTo(sx, sy + size);
            ctx.lineTo(sx - size, sy);
          } else if (s % 3 === 1) {
            // Circle
            ctx.arc(sx, sy, size, 0, Math.PI * 2);
          } else {
            // Triangle
            for (let v = 0; v < 3; v++) {
              const va = (v * Math.PI * 2) / 3 + t * 0.5;
              const vx = sx + Math.cos(va) * size;
              const vy = sy + Math.sin(va) * size;
              v === 0 ? ctx.moveTo(vx, vy) : ctx.lineTo(vx, vy);
            }
          }
          ctx.closePath();
          ctx.fill();
        }

        // Draw particles in this segment
        for (const p of particles) {
          p.life++;
          const alpha = 1 - p.life / p.maxLife;
          if (alpha <= 0) continue;
          const hue = (p.life * 3 + t * 30) % 360;
          ctx.fillStyle = `hsla(${hue}, 80%, 60%, ${alpha * 0.5})`;
          ctx.beginPath();
          ctx.arc(p.x + p.vx * p.life * 0.3, p.y + p.vy * p.life * 0.3, p.size * alpha, 0, Math.PI * 2);
          ctx.fill();
        }

        // Connecting lines from center
        ctx.strokeStyle = `rgba(220, 38, 38, ${0.1 + Math.sin(t) * 0.05})`;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(mx * 0.8, my * 0.3);
        ctx.stroke();

        ctx.restore();
      }

      // Center mandala ring
      for (let ring = 0; ring < 3; ring++) {
        const r = 10 + ring * 15 + Math.sin(t + ring) * 5;
        ctx.beginPath();
        ctx.arc(0, 0, r, 0, Math.PI * 2);
        ctx.strokeStyle = `hsla(${ring * 120 + t * 10}, 60%, 50%, 0.3)`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      ctx.restore();

      // Remove dead particles
      for (let i = particles.length - 1; i >= 0; i--) {
        if (particles[i].life >= particles[i].maxLife) particles.splice(i, 1);
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const scaleX = W / rect.width;
      const scaleY = H / rect.height;
      mouseRef.current = {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY,
      };
    };

    ctx.fillStyle = '#070708';
    ctx.fillRect(0, 0, W, H);
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
      <Text fontSize="xs" color="textFaint">Move your mouse to shape the kaleidoscope · 12-fold rotational symmetry with particle trails</Text>
    </VStack>
  );
}
