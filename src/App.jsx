import { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion, AnimatePresence } from 'framer-motion';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import BackgroundShapes from './components/BackgroundShapes';
import './App.css';

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
