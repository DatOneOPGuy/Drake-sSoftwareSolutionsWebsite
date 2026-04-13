'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { Box, Container, Text, HStack, VStack, Button, Icon } from '@chakra-ui/react';
import { PlayIcon, ArrowPathIcon, TrashIcon } from '@heroicons/react/24/outline';
import { FadeIn } from '../motion/FadeIn';
import SectionHeading from '../ui/SectionHeading';

const COLS = 35;
const ROWS = 18;
const CELL = 20;

type Cell = 'empty' | 'wall' | 'start' | 'end' | 'visited' | 'path';
type Algo = 'astar' | 'dijkstra' | 'bfs';
type Coord = [number, number];

const DEFAULT_START: Coord = [2, Math.floor(ROWS / 2)];
const DEFAULT_END: Coord = [COLS - 3, Math.floor(ROWS / 2)];

function heuristic(a: Coord, b: Coord): number {
  return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
}

function getNeighbors(x: number, y: number): Coord[] {
  const dirs: Coord[] = [[0, 1], [0, -1], [1, 0], [-1, 0]];
  return dirs
    .map(([dx, dy]) => [x + dx, y + dy] as Coord)
    .filter(([nx, ny]) => nx >= 0 && nx < COLS && ny >= 0 && ny < ROWS);
}

function initGrid(): Cell[][] {
  return Array.from({ length: ROWS }, () => Array(COLS).fill('empty'));
}

export default function PathfinderGame() {
  const [grid, setGrid] = useState<Cell[][]>(() => {
    const g = initGrid();
    g[DEFAULT_START[1]][DEFAULT_START[0]] = 'start';
    g[DEFAULT_END[1]][DEFAULT_END[0]] = 'end';
    return g;
  });
  const [algo, setAlgo] = useState<Algo>('astar');
  const [running, setRunning] = useState(false);
  const [stats, setStats] = useState({ visited: 0, pathLen: 0, time: 0 });
  const isDrawing = useRef(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let y = 0; y < ROWS; y++) {
      for (let x = 0; x < COLS; x++) {
        const cell = grid[y][x];
        const px = x * CELL;
        const py = y * CELL;

        switch (cell) {
          case 'wall':
            ctx.fillStyle = '#1f1f1f';
            break;
          case 'start':
            ctx.fillStyle = '#dc2626';
            break;
          case 'end':
            ctx.fillStyle = '#f97316';
            break;
          case 'visited':
            ctx.fillStyle = 'rgba(220, 38, 38, 0.18)';
            break;
          case 'path':
            ctx.fillStyle = 'rgba(220, 38, 38, 0.65)';
            break;
          default:
            ctx.fillStyle = 'rgba(255, 255, 255, 0.03)';
        }

        ctx.fillRect(px + 1, py + 1, CELL - 2, CELL - 2);

        // Grid lines
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.06)';
        ctx.lineWidth = 0.5;
        ctx.strokeRect(px, py, CELL, CELL);
      }
    }
  }, [grid]);

  useEffect(() => { draw(); }, [draw]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (running) return;
    isDrawing.current = true;
    toggleCell(e);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDrawing.current || running) return;
    toggleCell(e);
  };

  const handleMouseUp = () => { isDrawing.current = false; };

  const toggleCell = (e: React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.left) / CELL);
    const y = Math.floor((e.clientY - rect.top) / CELL);
    if (x < 0 || x >= COLS || y < 0 || y >= ROWS) return;
    if (grid[y][x] === 'start' || grid[y][x] === 'end') return;

    setGrid((prev) => {
      const next = prev.map((row) => [...row]);
      next[y][x] = next[y][x] === 'wall' ? 'empty' : 'wall';
      return next;
    });
  };

  const clearPath = () => {
    setGrid((prev) =>
      prev.map((row) =>
        row.map((cell) => (cell === 'visited' || cell === 'path' ? 'empty' : cell))
      )
    );
    setStats({ visited: 0, pathLen: 0, time: 0 });
  };

  const clearAll = () => {
    const g = initGrid();
    g[DEFAULT_START[1]][DEFAULT_START[0]] = 'start';
    g[DEFAULT_END[1]][DEFAULT_END[0]] = 'end';
    setGrid(g);
    setStats({ visited: 0, pathLen: 0, time: 0 });
  };

  const solve = async () => {
    clearPath();
    setRunning(true);
    const t0 = performance.now();

    const g = grid.map((row) =>
      row.map((cell) => (cell === 'visited' || cell === 'path' ? 'empty' : cell))
    );

    const start = DEFAULT_START;
    const end = DEFAULT_END;

    // Priority queue (simple array-based for small grids)
    type Node = { x: number; y: number; g: number; f: number; parent: Node | null };

    const open: Node[] = [{ x: start[0], y: start[1], g: 0, f: heuristic(start, end), parent: null }];
    const closed = new Set<string>();
    const key = (x: number, y: number) => `${x},${y}`;
    let visitedCount = 0;

    const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

    while (open.length > 0) {
      // Sort by f-cost (a*) or g-cost (dijkstra) or FIFO (bfs)
      if (algo === 'bfs') {
        // BFS: FIFO — already in order
      } else {
        open.sort((a, b) => a.f - b.f);
      }

      const current = algo === 'bfs' ? open.shift()! : open.shift()!;

      if (current.x === end[0] && current.y === end[1]) {
        // Trace path
        let node: Node | null = current;
        const path: Coord[] = [];
        while (node) {
          path.push([node.x, node.y]);
          node = node.parent;
        }
        path.reverse();

        // Animate path
        for (const [px, py] of path) {
          if (g[py][px] !== 'start' && g[py][px] !== 'end') {
            g[py][px] = 'path';
            setGrid(g.map((r) => [...r]));
            await delay(25);
          }
        }

        setStats({
          visited: visitedCount,
          pathLen: path.length,
          time: Math.round(performance.now() - t0),
        });
        setRunning(false);
        return;
      }

      closed.add(key(current.x, current.y));

      if (g[current.y][current.x] !== 'start') {
        g[current.y][current.x] = 'visited';
        visitedCount++;
        if (visitedCount % 3 === 0) {
          setGrid(g.map((r) => [...r]));
          await delay(8);
        }
      }

      for (const [nx, ny] of getNeighbors(current.x, current.y)) {
        if (closed.has(key(nx, ny)) || g[ny][nx] === 'wall') continue;

        const ng = current.g + 1;
        const existing = open.find((n) => n.x === nx && n.y === ny);

        if (!existing) {
          const h = algo === 'dijkstra' ? 0 : heuristic([nx, ny], end);
          open.push({ x: nx, y: ny, g: ng, f: ng + h, parent: current });
        } else if (ng < existing.g) {
          existing.g = ng;
          const h = algo === 'dijkstra' ? 0 : heuristic([nx, ny], end);
          existing.f = ng + h;
          existing.parent = current;
        }
      }
    }

    // No path found
    setStats({ visited: visitedCount, pathLen: 0, time: Math.round(performance.now() - t0) });
    setRunning(false);
  };

  return (
    <Container as="section" py={0} maxW="5xl">
      <FadeIn>
        <SectionHeading
          label="Interactive demo"
          title="Pathfinding visualizer."
          description="Draw walls on the grid, pick an algorithm, and watch it find the shortest path. Red is start, orange is end."
        />

        {/* Controls */}
        <HStack gap={3} mb={4} flexWrap="wrap">
          {(['astar', 'dijkstra', 'bfs'] as Algo[]).map((a) => (
            <Box
              key={a}
              as="button"
              onClick={() => { if (!running) setAlgo(a); }}
              px={4}
              py={2}
              borderRadius="full"
              border="1px solid"
              borderColor={algo === a ? 'accentRed' : 'borderSoft'}
              bg={algo === a ? 'rgba(220, 38, 38, 0.12)' : 'bgCard'}
              color={algo === a ? 'accentRed' : 'textMuted'}
              fontSize="sm"
              fontWeight="500"
              cursor={running ? 'not-allowed' : 'pointer'}
              transition="all .2s ease"
              _hover={{ borderColor: 'accentRed' }}
            >
              {a === 'astar' ? 'A*' : a === 'dijkstra' ? 'Dijkstra' : 'BFS'}
            </Box>
          ))}

          <Button
            onClick={solve}
            disabled={running}
            bg="accentRed"
            color="white"
            size="sm"
            rounded="full"
            px={5}
            _hover={{ bg: 'accentRedDeep' }}
            ml="auto"
          >
            <Icon as={PlayIcon} boxSize={4} mr={1} />
            {running ? 'Solving...' : 'Solve'}
          </Button>
          <Button onClick={clearPath} disabled={running} variant="ghost" size="sm" color="textMuted" _hover={{ color: 'accentRed' }}>
            <Icon as={ArrowPathIcon} boxSize={4} mr={1} />
            Clear path
          </Button>
          <Button onClick={clearAll} disabled={running} variant="ghost" size="sm" color="textMuted" _hover={{ color: 'accentRed' }}>
            <Icon as={TrashIcon} boxSize={4} mr={1} />
            Reset
          </Button>
        </HStack>

        {/* Grid */}
        <Box
          borderRadius="xl"
          border="1px solid"
          borderColor="borderSoft"
          bg="bgCard"
          p={3}
          overflowX="auto"
          cursor={running ? 'not-allowed' : 'crosshair'}
        >
          <canvas
            ref={canvasRef}
            width={COLS * CELL}
            height={ROWS * CELL}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            style={{ display: 'block', margin: '0 auto' }}
          />
        </Box>

        {/* Stats */}
        {stats.visited > 0 && (
          <HStack gap={6} mt={4} justify="center">
            <VStack gap={0}>
              <Text fontSize="xl" fontWeight="700" color="accentRed" fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace">
                {stats.visited}
              </Text>
              <Text fontSize="xs" color="textSubtle" textTransform="uppercase" letterSpacing="0.16em">cells explored</Text>
            </VStack>
            <VStack gap={0}>
              <Text fontSize="xl" fontWeight="700" color="accentRed" fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace">
                {stats.pathLen || '—'}
              </Text>
              <Text fontSize="xs" color="textSubtle" textTransform="uppercase" letterSpacing="0.16em">path length</Text>
            </VStack>
            <VStack gap={0}>
              <Text fontSize="xl" fontWeight="700" color="accentRed" fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace">
                {stats.time}ms
              </Text>
              <Text fontSize="xs" color="textSubtle" textTransform="uppercase" letterSpacing="0.16em">solve time</Text>
            </VStack>
          </HStack>
        )}
      </FadeIn>
    </Container>
  );
}
