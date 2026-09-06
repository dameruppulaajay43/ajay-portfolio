import { motion } from 'framer-motion';
import { FaTrophy, FaCertificate, FaDatabase, FaChartLine, FaCode } from 'react-icons/fa';
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
    accentColor: "#facc15",
    verifiedText: "Selected to National Level"
  },
  {
    title: "SQL and Relational Databases",
    issuer: "IBM Skills Network",
    platform: "CognitiveClass.ai",
    icon: <FaDatabase size={20} style={{ color: '#0064a5' }} />,
    skills: ["Relational Database Design", "Complex SQL Queries", "Joins & Aggregations", "Schema Optimization"],
    badgeColor: "rgba(59, 130, 246, 0.2)",
    borderColor: "rgba(59, 130, 246, 0.4)",
    accentColor: "#3b82f6",
    verifiedText: "Verified Credential"
  },
  {
    title: "Data Analytics Job Simulation",
    issuer: "Deloitte Australia",
    platform: "Forage",
    icon: <FaChartLine size={20} style={{ color: '#10b981' }} />,
    skills: ["Forensic Analytics", "Data Interpretation", "KPI Reporting", "Business Insights"],
    badgeColor: "rgba(16, 185, 129, 0.2)",
    borderColor: "rgba(16, 185, 129, 0.4)",
    accentColor: "#10b981",
    verifiedText: "Verified Credential"
  },
  {
    title: "Introduction to Data Science",
    issuer: "Infosys Springboard",
    platform: "Infosys",
    icon: <FaCode size={20} style={{ color: '#8b5cf6' }} />,
    skills: ["Data Wrangling", "Exploratory Data Analysis", "Python Libraries", "Statistical Modeling"],
    badgeColor: "rgba(139, 92, 246, 0.2)",
    borderColor: "rgba(139, 92, 246, 0.4)",
    accentColor: "#8b5cf6",
    verifiedText: "Verified Credential"
  }
];

const Certifications = () => {
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
                <span className="cert-verified-badge" style={{ color: cert.accentColor }}>
                  <FaCertificate size={13} style={{ marginRight: '6px' }} />
                  {cert.verifiedText}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
