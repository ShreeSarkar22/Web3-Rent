import { motion } from 'framer-motion';
import styles from '../styles/Sidebar.module.css';

export default function Sidebar({ isOpen, sections, activeSection, onNavigate }) {
  const sidebarVariants = {
    open: { x: 0, opacity: 1 },
    closed: { x: "-100%", opacity: 0 }
  };

  return (
    <>
      {/* Overlay for mobile only */}
      {isOpen && (
        <div 
          className={styles.overlay}
          onClick={() => onNavigate(activeSection)}
        />
      )}
      
      <motion.aside
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={sidebarVariants}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}
      >
        <div className={styles.sidebarContent}>
          <div className={styles.sidebarHeader}>
            <h2 className={styles.sidebarTitle}>Navigation</h2>
            {/* <button className={styles.closeButton} onClick={() => onNavigate(activeSection)}>
              ×
            </button> */}
          </div>
          
          <nav className={styles.sidebarNav}>
            <ul>
              {sections.map((section) => (
                <li key={section.id}>
                  <motion.button
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onNavigate(section.id)}
                    className={`${styles.navButton} ${
                      activeSection === section.id ? styles.active : ''
                    }`}
                  >
                    {section.title}
                  </motion.button>
                </li>
              ))}
            </ul>
          </nav>
          
          <div className={styles.sidebarFooter}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              className={styles.copyright}
            >
              © 2025 Rent Dedo
            </motion.button>
          </div>
        </div>
      </motion.aside>
    </>
  );
}