import { useState, useCallback, useEffect } from 'react';
import { useSmartCache, decompressData } from './useSmartCache';

export const useProgressiveData = (timeRange) => {
  const [data, setData] = useState({ essential: null, detailed: null });
  const [loading, setLoading] = useState({ essential: true, detailed: true });
  const { getCachedData, setCachedData } = useSmartCache();

  // Generate optimized essential data first
  const generateEssentialData = useCallback((timeRange) => {
    const multiplier = timeRange === '7days' ? 1 : 4;
    
    return {
      overview: {
        totalAiUsage: Math.floor(Math.random() * 50 * multiplier) + 25,
        contentGenerated: Math.floor(Math.random() * 25 * multiplier) + 10,
        imagesEnhanced: Math.floor(Math.random() * 15 * multiplier) + 5,
        voiceCommands: Math.floor(Math.random() * 40 * multiplier) + 15
      }
    };
  }, []);

  // Generate detailed data for full experience
  const generateDetailedData = useCallback((timeRange) => {
    const multiplier = timeRange === '7days' ? 1 : 4;
    
    return {
      toolPerformance: [
        { tool: 'Content Creator', usage: 35, efficiency: 92, satisfaction: 4.8 },
        { tool: 'Photo Enhancer', usage: 28, efficiency: 89, satisfaction: 4.6 },
        { tool: 'Voice Helper', usage: 45, efficiency: 85, satisfaction: 4.5 }
      ],
      businessMetrics: {
        avgPriceIncrease: 23,
        contentEngagementUp: 67,
        timesSaved: Math.floor(Math.random() * 10 * multiplier) + 5
      },
      recentActivity: [
        { action: 'Created product story', time: '2h ago', tool: 'Content Creator' },
        { action: 'Enhanced photos', time: '4h ago', tool: 'Photo Enhancer' },
        { action: 'Voice commands used', time: '1d ago', tool: 'Voice Helper' }
      ],
      weeklyTrends: [
        { day: 'Mon', contentGen: 8, imageEnh: 5, voice: 12 },
        { day: 'Tue', contentGen: 12, imageEnh: 8, voice: 18 },
        { day: 'Wed', contentGen: 15, imageEnh: 10, voice: 22 },
        { day: 'Thu', contentGen: 10, imageEnh: 6, voice: 15 },
        { day: 'Fri', contentGen: 18, imageEnh: 12, voice: 25 },
        { day: 'Sat', contentGen: 14, imageEnh: 9, voice: 20 },
        { day: 'Sun', contentGen: 9, imageEnh: 4, voice: 10 }
      ]
    };
  }, []);

  const loadData = useCallback(async (timeRange) => {
    setLoading({ essential: true, detailed: true });
    
    // Check cache first
    const cachedEssential = getCachedData(`essential-${timeRange}`);
    const cachedDetailed = getCachedData(`detailed-${timeRange}`);
    
    if (cachedEssential) {
      setData(prev => ({ ...prev, essential: decompressData(cachedEssential) }));
      setLoading(prev => ({ ...prev, essential: false }));
    } else {
      // Load essential data immediately
      setTimeout(() => {
        const essentialData = generateEssentialData(timeRange);
        setData(prev => ({ ...prev, essential: essentialData }));
        setLoading(prev => ({ ...prev, essential: false }));
        setCachedData(`essential-${timeRange}`, essentialData);
      }, 100);
    }
    
    if (cachedDetailed) {
      setData(prev => ({ ...prev, detailed: decompressData(cachedDetailed) }));
      setLoading(prev => ({ ...prev, detailed: false }));
    } else {
      // Load detailed data after 300ms delay
      setTimeout(() => {
        const detailedData = generateDetailedData(timeRange);
        setData(prev => ({ ...prev, detailed: detailedData }));
        setLoading(prev => ({ ...prev, detailed: false }));
        setCachedData(`detailed-${timeRange}`, detailedData);
      }, 400);
    }
  }, [generateEssentialData, generateDetailedData, getCachedData, setCachedData]);

  useEffect(() => {
    loadData(timeRange);
  }, [timeRange, loadData]);

  return {
    data,
    loading,
    refetch: () => loadData(timeRange)
  };
};