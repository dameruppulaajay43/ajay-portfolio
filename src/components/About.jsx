import { motion } from 'framer-motion';
import { FaPython, FaDatabase, FaFileExcel, FaChartPie, FaChartBar } from 'react-icons/fa';

const About = () => {
  const levelColors = {
    "Core": { bg: 'rgba(109, 40, 217, 0.3)', border: 'rgba(109, 40, 217, 0.5)' },
    "Medium": { bg: 'rgba(16, 185, 129, 0.3)', border: 'rgba(16, 185, 129, 0.5)' },
    "Learning": { bg: 'rgba(59, 130, 246, 0.3)', border: 'rgba(59, 130, 246, 0.5)' }
  };

  return (
    <section id="about" className="about-section">
      <div className="section-container" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
        <motion.h2 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="section-title text-gradient"
          style={{ marginBottom: '1.25rem' }}
        >
          About Me
        </motion.h2>
        
        <div className="about-content" style={{ display: 'grid', gridTemplateColumns: '1fr', width: '100%' }}>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="about-text"
            style={{ maxWidth: '100%' }}
          >
            <p style={{ color: '#ffffff', fontWeight: 'bold', fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '0.75rem' }}>
              I am an aspiring Data Analyst passionate about translating raw numbers into actionable business narratives. I enjoy exploring datasets, finding hidden patterns, and building dashboards to help organizations make smart decisions.
            </p>
            <p style={{ color: '#ffffff', fontWeight: 'bold', fontSize: '1.1rem', lineHeight: '1.6' }}>
              Currently, I am sharpening my skills in Python, SQL, and Excel, while learning visualization tools like Power BI and Tableau to build interactive dashboards. I believe data is most powerful when it tells a clear, actionable story.
            </p>
          </motion.div>
        </div>

        {/* Academic Profile */}
        <div style={{ marginTop: '1.25rem', width: '100%' }}>
          <motion.h3 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="section-title text-gradient" 
            style={{ fontSize: '1.6rem', marginBottom: '1rem', display: 'inline-block' }}
          >
            Academic Profile
          </motion.h3>
          
          <div className="academic-timeline">
            <div className="timeline-line"></div>
            
            {[
              { level: "10th", desc: "Secondary Education", institute: "MJPTBCWREIS", yop: "2021", grade: "CGPA: 10.0" },
              { level: "12th (MPC)", desc: "Intermediate Board", institute: "MJPTBCWREIS", yop: "2023", grade: "92.2%" },
              { level: "B.Tech (AI & ML)", desc: "Undergraduate Program", institute: "JAYAMUKHI INSTITUTE OF TECHNOLOGICAL SCIENCES", yop: "2027 (Expected)", grade: "CGPA: 8.62", ongoing: true }
            ].map((milestone, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                className="timeline-item"
              >
                <div 
                  className={`timeline-dot ${milestone.ongoing ? 'ongoing-light-ring' : ''}`}
                >
                  {milestone.ongoing ? "2027" : milestone.yop}
                </div>
                
                <div className="timeline-card glass" style={milestone.ongoing ? { border: '1px solid rgba(59, 130, 246, 0.3)' } : {}}>
                  <h4 style={{ color: milestone.ongoing ? '#3b82f6' : 'var(--color-accent, #6d28d9)', fontSize: '1.1rem', marginBottom: '0.2rem', fontWeight: 'bold' }}>
                    {milestone.level}
                  </h4>
                  <p style={{ fontSize: '0.8rem', color: '#ffffff', fontWeight: '600', marginBottom: '0.2rem', textTransform: 'uppercase', letterSpacing: '0.02em' }}>
                    {milestone.institute}
                  </p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginBottom: '0.4rem' }}>
                    {milestone.desc}
                  </p>
                  <div style={{ 
                    fontSize: '0.85rem', 
                    fontWeight: 'bold', 
                    color: '#ffffff',
                    background: milestone.ongoing ? 'rgba(59, 130, 246, 0.15)' : 'rgba(109, 40, 217, 0.15)',
                    border: milestone.ongoing ? '1px solid rgba(59, 130, 246, 0.3)' : '1px solid rgba(109, 40, 217, 0.3)',
                    padding: '0.25rem 0.6rem',
                    borderRadius: '8px',
                    display: 'inline-block',
                    marginTop: 'auto'
                  }}>
                    {milestone.grade} {milestone.ongoing ? '(Ongoing)' : ''}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Skills Grid (Toolbox) */}
        <div style={{ marginTop: '1.25rem', width: '100%' }}>
          <motion.h3 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="section-title text-gradient" 
            style={{ fontSize: '1.6rem', marginBottom: '1rem', display: 'inline-block' }}
          >
            My Toolbox
          </motion.h3>
          
          <div className="skills-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '1rem',
            width: '100%',
            marginTop: '0.5rem'
          }}>
            {[
              { name: "Python", level: "Core", desc: "Pandas, NumPy, Scikit-learn, Web Scraping", icon: <FaPython size={24} style={{ color: '#3776AB' }} /> },
              { name: "SQL", level: "Core", desc: "Complex Queries, Joins, Data Modeling", icon: <FaDatabase size={24} style={{ color: '#0064a5' }} /> },
              { name: "Excel", level: "Core", desc: "Pivot Tables, Advanced Formulas, VBA", icon: <FaFileExcel size={24} style={{ color: '#107c41' }} /> },
              { name: "Power BI", level: "Learning", desc: "Interactive Dashboards, DAX, Modeling", icon: <FaChartPie size={24} style={{ color: '#f2c811' }} /> },
              { name: "Tableau", level: "Learning", desc: "Visualizations, Stories, Dashboarding", icon: <FaChartBar size={24} style={{ color: '#e97627' }} /> }
            ].map((skill, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ y: -5, borderColor: 'rgba(109, 40, 217, 0.5)', boxShadow: '0 10px 30px rgba(109, 40, 217, 0.25)' }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="glass"
                style={{
                  padding: '0.75rem 1rem',
                  borderRadius: '14px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.4rem',
                  background: 'rgba(15, 15, 25, 0.8)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.3)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    {skill.icon}
                    <h4 style={{ color: '#ffffff', fontWeight: 'bold', fontSize: '1.05rem' }}>{skill.name}</h4>
                  </div>
                  <span style={{
                    fontSize: '0.7rem',
                    fontWeight: 'bold',
                    padding: '0.15rem 0.4rem',
                    borderRadius: '5px',
                    color: '#ffffff',
                    background: (levelColors[skill.level] || levelColors["Core"]).bg,
                    border: `1px solid ${(levelColors[skill.level] || levelColors["Core"]).border}`
                  }}>
                    {skill.level}
                  </span>
                </div>
                <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', lineHeight: '1.3' }}>
                  {skill.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
