import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows, Environment, Float, Lightformer, MeshDistortMaterial, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

// Teardrop profile revolved into a lathe: a stylised oil droplet that stays recognisable under distortion.
const dropProfile = (() => {
  // Classic teardrop curve: pointed tip at the top, fully rounded base.
  const pts = [];
  const N = 96;
  for (let i = 0; i <= N; i++) {
    const a = (i / N) * Math.PI;
    const r = Math.sin(a) * Math.pow(Math.sin(a / 2), 1.6) * 1.15;
    const y = Math.cos(a) * 1.25 + 0.1;
    pts.push(new THREE.Vector2(Math.max(r, 0.0001), y));
  }
  return pts;
})();

function Droplet() {
  const mesh = useRef();
  useFrame((state, dt) => {
    if (!mesh.current) return;
    mesh.current.rotation.y += dt * 0.25;
    const { x, y } = state.pointer;
    mesh.current.rotation.z = THREE.MathUtils.lerp(mesh.current.rotation.z, -x * 0.18, 0.05);
    mesh.current.rotation.x = THREE.MathUtils.lerp(mesh.current.rotation.x, y * 0.12, 0.05);
  });
  return (
    <Float speed={1.4} rotationIntensity={0.25} floatIntensity={0.7}>
      <mesh ref={mesh} scale={1.15} castShadow>
        <latheGeometry args={[dropProfile, 128]} />
        <MeshDistortMaterial color="#D9B672" metalness={0.92} roughness={0.18} distort={0.14} speed={1.6} envMapIntensity={1.6} />
      </mesh>
    </Float>
  );
}

export default function LiquidObject({ active = true }) {
  return (
    <Canvas
      dpr={[1, 1.6]}
      frameloop={active ? 'always' : 'never'}
      camera={{ position: [0, 0, 5.2], fov: 38 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      aria-hidden="true"
    >
      <ambientLight intensity={0.25} />
      <directionalLight position={[3, 4, 5]} intensity={1.6} />
      <Droplet />
      <Sparkles count={40} scale={[5, 4, 3]} size={2.2} speed={0.25} color="#E3C78A" opacity={0.6} />
      <ContactShadows position={[0, -1.85, 0]} opacity={0.45} scale={6} blur={2.6} far={3} color="#000000" />
      {/* Studio lighting built from Lightformers: realistic reflections without fetching an HDR file */}
      <Environment resolution={256}>
        {/* warm base tone so the metal reads as gold rather than mirroring black */}
        <color attach="background" args={['#5a4220']} />
        <Lightformer form="rect" intensity={2.2} color="#F6E3B0" position={[0, 0, 6]} scale={[14, 8, 1]} />
        <group rotation={[-Math.PI / 3, 0, 1]}>
          <Lightformer form="circle" intensity={4} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={2} />
          <Lightformer form="circle" intensity={2} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={2} />
          <Lightformer form="ring" color="#16B6A4" intensity={5} rotation-y={Math.PI / 2} position={[-5, -1, -1]} scale={4} />
          <Lightformer form="rect" intensity={3} position={[8, 2, 0]} scale={[10, 4, 1]} rotation-y={-Math.PI / 2} />
          <Lightformer form="rect" color="#F6E3B0" intensity={1.5} position={[0, -6, 2]} scale={[12, 2, 1]} rotation-x={-Math.PI / 2} />
        </group>
      </Environment>
    </Canvas>
  );
}
