import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTrophy, FaDatabase, FaChartLine, FaCode } from 'react-icons/fa';
import './components.css';

const certifications = [
  {
    title: "Selected to National Level – GenAI Buildathon",
    issuer: "OpenAI Academy × NxtWave",
    platform: "India AI Impact Summit 2026",
    icon: <FaTrophy size={20} style={{ color: '#facc15' }} />,
    skills: ["Computer Vision (OpenCV)", "GenAI Threat Detection", "Autonomous SITL Flight", "Chakshu Prototype"],
    badgeColor: "rgba(234, 179, 8, 0.2)",
    borderColor: "rgba(234, 179, 8, 0.4)",
    image: "/assets/GenAI-Certificate.jpg"
  },
  {
    title: "SQL and Relational Databases",
    issuer: "IBM Skills Network",
    platform: "CognitiveClass.ai",
    icon: <FaDatabase size={20} style={{ color: '#0064a5' }} />,
    skills: ["Relational Database Design", "Complex SQL Queries", "Joins & Aggregations", "Schema Optimization"],
    badgeColor: "rgba(59, 130, 246, 0.2)",
    borderColor: "rgba(59, 130, 246, 0.4)",
    image: "/assets/IBM-Certificate.jpg"
  },
  {
    title: "Data Analytics Job Simulation",
    issuer: "Deloitte Australia",
    platform: "Forage",
    icon: <FaChartLine size={20} style={{ color: '#10b981' }} />,
    skills: ["Forensic Analytics", "Data Interpretation", "KPI Reporting", "Business Insights"],
    badgeColor: "rgba(16, 185, 129, 0.2)",
    borderColor: "rgba(16, 185, 129, 0.4)",
    image: "/assets/Deloitte-Certificate.jpg"
  },
  {
    title: "Introduction to Data Science",
    issuer: "Infosys Springboard",
    platform: "Infosys",
    icon: <FaCode size={20} style={{ color: '#8b5cf6' }} />,
    skills: ["Data Wrangling", "Exploratory Data Analysis", "Python Libraries", "Statistical Modeling"],
    badgeColor: "rgba(139, 92, 246, 0.2)",
    borderColor: "rgba(139, 92, 246, 0.4)",
    image: "/assets/Infosys-Certificate.png"
  }
];

const Certifications = () => {
  const [selectedCert, setSelectedCert] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedCert(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <section id="certifications" className="certifications-section">
      <div className="section-container">
        <motion.h2 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="section-title text-gradient"
        >
          Certifications & Achievements
        </motion.h2>

        {/* Certifications & Achievements Cards Grid */}
        <div className="cert-grid">
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.12 }}
              className="cert-card glass"
            >
              <div className="cert-header">
                <div className="cert-icon-wrapper" style={{ background: cert.badgeColor, borderColor: cert.borderColor }}>
                  {cert.icon}
                </div>
                <div className="cert-issuer-info">
                  <span className="cert-issuer">{cert.issuer}</span>
                  <span className="cert-platform">{cert.platform}</span>
                </div>
              </div>

              <h4 className="cert-title">{cert.title}</h4>

              <div className="cert-skills-list">
                {cert.skills.map((skill, sIdx) => (
                  <span key={sIdx} className="cert-skill-chip">
                    {skill}
                  </span>
                ))}
              </div>

              <div className="cert-footer">
                {cert.image && (
                  <button
                    type="button"
                    className="cert-view-btn"
                    onClick={() => setSelectedCert(cert)}
                    title="View official certificate"
                  >
                    View Certificate ↗
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Certificate Modal Lightbox */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="project-modal-backdrop"
            onClick={() => setSelectedCert(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="project-modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="project-modal-header">
                <div>
                  <h3>{selectedCert.title}</h3>
                  <span style={{ fontSize: '0.8rem', color: '#9ca3af' }}>
                    {selectedCert.issuer} • {selectedCert.platform}
                  </span>
                </div>
                <button
                  type="button"
                  className="project-modal-close"
                  onClick={() => setSelectedCert(null)}
                  title="Close (Esc)"
                >
                  ✕
                </button>
              </div>
              <div className="project-modal-body">
                <img src={selectedCert.image} alt={selectedCert.title} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Certifications;
