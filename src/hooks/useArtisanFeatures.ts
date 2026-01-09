/**
 * Custom Hooks for Artisan Features
 * Optimized for low-end devices and poor networks
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import {
  isLowEndDevice,
  compressImage,
  uploadFileProgressive,
  analyzeImage,
  startVoiceInput,
  speakText,
  translateText,
  calculateSmartPricing,
  negotiateWithBuyer,
  generateMarketingContent,
  saveToOfflineCache,
  loadFromOfflineCache,
} from '../services/AzureAIService';

// ========================================
// DEVICE CAPABILITY DETECTION
// ========================================

export function useDeviceCapability() {
  const [capability, setCapability] = useState({
    isLowEnd: false,
    memory: 4, // GB
    cores: 4,
    connectionType: '4g' as '2g' | '3g' | '4g' | 'wifi',
    shouldReduceAnimations: false,
    shouldCompressUploads: false,
  });

  useEffect(() => {
    const memory = (navigator as any).deviceMemory || 4;
    const cores = navigator.hardwareConcurrency || 4;
    const connection = (navigator as any).connection;
    
    const connectionType = connection?.effectiveType || '4g';
    const isLowEnd = isLowEndDevice();
    
    setCapability({
      isLowEnd,
      memory,
      cores,
      connectionType,
      shouldReduceAnimations: isLowEnd,
      shouldCompressUploads: isLowEnd || connectionType === '2g' || connectionType === '3g',
    });
  }, []);

  return capability;
}

// ========================================
// FILE UPLOAD WITH COMPRESSION
// ========================================

export function useFileUpload() {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const capability = useDeviceCapability();

  const upload = useCallback(async (file: File) => {
    setUploading(true);
    setProgress(0);
    setError(null);
    setUploadedUrl(null);

    try {
      let fileToUpload: File | Blob = file;
      
      // Compress if needed
      if (capability.shouldCompressUploads && file.type.startsWith('image/')) {
        // Show compression progress
        setProgress(10);
        
        const compressed = await compressImage(
          file,
          capability.isLowEnd ? 600 : 800, // Smaller for low-end
          capability.isLowEnd ? 0.6 : 0.7   // More compression for low-end
        );
        
        fileToUpload = compressed;
        
        // Log compression savings
        const savings = Math.round((1 - compressed.size / file.size) * 100);
        console.log(`Image compressed: ${savings}% smaller`);
      }
      
      setProgress(20);
      
      // Upload progressively
      const url = await uploadFileProgressive(
        fileToUpload,
        file.name,
        (percent) => {
          // Map 20-100% to upload progress
          setProgress(20 + (percent * 0.8));
        }
      );
      
      setUploadedUrl(url);
      setProgress(100);
      
      return url;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
      return null;
    } finally {
      setUploading(false);
    }
  }, [capability]);

  const reset = useCallback(() => {
    setUploading(false);
    setProgress(0);
    setError(null);
    setUploadedUrl(null);
  }, []);

  return {
    upload,
    uploading,
    progress,
    error,
    uploadedUrl,
    reset,
  };
}

// ========================================
// IMAGE ANALYSIS
// ========================================

export function useImageAnalysis() {
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const analyze = useCallback(async (imageUrl: string) => {
    setAnalyzing(true);
    setError(null);

    try {
      const result = await analyzeImage(imageUrl);
      setAnalysis(result);
      
      // Cache offline
      saveToOfflineCache(`analysis_${imageUrl}`, result);
      
      return result;
    } catch (err) {
      // Try offline cache
      const cached = loadFromOfflineCache(`analysis_${imageUrl}`);
      if (cached) {
        setAnalysis(cached);
        return cached;
      }
      
      setError(err instanceof Error ? err.message : 'Analysis failed');
      return null;
    } finally {
      setAnalyzing(false);
    }
  }, []);

  return { analyze, analyzing, analysis, error };
}

// ========================================
// VOICE INPUT (Multi-Language)
// ========================================

export function useVoiceInput(language: string = 'hi-IN') {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState<string | null>(null);
  const recognitionRef = useRef<any>(null);

  const start = useCallback(() => {
    setListening(true);
    setError(null);

    recognitionRef.current = startVoiceInput({
      language,
      continuous: false,
      onResult: (text) => {
        setTranscript(text);
        setListening(false);
      },
      onError: (err) => {
        setError(err);
        setListening(false);
      },
    });
  }, [language]);

  const stop = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setListening(false);
    }
  }, []);

  const reset = useCallback(() => {
    setTranscript('');
    setError(null);
  }, []);

  return {
    listening,
    transcript,
    error,
    start,
    stop,
    reset,
  };
}

// ========================================
// TEXT-TO-SPEECH (For Illiterate Users)
// ========================================

export function useTextToSpeech() {
  const [speaking, setSpeaking] = useState(false);

  const speak = useCallback(async (text: string, language: string = 'hi-IN') => {
    setSpeaking(true);
    
    try {
      await speakText(text, language);
    } catch (error) {
      console.error('TTS failed:', error);
    } finally {
      setSpeaking(false);
    }
  }, []);

  const stop = useCallback(() => {
    speechSynthesis.cancel();
    setSpeaking(false);
  }, []);

  return { speak, stop, speaking };
}

// ========================================
// TRANSLATION
// ========================================

export function useTranslation() {
  const [translating, setTranslating] = useState(false);
  const [translatedText, setTranslatedText] = useState('');

  const translate = useCallback(async (text: string, targetLang: string) => {
    setTranslating(true);
    
    try {
      const result = await translateText(text, targetLang);
      setTranslatedText(result);
      return result;
    } catch (error) {
      console.error('Translation failed:', error);
      return text;
    } finally {
      setTranslating(false);
    }
  }, []);

  return { translate, translating, translatedText };
}

// ========================================
// SMART PRICING
// ========================================

export function useSmartPricing() {
  const [calculating, setCalculating] = useState(false);
  const [pricing, setPricing] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const calculate = useCallback(async (factors: any) => {
    setCalculating(true);
    setError(null);

    try {
      const result = await calculateSmartPricing(factors);
      setPricing(result);
      
      // Cache offline
      saveToOfflineCache('last_pricing', result);
      
      return result;
    } catch (err) {
      // Try offline cache
      const cached = loadFromOfflineCache('last_pricing');
      if (cached) {
        setPricing(cached);
        return cached;
      }
      
      setError(err instanceof Error ? err.message : 'Pricing calculation failed');
      return null;
    } finally {
      setCalculating(false);
    }
  }, []);

  return { calculate, calculating, pricing, error };
}

// ========================================
// NEGOTIATION BOT
// ========================================

export function useNegotiationBot() {
  const [negotiating, setNegotiating] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [decision, setDecision] = useState<any>(null);

  const negotiate = useCallback(
    async (
      buyerMessage: string,
      currentOffer: number,
      floorPrice: number,
      targetPrice: number,
      artisanName: string,
      productName: string
    ) => {
      setNegotiating(true);

      try {
        const result = await negotiateWithBuyer(
          buyerMessage,
          currentOffer,
          floorPrice,
          targetPrice,
          artisanName,
          productName,
          messages
        );
        
        setDecision(result);
        
        // Add messages to history
        setMessages(prev => [
          ...prev,
          { from: 'buyer', text: buyerMessage, offer: currentOffer, timestamp: new Date() },
          { from: 'bot', text: result.message, offer: result.counterOffer, timestamp: new Date() },
        ]);
        
        return result;
      } catch (error) {
        console.error('Negotiation failed:', error);
        return null;
      } finally {
        setNegotiating(false);
      }
    },
    [messages]
  );

  const reset = useCallback(() => {
    setMessages([]);
    setDecision(null);
  }, []);

  return {
    negotiate,
    negotiating,
    messages,
    decision,
    reset,
  };
}

// ========================================
// MARKETING CONTENT GENERATION
// ========================================

export function useMarketingGeneration() {
  const [generating, setGenerating] = useState(false);
  const [content, setContent] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const generate = useCallback(
    async (
      productName: string,
      craftType: string,
      materials: string[],
      artisanName: string,
      artisanLocation: string,
      productImages: string[]
    ) => {
      setGenerating(true);
      setError(null);

      try {
        const result = await generateMarketingContent(
          productName,
          craftType,
          materials,
          artisanName,
          artisanLocation,
          productImages
        );
        
        setContent(result);
        
        // Cache offline
        saveToOfflineCache(`marketing_${productName}`, result);
        
        return result;
      } catch (err) {
        // Try offline cache
        const cached = loadFromOfflineCache(`marketing_${productName}`);
        if (cached) {
          setContent(cached);
          return cached;
        }
        
        setError(err instanceof Error ? err.message : 'Marketing generation failed');
        return null;
      } finally {
        setGenerating(false);
      }
    },
    []
  );

  return { generate, generating, content, error };
}

// ========================================
// OFFLINE DETECTION
// ========================================

export function useOfflineDetection() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return isOnline;
}

// ========================================
// DEBOUNCED VALUE (For Search/Filter)
// ========================================

export function useDebouncedValue<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

// ========================================
// PAGE VISIBILITY (Pause animations when hidden)
// ========================================

export function usePageVisibility() {
  const [isVisible, setIsVisible] = useState(!document.hidden);

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return isVisible;
}
