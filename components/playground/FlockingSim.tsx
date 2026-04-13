'use client';

import { useEffect, useRef } from 'react';
import { Box, Text, VStack } from '@chakra-ui/react';

const W = 600;
const H = 400;
const COUNT = 150;

type Boid = {
  x: number; y: number;
  vx: number; vy: number;
};

export default function FlockingSim() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const rafRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;

    const boids: Boid[] = Array.from({ length: COUNT }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 4,
      vy: (Math.random() - 0.5) * 4,
    }));

    const VISUAL_RANGE = 60;
    const SEPARATION = 20;
    const MAX_SPEED = 4;
    const MOUSE_RANGE = 120;

    const draw = () => {
      ctx.fillStyle = 'rgba(7, 7, 8, 0.2)';
      ctx.fillRect(0, 0, W, H);

      const mouse = mouseRef.current;

      for (const boid of boids) {
        let avgX = 0, avgY = 0, avgVx = 0, avgVy = 0;
        let sepX = 0, sepY = 0;
        let neighbors = 0;

        for (const other of boids) {
          if (other === boid) continue;
          const dx = other.x - boid.x;
          const dy = other.y - boid.y;
          const d = Math.sqrt(dx * dx + dy * dy);

          if (d < VISUAL_RANGE) {
            // Cohesion
            avgX += other.x;
            avgY += other.y;
            // Alignment
            avgVx += other.vx;
            avgVy += other.vy;
            neighbors++;

            // Separation
            if (d < SEPARATION) {
              sepX -= dx / (d || 1);
              sepY -= dy / (d || 1);
            }
          }
        }

        if (neighbors > 0) {
          // Cohesion: steer toward center of neighbors
          boid.vx += ((avgX / neighbors - boid.x) * 0.005);
          boid.vy += ((avgY / neighbors - boid.y) * 0.005);
          // Alignment: match velocity
          boid.vx += ((avgVx / neighbors - boid.vx) * 0.05);
          boid.vy += ((avgVy / neighbors - boid.vy) * 0.05);
        }

        // Separation
        boid.vx += sepX * 0.05;
        boid.vy += sepY * 0.05;

        // Mouse avoidance
        const mdx = boid.x - mouse.x;
        const mdy = boid.y - mouse.y;
        const md = Math.sqrt(mdx * mdx + mdy * mdy);
        if (md < MOUSE_RANGE && md > 0) {
          boid.vx += (mdx / md) * 0.8;
          boid.vy += (mdy / md) * 0.8;
        }

        // Edge wrapping
        if (boid.x < 0) boid.x = W;
        if (boid.x > W) boid.x = 0;
        if (boid.y < 0) boid.y = H;
        if (boid.y > H) boid.y = 0;

        // Speed limit
        const speed = Math.sqrt(boid.vx * boid.vx + boid.vy * boid.vy);
        if (speed > MAX_SPEED) {
          boid.vx = (boid.vx / speed) * MAX_SPEED;
          boid.vy = (boid.vy / speed) * MAX_SPEED;
        }

        boid.x += boid.vx;
        boid.y += boid.vy;

        // Draw boid as a triangle pointing in velocity direction
        const angle = Math.atan2(boid.vy, boid.vx);
        const s = 5;
        ctx.save();
        ctx.translate(boid.x, boid.y);
        ctx.rotate(angle);
        ctx.beginPath();
        ctx.moveTo(s * 1.5, 0);
        ctx.lineTo(-s, s * 0.6);
        ctx.lineTo(-s, -s * 0.6);
        ctx.closePath();
        const normalizedSpeed = speed / MAX_SPEED;
        ctx.fillStyle = `hsla(${normalizedSpeed * 30}, 80%, 55%, 0.8)`;
        ctx.fill();
        ctx.restore();
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: (e.clientX - rect.left) * (W / rect.width),
        y: (e.clientY - rect.top) * (H / rect.height),
      };
    };
    const onLeave = () => { mouseRef.current = { x: -1000, y: -1000 }; };

    ctx.fillStyle = '#070708';
    ctx.fillRect(0, 0, W, H);
    canvas.addEventListener('mousemove', onMove);
    canvas.addEventListener('mouseleave', onLeave);
    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      canvas.removeEventListener('mousemove', onMove);
      canvas.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <VStack gap={3}>
      <Box borderRadius="xl" border="1px solid" borderColor="borderSoft" overflow="hidden" cursor="none">
        <canvas ref={canvasRef} width={W} height={H} style={{ display: 'block', width: '100%', maxWidth: W, height: 'auto' }} />
      </Box>
      <Text fontSize="xs" color="textFaint">Boids flocking algorithm (Craig Reynolds, 1986) · Separation + Alignment + Cohesion · Mouse repels the flock</Text>
    </VStack>
  );
}
