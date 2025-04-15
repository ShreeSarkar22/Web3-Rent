import { motion } from 'framer-motion';
import styles from '../styles/Footer.module.css';

export default function Footer() {
  return (
    <motion.footer 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className={styles.footer}
    >
      <div className={styles.container}>
        <div className={styles.footerGrid}>
          <div className={styles.footerSection}>
            <h3 className={styles.footerTitle}>Rent Dedo</h3>
            <p className={styles.footerText}>
              Creating amazing digital experiences since today.
            </p>
            {/* <div className={styles.socialIcons}>
              <SocialIcon name="Twitter" />
              <SocialIcon name="Facebook" />
              <SocialIcon name="Instagram" />
              <SocialIcon name="LinkedIn" />
            </div> */}
          </div>
          
          <div className={styles.footerSection}>
            <h4 className={styles.footerTitle}>Quick Links</h4>
            <ul className={styles.footerLinks}>
              <FooterLink href="#home">Home</FooterLink>
              <FooterLink href="#about">About Us</FooterLink>
              <FooterLink href="#services">Services</FooterLink>
              <FooterLink href="#portfolio">Portfolio</FooterLink>
              <FooterLink href="#contact">Contact</FooterLink>
            </ul>
          </div>
          
          <div className={styles.footerSection}>
            <h4 className={styles.footerTitle}>Services</h4>
            <ul className={styles.footerLinks}>
              <FooterLink href="#services">Web Development</FooterLink>
              <FooterLink href="#services">UI/UX Design</FooterLink>
              <FooterLink href="#services">Mobile Apps</FooterLink>
              <FooterLink href="#services">Consulting</FooterLink>
            </ul>
          </div>
          
          <div className={styles.footerSection}>
            <h4 className={styles.footerTitle}>Contact Us</h4>
            <address className={styles.address}>
              <p>Shamirpet</p>
              <p>BPHC</p>
              <p className={styles.marginTop}>rent@dedo.com</p>
              <p>919191</p>
            </address>
          </div>
        </div>
        
        <div className={styles.copyright}>
          <p>© 2025 Rent. All rights reserved.</p>
        </div>
      </div>
    </motion.footer>
  );
}

function FooterLink({ href, children }) {
  return (
    <li>
      <motion.a 
        href={href} 
        className={styles.footerLink}
        whileHover={{ x: 5 }}
      >
        {children}
      </motion.a>
    </li>
  );
}

function SocialIcon({ name }) {
  return (
    <motion.a 
      href="#" 
      aria-label={name}
      whileHover={{ y: -5, scale: 1.1 }}
      className={styles.socialIcon}
    >
      {/* Icon placeholder*/}
      <span className="sr-only">{name}</span>
    </motion.a>
  );
}