import React from 'react';
import styles from '../AIDashboard.module.css';

const LoadingSpinner = ({ message = 'Loading...', subtitle = 'Optimized for your device' }) => {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.loadingSpinner}></div>
      <h3 className={styles.loadingTitle}>{message}</h3>
      <p className={styles.loadingSubtitle}>{subtitle}</p>
    </div>
  );
};

export default LoadingSpinner;