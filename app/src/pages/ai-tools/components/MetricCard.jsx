import React, { memo } from 'react';
import styles from '../AIDashboard.module.css';

const MetricCard = memo(({ icon, value, label, gradient, compact = false }) => {
  return (
    <div 
      className={styles.metricCard}
      style={{ background: gradient }}
    >
      <div className={styles.metricIcon}>{icon}</div>
      <div className={styles.metricValue}>{value}</div>
      <div className={styles.metricLabel}>{label}</div>
    </div>
  );
});

MetricCard.displayName = 'MetricCard';

export default MetricCard;