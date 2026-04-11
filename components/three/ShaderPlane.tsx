'use client';

import * as THREE from 'three';
import { extend, useFrame } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';
import { useRef } from 'react';

/* ---------- WaveMaterial definition ---------- */
// Dragon-forge palette: deep black → crimson wave with flame edges.
const WaveMaterial = shaderMaterial(
  {
    time: 0,
    color1: new THREE.Color('#0a0a0a'),
    color2: new THREE.Color('#dc2626'),
  },
  /* vertex shader */ `
    uniform float time;
    varying vec2 vUv;
    void main() {
      vUv = uv;
      vec3 pos = position;
      pos.z += sin(pos.x * 4.0 + time * 2.0) * 0.1;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }`,
  /* fragment shader */ `
    uniform float time;
    uniform vec3 color1;
    uniform vec3 color2;
    varying vec2 vUv;
    void main() {
      float wave = sin(vUv.x * 10.0 + time) * 0.5 + 0.5;
      vec3 col = mix(color1, color2, wave);
      gl_FragColor = vec4(col, 1.0);
    }`
);

// register it so <waveMaterial /> works
extend({ WaveMaterial });

type WaveMatImpl = typeof WaveMaterial['prototype'];

export default function ShaderPlane() {
  const mat = useRef<WaveMatImpl | null>(null);

  // update the “time” uniform each frame
  useFrame(({ clock }) => {
    if (mat.current) mat.current.time = clock.getElapsedTime();
  });

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
      <planeGeometry args={[5, 5, 128, 128]} />
      {/* @ts-ignore-next-line */}
      <waveMaterial ref={mat} />
    </mesh>
  );
}
