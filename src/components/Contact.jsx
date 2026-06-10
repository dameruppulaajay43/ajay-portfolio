import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaPhoneAlt } from 'react-icons/fa';

const Contact = () => {
  const [showPhone, setShowPhone] = useState(false);
  const [copied, setCopied] = useState(false);

  const handlePhoneClick = (e) => {
    // Detect mobile browser or touch device
    const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
                           window.matchMedia("(max-width: 768px)").matches;

    if (isMobileDevice) {
      // Let the browser handle the default tel: navigation on mobile
      return;
    }

    // On desktop, prevent opening default app and show the reveal/copy tooltip instead
    e.preventDefault();
    setShowPhone(!showPhone);
    navigator.clipboard.writeText('9618966249');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="contact-section">
      <div className="section-container">
        <div className="contact-content">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="section-title text-gradient"
          >
            Let's Connect
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="contact-text"
          >
            I'm currently looking for internships and entry-level opportunities in Data Analytics. Whether you want to discuss data trends, collaborate on a project, or just connect, feel free to reach out!
          </motion.p>
          
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem', width: '100%' }}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="social-links"
            >
              <a href="https://github.com/dameruppulaajay43" target="_blank" rel="noopener noreferrer" className="social-icon glass" title="GitHub"><FaGithub size={24} /></a>
              <a href="https://www.linkedin.com/in/ajay-dameruppula-23c41a6602" target="_blank" rel="noopener noreferrer" className="social-icon glass" title="LinkedIn"><FaLinkedin size={24} /></a>
              <a href="mailto:ajaydameruppula3@gmail.com" className="social-icon glass" title="Email"><FaEnvelope size={24} /></a>
              <a 
                href="tel:9618966249"
                onClick={handlePhoneClick} 
                className={`social-icon glass ${showPhone ? 'active' : ''}`} 
                title="Call Me / Show Phone Number"
              >
                <FaPhoneAlt size={24} />
              </a>
            </motion.div>

            <AnimatePresence>
              {showPhone && (
                <motion.div 
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="phone-display glass"
                  style={{
                    padding: '0.75rem 1.5rem',
                    borderRadius: '16px',
                    fontSize: '1.1rem',
                    color: '#fff',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.25rem',
                    marginTop: '0.5rem',
                    boxShadow: '0 8px 32px 0 rgba(109, 40, 217, 0.15)',
                    border: '1px solid rgba(109, 40, 217, 0.3)'
                  }}
                >
                  <a href="tel:9618966249" style={{ color: 'var(--color-text-primary)', textDecoration: 'none', fontWeight: 'bold', letterSpacing: '0.05em' }}>
                    +91 9618966249
                  </a>
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', opacity: 0.8 }}>
                    {copied ? '✓ Copied to clipboard!' : 'Click number to call | Copied!'}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

