import { motion } from 'framer-motion';
import styles from '../styles/Header.module.css';

export default function Header({ toggleSidebar }) {
  return (
    <motion.header 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={styles.header}
    >
      <div className={styles.container}>
        <motion.div 
          whileHover={{ scale: 1.05 }} 
          className={styles.logo}
        >
          Rent Dedo
        </motion.div>
        
        <nav className={styles.desktopNav}>
          <NavLink href="#home">Home</NavLink>
          <NavLink href="#about">About</NavLink>
          <NavLink href="#services">Services</NavLink>
          <NavLink href="#portfolio">Portfolio</NavLink>
          <NavLink href="#contact">Contact</NavLink>
        </nav>
        
        <button 
          onClick={toggleSidebar}
          className={styles.menuButton}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </motion.header>
  );
}

function NavLink({ href, children }) {
  return (
    <motion.a 
      href={href} 
      className={styles.navLink}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.a>
  );
}