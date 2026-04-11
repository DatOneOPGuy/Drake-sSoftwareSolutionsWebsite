'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { Box } from '@chakra-ui/react';

const Canvas = dynamic(() => import('@react-three/fiber').then((m) => m.Canvas), { ssr: false });
const ShaderPlane = dynamic(() => import('./ShaderPlane'), { ssr: false });

export default function Banner3D() {
  return (
    <Box
      position="relative"
      h={{ base: '32vh', md: '38vh' }}
      w="full"
      bgGradient="linear(to-b, #070a11, transparent 72%)"
      overflow="hidden"
    >
      <Suspense fallback={null}>
        <Canvas
          camera={{ position: [0, 1.4, 2.5], fov: 45 }}
          style={{ height: '100%', width: '100%' }}
        >
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 5, 5]} intensity={0.4} />
          <ShaderPlane />
        </Canvas>
      </Suspense>

      <Box
        position="absolute"
        bottom={0}
        left={0}
        w="full"
        h="40%"
        bgGradient="linear(to-b, transparent, #070a11)"
        zIndex={2}
      />
    </Box>
  );
}
