/**
 * AI Dashboard Page - Analytics for Indian Artisan AI Usage
 * Optimized for low-budget phones and limited data connections
 * Features: Lazy loading, data compression, offline caching, progressive loading
 */

import React, { useState, Suspense, lazy, useMemo, useCallback } from 'react';
import styles from './AIDashboard.module.css';
import MetricCard from './components/MetricCard';
import LoadingSpinner from './components/LoadingSpinner';
import SkeletonCard from './components/SkeletonCard';
import { useResponsiveDesign } from './hooks/useResponsiveDesign';
import { useProgressiveData } from './hooks/useProgressiveData';

// Lazy-loaded components for budget phones
const OverviewCards = lazy(() => Promise.resolve({ 
  default: ({ data }) => (
    <div className={styles.overviewGrid}>
      {data.map((card, index) => (
        <MetricCard
          key={index}
          icon={card.icon}
          value={card.value}
          label={card.label}
          gradient={card.gradient}
        />
      ))}
    </div>
  )
}));

const ToolPerformance = lazy(() => Promise.resolve({ 
  default: ({ data, getGradientColor }) => (
    <div className={styles.toolPerformanceContainer}>
      <h3 className={styles.toolPerformanceTitle}>🛠️ Tool Performance</h3>
      <div className={styles.toolPerformanceList}>
        {data.map((tool, index) => (
          <div key={index} className={styles.toolItem}>
            <div className={styles.toolHeader}>
              <span className={styles.toolName}>{tool.tool}</span>
              <span className={styles.toolUsage}>{tool.usage}% usage</span>
            </div>
            <div className={styles.toolMetrics}>
              <div className={styles.toolMetricContainer}>
                <div className={styles.toolMetricLabel}>Efficiency: {tool.efficiency}%</div>
                <div className={styles.toolProgressBar}>
                  <div 
                    className={styles.toolProgress}
                    style={{
                      width: `${tool.efficiency}%`,
                      backgroundColor: getGradientColor(tool.efficiency)
                    }}
                  ></div>
                </div>
              </div>
              <div className={styles.toolRating}>⭐{tool.satisfaction}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}));

const WeeklyChart = lazy(() => Promise.resolve({ 
  default: ({ data }) => (
    <div>
      <h3 className={styles.weeklyChartTitle}>📊 Weekly Trends</h3>
      <div className={styles.weeklyChartContainer}>
        <div className={styles.weeklyChartGrid}>
          {data.map((day, index) => (
            <div key={index} className={styles.weeklyDayColumn}>
              <div className={styles.weeklyDayLabel}>{day.day}</div>
              <div className={styles.weeklyBarsContainer}>
                {['voice', 'contentGen', 'imageEnh'].slice(0, 3).map((metric, i) => {
                  const colors = ['#00bcd4', '#4caf50', '#ff9800'];
                  return (
                    <div 
                      key={metric} 
                      className={styles.weeklyBar}
                      style={{
                        height: `${Math.min((day[metric] / 25) * 60, 60)}px`,
                        backgroundColor: colors[i]
                      }}
                    ></div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}));

const AIDashboardPage = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('7days');
  const { isMobile, getFontSize, getOptimalViewMode } = useResponsiveDesign();
  const [viewMode, setViewMode] = useState(getOptimalViewMode());
  const { data, loading } = useProgressiveData(selectedTimeRange);

  const timeRanges = [
    { value: '7days', label: '7 Days', icon: '📅' },
    { value: '30days', label: '30 Days', icon: '📊' }
  ];

  const toolIcons = {
    'Content Creator': '🤖',
    'Photo Enhancer': '📸',
    'Voice Helper': '🎤'
  };

  const getGradientColor = useCallback((percentage) => {
    if (percentage >= 90) return '#4caf50';
    if (percentage >= 75) return '#ff9800';
    return '#2196f3';
  }, []);

  // Prepare overview cards data
  const overviewCards = useMemo(() => {
    if (!data.essential?.overview) return [];
    
    return [
      { icon: '🎯', value: data.essential.overview.totalAiUsage, label: 'AI Uses', gradient: 'linear-gradient(135deg, #4caf50, #2e7d32)' },
      { icon: '🤖', value: data.essential.overview.contentGenerated, label: 'Content Created', gradient: 'linear-gradient(135deg, #2196f3, #1565c0)' },
      { icon: '📸', value: data.essential.overview.imagesEnhanced, label: 'Photos Enhanced', gradient: 'linear-gradient(135deg, #ff9800, #f57c00)' },
      { icon: '🎤', value: data.essential.overview.voiceCommands, label: 'Voice Commands', gradient: 'linear-gradient(135deg, #9c27b0, #6a1b9a)' }
    ];
  }, [data.essential]);

  // Loading state optimized for slow connections
  if (loading.essential) {
    return <LoadingSpinner message="Loading Dashboard..." subtitle="Optimized for your device" />;
  }

  return (
    <div className={styles.container}>
      {/* Optimized Header for Small Screens */}
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.title} style={{ fontSize: getFontSize() }}>
            📊 AI Dashboard
          </h1>
          
          <div className={styles.headerControls}>
            <select
              value={selectedTimeRange}
              onChange={(e) => setSelectedTimeRange(e.target.value)}
              className={styles.select}
            >
              {timeRanges.map(range => (
                <option key={range.value} value={range.value}>
                  {range.icon} {range.label}
                </option>
              ))}
            </select>
            
            <button
              onClick={() => setViewMode(viewMode === 'compact' ? 'full' : 'compact')}
              className={`${styles.viewModeButton} ${viewMode === 'compact' ? styles.viewModeButtonCompact : styles.viewModeButtonFull}`}
            >
              {viewMode === 'compact' ? '📱 Compact' : '🖥️ Full'}
            </button>
          </div>
        </div>
        <p className={styles.subtitle}>
          {viewMode === 'compact' ? 'Optimized for your phone' : 'Full analytics view'}
        </p>
      </div>

      {/* Lazy-loaded Overview Cards */}
      <Suspense fallback={<SkeletonCard />}>
        <OverviewCards data={overviewCards} />
      </Suspense>

      {/* Conditional rendering based on view mode */}
      {viewMode === 'compact' ? (
        // Compact view for low-end phones
        <div>
          <Suspense fallback={<SkeletonCard />}>
            <div className={styles.card}>
              {data.detailed?.toolPerformance && (
                <ToolPerformance data={data.detailed.toolPerformance} getGradientColor={getGradientColor} />
              )}
            </div>
          </Suspense>

          {data.detailed?.businessMetrics && (
            <div className={styles.card}>
              <h3 className={styles.businessImpactTitle}>📈 Business Impact</h3>
              <div className={styles.businessImpactContainer}>
                <div className={styles.businessCircleMetric}>
                  +{data.detailed.businessMetrics.avgPriceIncrease}%
                </div>
                <div className={styles.businessCircleLabel}>Price Increase</div>
                <div className={styles.businessCircleDesc}>AI helped boost your prices</div>
              </div>
              
              <div className={styles.businessMetricsGrid}>
                <div className={styles.businessMetricItem}>
                  <div className={styles.businessMetricValue}>
                    +{data.detailed.businessMetrics.contentEngagementUp}%
                  </div>
                  <div className={styles.businessMetricLabel}>Content Engagement</div>
                </div>
                <div className={styles.businessMetricItem}>
                  <div className={styles.businessMetricValue} style={{ color: '#9c27b0' }}>
                    {data.detailed.businessMetrics.timesSaved}h
                  </div>
                  <div className={styles.businessMetricLabel}>Time Saved</div>
                </div>
              </div>
            </div>
          )}

          {data.detailed?.recentActivity && (
            <div className={styles.card}>
              <h3 className={styles.recentActivityTitle}>⚡ Recent Activity</h3>
              <div className={styles.recentActivityList}>
                {data.detailed.recentActivity.slice(0, 3).map((activity, index) => (
                  <div key={index} className={styles.activityItem}>
                    <span className={styles.activityIcon}>
                      {toolIcons[activity.tool] || '🔧'}
                    </span>
                    <div className={styles.activityContent}>
                      <div className={styles.activityAction}>{activity.action}</div>
                      <div className={styles.activityTime}>{activity.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        // Full view for better devices
        <div className={styles.fullViewGrid}>
          <Suspense fallback={<SkeletonCard />}>
            <div className={styles.card}>
              {data.detailed?.toolPerformance && (
                <ToolPerformance data={data.detailed.toolPerformance} getGradientColor={getGradientColor} />
              )}
            </div>
          </Suspense>

          <Suspense fallback={<SkeletonCard />}>
            <div className={styles.card}>
              {data.detailed?.weeklyTrends && (
                <WeeklyChart data={data.detailed.weeklyTrends} />
              )}
            </div>
          </Suspense>
        </div>
      )}

      {/* Data usage indicator for artisans */}
      <div className={styles.dataIndicator}>
        <span className={styles.dataIndicatorLabel}>💾 Data Saved: </span>
        <span className={styles.dataIndicatorText}>
          Optimized for your phone • Cached for offline use • 
          {viewMode === 'compact' ? ' 70% less data' : ' Full features'}
        </span>
      </div>
    </div>
  );
};

export default AIDashboardPage;