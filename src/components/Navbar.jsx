import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaHome, FaUser, FaCode, FaAward, FaEnvelope, FaFileAlt } from 'react-icons/fa';
import './components.css';

const navItems = [
  { id: 'home', label: 'Home', icon: <FaHome size={16} /> },
  { id: 'about', label: 'About', icon: <FaUser size={15} /> },
  { id: 'projects', label: 'Projects', icon: <FaCode size={15} /> },
  { id: 'certifications', label: 'Certifications', icon: <FaAward size={15} /> },
  { id: 'contact', label: 'Contact', icon: <FaEnvelope size={15} /> },
];

const Navbar = ({ activeSection = 'home' }) => {
  const [currentActive, setCurrentActive] = useState(activeSection);

  useEffect(() => {
    setCurrentActive(activeSection);
  }, [activeSection]);

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    setCurrentActive(targetId);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.header 
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
      className="navbar-wrapper"
    >
      <nav className="floating-navbar glass">
        <a 
          href="#home" 
          onClick={(e) => handleNavClick(e, 'home')}
          className="navbar-brand"
        >
          <span className="brand-dot"></span>
          <span className="brand-text">AJAY</span>
        </a>

        <div className="nav-links">
          {navItems.map((item) => {
            const isActive = currentActive === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleNavClick(e, item.id)}
                className={`nav-link ${isActive ? 'active' : ''}`}
                title={item.label}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-text">{item.label}</span>
                {isActive && (
                  <motion.div 
                    layoutId="activeNavIndicator"
                    className="active-indicator"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </div>

        <div className="nav-cta">
          <a
            href="/assets/AJAY_RESUME.pdf?v=6"
            target="_blank"
            rel="noopener noreferrer"
            className="navbar-resume-btn"
          >
            <FaFileAlt size={13} style={{ marginRight: '5px' }} />
            <span>Resume</span>
          </a>
        </div>
      </nav>
    </motion.header>
  );
};

export default Navbar;
