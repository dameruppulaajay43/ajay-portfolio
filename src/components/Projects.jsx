import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaChartBar } from 'react-icons/fa';

const projects = [
  {
    title: "Olist E-commerce Performance & Delivery Analysis",
    description: "An end-to-end data analysis of 96K+ delivered orders (R$ 15.4M revenue) across 8 related tables using T-SQL (CTEs, joins, window functions) and Python (Pandas, SQLAlchemy). Built a 2-page interactive Power BI dashboard analyzing sales KPIs, geographic delivery delays (Rio vs São Paulo), and customer retention.",
    tags: ["Power BI", "SQL Server / T-SQL", "Python", "DAX", "Data Analytics"],
    image: "/assets/olist_sales_overview.png",
    previewTitle: "Olist E-commerce Performance & Delivery Analysis (Power BI)",
    gallery: [
      { title: "Page 1: Sales Overview", src: "/assets/olist_sales_overview.png" },
      { title: "Page 2: Delivery & Satisfaction", src: "/assets/olist_delivery.png" }
    ],
    link: "https://github.com/dameruppulaajay43/olist-ecommerce-analysis"
  },
  {
    title: "Swiggy Sales & Performance Dashboard",
    description: "An interactive Excel analytics dashboard analyzing 197K+ orders and ₹53M+ in revenue. Features dynamic monthly/weekly revenue trends, city-level performance, dietary category breakdowns, and interactive slicers.",
    tags: ["Excel", "Pivot Tables", "KPI Dashboards", "Data Analytics"],
    image: "/assets/swiggy_dashboard.png",
    previewTitle: "Swiggy Sales & Performance Dashboard (Excel)"
  },
  {
    title: "TRUEJOBS",
    description: "A data-driven recruitment and applicant tracking platform. Built backend workflows and relational schemas in MySQL across 500+ simulated listings, integrating candidate-job matching filters to support data-driven recruitment.",
    tags: ["Python", "SQL", "MySQL", "Recruitment Analytics"],
    link: "https://truejobs.solutions/"
  },
  {
    title: "CHAKSHU (GARUDA)",
    description: "An advanced real-time AI surveillance dashboard. Integrates live video streams (HLS) and geo-location tracking (Leaflet maps) to monitor feeds, utilizing GenAI and OpenCV for automated threat detection and alert analysis.",
    tags: ["GenAI", "OpenCV", "Python", "Alert Analytics"],
    link: "https://garuda-nu.vercel.app/"
  },
  {
    title: "Movie Recommendation System",
    description: "A machine learning project built with Python, Pandas, and Scikit-learn. Implemented collaborative and content-based filtering algorithms on user datasets to predict user preferences and improve recommendation accuracy.",
    tags: ["Python", "Pandas", "Scikit-Learn", "Recommendation Models"],
    link: "#"
  },
  {
    title: "PORTFOLIO",
    description: "A responsive 3D portfolio website showcasing academic milestones and projects. Features a custom-rendered Three.js particle system background, fluid animations, and a letter-by-letter landing preloader.",
    tags: ["React", "Three.js", "Framer Motion", "Vite"],
    link: "#home"
  }
];

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [activePageIndex, setActivePageIndex] = useState(0);

  const openPreview = (project) => {
    setActivePageIndex(0);
    setSelectedProject(project);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedProject(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <section id="projects" className="projects-section">
      <div className="section-container">
        <motion.h2 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="section-title text-gradient"
        >
          Selected Works
        </motion.h2>
        
        <div className="projects-grid">
          {projects.map((project, index) => {
            const isClickable = project.link && project.link !== "#";
            const hasImagePreview = Boolean(project.image);
            const isGithub = project.link && project.link.includes('github.com');

            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.12 }}
                className="project-card glass"
              >
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                
                {project.tags && (
                  <div className="tech-stack">
                    {project.tags.map((tag, tagIdx) => (
                      <span key={tagIdx} className="tech-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <div style={{ marginTop: 'auto', paddingTop: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap' }}>
                  {hasImagePreview && (
                    <button
                      type="button"
                      onClick={() => openPreview(project)}
                      style={{
                        background: 'rgba(109, 40, 217, 0.18)',
                        border: '1px solid rgba(109, 40, 217, 0.45)',
                        color: '#c4b5fd',
                        fontWeight: '600',
                        fontSize: '0.85rem',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        cursor: 'pointer',
                        padding: '0.4rem 0.75rem',
                        borderRadius: '8px',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(109, 40, 217, 0.35)';
                        e.currentTarget.style.borderColor = 'rgba(109, 40, 217, 0.7)';
                        e.currentTarget.style.color = '#ffffff';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(109, 40, 217, 0.18)';
                        e.currentTarget.style.borderColor = 'rgba(109, 40, 217, 0.45)';
                        e.currentTarget.style.color = '#c4b5fd';
                      }}
                    >
                      <FaChartBar size={13} />
                      <span>Dashboard Preview ↗</span>
                    </button>
                  )}
                  {isClickable && (
                    <a
                      href={project.link}
                      target={project.link.startsWith('http') ? "_blank" : "_self"}
                      rel="noopener noreferrer"
                      style={{ 
                        color: 'var(--color-text-secondary)', 
                        fontWeight: '600', 
                        fontSize: '0.85rem', 
                        display: 'inline-flex', 
                        alignItems: 'center', 
                        gap: '0.35rem',
                        textDecoration: 'none',
                        padding: '0.4rem 0.7rem',
                        borderRadius: '8px',
                        border: '1px solid rgba(255, 255, 255, 0.12)',
                        background: 'rgba(255, 255, 255, 0.05)',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = '#ffffff';
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = 'var(--color-text-secondary)';
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                      }}
                    >
                      {isGithub ? (
                        <>
                          <FaGithub size={13} />
                          <span>GitHub Repo ↗</span>
                        </>
                      ) : (
                        <>
                          <FaExternalLinkAlt size={11} />
                          <span>Visit Live Site ↗</span>
                        </>
                      )}
                    </a>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Fullscreen Preview Lightbox Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="project-modal-backdrop"
            onClick={() => setSelectedProject(null)}
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
                  <h3>{selectedProject.previewTitle || selectedProject.title}</h3>
                  <span style={{ fontSize: '0.78rem', color: '#9ca3af' }}>
                    Interactive Business Intelligence Dashboard
                  </span>
                  {selectedProject.gallery && (
                    <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
                      {selectedProject.gallery.map((page, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setActivePageIndex(idx)}
                          style={{
                            padding: '0.3rem 0.75rem',
                            borderRadius: '6px',
                            fontSize: '0.78rem',
                            fontWeight: '600',
                            cursor: 'pointer',
                            border: activePageIndex === idx ? '1px solid #3b82f6' : '1px solid rgba(255, 255, 255, 0.15)',
                            background: activePageIndex === idx ? 'rgba(59, 130, 246, 0.25)' : 'rgba(255, 255, 255, 0.05)',
                            color: activePageIndex === idx ? '#93c5fd' : '#cbd5e1',
                            transition: 'all 0.2s ease'
                          }}
                        >
                          {page.title}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  {selectedProject.link && selectedProject.link.startsWith('http') && (
                    <a
                      href={selectedProject.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        padding: '0.35rem 0.75rem',
                        borderRadius: '8px',
                        fontSize: '0.8rem',
                        fontWeight: '600',
                        color: '#fff',
                        background: 'rgba(255, 255, 255, 0.08)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        textDecoration: 'none'
                      }}
                    >
                      {selectedProject.link.includes('github.com') ? <FaGithub size={13} /> : <FaExternalLinkAlt size={11} />}
                      <span>{selectedProject.link.includes('github.com') ? 'GitHub' : 'Live Site'}</span>
                    </a>
                  )}
                  <button 
                    type="button" 
                    className="project-modal-close"
                    onClick={() => setSelectedProject(null)}
                    title="Close (Esc)"
                  >
                    ✕
                  </button>
                </div>
              </div>
              <div className="project-modal-body">
                <img 
                  src={selectedProject.gallery ? selectedProject.gallery[activePageIndex].src : selectedProject.image} 
                  alt={selectedProject.title} 
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
