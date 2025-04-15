// import { motion } from 'framer-motion';
// import styles from '../styles/Section.module.css';

// export default function Section({ id, title, content, isActive }) {
//   return (
//     <motion.section
//       id={id}
//       className={`${styles.section} ${
//         isActive ? styles.active : ''
//       }`}
//       whileInView={{ opacity: [0.5, 1] }}
//       transition={{ duration: 0.5 }}
//     >
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5, delay: 0.2 }}
//         viewport={{ once: true }}
//         className={styles.sectionContent}
//       >
//         <motion.h2 
//           className={styles.sectionTitle}
//           whileInView={{ x: ["-10%", "0%"] }}
//           transition={{ duration: 0.6 }}
//         >
//           {title}
//         </motion.h2>
        
//         <motion.div
//           whileInView={{ scale: [0.95, 1] }}
//           transition={{ duration: 0.5 }}
//           className={styles.sectionText}
//         >
//           <p>{content}</p>
          
//           {/* Example content for each section */}
//           <div className={styles.itemsGrid}>
//             {[1, 2, 3, 4].map((item) => (
//               <motion.div
//                 key={item}
//                 whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)" }}
//                 className={styles.item}
//               >
//                 <h3 className={styles.itemTitle}>
//                   Item {item} for {title}
//                 </h3>
//                 <p className={styles.itemText}>
//                   Idk what to put in {title.toLowerCase()} section.
//                 </p>
//               </motion.div>
//             ))}
//           </div>
//         </motion.div>
//       </motion.div>
//     </motion.section>
//   );
// }

// import { useState } from 'react';
// import { ethers } from 'ethers';

// // ABI imports
// import RentalContractABI from '../artifacts/contracts/RentalAgreement.sol/RentalContract.json';
// import TenantReviewABI from '../artifacts/contracts/TenantReview.sol/TenantReview.json';

// const ServicesSection = () => {
//   const [contractAddress, setContractAddress] = useState('');
//   const [rating, setRating] = useState(0);
//   const [comments, setComments] = useState('');
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');
//   const [rentAmount, setRentAmount] = useState('');
//   const [dueInterval, setDueInterval] = useState('');

//   const [reviews, setReviews] = useState([]);
//   const [rentStatus, setRentStatus] = useState('');

//   const handleCreateAgreement = async () => {
//     try {
//       const provider = new ethers.providers.Web3Provider(window.ethereum);
//       const signer = provider.getSigner();
      
//       const rentalContract = new ethers.Contract(contractAddress, RentalContractABI.abi, signer);
      
//       // Create Agreement
//       const tx = await rentalContract.createAgreement(
//         contractAddress,  // tenant address, you can input this dynamically if needed
//         "Property details", // property details (you can add an input for this as well)
//         ethers.utils.parseUnits(startDate, "days"), // Start Date
//         ethers.utils.parseUnits(endDate, "days"), // End Date
//         ethers.utils.parseUnits(rentAmount, "ether"), // Rent Amount
//         dueInterval
//       );
      
//       await tx.wait();
//       console.log("Agreement Created");

//     } catch (err) {
//       console.error("Error creating agreement", err);
//     }
//   };

//   const handleLogPayment = async () => {
//     try {
//       const provider = new ethers.providers.Web3Provider(window.ethereum);
//       const signer = provider.getSigner();
      
//       const rentalContract = new ethers.Contract(contractAddress, RentalContractABI.abi, signer);
      
//       // Log Payment
//       const tx = await rentalContract.recordPayment({
//         value: ethers.utils.parseUnits(rentAmount, "ether"), // Payment amount
//       });
      
//       await tx.wait();
//       console.log("Payment Logged");
//     } catch (err) {
//       console.error("Error logging payment", err);
//     }
//   };

//   const handleCheckRentStatus = async () => {
//     try {
//       const provider = new ethers.providers.Web3Provider(window.ethereum);
//       const signer = provider.getSigner();
      
//       const rentalContract = new ethers.Contract(contractAddress, RentalContractABI.abi, signer);
      
//       // Check Rent Status
//       const status = await rentalContract.verifyRentStatus();
//       setRentStatus(status);
//     } catch (err) {
//       console.error("Error checking rent status", err);
//     }
//   };

//   const handleAddReview = async () => {
//     try {
//       const provider = new ethers.providers.Web3Provider(window.ethereum);
//       const signer = provider.getSigner();
      
//       const tenantReview = new ethers.Contract(contractAddress, TenantReviewABI.abi, signer);
      
//       // Add Review
//       const tx = await tenantReview.addReview(
//         contractAddress, // Rental Agreement Address
//         rating,          // Rating input by user
//         comments         // Comments input by user
//       );
      
//       await tx.wait();
//       console.log("Review Added");
//     } catch (err) {
//       console.error("Error adding review", err);
//     }
//   };

//   const handleViewReviews = async () => {
//     try {
//       const provider = new ethers.providers.Web3Provider(window.ethereum);
//       const signer = provider.getSigner();
      
//       const tenantReview = new ethers.Contract(contractAddress, TenantReviewABI.abi, signer);
      
//       // Get Reviews
//       const reviewsData = await tenantReview.getTenantReviews(contractAddress);
//       setReviews(reviewsData);
//       console.log("Reviews Fetched");
//     } catch (err) {
//       console.error("Error fetching reviews", err);
//     }
//   };

//   return (
//     <div className="services-section">
//       <h2>Services</h2>
//       <div>
//         <label>
//           Contract Address:
//           <input
//             type="text"
//             value={contractAddress}
//             onChange={(e) => setContractAddress(e.target.value)}
//             placeholder="Enter Contract Address"
//           />
//         </label>
//       </div>

//       <div>
//         <h3>Create Agreement</h3>
//         <input
//           type="number"
//           value={startDate}
//           onChange={(e) => setStartDate(e.target.value)}
//           placeholder="Start Date (Unix Timestamp)"
//         />
//         <input
//           type="number"
//           value={endDate}
//           onChange={(e) => setEndDate(e.target.value)}
//           placeholder="End Date (Unix Timestamp)"
//         />
//         <input
//           type="number"
//           value={rentAmount}
//           onChange={(e) => setRentAmount(e.target.value)}
//           placeholder="Rent Amount (in ETH)"
//         />
//         <input
//           type="number"
//           value={dueInterval}
//           onChange={(e) => setDueInterval(e.target.value)}
//           placeholder="Due Interval (in days)"
//         />
//         <button onClick={handleCreateAgreement}>Create Agreement</button>
//       </div>

//       <div>
//         <h3>Log Payment</h3>
//         <button onClick={handleLogPayment}>Log Payment</button>
//       </div>

//       <div>
//         <h3>Check Rent Status</h3>
//         <button onClick={handleCheckRentStatus}>Check Rent Status</button>
//         <div>Status: {rentStatus}</div>
//       </div>

//       <div>
//         <h3>Add Review</h3>
//         <input
//           type="number"
//           value={rating}
//           onChange={(e) => setRating(e.target.value)}
//           placeholder="Rating (1-5)"
//         />
//         <textarea
//           value={comments}
//           onChange={(e) => setComments(e.target.value)}
//           placeholder="Your comments"
//         />
//         <button onClick={handleAddReview}>Add Review</button>
//       </div>

//       <div>
//         <h3>View Reviews</h3>
//         <button onClick={handleViewReviews}>View Reviews</button>
//         <div>
//           {reviews.map((review, index) => (
//             <div key={index}>
//               <p>Reviewer: {review.reviewer}</p>
//               <p>Rating: {review.rating}</p>
//               <p>Comments: {review.comments}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ServicesSection;

// import { useState } from 'react';
// import { ethers } from 'ethers';
// import { motion } from 'framer-motion';

// // ABI imports
// import RentalContractABI from '../artifacts/contracts/RentalAgreement.sol/RentalContract.json';
// import TenantReviewABI from '../artifacts/contracts/TenantReview.sol/TenantReview.json';

// const ServicesSection = () => {
//   const [contractAddress, setContractAddress] = useState('');
//   const [rating, setRating] = useState(0);
//   const [comments, setComments] = useState('');
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');
//   const [rentAmount, setRentAmount] = useState('');
//   const [dueInterval, setDueInterval] = useState('');

//   const [reviews, setReviews] = useState([]);
//   const [rentStatus, setRentStatus] = useState('');

//   const handleCreateAgreement = async () => {
//     try {
//       const provider = new ethers.providers.Web3Provider(window.ethereum);
//       const signer = provider.getSigner();
      
//       const rentalContract = new ethers.Contract(contractAddress, RentalContractABI.abi, signer);
      
//       // Create Agreement
//       const tx = await rentalContract.createAgreement(
//         contractAddress,  // tenant address, you can input this dynamically if needed
//         "Property details", // property details (you can add an input for this as well)
//         ethers.utils.parseUnits(startDate, "days"), // Start Date
//         ethers.utils.parseUnits(endDate, "days"), // End Date
//         ethers.utils.parseUnits(rentAmount, "ether"), // Rent Amount
//         dueInterval
//       );
      
//       await tx.wait();
//       console.log("Agreement Created");

//     } catch (err) {
//       console.error("Error creating agreement", err);
//     }
//   };

//   const handleLogPayment = async () => {
//     try {
//       const provider = new ethers.providers.Web3Provider(window.ethereum);
//       const signer = provider.getSigner();
      
//       const rentalContract = new ethers.Contract(contractAddress, RentalContractABI.abi, signer);
      
//       // Log Payment
//       const tx = await rentalContract.recordPayment({
//         value: ethers.utils.parseUnits(rentAmount, "ether"), // Payment amount
//       });
      
//       await tx.wait();
//       console.log("Payment Logged");
//     } catch (err) {
//       console.error("Error logging payment", err);
//     }
//   };

//   const handleCheckRentStatus = async () => {
//     try {
//       const provider = new ethers.providers.Web3Provider(window.ethereum);
//       const signer = provider.getSigner();
      
//       const rentalContract = new ethers.Contract(contractAddress, RentalContractABI.abi, signer);
      
//       // Check Rent Status
//       const status = await rentalContract.verifyRentStatus();
//       setRentStatus(status);
//     } catch (err) {
//       console.error("Error checking rent status", err);
//     }
//   };

//   const handleAddReview = async () => {
//     try {
//       const provider = new ethers.providers.Web3Provider(window.ethereum);
//       const signer = provider.getSigner();
      
//       const tenantReview = new ethers.Contract(contractAddress, TenantReviewABI.abi, signer);
      
//       // Add Review
//       const tx = await tenantReview.addReview(
//         contractAddress, // Rental Agreement Address
//         rating,          // Rating input by user
//         comments         // Comments input by user
//       );
      
//       await tx.wait();
//       console.log("Review Added");
//     } catch (err) {
//       console.error("Error adding review", err);
//     }
//   };

//   const handleViewReviews = async () => {
//     try {
//       const provider = new ethers.providers.Web3Provider(window.ethereum);
//       const signer = provider.getSigner();
      
//       const tenantReview = new ethers.Contract(contractAddress, TenantReviewABI.abi, signer);
      
//       // Get Reviews
//       const reviewsData = await tenantReview.getTenantReviews(contractAddress);
//       setReviews(reviewsData);
//       console.log("Reviews Fetched");
//     } catch (err) {
//       console.error("Error fetching reviews", err);
//     }
//   };

//   return (
//     <motion.div className="services-section" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
//       <h2>Services</h2>

//       {/* Contract Address */}
//       <motion.div initial={{ x: "-100%" }} animate={{ x: 0 }} transition={{ duration: 0.5 }}>
//         <label>
//           Contract Address:
//           <input
//             type="text"
//             value={contractAddress}
//             onChange={(e) => setContractAddress(e.target.value)}
//             placeholder="Enter Contract Address"
//           />
//         </label>
//       </motion.div>

//       {/* Create Agreement */}
//       <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0.1 }}>
//         <h3>Create Agreement</h3>
//         <input
//           type="number"
//           value={startDate}
//           onChange={(e) => setStartDate(e.target.value)}
//           placeholder="Start Date (Unix Timestamp)"
//         />
//         <input
//           type="number"
//           value={endDate}
//           onChange={(e) => setEndDate(e.target.value)}
//           placeholder="End Date (Unix Timestamp)"
//         />
//         <input
//           type="number"
//           value={rentAmount}
//           onChange={(e) => setRentAmount(e.target.value)}
//           placeholder="Rent Amount (in ETH)"
//         />
//         <input
//           type="number"
//           value={dueInterval}
//           onChange={(e) => setDueInterval(e.target.value)}
//           placeholder="Due Interval (in days)"
//         />
//         <motion.button whileHover={{ scale: 1.1 }} onClick={handleCreateAgreement}>Create Agreement</motion.button>
//       </motion.div>

//       {/* Log Payment */}
//       <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
//         <h3>Log Payment</h3>
//         <motion.button whileHover={{ scale: 1.1 }} onClick={handleLogPayment}>Log Payment</motion.button>
//       </motion.div>

//       {/* Check Rent Status */}
//       <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0.3 }}>
//         <h3>Check Rent Status</h3>
//         <motion.button whileHover={{ scale: 1.1 }} onClick={handleCheckRentStatus}>Check Rent Status</motion.button>
//         <div>Status: {rentStatus}</div>
//       </motion.div>

//       {/* Add Review */}
//       <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0.4 }}>
//         <h3>Add Review</h3>
//         <input
//           type="number"
//           value={rating}
//           onChange={(e) => setRating(e.target.value)}
//           placeholder="Rating (1-5)"
//         />
//         <textarea
//           value={comments}
//           onChange={(e) => setComments(e.target.value)}
//           placeholder="Your comments"
//         />
//         <motion.button whileHover={{ scale: 1.1 }} onClick={handleAddReview}>Add Review</motion.button>
//       </motion.div>

//       {/* View Reviews */}
//       <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0.5 }}>
//         <h3>View Reviews</h3>
//         <motion.button whileHover={{ scale: 1.1 }} onClick={handleViewReviews}>View Reviews</motion.button>
//         <div>
//           {reviews.map((review, index) => (
//             <motion.div key={index} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
//               <p>Reviewer: {review.reviewer}</p>
//               <p>Rating: {review.rating}</p>
//               <p>Comments: {review.comments}</p>
//             </motion.div>
//           ))}
//         </div>
//       </motion.div>
//     </motion.div>
//   );
// };

// export default ServicesSection;

"use client"

import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { parseUnits } from 'ethers';
import { BrowserProvider } from 'ethers';
import { motion, AnimatePresence } from "framer-motion";
import styles from "../styles/Section.module.css";

// ABI imports
import RentalContractABI from "../artifacts/contracts/RentalAgreement.sol/RentalContract.json";
import TenantReviewABI from "../artifacts/contracts/TenantReview.sol/TenantReview.json";

const ServicesSection = () => {
  const [contractAddress, setContractAddress] = useState("");
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [rentAmount, setRentAmount] = useState("");
  const [dueInterval, setDueInterval] = useState("");
  const [propertyDetails, setPropertyDetails] = useState("");

  const [reviews, setReviews] = useState([]);
  const [rentStatus, setRentStatus] = useState("");
  const [loading, setLoading] = useState({
    createAgreement: false,
    logPayment: false,
    checkStatus: false,
    addReview: false,
    viewReviews: false,
  });
  const [activeTab, setActiveTab] = useState("agreement");
  const [notification, setNotification] = useState({ show: false, message: "", type: "" });

  const showNotification = (message, type = "success") => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: "", type: "" });
    }, 3000);
  };

  const handleCreateAgreement = async () => {
    try {
      setLoading((prev) => ({ ...prev, createAgreement: true }));
      // const provider = new ethers.providers.Web3Provider(window.ethereum);
      const provider = new BrowserProvider(window.ethereum);

      const signer = await provider.getSigner();


      const rentalContract = new ethers.Contract(contractAddress, RentalContractABI.abi, signer);

      // Create Agreement

      const tx = await rentalContract.createAgreement(
        contractAddress,         // tenant address
        propertyDetails,         // property details
        BigInt(startDate),       // assuming these are timestamps or integers
        BigInt(endDate),
        parseUnits(rentAmount, "ether"), // correctly formatted ETH value
        dueInterval              // can stay as-is if it's already a number
      );


      await tx.wait();
      showNotification("Agreement created successfully!");
    } catch (err) {
      console.error("Error creating agreement", err);
      showNotification("Failed to create agreement", "error");
    } finally {
      setLoading((prev) => ({ ...prev, createAgreement: false }));
    }
  };

  const handleLogPayment = async () => {
    try {
      setLoading((prev) => ({ ...prev, logPayment: true }));
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();


      const rentalContract = new ethers.Contract(contractAddress, RentalContractABI.abi, signer);

      // Log Payment
      const tx = await rentalContract.recordPayment({
        value: ethers.utils.parseUnits(rentAmount, "ether"), // Payment amount
      });

      await tx.wait();
      showNotification("Payment logged successfully!");
    } catch (err) {
      console.error("Error logging payment", err);
      showNotification("Failed to log payment", "error");
    } finally {
      setLoading((prev) => ({ ...prev, logPayment: false }));
    }
  };

  const handleCheckRentStatus = async () => {
    try {
      setLoading((prev) => ({ ...prev, checkStatus: true }));
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();


      const rentalContract = new ethers.Contract(contractAddress, RentalContractABI.abi, signer);

      // Check Rent Status
      const status = await rentalContract.verifyRentStatus();
      setRentStatus(status);
      showNotification("Rent status checked successfully!");
    } catch (err) {
      console.error("Error checking rent status", err);
      showNotification("Failed to check rent status", "error");
    } finally {
      setLoading((prev) => ({ ...prev, checkStatus: false }));
    }
  };

  const handleAddReview = async () => {
    try {
      setLoading((prev) => ({ ...prev, addReview: true }));
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();


      const tenantReview = new ethers.Contract(contractAddress, TenantReviewABI.abi, signer);

      // Add Review
      const tx = await tenantReview.addReview(
        contractAddress, // Rental Agreement Address
        rating, // Rating input by user
        comments, // Comments input by user
      );

      await tx.wait();
      showNotification("Review added successfully!");
      setRating(0);
      setComments("");
    } catch (err) {
      console.error("Error adding review", err);
      showNotification("Failed to add review", "error");
    } finally {
      setLoading((prev) => ({ ...prev, addReview: false }));
    }
  };

  const handleViewReviews = async () => {
    try {
      setLoading((prev) => ({ ...prev, viewReviews: true }));
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();


      const tenantReview = new ethers.Contract(contractAddress, TenantReviewABI.abi, signer);

      // Get Reviews
      const reviewsData = await tenantReview.getTenantReviews(contractAddress);
      setReviews(reviewsData);
      showNotification("Reviews fetched successfully!");
    } catch (err) {
      console.error("Error fetching reviews", err);
      showNotification("Failed to fetch reviews", "error");
    } finally {
      setLoading((prev) => ({ ...prev, viewReviews: false }));
    }
  };

  const renderStars = (count) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <span key={i} className={`${styles.star} ${i < count ? styles.filled : ""}`}>
          ★
        </span>
      ));
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom) => ({
      opacity: 1, 
      y: 0, 
      transition: { 
        delay: custom * 0.1,
        duration: 0.5, 
        ease: "easeOut" 
      }
    }),
    hover: { 
      y: -5,
      boxShadow: "0px 10px 30px rgba(31, 38, 135, 0.15)",
      transition: { duration: 0.3 }
    }
  };

  const tabContentVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, x: 10, transition: { duration: 0.2 } }
  };

  const reviewItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom) => ({
      opacity: 1,
      y: 0,
      transition: { delay: custom * 0.15, duration: 0.4 }
    }),
    hover: { y: -5, boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.05)" }
  };

  const buttonVariants = {
    hover: { scale: 1.03, transition: { duration: 0.2 } },
    tap: { scale: 0.97 }
  };

  const notificationVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2 } }
  };

  return (
    <motion.section
      className={styles.servicesSection}
      initial="hidden"
      animate="visible"
      variants={sectionVariants}
      id="services"
    >
      <div className={styles.servicesContent}>
        <motion.h2 
          className={styles.servicesTitle}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Rent Dedo !!!
        </motion.h2>

        <AnimatePresence>
          {notification.show && (
            <motion.div 
              className={`${styles.notification} ${styles[notification.type]}`}
              variants={notificationVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {notification.message}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div 
          className={styles.contractCard}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          custom={0}
        >
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>
              <span className={`${styles.icon} ${styles.homeIcon}`}></span>
              Contract Address
            </h3>
            <p className={styles.cardDescription}>Enter the blockchain contract address to interact with</p>
          </div>
          <div className={styles.cardContent}>
            <div className={styles.contractAddressInput}>
              <input
                type="text"
                value={contractAddress}
                onChange={(e) => setContractAddress(e.target.value)}
                placeholder="0x..."
                className={styles.inputField}
              />
            </div>
          </div>
        </motion.div>

        <div className={styles.tabsContainer}>
          <motion.div 
            className={styles.tabsList}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <motion.button
              className={`${styles.tabButton} ${activeTab === "agreement" ? styles.active : ""}`}
              onClick={() => setActiveTab("agreement")}
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <span className={`${styles.icon} ${styles.documentIcon}`}></span>
              Agreement
            </motion.button>
            <motion.button
              className={`${styles.tabButton} ${activeTab === "payment" ? styles.active : ""}`}
              onClick={() => setActiveTab("payment")}
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <span className={`${styles.icon} ${styles.clockIcon}`}></span>
              Payment
            </motion.button>
            <motion.button
              className={`${styles.tabButton} ${activeTab === "reviews" ? styles.active : ""}`}
              onClick={() => setActiveTab("reviews")}
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <span className={`${styles.icon} ${styles.messageIcon}`}></span>
              Reviews
            </motion.button>
          </motion.div>

          <AnimatePresence mode="wait">
            {activeTab === "agreement" && (
              <motion.div
                key="agreement-tab"
                variants={tabContentVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className={`${styles.tabContent} ${styles.active}`}
              >
                <motion.div 
                  className={styles.card}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                  custom={1}
                >
                  <div className={styles.cardHeader}>
                    <h3 className={styles.cardTitle}>Create Rental Agreement</h3>
                    <p className={styles.cardDescription}>Set up a new blockchain-based rental agreement</p>
                  </div>
                  <div className={styles.cardContent}>
                    <div className={styles.formGrid}>
                      <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Start Date (Unix Timestamp)</label>
                        <input
                          type="number"
                          value={startDate}
                          onChange={(e) => setStartDate(e.target.value)}
                          placeholder="Start Date"
                          className={styles.inputField}
                        />
                      </div>
                      <div className={styles.formGroup}>
                        <label className={styles.formLabel}>End Date (Unix Timestamp)</label>
                        <input
                          type="number"
                          value={endDate}
                          onChange={(e) => setEndDate(e.target.value)}
                          placeholder="End Date"
                          className={styles.inputField}
                        />
                      </div>
                    </div>
                    <div className={styles.formGrid}>
                      <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Rent Amount (ETH)</label>
                        <input
                          type="number"
                          value={rentAmount}
                          onChange={(e) => setRentAmount(e.target.value)}
                          placeholder="0.01"
                          className={styles.inputField}
                        />
                      </div>
                      <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Due Interval (days)</label>
                        <input
                          type="number"
                          value={dueInterval}
                          onChange={(e) => setDueInterval(e.target.value)}
                          placeholder="30"
                          className={styles.inputField}
                        />
                      </div>
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Property Details</label>
                      <textarea
                        value={propertyDetails}
                        onChange={(e) => setPropertyDetails(e.target.value)}
                        placeholder="Describe the property..."
                        rows={3}
                        className={styles.textareaField}
                      ></textarea>
                    </div>
                  </div>
                  <div className={styles.cardFooter}>
                    <motion.button
                      onClick={handleCreateAgreement}
                      disabled={loading.createAgreement}
                      className={`${styles.button} ${styles.primaryButton}`}
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                    >
                      {loading.createAgreement ? (
                        <>
                          <span className={styles.spinner}></span>
                          Creating...
                        </>
                      ) : (
                        <>
                          Create Agreement
                          <span className={`${styles.icon} ${styles.arrowRightIcon}`}></span>
                        </>
                      )}
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
            )}

            {activeTab === "payment" && (
              <motion.div
                key="payment-tab"
                variants={tabContentVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className={`${styles.tabContent} ${styles.active}`}
              >
                <motion.div 
                  className={styles.card}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                  custom={1}
                >
                  <div className={styles.cardHeader}>
                    <h3 className={styles.cardTitle}>Log Payment</h3>
                    <p className={styles.cardDescription}>Record a rent payment on the blockchain</p>
                  </div>
                  <div className={styles.cardContent}>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Payment Amount (ETH)</label>
                      <input
                        type="number"
                        value={rentAmount}
                        onChange={(e) => setRentAmount(e.target.value)}
                        placeholder="0.01"
                        className={styles.inputField}
                      />
                    </div>
                  </div>
                  <div className={styles.cardFooter}>
                    <motion.button 
                      onClick={handleLogPayment} 
                      disabled={loading.logPayment} 
                      className={`${styles.button} ${styles.primaryButton}`}
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                    >
                      {loading.logPayment ? (
                        <>
                          <span className={styles.spinner}></span>
                          Processing...
                        </>
                      ) : (
                        <>
                          Log Payment
                          <span className={`${styles.icon} ${styles.arrowRightIcon}`}></span>
                        </>
                      )}
                    </motion.button>
                  </div>
                </motion.div>

                <motion.div 
                  className={styles.card}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                  custom={2}
                >
                  <div className={styles.cardHeader}>
                    <h3 className={styles.cardTitle}>Check Rent Status</h3>
                    <p className={styles.cardDescription}>Verify the current payment status</p>
                  </div>
                  <div className={styles.cardContent}>
                    <AnimatePresence>
                      {rentStatus && (
                        <motion.div 
                          className={styles.statusBox}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        >
                          <div className={styles.statusContent}>
                            <span className={`${styles.statusBadge} ${rentStatus === "Paid" ? styles.success : styles.error}`}>
                              {rentStatus}
                            </span>
                            <span className={styles.statusText}>
                              {rentStatus === "Paid" ? "Your rent is up to date" : "Your rent payment is due"}
                            </span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  <div className={styles.cardFooter}>
                    <motion.button
                      onClick={handleCheckRentStatus}
                      disabled={loading.checkStatus}
                      className={`${styles.button} ${styles.outlineButton}`}
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                    >
                      {loading.checkStatus ? (
                        <>
                          <span className={styles.spinner}></span>
                          Checking...
                        </>
                      ) : (
                        <>
                          Check Status
                          <span className={`${styles.icon} ${styles.checkIcon}`}></span>
                        </>
                      )}
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
            )}

            {activeTab === "reviews" && (
              <motion.div
                key="reviews-tab"
                variants={tabContentVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className={`${styles.tabContent} ${styles.active}`}
              >
                <motion.div 
                  className={styles.card}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                  custom={1}
                >
                  <div className={styles.cardHeader}>
                    <h3 className={styles.cardTitle}>Add Review</h3>
                    <p className={styles.cardDescription}>Leave a review for your rental experience</p>
                  </div>
                  <div className={styles.cardContent}>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Rating (1-5)</label>
                      <div className={styles.starRating}>
                        {[1, 2, 3, 4, 5].map((star) => (
                          <motion.span
                            key={star}
                            className={`${styles.starSelect} ${rating >= star ? styles.filled : ""}`}
                            onClick={() => setRating(star)}
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            ★
                          </motion.span>
                        ))}
                      </div>
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Comments</label>
                      <textarea
                        value={comments}
                        onChange={(e) => setComments(e.target.value)}
                        placeholder="Share your experience..."
                        rows={4}
                        className={styles.textareaField}
                      ></textarea>
                    </div>
                  </div>
                  <div className={styles.cardFooter}>
                    <motion.button 
                      onClick={handleAddReview} 
                      disabled={loading.addReview} 
                      className={`${styles.button} ${styles.primaryButton}`}
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                    >
                      {loading.addReview ? (
                        <>
                          <span className={styles.spinner}></span>
                          Submitting...
                        </>
                      ) : (
                        <>
                          Submit Review
                          <span className={`${styles.icon} ${styles.arrowRightIcon}`}></span>
                        </>
                      )}
                    </motion.button>
                  </div>
                </motion.div>

                <motion.div 
                  className={styles.card}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                  custom={2}
                >
                  <div className={styles.cardHeader}>
                    <h3 className={styles.cardTitle}>View Reviews</h3>
                    <p className={styles.cardDescription}>See what others are saying</p>
                  </div>
                  <div className={styles.cardContent}>
                    {reviews.length > 0 ? (
                      <div className={styles.reviewsList}>
                        {reviews.map((review, index) => (
                          <motion.div
                            key={index}
                            className={styles.reviewItem}
                            variants={reviewItemVariants}
                            initial="hidden"
                            animate="visible"
                            whileHover="hover"
                            custom={index}
                          >
                            <div className={styles.reviewHeader}>
                              <div className={styles.reviewerAddress}>
                                {review.reviewer.substring(0, 6)}...{review.reviewer.substring(review.reviewer.length - 4)}
                              </div>
                              <div className={styles.reviewStars}>{renderStars(review.rating)}</div>
                            </div>
                            <p className={styles.reviewComment}>{review.comments}</p>
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <div className={styles.emptyState}>{loading.viewReviews ? "Loading reviews..." : "No reviews yet"}</div>
                    )}
                  </div>
                  <div className={styles.cardFooter}>
                    <motion.button 
                      onClick={handleViewReviews} 
                      disabled={loading.viewReviews} 
                      className={`${styles.button} ${styles.outlineButton}`}
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                    >
                      {loading.viewReviews ? (
                        <>
                          <span className={styles.spinner}></span>
                          Loading...
                        </>
                      ) : (
                        <>
                          Refresh Reviews
                          <span className={`${styles.icon} ${styles.refreshIcon}`}></span>
                        </>
                      )}
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.section>
  );
};

export default ServicesSection;