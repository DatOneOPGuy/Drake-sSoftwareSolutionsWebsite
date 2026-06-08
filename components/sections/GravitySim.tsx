'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { Box, Container, Text, HStack, VStack, Button, Icon } from '@chakra-ui/react';
import { PlayIcon, PauseIcon, TrashIcon, PlusIcon } from '@heroicons/react/24/outline';
import { FadeIn } from '../motion/FadeIn';
import SectionHeading from '../ui/SectionHeading';

type Body = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  mass: number;
  r: number;
  trail: { x: number; y: number }[];
  hue: number;
};

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  hue: number;
};

const G = 0.8;
const TRAIL_LEN = 120;
const DAMPING = 0.9998;
const MIN_DIST = 4;
const WIDTH = 700;
const HEIGHT = 500;

function randomBody(cx: number, cy: number): Body {
  const angle = Math.random() * Math.PI * 2;
  const dist = 60 + Math.random() * 160;
  const mass = 2 + Math.random() * 8;
  const x = cx + Math.cos(angle) * dist;
  const y = cy + Math.sin(angle) * dist;
  // Orbital velocity (perpendicular to radius)
  const speed = Math.sqrt((G * 200) / dist) * (0.6 + Math.random() * 0.8);
  return {
    x,
    y,
    vx: -Math.sin(angle) * speed,
    vy: Math.cos(angle) * speed,
    mass,
    r: Math.sqrt(mass) * 2,
    trail: [],
    hue: Math.random() * 360,
  };
}

function createPreset(): Body[] {
  const cx = WIDTH / 2;
  const cy = HEIGHT / 2;
  const sun: Body = {
    x: cx, y: cy, vx: 0, vy: 0,
    mass: 200, r: 12, trail: [], hue: 0,
  };
  const planets = Array.from({ length: 7 }, () => randomBody(cx, cy));
  return [sun, ...planets];
}

export default function GravitySim() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bodiesRef = useRef<Body[]>(createPreset());
  const particlesRef = useRef<Particle[]>([]);
  const runningRef = useRef(true);
  const rafRef = useRef<number>(0);
  const mouseDownRef = useRef(false);
  const mousePosRef = useRef<{ x: number; y: number } | null>(null);
  const spawnIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [paused, setPaused] = useState(false);
  const [bodyCount, setBodyCount] = useState(8);
  const [energy, setEnergy] = useState(0);

  const spawnParticles = (x: number, y: number, hue: number, count: number, speed: number) => {
    for (let i = 0; i < count; i++) {
      const a = Math.random() * Math.PI * 2;
      const s = speed * (0.3 + Math.random() * 1.2);
      const life = 30 + Math.random() * 40;
      particlesRef.current.push({
        x, y,
        vx: Math.cos(a) * s,
        vy: Math.sin(a) * s,
        life,
        maxLife: life,
        hue: hue + (Math.random() * 60 - 30),
      });
    }
  };

  const spawnBodyAt = (x: number, y: number) => {
    const bodies = bodiesRef.current;
    const mass = 3 + Math.random() * 6;
    const sun = bodies[0];
    let vx = 0, vy = 0;
    if (sun) {
      const dx = x - sun.x;
      const dy = y - sun.y;
      const dist = Math.sqrt(dx * dx + dy * dy) || 1;
      const speed = Math.sqrt((G * sun.mass) / dist) * 0.9;
      vx = (-dy / dist) * speed;
      vy = (dx / dist) * speed;
    }
    const hue = Math.random() * 360;
    bodies.push({
      x, y, vx, vy, mass,
      r: Math.sqrt(mass) * 2,
      trail: [],
      hue,
    });
    spawnParticles(x, y, hue, 8, 2);
    setBodyCount(bodies.length);
  };

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let bodies = bodiesRef.current;

    if (runningRef.current) {
      // Physics step
      for (let i = 0; i < bodies.length; i++) {
        for (let j = i + 1; j < bodies.length; j++) {
          const a = bodies[i];
          const b = bodies[j];
          let dx = b.x - a.x;
          let dy = b.y - a.y;
          let dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MIN_DIST) dist = MIN_DIST;

          const force = (G * a.mass * b.mass) / (dist * dist);
          const fx = (force * dx) / dist;
          const fy = (force * dy) / dist;

          a.vx += fx / a.mass;
          a.vy += fy / a.mass;
          b.vx -= fx / b.mass;
          b.vy -= fy / b.mass;
        }
      }

      // Collisions: merge smaller into larger (conserve momentum), explode
      const removed = new Set<number>();
      for (let i = 0; i < bodies.length; i++) {
        if (removed.has(i)) continue;
        for (let j = i + 1; j < bodies.length; j++) {
          if (removed.has(j)) continue;
          const a = bodies[i];
          const b = bodies[j];
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < a.r + b.r) {
            const big = a.mass >= b.mass ? a : b;
            const small = a.mass >= b.mass ? b : a;
            const smallIdx = a.mass >= b.mass ? j : i;
            const newMass = big.mass + small.mass;
            big.vx = (big.vx * big.mass + small.vx * small.mass) / newMass;
            big.vy = (big.vy * big.mass + small.vy * small.mass) / newMass;
            big.x = (big.x * big.mass + small.x * small.mass) / newMass;
            big.y = (big.y * big.mass + small.y * small.mass) / newMass;
            big.mass = newMass;
            big.r = Math.sqrt(newMass) * 2;
            const relSpeed = Math.sqrt((a.vx - b.vx) ** 2 + (a.vy - b.vy) ** 2);
            spawnParticles(small.x, small.y, small.hue, 20, 1 + relSpeed * 0.5);
            removed.add(smallIdx);
            if (smallIdx === i) break;
          }
        }
      }
      if (removed.size > 0) {
        bodiesRef.current = bodies.filter((_, idx) => !removed.has(idx));
        bodies = bodiesRef.current;
        setBodyCount(bodies.length);
      }

      let totalKE = 0;
      for (const b of bodies) {
        b.vx *= DAMPING;
        b.vy *= DAMPING;
        b.x += b.vx;
        b.y += b.vy;

        // Soft boundary bounce
        if (b.x < b.r) { b.x = b.r; b.vx = Math.abs(b.vx) * 0.5; }
        if (b.x > WIDTH - b.r) { b.x = WIDTH - b.r; b.vx = -Math.abs(b.vx) * 0.5; }
        if (b.y < b.r) { b.y = b.r; b.vy = Math.abs(b.vy) * 0.5; }
        if (b.y > HEIGHT - b.r) { b.y = HEIGHT - b.r; b.vy = -Math.abs(b.vy) * 0.5; }

        // Trail
        b.trail.push({ x: b.x, y: b.y });
        if (b.trail.length > TRAIL_LEN) b.trail.shift();

        totalKE += 0.5 * b.mass * (b.vx * b.vx + b.vy * b.vy);
      }
      setEnergy(Math.round(totalKE));
    }

    // Render
    ctx.fillStyle = 'rgba(7, 7, 8, 0.15)';
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    // Trails
    for (const b of bodies) {
      if (b.trail.length < 2) continue;
      ctx.beginPath();
      ctx.moveTo(b.trail[0].x, b.trail[0].y);
      for (let i = 1; i < b.trail.length; i++) {
        ctx.lineTo(b.trail[i].x, b.trail[i].y);
      }
      ctx.strokeStyle = `hsla(${b.hue}, 80%, 50%, 0.3)`;
      ctx.lineWidth = b.r * 0.4;
      ctx.stroke();
    }

    // Gravity field lines (subtle)
    const sun = bodies[0];
    if (sun) {
      for (let ring = 1; ring <= 4; ring++) {
        const radius = ring * 60;
        ctx.beginPath();
        ctx.arc(sun.x, sun.y, radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(220, 38, 38, ${0.04 / ring})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }

    // Bodies
    for (const b of bodies) {
      // Glow
      const glow = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r * 3);
      glow.addColorStop(0, `hsla(${b.hue}, 80%, 55%, 0.3)`);
      glow.addColorStop(1, `hsla(${b.hue}, 80%, 55%, 0)`);
      ctx.fillStyle = glow;
      ctx.fillRect(b.x - b.r * 3, b.y - b.r * 3, b.r * 6, b.r * 6);

      // Body
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
      ctx.fillStyle = `hsl(${b.hue}, 80%, 55%)`;
      ctx.fill();

      // Velocity vector
      ctx.beginPath();
      ctx.moveTo(b.x, b.y);
      ctx.lineTo(b.x + b.vx * 4, b.y + b.vy * 4);
      ctx.strokeStyle = `hsla(${b.hue}, 60%, 70%, 0.4)`;
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // Particles update + render
    const particles = particlesRef.current;
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      if (runningRef.current) {
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.96;
        p.vy *= 0.96;
        p.life -= 1;
      }
      if (p.life <= 0) {
        particles.splice(i, 1);
        continue;
      }
      const alpha = p.life / p.maxLife;
      ctx.fillStyle = `hsla(${p.hue}, 90%, 65%, ${alpha})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 1.5 * alpha + 0.5, 0, Math.PI * 2);
      ctx.fill();
    }

    rafRef.current = requestAnimationFrame(draw);
  }, []);

  useEffect(() => {
    // Initial black fill
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#070708';
        ctx.fillRect(0, 0, WIDTH, HEIGHT);
      }
    }
    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, [draw]);

  const togglePause = () => {
    runningRef.current = !runningRef.current;
    setPaused(!runningRef.current);
  };

  const addBody = () => {
    bodiesRef.current.push(randomBody(WIDTH / 2, HEIGHT / 2));
    setBodyCount(bodiesRef.current.length);
  };

  const reset = () => {
    // Clear canvas fully
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#070708';
        ctx.fillRect(0, 0, WIDTH, HEIGHT);
      }
    }
    bodiesRef.current = createPreset();
    particlesRef.current = [];
    setBodyCount(bodiesRef.current.length);
    runningRef.current = true;
    setPaused(false);
  };

  const eventToCanvas = (e: React.MouseEvent | React.TouchEvent): { x: number; y: number } | null => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    const scaleX = WIDTH / rect.width;
    const scaleY = HEIGHT / rect.height;
    const point = 'touches' in e ? e.touches[0] : (e as React.MouseEvent);
    if (!point) return null;
    return {
      x: (point.clientX - rect.left) * scaleX,
      y: (point.clientY - rect.top) * scaleY,
    };
  };

  const stopSpawning = () => {
    mouseDownRef.current = false;
    if (spawnIntervalRef.current !== null) {
      clearInterval(spawnIntervalRef.current);
      spawnIntervalRef.current = null;
    }
  };

  const startSpawning = (e: React.MouseEvent | React.TouchEvent) => {
    const pos = eventToCanvas(e);
    if (!pos) return;
    mouseDownRef.current = true;
    mousePosRef.current = pos;
    spawnBodyAt(pos.x, pos.y);
    if (spawnIntervalRef.current !== null) clearInterval(spawnIntervalRef.current);
    spawnIntervalRef.current = setInterval(() => {
      if (!mouseDownRef.current || !mousePosRef.current) return;
      spawnBodyAt(mousePosRef.current.x, mousePosRef.current.y);
    }, 70);
  };

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!mouseDownRef.current) return;
    const pos = eventToCanvas(e);
    if (pos) mousePosRef.current = pos;
  };

  useEffect(() => {
    const up = () => stopSpawning();
    window.addEventListener('mouseup', up);
    window.addEventListener('touchend', up);
    window.addEventListener('blur', up);
    return () => {
      window.removeEventListener('mouseup', up);
      window.removeEventListener('touchend', up);
      window.removeEventListener('blur', up);
      if (spawnIntervalRef.current !== null) clearInterval(spawnIntervalRef.current);
    };
  }, []);

  return (
    <Container as="section" py={0} maxW="5xl">
      <FadeIn>
        <SectionHeading
          label="Physics sandbox"
          title="N-body gravity simulation."
          description="An orbital mechanics simulation with real Newtonian gravity. Click or hold to spawn bodies into orbit. Watch them collide and merge."
        />

        <HStack gap={3} mb={4} flexWrap="wrap">
          <Button
            onClick={togglePause}
            variant="outline"
            size="sm"
            borderColor="borderSoft"
            color="textMuted"
            rounded="full"
            _hover={{ borderColor: 'accentRed', color: 'accentRed' }}
          >
            <Icon as={paused ? PlayIcon : PauseIcon} boxSize={4} mr={1} />
            {paused ? 'Resume' : 'Pause'}
          </Button>
          <Button
            onClick={addBody}
            variant="outline"
            size="sm"
            borderColor="borderSoft"
            color="textMuted"
            rounded="full"
            _hover={{ borderColor: 'accentRed', color: 'accentRed' }}
          >
            <Icon as={PlusIcon} boxSize={4} mr={1} />
            Add body
          </Button>
          <Button
            onClick={reset}
            variant="outline"
            size="sm"
            borderColor="borderSoft"
            color="textMuted"
            rounded="full"
            _hover={{ borderColor: 'accentRed', color: 'accentRed' }}
          >
            <Icon as={TrashIcon} boxSize={4} mr={1} />
            Reset
          </Button>

          <HStack ml="auto" gap={4}>
            <VStack gap={0} align="end">
              <Text fontSize="sm" fontWeight="700" color="accentRed" fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace">
                {bodyCount}
              </Text>
              <Text fontSize="9px" color="textSubtle" textTransform="uppercase" letterSpacing="0.14em">bodies</Text>
            </VStack>
            <VStack gap={0} align="end">
              <Text fontSize="sm" fontWeight="700" color="accentRed" fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace">
                {energy}
              </Text>
              <Text fontSize="9px" color="textSubtle" textTransform="uppercase" letterSpacing="0.14em">kinetic E</Text>
            </VStack>
          </HStack>
        </HStack>

        <Box
          borderRadius="xl"
          border="1px solid"
          borderColor="borderSoft"
          bg="#070708"
          overflow="hidden"
          cursor="crosshair"
        >
          <canvas
            ref={canvasRef}
            width={WIDTH}
            height={HEIGHT}
            onMouseDown={startSpawning}
            onMouseMove={handleMove}
            onMouseLeave={stopSpawning}
            onTouchStart={startSpawning}
            onTouchMove={handleMove}
            style={{ display: 'block', width: '100%', height: 'auto', touchAction: 'none' }}
          />
        </Box>

        <Text fontSize="xs" color="textFaint" mt={3} textAlign="center">
          Click or hold to spawn bodies · Collisions merge mass and momentum · F = G·m₁·m₂/r²
        </Text>
      </FadeIn>
    </Container>
  );
}
