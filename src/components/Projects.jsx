import { motion } from 'framer-motion';

const projects = [
  {
    title: "TRUEJOBS",
    description: "A data-driven job matching and aggregation platform. Utilizes Python-based web scrapers to gather job listings, cleans unstructured data, and performs market analysis to highlight high-demand skills and salary trends.",
    link: "https://truejobs.solutions/"
  },
  {
    title: "CHAKSHU",
    description: "An advanced real-time AI surveillance dashboard. Integrates live video streams (HLS) and geo-location tracking (Leaflet maps) to monitor feeds, utilizing GenAI for automated threat detection and alert analysis.",
    link: "https://garuda-nu.vercel.app/"
  },
  {
    title: "Movie Recommendation System",
    description: "A machine learning project built with Python, Pandas, and Scikit-learn. Implemented collaborative and content-based filtering algorithms on user datasets to predict user preferences and improve recommendation accuracy.",
    link: "#"
  },
  {
    title: "PORTFOLIO",
    description: "A responsive 3D portfolio website showcasing academic milestones and projects. Features a custom-rendered Three.js particle system background, fluid animations, and a letter-by-letter landing preloader.",
    link: "#home"
  }
];

const Projects = () => {
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
            const isClickable = project.link !== "#";
            const CardComponent = isClickable ? motion.a : motion.div;
            const extraProps = isClickable ? {
              href: project.link,
              target: project.link.startsWith('http') ? "_blank" : "_self",
              rel: "noopener noreferrer",
              style: { textDecoration: 'none', display: 'block', cursor: 'pointer' }
            } : {
              style: { cursor: 'default' }
            };

            return (
              <CardComponent 
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="project-card glass"
                {...extraProps}
              >
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                {isClickable && (
                  <span style={{ 
                    color: 'var(--color-accent, #6d28d9)', 
                    fontWeight: 'bold', 
                    fontSize: '0.95rem', 
                    display: 'inline-flex', 
                    alignItems: 'center', 
                    gap: '0.25rem',
                    marginTop: '1rem'
                  }}>
                    {project.link.startsWith('http') ? "Visit Live Site ↗" : "View Live Site ↗"}
                  </span>
                )}
              </CardComponent>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;
