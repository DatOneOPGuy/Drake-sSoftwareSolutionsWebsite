'use client';

import { useEffect, useRef, useState } from 'react';
import { Box, Text, VStack, HStack } from '@chakra-ui/react';

const W = 600;
const H = 450;
const ARM_COUNT = 15;
const ARM_LEN = 18;

export default function Pendulum() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef(0);
  const [trailMode, setTrailMode] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;

    // Each pendulum in the wave has a slightly different frequency
    const pendulums = Array.from({ length: ARM_COUNT }, (_, i) => {
      const freq = 0.5 + i * 0.04; // increasing frequency
      return {
        angle: Math.PI / 2,
        freq,
        phase: 0,
        decay: 0.9997,
        amplitude: Math.PI * 0.8,
      };
    });

    let time = 0;

    // Trail buffer
    const trailCanvas = document.createElement('canvas');
    trailCanvas.width = W;
    trailCanvas.height = H;
    const trailCtx = trailCanvas.getContext('2d')!;
    trailCtx.fillStyle = '#070708';
    trailCtx.fillRect(0, 0, W, H);

    const draw = () => {
      time += 0.03;

      // Fade trail
      if (trailMode) {
        trailCtx.fillStyle = 'rgba(7, 7, 8, 0.02)';
        trailCtx.fillRect(0, 0, W, H);
      } else {
        trailCtx.fillStyle = '#070708';
        trailCtx.fillRect(0, 0, W, H);
      }

      ctx.drawImage(trailCanvas, 0, 0);

      const originX = W / 2;
      const originY = 60;

      // Draw each pendulum
      for (let i = 0; i < ARM_COUNT; i++) {
        const p = pendulums[i];
        p.angle = p.amplitude * Math.sin(p.freq * time + p.phase);
        p.amplitude *= p.decay;

        // Compute chain of joints
        let x = originX;
        let y = originY;
        const joints: { x: number; y: number }[] = [{ x, y }];

        for (let j = 0; j <= i; j++) {
          const a = pendulums[j].amplitude * Math.sin(pendulums[j].freq * time);
          x += Math.sin(a) * ARM_LEN;
          y += Math.cos(a) * ARM_LEN;
          joints.push({ x, y });
        }

        const endX = joints[joints.length - 1].x;
        const endY = joints[joints.length - 1].y;

        // Draw trail dot on trail canvas
        const hue = (i / ARM_COUNT) * 30; // red range
        trailCtx.beginPath();
        trailCtx.arc(endX, endY, 2, 0, Math.PI * 2);
        trailCtx.fillStyle = `hsla(${hue}, 80%, 55%, 0.8)`;
        trailCtx.fill();

        // Draw arm segments
        ctx.strokeStyle = `rgba(220, 38, 38, ${0.15 + (i / ARM_COUNT) * 0.15})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (let j = 0; j < joints.length; j++) {
          j === 0 ? ctx.moveTo(joints[j].x, joints[j].y) : ctx.lineTo(joints[j].x, joints[j].y);
        }
        ctx.stroke();

        // Draw bob
        ctx.beginPath();
        ctx.arc(endX, endY, 3 + i * 0.3, 0, Math.PI * 2);
        ctx.fillStyle = `hsl(${hue}, 80%, 55%)`;
        ctx.fill();
      }

      // Draw pivot
      ctx.beginPath();
      ctx.arc(originX, originY, 5, 0, Math.PI * 2);
      ctx.fillStyle = '#f97316';
      ctx.fill();

      // Draw support bar
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(originX - 100, originY);
      ctx.lineTo(originX + 100, originY);
      ctx.stroke();

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    const onClick = () => {
      // Reset amplitudes on click
      for (const p of pendulums) {
        p.amplitude = Math.PI * 0.8;
      }
    };
    canvas.addEventListener('click', onClick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      canvas.removeEventListener('click', onClick);
    };
  }, [trailMode]);

  return (
    <VStack gap={3}>
      <Box borderRadius="xl" border="1px solid" borderColor="borderSoft" overflow="hidden" cursor="pointer">
        <canvas ref={canvasRef} width={W} height={H} style={{ display: 'block', width: '100%', maxWidth: W, height: 'auto' }} />
      </Box>
      <HStack gap={4}>
        <Text fontSize="xs" color="textFaint">15-pendulum wave machine · Click to reset energy ·</Text>
        <Box
          as="button"
          fontSize="xs"
          color={trailMode ? 'accentRed' : 'textFaint'}
          cursor="pointer"
          onClick={() => setTrailMode(!trailMode)}
          _hover={{ color: 'accentRed' }}
        >
          Trails: {trailMode ? 'ON' : 'OFF'}
        </Box>
      </HStack>
    </VStack>
  );
}
