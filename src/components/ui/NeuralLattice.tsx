import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';

function Lattice(props: any) {
  const ref = useRef<THREE.Points>(null);
  
  // Generate points for a sphere
  const [positions, originalPositions] = useMemo(() => {
    const count = 2000;
    const pos = new Float32Array(count * 3);
    const orig = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const x = Math.sin(phi) * Math.cos(theta);
      const y = Math.sin(phi) * Math.sin(theta);
      const z = Math.cos(phi);
      
      const r = 1.5;
      pos[i * 3] = x * r;
      pos[i * 3 + 1] = y * r;
      pos[i * 3 + 2] = z * r;
      
      orig[i * 3] = x * r;
      orig[i * 3 + 1] = y * r;
      orig[i * 3 + 2] = z * r;
    }
    return [pos, orig];
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    const time = state.clock.getElapsedTime();
    const posAttr = ref.current.geometry.attributes.position;
    
    for (let i = 0; i < 2000; i++) {
      const ix = i * 3;
      const iy = i * 3 + 1;
      const iz = i * 3 + 2;

      // Subtle morphing based on sine waves (Neural vibe)
      const noise = Math.sin(originalPositions[ix] * 2 + time) * 0.1 + 
                    Math.cos(originalPositions[iy] * 2 + time) * 0.1;
      
      posAttr.array[ix] = originalPositions[ix] * (1 + noise);
      posAttr.array[iy] = originalPositions[iy] * (1 + noise);
      posAttr.array[iz] = originalPositions[iz] * (1 + noise);
    }
    
    posAttr.needsUpdate = true;
    ref.current.rotation.y += 0.002;
    ref.current.rotation.x += 0.001;
  });

  return (
    <group {...props}>
      <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#ffffff"
          size={0.015}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
}

export default function NeuralLattice() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
          <Lattice />
        </Float>
      </Canvas>
    </div>
  );
}
