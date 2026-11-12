import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Line } from '@react-three/drei';
import * as THREE from 'three';

const R = 1.6;
const LAGOS = { lat: 6.49, lon: 3.35 }; // the only real location shown: the company's Lagos office

const toVec = (lat, lon, r = R) => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(-r * Math.sin(phi) * Math.cos(theta), r * Math.cos(phi), r * Math.sin(phi) * Math.sin(theta));
};

// Deterministic PRNG so the abstract network looks identical on every visit.
const rng = (seed) => () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;

function useDots(count = 2400) {
  return useMemo(() => {
    const pos = new Float32Array(count * 3);
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2;
      const rad = Math.sqrt(1 - y * y);
      const th = golden * i;
      pos.set([Math.cos(th) * rad * R, y * R, Math.sin(th) * rad * R], i * 3);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    return g;
  }, [count]);
}

/** Illustrative arcs between pseudo-random points: they do not represent real routes or operations. */
function useArcs(n = 14) {
  return useMemo(() => {
    const rand = rng(42);
    return Array.from({ length: n }, () => {
      const a = toVec(rand() * 140 - 70, rand() * 360 - 180);
      const b = toVec(rand() * 140 - 70, rand() * 360 - 180);
      const mid = a.clone().add(b).multiplyScalar(0.5);
      const lift = 1 + a.distanceTo(b) * 0.28;
      mid.normalize().multiplyScalar(R * lift);
      const curve = new THREE.QuadraticBezierCurve3(a, mid, b);
      return { curve, points: curve.getPoints(48), speed: 0.08 + rand() * 0.12, offset: rand() };
    });
  }, [n]);
}

const atmosphereShader = {
  uniforms: { c: { value: new THREE.Color('#16B6A4') } },
  vertexShader: `varying vec3 vN; void main(){ vN = normalize(normalMatrix * normal); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
  fragmentShader: `uniform vec3 c; varying vec3 vN; void main(){ float i = pow(0.72 - dot(vN, vec3(0.0,0.0,1.0)), 3.0); gl_FragColor = vec4(c, 1.0) * i; }`,
};

function Pulses({ arcs }) {
  const refs = useRef([]);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    arcs.forEach((arc, i) => {
      const m = refs.current[i];
      if (!m) return;
      const p = (t * arc.speed + arc.offset) % 1;
      m.position.copy(arc.curve.getPoint(p));
      m.scale.setScalar(0.6 + Math.sin(p * Math.PI) * 0.8);
    });
  });
  return arcs.map((_, i) => (
    <mesh key={i} ref={(el) => (refs.current[i] = el)}>
      <sphereGeometry args={[0.018, 10, 10]} />
      <meshBasicMaterial color="#E3C78A" toneMapped={false} />
    </mesh>
  ));
}

function LagosMarker() {
  const ring = useRef();
  const pos = useMemo(() => toVec(LAGOS.lat, LAGOS.lon, R * 1.005), []);
  const quat = useMemo(() => new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), pos.clone().normalize()), [pos]);
  useFrame(({ clock }) => {
    const s = 1 + ((clock.getElapsedTime() * 0.8) % 1) * 2.4;
    if (ring.current) {
      ring.current.scale.setScalar(s);
      ring.current.material.opacity = 1 - (s - 1) / 2.4;
    }
  });
  return (
    <group position={pos} quaternion={quat}>
      <mesh>
        <circleGeometry args={[0.035, 24]} />
        <meshBasicMaterial color="#C6A15B" toneMapped={false} />
      </mesh>
      <mesh ref={ring}>
        <ringGeometry args={[0.045, 0.055, 32]} />
        <meshBasicMaterial color="#C6A15B" transparent toneMapped={false} />
      </mesh>
    </group>
  );
}

function Globe() {
  const group = useRef();
  const dots = useDots();
  const arcs = useArcs();
  useFrame((state, dt) => {
    if (!group.current) return;
    group.current.rotation.y += dt * 0.06;
    const { x, y } = state.pointer;
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, 0.25 + y * 0.12, 0.04);
    group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, x * 0.08, 0.04);
  });
  return (
    <group ref={group} rotation={[0.25, -1.2, 0]}>
      <mesh>
        <sphereGeometry args={[R * 0.985, 64, 64]} />
        <meshBasicMaterial color="#0a2133" />
      </mesh>
      <points geometry={dots}>
        <pointsMaterial color="#C6A15B" size={0.024} sizeAttenuation transparent opacity={0.9} depthWrite={false} />
      </points>
      {arcs.map((a, i) => (
        <Line key={i} points={a.points} color="#16B6A4" lineWidth={1.1} transparent opacity={0.55} />
      ))}
      <Pulses arcs={arcs} />
      <LagosMarker />
      <mesh scale={1.18}>
        <sphereGeometry args={[R, 64, 64]} />
        <shaderMaterial args={[atmosphereShader]} side={THREE.BackSide} blending={THREE.AdditiveBlending} transparent depthWrite={false} />
      </mesh>
    </group>
  );
}

export default function EnergyGlobe({ active = true }) {
  return (
    <Canvas dpr={[1, 1.6]} frameloop={active ? 'always' : 'never'} camera={{ position: [0, 0, 5], fov: 40 }} gl={{ antialias: true, alpha: true }} aria-hidden="true">
      <Globe />
    </Canvas>
  );
}
