import { useState, useCallback, useEffect } from 'react';

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export const useSmartCache = () => {
  const [cache, setCache] = useState(new Map());

  const getCachedData = useCallback((key) => {
    const cached = cache.get(key);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      return cached.data;
    }
    return null;
  }, [cache]);

  const setCachedData = useCallback((key, data) => {
    setCache(prev => new Map(prev).set(key, {
      data: compressData(data),
      timestamp: Date.now()
    }));
  }, []);

  const clearExpiredCache = useCallback(() => {
    const now = Date.now();
    setCache(prev => {
      const newCache = new Map();
      prev.forEach((value, key) => {
        if (now - value.timestamp < CACHE_DURATION) {
          newCache.set(key, value);
        }
      });
      return newCache;
    });
  }, []);

  // Clean expired cache every minute
  useEffect(() => {
    const interval = setInterval(clearExpiredCache, 60000);
    return () => clearInterval(interval);
  }, [clearExpiredCache]);

  return { getCachedData, setCachedData, clearExpiredCache };
};

// Compress data for storage
const compressData = (data) => {
  if (!data) return data;
  
  return {
    ov: data.overview ? {
      tau: data.overview.totalAiUsage,
      cg: data.overview.contentGenerated,
      ie: data.overview.imagesEnhanced,
      vc: data.overview.voiceCommands
    } : data.ov,
    tp: data.toolPerformance ? data.toolPerformance.map(tool => ({
      t: tool.tool,
      u: tool.usage,
      e: tool.efficiency,
      s: tool.satisfaction
    })) : data.tp,
    bm: data.businessMetrics ? {
      api: data.businessMetrics.avgPriceIncrease,
      ceu: data.businessMetrics.contentEngagementUp,
      ts: data.businessMetrics.timesSaved
    } : data.bm,
    ra: data.recentActivity ? data.recentActivity.slice(0, 3).map(activity => ({
      a: activity.action,
      t: activity.time,
      tl: activity.tool
    })) : data.ra,
    wt: data.weeklyTrends ? data.weeklyTrends.map(trend => ({
      d: trend.day.slice(0, 2),
      c: trend.contentGen,
      i: trend.imageEnh,
      v: trend.voice
    })) : data.wt
  };
};

// Decompress data for usage
export const decompressData = (compressedData) => {
  if (!compressedData) return compressedData;
  
  return {
    overview: compressedData.ov ? {
      totalAiUsage: compressedData.ov.tau,
      contentGenerated: compressedData.ov.cg,
      imagesEnhanced: compressedData.ov.ie,
      voiceCommands: compressedData.ov.vc
    } : compressedData.overview,
    toolPerformance: compressedData.tp ? compressedData.tp.map(tool => ({
      tool: tool.t,
      usage: tool.u,
      efficiency: tool.e,
      satisfaction: tool.s
    })) : compressedData.toolPerformance,
    businessMetrics: compressedData.bm ? {
      avgPriceIncrease: compressedData.bm.api,
      contentEngagementUp: compressedData.bm.ceu,
      timesSaved: compressedData.bm.ts
    } : compressedData.businessMetrics,
    recentActivity: compressedData.ra ? compressedData.ra.map(activity => ({
      action: activity.a,
      time: activity.t,
      tool: activity.tl
    })) : compressedData.recentActivity,
    weeklyTrends: compressedData.wt ? compressedData.wt.map(trend => ({
      day: trend.d === 'Mo' ? 'Mon' : trend.d === 'Tu' ? 'Tue' : trend.d === 'We' ? 'Wed' : trend.d === 'Th' ? 'Thu' : trend.d === 'Fr' ? 'Fri' : trend.d === 'Sa' ? 'Sat' : 'Sun',
      contentGen: trend.c,
      imageEnh: trend.i,
      voice: trend.v
    })) : compressedData.weeklyTrends
  };
};