import { motion } from 'framer-motion';
import styles from '../styles/Section.module.css';

export default function Section({ id, title, content, isActive }) {
  return (
    <motion.section
      id={id}
      className={`${styles.section} ${
        isActive ? styles.active : ''
      }`}
      whileInView={{ opacity: [0.5, 1] }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true }}
        className={styles.sectionContent}
      >
        <motion.h2 
          className={styles.sectionTitle}
          whileInView={{ x: ["-10%", "0%"] }}
          transition={{ duration: 0.6 }}
        >
          {title}
        </motion.h2>
        
        <motion.div
          whileInView={{ scale: [0.95, 1] }}
          transition={{ duration: 0.5 }}
          className={styles.sectionText}
        >
          <p>{content}</p>
          
          {/* Example content for each section */}
          <div className={styles.itemsGrid}>
            {[1, 2, 3, 4].map((item) => (
              <motion.div
                key={item}
                whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)" }}
                className={styles.item}
              >
                <h3 className={styles.itemTitle}>
                  Item {item} for {title}
                </h3>
                <p className={styles.itemText}>
                  Idk what to put in {title.toLowerCase()} section.
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}