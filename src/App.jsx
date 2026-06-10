import { Suspense, useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Stars } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import './App.css';

// 3D Milky Way particle system
const MilkyWay = ({ scrollProgress }) => {
  const pointsRef = useRef();
  const count = 4000;

  // Generate particles clustered along a wavy galaxy shape
  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const cols = new Float32Array(count * 3);
    const color1 = new THREE.Color('#a855f7'); // Purple
    const color2 = new THREE.Color('#3b82f6'); // Blue
    const color3 = new THREE.Color('#ec4899'); // Pink

    for (let i = 0; i < count; i++) {
      // X coordinates spread across the screen width
      const x = (Math.random() - 0.5) * 40;
      // Wavy pattern with density concentrated near the core
      const spread = 2.5 - Math.abs(x) * 0.05;
      const y = Math.sin(x * 0.15) * 2.5 + (Math.random() - 0.5) * Math.max(0.5, spread);
      // Z depth spacing
      const z = (Math.random() - 0.5) * 6 - 3;

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      // Color blending
      const pct = Math.random();
      const mixedColor = color1.clone();
      if (pct < 0.4) {
        mixedColor.lerp(color2, Math.random());
      } else if (pct < 0.8) {
        mixedColor.lerp(color3, Math.random());
      } else {
        mixedColor.lerp(new THREE.Color('#ffffff'), Math.random() * 0.3); // add white stars
      }

      cols[i * 3] = mixedColor.r;
      cols[i * 3 + 1] = mixedColor.g;
      cols[i * 3 + 2] = mixedColor.b;
    }
    return [pos, cols];
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      // Smoothly move left/right based on scroll progress
      const targetX = (scrollProgress.current - 0.5) * -15; // moves vice versa on scroll direction
      pointsRef.current.position.x = THREE.MathUtils.lerp(pointsRef.current.position.x, targetX, 0.08) + Math.sin(state.clock.getElapsedTime() * 0.3) * 0.5;

      // Slight static tilt based on scroll instead of continuous 360 spin
      const targetRotY = (scrollProgress.current - 0.5) * 0.3;
      const targetRotZ = (scrollProgress.current - 0.5) * -0.1;
      pointsRef.current.rotation.y = THREE.MathUtils.lerp(pointsRef.current.rotation.y, targetRotY, 0.08);
      pointsRef.current.rotation.z = THREE.MathUtils.lerp(pointsRef.current.rotation.z, targetRotZ, 0.08);
      
      // Floating wave effect (horizontal sway/wave animation)
      const waveTime = state.clock.getElapsedTime();
      pointsRef.current.position.x = THREE.MathUtils.lerp(pointsRef.current.position.x, targetX, 0.08) + Math.sin(waveTime * 0.3) * 0.5;
      pointsRef.current.position.y = Math.cos(waveTime * 0.2) * 0.15;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        vertexColors
        transparent
        opacity={0.7}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

// Background 3D elements
const BackgroundShapes = ({ scrollProgress }) => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <Environment preset="city" />
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <MilkyWay scrollProgress={scrollProgress} />
    </>
  );
};

function App() {
  const scrollProgress = useRef(0);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  const handleScroll = (e) => {
    const target = e.target;
    const progressVal = target.scrollTop / (target.scrollHeight - target.clientHeight);
    scrollProgress.current = progressVal;
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 500); // preloader fade out delay
          return 100;
        }
        return prev + 4; // increment speed (approx 1s total duration)
      });
    }, 40);

    return () => clearInterval(interval);
  }, []);

  const letterContainer = {
    animate: {
      transition: {
        staggerChildren: 0.18
      }
    }
  };

  const letterAnim = {
    initial: { opacity: 0, y: 35, scale: 0.8 },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <div className="app-container">
      <AnimatePresence mode="wait">
        {loading && (
          <motion.div
            key="preloader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            style={{
              position: 'fixed',
              inset: 0,
              background: '#0a0a0f',
              zIndex: 99999,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1.5rem'
            }}
          >
            <motion.div 
              variants={letterContainer}
              initial="initial"
              animate="animate"
              style={{
                display: 'flex',
                gap: '0.75rem'
              }}
            >
              {["A", "J", "A", "Y"].map((char, index) => (
                <motion.span
                  key={index}
                  variants={letterAnim}
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '4.5rem',
                    fontWeight: '900',
                    letterSpacing: '0.05em',
                    color: '#fff',
                    textShadow: '0 0 30px rgba(109, 40, 217, 0.8)'
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </motion.div>

            {/* Progress bar */}
            <div style={{
              width: '240px',
              height: '5px',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '10px',
              overflow: 'hidden',
              position: 'relative',
              boxShadow: '0 4px 24px rgba(0,0,0,0.5)'
            }}>
              <motion.div 
                animate={{ width: `${progress}%` }}
                transition={{ ease: "easeOut" }}
                style={{
                  height: '100%',
                  background: 'linear-gradient(90deg, #6d28d9 0%, #3b82f6 100%)',
                  boxShadow: '0 0 12px rgba(109, 40, 217, 0.8)'
                }}
              />
            </div>
            <span style={{ fontSize: '0.8rem', color: '#a0a0a5', opacity: 0.6, letterSpacing: '0.1em' }}>
              {Math.min(100, Math.round(progress))}%
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background container selection */}
      {isMobile ? (
        <div className="mobile-bg-glow">
          <div className="blob blob-1"></div>
          <div className="blob blob-2"></div>
          <div className="blob blob-3"></div>
        </div>
      ) : (
        /* 3D Background Canvas */
        <div className="canvas-container">
          <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
            <Suspense fallback={null}>
              <BackgroundShapes scrollProgress={scrollProgress} />
            </Suspense>
          </Canvas>
        </div>
      )}

      {/* HTML Overlay */}
      <div className="content-overlay" onScroll={handleScroll}>
        <Hero />
        <About />
        <Projects />
        <Contact />
      </div>
    </div>
  );
}

export default App;
