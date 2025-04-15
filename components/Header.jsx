/////////////////////////// HERE !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
import { ethers } from "ethers";
import { BrowserProvider } from "ethers";
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import styles from '../styles/Header.module.css';

export default function Header({ toggleSidebar }) {
  const [account, setAccount] = useState(null);

useEffect(() => {
  const wasConnected = localStorage.getItem('walletConnected');
  if (wasConnected === 'true') {
    connectWallet(); // Only tries in the browser
  }
}, []);

const connectWallet = async () => {
  if (typeof window !== 'undefined' && window.ethereum) {
    try {
      // Force user to manually select account
      await window.ethereum.request({
        method: "wallet_requestPermissions",
        params: [{ eth_accounts: {} }],
      });

      const provider = new BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      setAccount(accounts[0]);
      localStorage.setItem('walletConnected', 'true');
    } catch (err) {
      console.error("Wallet connection failed:", err);
    }
  } else {
    alert("Please install Metamask");
  }
};

const disconnectWallet = () => {
  setAccount(null);
  localStorage.setItem('walletConnected', 'false');
};

  const shortenAddress = (addr) => `${addr.slice(0, 6)}...${addr.slice(-4)}`;

  return (
    <motion.header 
  initial={{ y: -50, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{ duration: 0.5 }}
  className={styles.header}
>
  <div className={styles.container}>

    {/* Left: Sidebar icon and logo */}
    <div className={styles.leftSection}>
      <button 
        onClick={toggleSidebar}
        className={styles.menuButton}
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <motion.div 
        whileHover={{ scale: 1.05 }} 
        className={styles.logo}
      >
        Rent Dedo
      </motion.div>
    </div>

    {/* Center: Nav */}
    <nav className={styles.desktopNav}>
      <NavLink href="#home">Home</NavLink>
      <NavLink href="#about">Rent</NavLink>
      <NavLink href="#services">Services</NavLink>
    </nav>

    {/* Right: Wallet */}
    <div className={styles.walletSection}>
      {account ? (
        <>
          <span className={styles.walletAddress}>{shortenAddress(account)}</span>
          <button className={styles.connectBtn} onClick={disconnectWallet}>Logout</button>
        </>
      ) : (
        <button className={styles.connectBtn} onClick={connectWallet}>Connect Wallet</button>
      )}
    </div>

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