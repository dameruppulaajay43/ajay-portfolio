import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const projects = [
  {
    title: "Swiggy Sales & Performance Dashboard",
    description: "An interactive Excel analytics dashboard analyzing 197K+ orders and ₹53M+ in revenue. Features dynamic monthly/weekly revenue trends, city-level performance, dietary category breakdowns, and interactive slicers.",
    tags: ["Excel", "Pivot Tables", "KPI Dashboards", "Data Analytics"],
    image: "/assets/swiggy_dashboard.png",
    previewTitle: "Swiggy Sales & Performance Dashboard (Excel)"
  },
  {
    title: "TRUEJOBS",
    description: "A data-driven job matching and aggregation platform. Utilizes Python-based web scrapers to gather job listings, cleans unstructured data, and performs market analysis to highlight high-demand skills and salary trends.",
    tags: ["Python", "Web Scraping", "Data Cleaning", "Market Trends"],
    link: "https://truejobs.solutions/"
  },
  {
    title: "CHAKSHU",
    description: "An advanced real-time AI surveillance dashboard. Integrates live video streams (HLS) and geo-location tracking (Leaflet maps) to monitor feeds, utilizing GenAI for automated threat detection and alert analysis.",
    tags: ["GenAI", "Video Streams", "Geo-Tracking", "Alert Analytics"],
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

            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
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

                <div style={{ marginTop: 'auto', paddingTop: '0.5rem' }}>
                  {hasImagePreview ? (
                    <button
                      type="button"
                      onClick={() => setSelectedProject(project)}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: 'var(--color-accent, #6d28d9)',
                        fontWeight: 'bold',
                        fontSize: '0.95rem',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.25rem',
                        cursor: 'pointer',
                        padding: 0
                      }}
                    >
                      View Dashboard Preview ↗
                    </button>
                  ) : isClickable ? (
                    <a
                      href={project.link}
                      target={project.link.startsWith('http') ? "_blank" : "_self"}
                      rel="noopener noreferrer"
                      style={{ 
                        color: 'var(--color-accent, #6d28d9)', 
                        fontWeight: 'bold', 
                        fontSize: '0.95rem', 
                        display: 'inline-flex', 
                        alignItems: 'center', 
                        gap: '0.25rem',
                        textDecoration: 'none'
                      }}
                    >
                      {project.link.startsWith('http') ? "Visit Live Site ↗" : "View Live Site ↗"}
                    </a>
                  ) : null}
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
                </div>
                <button 
                  type="button" 
                  className="project-modal-close"
                  onClick={() => setSelectedProject(null)}
                  title="Close (Esc)"
                >
                  ✕
                </button>
              </div>
              <div className="project-modal-body">
                <img src={selectedProject.image} alt={selectedProject.title} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
