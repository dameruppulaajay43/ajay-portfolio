import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import * as THREE from 'three';

// Component for individual floating 3D shapes
const FloatingShape = ({ children, position, speed = 1, rotationSpeed = 1, scrollFactor = 1, scrollProgress }) => {
  const meshRef = useRef();
  const initialPosition = useMemo(() => [...position], [position]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // Gentle up/down floating movement
    const hoverY = Math.sin(time * 0.4 * speed) * 0.35;
    const hoverX = Math.cos(time * 0.3 * speed) * 0.25;

    // Parallax scroll effect: as the user scrolls down, shapes move upward in 3D space
    const scrollYOffset = (scrollProgress?.current || 0) * 10 * scrollFactor;

    // Mouse tracking tilt/parallax
    const mouseXOffset = state.pointer.x * 0.8 * scrollFactor;
    const mouseYOffset = state.pointer.y * 0.8 * scrollFactor;

    // Target position after applying float, scroll, and mouse movement
    const targetX = initialPosition[0] + hoverX + mouseXOffset;
    const targetY = initialPosition[1] + hoverY + scrollYOffset + mouseYOffset;

    // Smoothly interpolate positions
    meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetX, 0.05);
    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY, 0.05);

    // Apply continuous rotation
    meshRef.current.rotation.x += 0.003 * rotationSpeed;
    meshRef.current.rotation.y += 0.004 * rotationSpeed;
    meshRef.current.rotation.z += 0.002 * rotationSpeed;
  });

  return (
    <mesh ref={meshRef} position={position}>
      {children}
    </mesh>
  );
};

// Interactive Light that follows the user's cursor
const InteractiveLight = () => {
  const lightRef = useRef();

  useFrame((state) => {
    // Map normal mouse coordinates (-1 to 1) to 3D space
    const targetX = state.pointer.x * 6;
    const targetY = state.pointer.y * 6;

    if (lightRef.current) {
      // Lerp position for organic, smooth follow motion
      lightRef.current.position.x = THREE.MathUtils.lerp(lightRef.current.position.x, targetX, 0.08);
      lightRef.current.position.y = THREE.MathUtils.lerp(lightRef.current.position.y, targetY, 0.08);
    }
  });

  return (
    <pointLight
      ref={lightRef}
      position={[0, 0, 4]}
      intensity={6}
      color="#ffffff"
      distance={12}
      decay={1.8}
    />
  );
};

// A soft background particle field that drifts slowly
const FloatingParticles = ({ count = 180, scrollProgress }) => {
  const pointsRef = useRef();

  // Create random position coordinates
  const particles = useMemo(() => {
    const temp = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      temp[i * 3] = (Math.random() - 0.5) * 16;     // X
      temp[i * 3 + 1] = (Math.random() - 0.5) * 16; // Y
      temp[i * 3 + 2] = (Math.random() - 0.5) * 8;  // Z
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (pointsRef.current) {
      // Drifting rotation over time
      pointsRef.current.rotation.y = time * 0.015;
      pointsRef.current.rotation.x = time * 0.008;

      // Subtle scroll parallax for the particles
      const scrollYOffset = (scrollProgress?.current || 0) * 1.5;
      pointsRef.current.position.y = THREE.MathUtils.lerp(pointsRef.current.position.y, scrollYOffset, 0.05);
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particles, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#a78bfa" // soft violet color
        sizeAttenuation={true}
        transparent={true}
        opacity={0.35}
        depthWrite={false}
      />
    </points>
  );
};

// Main 3D Background component containing all elements
const BackgroundShapes = ({ scrollProgress }) => {
  return (
    <>
      {/* Lighting Setup */}
      <ambientLight intensity={0.4} />
      
      {/* Directional Lights to illuminate the edges and depth */}
      <directionalLight position={[8, 8, 4]} intensity={1.8} color="#ffffff" />
      <directionalLight position={[-8, -8, -2]} intensity={1.2} color="#06b6d4" />
      <directionalLight position={[0, 10, 0]} intensity={1.0} color="#ec4899" />

      {/* Interactive spotlight following the mouse */}
      <InteractiveLight />

      {/* Glassmorphic Shapes */}

      {/* 1. Large Torus Knot - Top Left / Mid Depth */}
      {/* 1. Large Torus Knot - Top Left / Mid Depth (Visible on Page 1 / Hero) */}
      <FloatingShape 
        position={[-2.4, 1.2, -1]} 
        speed={0.8} 
        rotationSpeed={1.2} 
        scrollFactor={1.2} 
        scrollProgress={scrollProgress}
      >
        <torusKnotGeometry args={[0.55, 0.16, 120, 16]} />
        <meshPhysicalMaterial
          transmission={0.92}
          roughness={0.08}
          thickness={1.4}
          ior={1.6}
          clearcoat={1.0}
          clearcoatRoughness={0.08}
          color="#8b5cf6" // Violet
          envMapIntensity={1.8}
        />
      </FloatingShape>

      {/* 2. Icosahedron - Middle Right / Close Depth (Visible on Page 2 / About) */}
      <FloatingShape 
        position={[2.0, -3.0, 0.5]} 
        speed={1.2} 
        rotationSpeed={1.6} 
        scrollFactor={1.5} 
        scrollProgress={scrollProgress}
      >
        <icosahedronGeometry args={[0.7, 0]} />
        <meshPhysicalMaterial
          transmission={0.9}
          roughness={0.12}
          thickness={1.8}
          ior={1.5}
          clearcoat={1.0}
          clearcoatRoughness={0.12}
          color="#06b6d4" // Cyan
          envMapIntensity={1.8}
        />
      </FloatingShape>

      {/* 3. Ring / Torus - Bottom Left / Far Depth (Visible on Page 3 / Projects) */}
      <FloatingShape 
        position={[-2.0, -6.5, -1.5]} 
        speed={0.9} 
        rotationSpeed={0.8} 
        scrollFactor={1.4} 
        scrollProgress={scrollProgress}
      >
        <torusGeometry args={[0.65, 0.18, 16, 100]} />
        <meshPhysicalMaterial
          transmission={0.94}
          roughness={0.05}
          thickness={1.2}
          ior={1.75}
          clearcoat={1.0}
          clearcoatRoughness={0.05}
          color="#ec4899" // Pink
          envMapIntensity={1.8}
        />
      </FloatingShape>

      {/* 4. Glass Sphere - Top Right / Far Depth (Visible on Page 4 / Contact) */}
      <FloatingShape 
        position={[1.8, -9.0, -2]} 
        speed={0.6} 
        rotationSpeed={0.5} 
        scrollFactor={1.3} 
        scrollProgress={scrollProgress}
      >
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshPhysicalMaterial
          transmission={0.95}
          roughness={0.1}
          thickness={2.0}
          ior={1.45}
          clearcoat={1.0}
          clearcoatRoughness={0.1}
          color="#3b82f6" // Royal Blue
          envMapIntensity={1.8}
        />
      </FloatingShape>

      {/* 5. Octahedron - Lower Center / Mid Depth (Visible on Page 4 / Contact) */}
      <FloatingShape 
        position={[-0.8, -12.0, -1]} 
        speed={1.4} 
        rotationSpeed={1.8} 
        scrollFactor={1.4} 
        scrollProgress={scrollProgress}
      >
        <octahedronGeometry args={[0.45]} />
        <meshPhysicalMaterial
          transmission={0.88}
          roughness={0.15}
          thickness={1.5}
          ior={1.6}
          clearcoat={1.0}
          clearcoatRoughness={0.1}
          color="#eab308" // Amber/Gold highlight
          envMapIntensity={1.8}
        />
      </FloatingShape>

      {/* Environment Map for beautiful glass reflections */}
      <Environment preset="city" />

      {/* Particle Drift System */}
      <FloatingParticles count={220} scrollProgress={scrollProgress} />
    </>
  );
};

export default BackgroundShapes;
