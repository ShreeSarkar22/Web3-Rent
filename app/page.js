"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';
import Section from '../components/Section';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
      
      // Close sidebar after navigation
      setIsSidebarOpen(false);
    }
  };

  // Close sidebar when clicking outside on desktop
  useEffect(() => {
    const handleClickOutside = (event) => {
      const sidebar = document.querySelector(`.${styles.sidebar}`);
      if (sidebar && !sidebar.contains(event.target) && isSidebarOpen) {
        const menuButton = document.querySelector(`.${styles.menuButton}`);
        if (menuButton && !menuButton.contains(event.target)) {
          setIsSidebarOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSidebarOpen, styles.menuButton, styles.sidebar]);

  // Update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'services', 'portfolio', 'contact'];
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle escape key to close sidebar
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape' && isSidebarOpen) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscKey);
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isSidebarOpen]);

  const sections = [
    {
      id: 'home',
      title: 'Home',
      content: 'Welcome to our website! Dedo Rent!'
    },
    // {
    //   id: 'about',
    //   title: 'About Us',
    //   content: 'We dont know what we are doing! :)'
    // },
    // {
    //   id: 'services',
    //   title: 'Services',
    //   content: 'We offer nothing! (:'
    // },
    // {
    //   id: 'portfolio',
    //   title: 'Portfolio',
    //   content: 'Check out our hackathon!'
    // },
    // {
    //   id: 'contact',
    //   title: 'Contact',
    //   content: 'Get in touch with us!'
    // }
  ];

  return (
    <div className={styles.pageWrapper}>
      <Header toggleSidebar={toggleSidebar} />
      
      <div className={styles.contentWrapper}>
        <Sidebar 
          isOpen={isSidebarOpen} 
          sections={sections}
          activeSection={activeSection}
          onNavigate={scrollToSection}
        />
        
        <main className={`${styles.mainContent} ${isSidebarOpen ? styles.shifted : ''}`}>
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className={styles.sectionsContainer}
            >
              {sections.map((section) => (
                <Section 
                  key={section.id}
                  id={section.id}
                  title={section.title}
                  content={section.content}
                  isActive={activeSection === section.id}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
      
      <Footer />
    </div>
  );
}