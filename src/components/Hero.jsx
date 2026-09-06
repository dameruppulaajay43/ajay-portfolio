import { motion } from 'framer-motion';
import './components.css';

const Hero = () => {
  return (
    <section id="home" className="hero-section">
      <div className="section-container hero-content">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="hero-text"
        >
          <motion.h2 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="greeting"
          >
            Hi, I'm
          </motion.h2>
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8, type: "spring" }}
            className="name text-gradient text-glow"
          >
            Ajay
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="subtitle"
          >
            Aspiring Data Analyst | Leveraging Python, SQL, Excel, Power BI, and Tableau to build dashboards & uncover insights.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="cta-container"
          >
            <a href="#projects" className="primary-btn glass">
              View My Work
            </a>
            <a 
              href="/assets/AJAY_RESUME.pdf?v=6" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="primary-btn glass" 
              style={{ border: '1px solid #3b82f6', background: 'rgba(59, 130, 246, 0.1)' }}
            >
              Resume
            </a>
            <a href="#contact" className="secondary-btn">
              Get In Touch
            </a>
          </motion.div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 1, type: "spring" }}
          className="hero-image-container"
        >
          <div className="hero-image-wrapper">
            <img src="/assets/my_image.png" alt="Ajay" className="hero-image" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
