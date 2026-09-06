import { motion } from 'framer-motion';
import { FaPython, FaDatabase, FaFileExcel, FaChartPie, FaChartBar } from 'react-icons/fa';

const About = () => {
  return (
    <section id="about" className="about-section">
      <div className="section-container" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
        <motion.h2 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="section-title text-gradient"
          style={{ marginBottom: '0.85rem' }}
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
            <p style={{ color: '#ffffff', fontWeight: 'bold', fontSize: '1.02rem', lineHeight: '1.55', marginBottom: '0.4rem' }}>
              I am an aspiring Data Analyst passionate about translating raw numbers into actionable business narratives. I enjoy exploring datasets, finding hidden patterns, and building dashboards to help organizations make smart decisions.
            </p>
            <p style={{ color: '#ffffff', fontWeight: 'bold', fontSize: '1.02rem', lineHeight: '1.55' }}>
              I leverage Python, SQL, Excel, Power BI, and Tableau to build interactive dashboards, automate analytical workflows, and uncover actionable business metrics. I believe data is most powerful when it tells a clear, decisive story.
            </p>
          </motion.div>
        </div>

        {/* Academic Profile */}
        <div style={{ marginTop: '0.85rem', width: '100%' }}>
          <motion.h3 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="section-title text-gradient" 
            style={{ fontSize: '1.4rem', marginBottom: '0.6rem', display: 'inline-block' }}
          >
            Academic Profile
          </motion.h3>
          
          <div className="academic-timeline" style={{ marginTop: '0.5rem' }}>
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
                  <h4 style={{ color: milestone.ongoing ? '#3b82f6' : 'var(--color-accent, #6d28d9)', fontSize: '1.05rem', marginBottom: '0.15rem', fontWeight: 'bold' }}>
                    {milestone.level}
                  </h4>
                  <p style={{ fontSize: '0.78rem', color: '#ffffff', fontWeight: '600', marginBottom: '0.15rem', textTransform: 'uppercase', letterSpacing: '0.02em' }}>
                    {milestone.institute}
                  </p>
                  <p style={{ fontSize: '0.72rem', color: 'var(--color-text-secondary)', marginBottom: '0.35rem' }}>
                    {milestone.desc}
                  </p>
                  <div style={{ 
                    fontSize: '0.8rem', 
                    fontWeight: 'bold', 
                    color: '#ffffff',
                    background: milestone.ongoing ? 'rgba(59, 130, 246, 0.15)' : 'rgba(109, 40, 217, 0.15)',
                    border: milestone.ongoing ? '1px solid rgba(59, 130, 246, 0.3)' : '1px solid rgba(109, 40, 217, 0.3)',
                    padding: '0.2rem 0.55rem',
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
        <div style={{ marginTop: '0.85rem', width: '100%' }}>
          <motion.h3 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="section-title text-gradient" 
            style={{ fontSize: '1.4rem', marginBottom: '0.6rem', display: 'inline-block' }}
          >
            My Toolbox
          </motion.h3>
          
          <div className="skills-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
            gap: '0.85rem',
            width: '100%',
            marginTop: '0.35rem'
          }}>
            {[
              { name: "Python", desc: "Pandas, NumPy, Scikit-learn, Web Scraping", icon: <FaPython size={22} style={{ color: '#3776AB' }} /> },
              { name: "SQL", desc: "Complex Queries, Joins, Data Modeling", icon: <FaDatabase size={22} style={{ color: '#0064a5' }} /> },
              { name: "Excel", desc: "Pivot Tables, Advanced Formulas, VBA", icon: <FaFileExcel size={22} style={{ color: '#107c41' }} /> },
              { name: "Power BI", desc: "Interactive Dashboards, DAX, Modeling", icon: <FaChartPie size={22} style={{ color: '#f2c811' }} /> },
              { name: "Tableau", desc: "Visualizations, Stories, Dashboarding", icon: <FaChartBar size={22} style={{ color: '#e97627' }} /> }
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
                  padding: '0.65rem 0.85rem',
                  borderRadius: '12px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.3rem',
                  background: 'rgba(15, 15, 25, 0.8)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.3)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  {skill.icon}
                  <h4 style={{ color: '#ffffff', fontWeight: 'bold', fontSize: '0.98rem' }}>{skill.name}</h4>
                </div>
                <p style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', lineHeight: '1.25' }}>
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
