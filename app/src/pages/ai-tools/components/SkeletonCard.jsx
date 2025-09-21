import React from 'react';
import styles from '../AIDashboard.module.css';

const SkeletonCard = () => {
  return (
    <div className={`${styles.card} ${styles.suspenseFallback}`}>
      <div>📊 Loading analytics...</div>
    </div>
  );
};

export default SkeletonCard;