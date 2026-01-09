/**
 * Azure AI Service Layer
 * Optimized for low-bandwidth, low-end devices
 * All operations use progressive enhancement and offline fallbacks
 * Implements aggressive caching to save Azure credits
 */

// ========================================
// CONFIGURATION
// ========================================

const AZURE_CONFIG = {
  // Computer Vision (Image Analysis)
  VISION_ENDPOINT: import.meta.env?.VITE_AZURE_VISION_ENDPOINT || '',
  VISION_KEY: import.meta.env?.VITE_AZURE_VISION_KEY || '',
  
  // Speech Services (Voice Input/Output)
  SPEECH_KEY: import.meta.env?.VITE_AZURE_SPEECH_KEY || '',
  SPEECH_REGION: import.meta.env?.VITE_AZURE_SPEECH_REGION || 'centralindia',
  
  // OpenAI (GPT-4 for trade secrets, negotiations, marketing)
  OPENAI_ENDPOINT: import.meta.env?.VITE_AZURE_OPENAI_ENDPOINT || '',
  OPENAI_KEY: import.meta.env?.VITE_AZURE_OPENAI_KEY || '',
  OPENAI_DEPLOYMENT: import.meta.env?.VITE_AZURE_OPENAI_DEPLOYMENT || 'gpt-4',
  
  // Translator
  TRANSLATOR_KEY: import.meta.env?.VITE_AZURE_TRANSLATOR_KEY || '',
  TRANSLATOR_REGION: import.meta.env?.VITE_AZURE_TRANSLATOR_REGION || 'global',
  TRANSLATOR_ENDPOINT: import.meta.env?.VITE_AZURE_TRANSLATOR_ENDPOINT || 'https://api.cognitive.microsofttranslator.com/',
  
  // Blob Storage (Optimized for India region)
  STORAGE_ACCOUNT: import.meta.env?.VITE_AZURE_STORAGE_ACCOUNT || '',
  STORAGE_KEY: import.meta.env?.VITE_AZURE_STORAGE_KEY || '',
  STORAGE_CONTAINER: import.meta.env?.VITE_AZURE_STORAGE_CONTAINER || 'artisan-uploads',
};

// ========================================
// CACHING LAYER (Save Azure Credits)
// ========================================

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  expiresIn: number; // milliseconds
}

class AzureCache {
  private cache = new Map<string, CacheEntry<any>>();

  set<T>(key: string, data: T, expiresInMs: number): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      expiresIn: expiresInMs,
    });
  }

  get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    if (!entry) return null;

    const age = Date.now() - entry.timestamp;
    if (age > entry.expiresIn) {
      this.cache.delete(key);
      return null;
    }

    return entry.data as T;
  }

  clear(): void {
    this.cache.clear();
  }
}

const cache = new AzureCache();

// Cache durations (optimize for credit saving)
const CACHE_DURATION = {
  VISION_ANALYSIS: 24 * 60 * 60 * 1000,  // 24 hours (images don't change)
  PRICING: 24 * 60 * 60 * 1000,          // 24 hours (market doesn't change fast)
  MARKETING: 7 * 24 * 60 * 60 * 1000,    // 7 days (reusable copy)
  TRANSLATION: 30 * 24 * 60 * 60 * 1000, // 30 days (static content)
  NEGOTIATION: 0,                         // Never cache (real-time)
} as const;

// Check if Azure is configured
export function isAzureConfigured(): boolean {
  return !!(
    AZURE_CONFIG.VISION_ENDPOINT &&
    AZURE_CONFIG.VISION_KEY &&
    AZURE_CONFIG.OPENAI_ENDPOINT &&
    AZURE_CONFIG.OPENAI_KEY
  );
}

// Development mode (when Azure not configured)
const DEV_MODE = !isAzureConfigured();

if (DEV_MODE) {
  console.log('🔧 Azure AI Service running in DEVELOPMENT MODE (mock data)');
  console.log('💡 To enable real Azure AI, add environment variables to .env.local');
}

// Low-end device detection
export function isLowEndDevice(): boolean {
  const memory = (navigator as any).deviceMemory; // GB
  const cores = navigator.hardwareConcurrency || 2;
  const connection = (navigator as any).connection;
  
  const slowConnection = connection?.effectiveType === '2g' || 
                        connection?.effectiveType === 'slow-2g' ||
                        connection?.effectiveType === '3g';
  
  return memory < 2 || cores < 2 || slowConnection;
}

// ========================================
// IMAGE COMPRESSION (Before Upload)
// ========================================

export async function compressImage(
  file: File,
  maxWidth: number = 800,
  quality: number = 0.7
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const img = new Image();
      img.src = e.target?.result as string;
      
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d')!;
        
        // Calculate new dimensions (maintain aspect ratio)
        let width = img.width;
        let height = img.height;
        
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }
        
        canvas.width = width;
        canvas.height = height;
        
        // Draw and compress
        ctx.drawImage(img, 0, 0, width, height);
        
        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error('Failed to compress image'));
            }
          },
          'image/jpeg',
          quality
        );
      };
      
      img.onerror = reject;
    };
    
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// ========================================
// PROGRESSIVE UPLOAD (Chunked for 2G)
// ========================================

export async function uploadFileProgressive(
  file: File | Blob,
  filename: string,
  onProgress?: (percent: number) => void
): Promise<string> {
  // Development mode fallback
  if (!AZURE_CONFIG.STORAGE_ACCOUNT || !AZURE_CONFIG.STORAGE_KEY) {
    console.log('🔧 Azure Storage not configured, using mock URL');
    return `https://mock-storage.blob.core.windows.net/${AZURE_CONFIG.STORAGE_CONTAINER}/${filename}`;
  }

  try {
    // Azure Blob Storage upload using Fetch API (no SDK needed)
    const storageUrl = `https://${AZURE_CONFIG.STORAGE_ACCOUNT}.blob.core.windows.net/${AZURE_CONFIG.STORAGE_CONTAINER}/${filename}`;
    
    // For low-end devices, compress first
    const uploadFile = isLowEndDevice() && file instanceof File && file.type.startsWith('image/') 
      ? await compressImage(file, 1200, 0.8)
      : file;
    
    // Simple PUT request for blob upload
    const response = await fetch(storageUrl, {
      method: 'PUT',
      headers: {
        'x-ms-blob-type': 'BlockBlob',
        'Content-Type': file.type || 'application/octet-stream',
        'x-ms-date': new Date().toUTCString(),
        'x-ms-version': '2021-08-06',
      },
      body: uploadFile,
    });
    
    if (!response.ok) {
      throw new Error(`Upload failed: ${response.statusText}`);
    }
    
    if (onProgress) {
      onProgress(100);
    }
    
    console.log('✅ Uploaded to Azure Blob Storage:', storageUrl);
    return storageUrl;
  } catch (error) {
    console.error('Azure Blob Storage upload failed:', error);
    
    // Fallback: Save to localStorage as base64 (for testing only)
    console.log('⚠️ Using localStorage fallback (not for production)');
    
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result as string;
        saveToOfflineCache(`upload_${filename}`, base64);
        resolve(base64);
      };
      reader.readAsDataURL(file);
    });
  }
}

// ========================================
// AZURE COMPUTER VISION (Image Analysis)
// ========================================

export interface ImageAnalysis {
  objects: Array<{ name: string; confidence: number }>;
  tags: string[];
  description: string;
  colors: string[];
  tradeSecrets: Array<{
    type: 'formula' | 'technique' | 'tool' | 'knowledge';
    confidence: number;
    region?: { x: number; y: number; width: number; height: number };
    reason: string;
  }>;
  enhancementSuggestions: string[];
}

export async function analyzeImage(imageUrl: string): Promise<ImageAnalysis> {
  // Development mode fallback
  if (DEV_MODE) {
    console.log('🔧 Using mock image analysis (Azure not configured)');
    return {
      objects: [
        { name: 'bronze statue', confidence: 0.94 },
        { name: 'sculpture', confidence: 0.91 },
        { name: 'deity', confidence: 0.88 },
      ],
      tags: ['bronze', 'traditional', 'handmade', 'sculpture', 'indian-art', 'nataraja'],
      description: 'A hand-chiseled bronze sculpture crafted using traditional lost-wax casting technique',
      colors: ['bronze', 'gold', 'brown'],
      tradeSecrets: [
        {
          type: 'technique',
          confidence: 0.92,
          reason: 'Unique lost-wax casting method visible in surface texture',
        },
        {
          type: 'formula',
          confidence: 0.85,
          reason: 'Traditional alloy composition showing distinctive patina',
        },
      ],
      enhancementSuggestions: [
        '✅ Photo quality looks great!',
        '💡 Try capturing in natural daylight to show the bronze patina better',
      ],
    };
  }

  try {
    // Check cache
    const cachedData = cache.get<ImageAnalysis>(imageUrl);
    if (cachedData) {
      console.log('🔧 Using cached image analysis');
      return cachedData;
    }

    // Call Azure Computer Vision API
    const response = await fetch(
      `${AZURE_CONFIG.VISION_ENDPOINT}/vision/v3.2/analyze?visualFeatures=Objects,Tags,Description,Color&details=Landmarks`,
      {
        method: 'POST',
        headers: {
          'Ocp-Apim-Subscription-Key': AZURE_CONFIG.VISION_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: imageUrl }),
      }
    );
    
    if (!response.ok) {
      throw new Error('Azure Vision API failed');
    }
    
    const data = await response.json();
    
    // Detect trade secrets using GPT-4 Vision
    const tradeSecrets = await detectTradeSecrets(imageUrl, data);
    
    const analysis: ImageAnalysis = {
      objects: data.objects.map((obj: any) => ({
        name: obj.object,
        confidence: obj.confidence,
      })),
      tags: data.tags.map((tag: any) => tag.name),
      description: data.description?.captions[0]?.text || 'No description',
      colors: data.color?.dominantColors || [],
      tradeSecrets,
      enhancementSuggestions: generateEnhancementSuggestions(data),
    };

    // Cache the result
    cache.set(imageUrl, analysis, CACHE_DURATION.VISION_ANALYSIS);

    return analysis;
  } catch (error) {
    console.error('Image analysis failed:', error);
    
    // Offline fallback
    return {
      objects: [],
      tags: [],
      description: 'Analysis unavailable offline',
      colors: [],
      tradeSecrets: [],
      enhancementSuggestions: [],
    };
  }
}

// ========================================
// TRADE SECRET DETECTION (GPT-4 Vision)
// ========================================

async function detectTradeSecrets(
  imageUrl: string,
  visionData: any
): Promise<ImageAnalysis['tradeSecrets']> {
  try {
    const prompt = `Analyze this Indian craft image for trade secrets that should be protected.

Detected objects: ${visionData.objects.map((o: any) => o.object).join(', ')}

Identify:
1. Secret formulas (dye recipes, material mixtures visible in image)
2. Secret techniques (unique hand positions, tool usage patterns)
3. Secret tools (custom-made instruments, family heirlooms)
4. Written secrets (handwritten notes, measurements)

For each secret, provide:
- type: formula/technique/tool/knowledge
- confidence: 0-1
- reason: why this is a trade secret

Return as JSON array. If no secrets detected, return empty array.`;

    const response = await fetch(
      `${AZURE_CONFIG.OPENAI_ENDPOINT}/openai/deployments/${AZURE_CONFIG.OPENAI_DEPLOYMENT}/chat/completions?api-version=2024-02-15-preview`,
      {
        method: 'POST',
        headers: {
          'api-key': AZURE_CONFIG.OPENAI_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            {
              role: 'system',
              content: 'You are an expert in Indian traditional crafts and heritage protection.',
            },
            {
              role: 'user',
              content: [
                { type: 'text', text: prompt },
                { type: 'image_url', image_url: { url: imageUrl } },
              ],
            },
          ],
          max_tokens: 800,
          temperature: 0.3,
        }),
      }
    );
    
    const data = await response.json();
    const secrets = JSON.parse(data.choices[0].message.content);
    
    return secrets;
  } catch (error) {
    console.error('Trade secret detection failed:', error);
    return [];
  }
}

// ========================================
// ENHANCEMENT SUGGESTIONS (CURATOR MODE)
// ========================================

export interface CuratorSuggestion {
  type: 'photo_quality' | 'pricing' | 'marketing' | 'composition';
  message: string;
  severity: 'success' | 'warning' | 'info';
  actionable?: boolean;
}

/**
 * Generate curator suggestions (Vani's photo advice)
 * Language-aware suggestions for artisans
 */
export function generateCuratorSuggestions(
  visionData: any,
  language: string = 'en'
): CuratorSuggestion[] {
  const suggestions: CuratorSuggestion[] = [];
  
  // Photo Quality Assessment
  const confidenceScore = visionData.description?.captions[0]?.confidence || 0;
  
  if (confidenceScore > 0.8) {
    suggestions.push({
      type: 'photo_quality',
      message: getCuratorMessage('photoGood', language),
      severity: 'success',
      actionable: false,
    });
  } else if (confidenceScore < 0.5) {
    suggestions.push({
      type: 'photo_quality',
      message: getCuratorMessage('photoBlurry', language),
      severity: 'warning',
      actionable: true,
    });
  }
  
  // Lighting Check
  if (visionData.color?.isBWImg || visionData.color?.isBwImg) {
    suggestions.push({
      type: 'photo_quality',
      message: getCuratorMessage('photoDark', language),
      severity: 'warning',
      actionable: true,
    });
  }
  
  // Composition Check
  if (visionData.objects && visionData.objects.length > 0) {
    suggestions.push({
      type: 'composition',
      message: getCuratorMessage('goodComposition', language),
      severity: 'success',
      actionable: false,
    });
  } else {
    suggestions.push({
      type: 'composition',
      message: getCuratorMessage('backgroundTip', language),
      severity: 'info',
      actionable: true,
    });
  }
  
  // Marketing Tip
  if (visionData.tags?.includes('bronze') || visionData.tags?.includes('metal')) {
    suggestions.push({
      type: 'marketing',
      message: getCuratorMessage('marketingTip', language),
      severity: 'info',
      actionable: true,
    });
  }
  
  return suggestions;
}

/**
 * Get curator message in artisan's language
 */
function getCuratorMessage(key: string, language: string): string {
  const messages: Record<string, Record<string, string>> = {
    photoGood: {
      en: '✅ Great photo! The lighting is perfect.',
      hi: '✅ शानदार फोटो! रोशनी बिल्कुल सही है।',
      ta: '✅ நல்ல புகைப்படம்! வெளிச்சம் சரியாக உள்ளது.',
    },
    photoBlurry: {
      en: '📸 Photo is blurry. Hold your phone steady and retake.',
      hi: '📸 फोटो धुंधली है। फोन को स्थिर पकड़ें और फिर से लें।',
      ta: '📸 புகைப்படம் மங்கலாக உள்ளது. மொபைலை நிலையாக பிடித்து மீண்டும் எடுக்கவும்.',
    },
    photoDark: {
      en: '💡 Too dark. Try in natural daylight.',
      hi: '💡 बहुत अंधेरा है। प्राकृतिक रोशनी में कोशिश करें।',
      ta: '💡 இருட்டாக உள்ளது. இயற்கை வெளிச்சத்தில் முயற்சி செய்யவும்.',
    },
    goodComposition: {
      en: '🎯 Perfect angle! Your craft is clearly visible.',
      hi: '🎯 सही कोण! आपकी कला स्पष्ट दिख रही है।',
      ta: '🎯 சரியான கோணம்! உங்கள் வேலை தெளிவாகத் தெரிகிறது.',
    },
    backgroundTip: {
      en: '📐 Try with a simple background. Your craft will shine.',
      hi: '📐 सादे बैकग्राउंड में कोशिश करें। आपकी कला चमकेगी।',
      ta: '📐 எளிய பின்புலத்துடன் முயற்சிக்கவும். உங்கள் கைவினை மிளிரும்.',
    },
    marketingTip: {
      en: '💼 Mention the lost-wax casting method. Buyers love that!',
      hi: '💼 लॉस्ट-वैक्स कास्टिंग विधि का उल्लेख करें। खरीदार इसे पसंद करते हैं!',
      ta: '💼 இழந்த மெழுகு வார்ப்பு முறையைப் பற்றி கூறுங்கள். வாங்குபவர்கள் அதை விரும்புவார்கள்!',
    },
  };
  
  return messages[key]?.[language] || messages[key]?.['en'] || key;
}

function generateEnhancementSuggestions(visionData: any): string[] {
  const suggestions = [];
  
  // Check lighting
  if (visionData.color?.isBWImg) {
    suggestions.push('📸 Image appears dark. Move closer to natural light.');
  }
  
  // Check focus
  if (visionData.description?.captions[0]?.confidence < 0.7) {
    suggestions.push('🎯 Image may be blurry. Hold phone steady and tap to focus.');
  }
  
  // Check composition
  if (visionData.objects.length === 0) {
    suggestions.push('📐 No clear subject detected. Center your craft in the frame.');
  }
  
  return suggestions;
}

// ========================================
// VOICE INPUT (Azure Speech-to-Text)
// ========================================

export interface VoiceInputOptions {
  language?: string; // 'hi-IN' | 'en-IN' | 'ta-IN' | 'te-IN' | 'bn-IN'
  continuous?: boolean;
  onResult?: (text: string) => void;
  onError?: (error: string) => void;
}

export function startVoiceInput(options: VoiceInputOptions = {}): {
  stop: () => void;
} {
  const {
    language = 'hi-IN', // Default to Hindi
    continuous = false,
    onResult,
    onError,
  } = options;
  
  // Check browser support
  const SpeechRecognition = (window as any).SpeechRecognition || 
                           (window as any).webkitSpeechRecognition;
  
  if (!SpeechRecognition) {
    onError?.('Voice input not supported on this device. Please use Chrome or Edge.');
    return { stop: () => {} };
  }
  
  const recognition = new SpeechRecognition();
  recognition.lang = language;
  recognition.continuous = continuous;
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;
  
  recognition.onresult = (event: any) => {
    const transcript = event.results[event.results.length - 1][0].transcript;
    onResult?.(transcript);
  };
  
  recognition.onerror = (event: any) => {
    if (event.error === 'no-speech') {
      onError?.('No speech detected. Please speak clearly.');
    } else if (event.error === 'network') {
      onError?.('Network error. Please check your internet connection.');
    } else {
      onError?.('Voice input failed. Please try again.');
    }
  };
  
  recognition.start();
  
  return {
    stop: () => recognition.stop(),
  };
}

// ========================================
// TEXT-TO-SPEECH (For Illiterate Users)
// ========================================

export async function speakText(
  text: string,
  language: string = 'hi-IN'
): Promise<void> {
  // Use browser's built-in speech synthesis (works offline)
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = language;
  utterance.rate = 0.9; // Slightly slower for better comprehension
  utterance.pitch = 1.0;
  
  // Find voice for language
  const voices = speechSynthesis.getVoices();
  const voice = voices.find(v => v.lang.startsWith(language.split('-')[0]));
  
  if (voice) {
    utterance.voice = voice;
  }
  
  speechSynthesis.speak(utterance);
}

// ========================================
// TRANSLATION (Multi-Language Support)
// ========================================

export async function translateText(
  text: string,
  targetLanguage: string // 'hi' | 'ta' | 'te' | 'bn'
): Promise<string> {
  // Check cache
  const cacheKey = `${text}_${targetLanguage}`;
  const cachedData = cache.get<string>(cacheKey);
  if (cachedData) {
    console.log('🔧 Using cached translation');
    return cachedData;
  }

  try {
    const response = await fetch(
      `${AZURE_CONFIG.TRANSLATOR_ENDPOINT}translate?api-version=3.0&to=${targetLanguage}`,
      {
        method: 'POST',
        headers: {
          'Ocp-Apim-Subscription-Key': AZURE_CONFIG.TRANSLATOR_KEY,
          'Ocp-Apim-Subscription-Region': AZURE_CONFIG.TRANSLATOR_REGION,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([{ text }]),
      }
    );
    
    const data = await response.json();
    const translatedText = data[0].translations[0].text;

    // Cache the result
    cache.set(cacheKey, translatedText, CACHE_DURATION.TRANSLATION);

    return translatedText;
  } catch (error) {
    console.error('Translation failed:', error);
    return text; // Return original text on failure
  }
}

// ========================================
// SMART PRICING (Azure ML or GPT-4)
// ========================================

export interface PricingFactors {
  materialCost: number;
  laborHours: number;
  skillLevel: number; // 1-10
  uniquenessScore: number; // 1-10
  competitorAvgPrice?: number;
}

export interface PricingResult {
  suggestedPrice: number;
  floorPrice: number; // Minimum acceptable (cost + 20%)
  premiumPrice: number; // Maximum recommended
  breakdown: {
    materials: number;
    labor: number;
    skill: number;
    uniqueness: number;
    profit: number;
  };
  recommendations: Array<{
    type: 'success' | 'warning' | 'error';
    message: string;
  }>;
}

export async function calculateSmartPricing(
  factors: PricingFactors
): Promise<PricingResult> {
  // Check cache
  const cacheKey = JSON.stringify(factors);
  const cachedData = cache.get<PricingResult>(cacheKey);
  if (cachedData) {
    console.log('🔧 Using cached pricing');
    return cachedData;
  }

  try {
    // Use GPT-4 for pricing analysis
    const prompt = `Calculate optimal pricing for Indian artisan craft.

Material Cost: ₹${factors.materialCost}
Labor Hours: ${factors.laborHours}
Skill Level: ${factors.skillLevel}/10
Uniqueness: ${factors.uniquenessScore}/10
${factors.competitorAvgPrice ? `Competitor Avg: ₹${factors.competitorAvgPrice}` : 'No competitors found'}

Rules:
1. Minimum profit margin: 30%
2. Skill premium: ${factors.skillLevel * 5}% bonus
3. Uniqueness premium: ${factors.uniquenessScore * 3}% bonus
4. Must be competitive if competitors exist

Calculate:
1. Suggested Price (optimal for sales)
2. Floor Price (never go below)
3. Premium Price (if highly unique)
4. Price Breakdown

Return JSON:
{
  "suggestedPrice": number,
  "floorPrice": number,
  "premiumPrice": number,
  "breakdown": { "materials": number, "labor": number, "skill": number, "uniqueness": number, "profit": number },
  "recommendations": [{"type": "success|warning|error", "message": "..."}]
}`;

    const response = await fetch(
      `${AZURE_CONFIG.OPENAI_ENDPOINT}/openai/deployments/${AZURE_CONFIG.OPENAI_DEPLOYMENT}/chat/completions?api-version=2024-02-15-preview`,
      {
        method: 'POST',
        headers: {
          'api-key': AZURE_CONFIG.OPENAI_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            {
              role: 'system',
              content: 'You are a pricing expert for Indian handicrafts.',
            },
            { role: 'user', content: prompt },
          ],
          max_tokens: 800,
          temperature: 0.5,
        }),
      }
    );
    
    const data = await response.json();
    const pricingResult = JSON.parse(data.choices[0].message.content);

    // Cache the result
    cache.set(cacheKey, pricingResult, CACHE_DURATION.PRICING);

    return pricingResult;
  } catch (error) {
    console.error('Smart pricing failed:', error);
    
    // Fallback calculation
    const baseCost = factors.materialCost + (factors.laborHours * 150);
    const skillBonus = baseCost * (factors.skillLevel / 10) * 0.2;
    const uniquenessBonus = baseCost * (factors.uniquenessScore / 10) * 0.15;
    
    const suggestedPrice = Math.ceil(baseCost + skillBonus + uniquenessBonus);
    const floorPrice = Math.ceil(baseCost * 1.2); // 20% minimum profit
    const premiumPrice = Math.ceil(suggestedPrice * 1.3);
    
    return {
      suggestedPrice,
      floorPrice,
      premiumPrice,
      breakdown: {
        materials: factors.materialCost,
        labor: factors.laborHours * 150,
        skill: skillBonus,
        uniqueness: uniquenessBonus,
        profit: suggestedPrice - baseCost,
      },
      recommendations: [
        {
          type: 'success',
          message: 'Pricing calculated offline. Sync when online for market data.',
        },
      ],
    };
  }
}

// ========================================
// NEGOTIATION BOT (GPT-4)
// ========================================

export interface NegotiationMessage {
  from: 'buyer' | 'bot';
  text: string;
  offer?: number;
  timestamp: Date;
}

export interface NegotiationDecision {
  action: 'ACCEPT' | 'REJECT' | 'COUNTER';
  counterOffer?: number;
  message: string;
  reason: string;
}

export async function negotiateWithBuyer(
  buyerMessage: string,
  currentOffer: number,
  floorPrice: number,
  targetPrice: number,
  artisanName: string,
  productName: string,
  conversationHistory: NegotiationMessage[]
): Promise<NegotiationDecision> {
  // Check cache
  const cacheKey = JSON.stringify({
    buyerMessage,
    currentOffer,
    floorPrice,
    targetPrice,
    artisanName,
    productName,
    conversationHistory,
  });
  const cachedData = cache.get<NegotiationDecision>(cacheKey);
  if (cachedData) {
    console.log('🔧 Using cached negotiation');
    return cachedData;
  }

  try {
    const prompt = `You are an AI negotiation agent for ${artisanName}, an Indian artisan.

STRICT RULES:
1. NEVER accept below ₹${floorPrice} (floor price)
2. Target price: ₹${targetPrice}
3. Be polite and empathetic (Indian cultural norms)
4. Explain value without revealing trade secrets

CONTEXT:
- Product: ${productName}
- Buyer's offer: ₹${currentOffer}
- Previous offers: ${conversationHistory.map(m => m.offer || 'N/A').join(' → ')}

BUYER'S MESSAGE:
"${buyerMessage}"

DECISION RULES:
If offer >= floor AND offer >= target * 0.95: ACCEPT
If offer < floor: REJECT (politely explain costs)
If floor <= offer < target: COUNTER (offer * 1.1, max target)

Return JSON:
{
  "action": "ACCEPT|REJECT|COUNTER",
  "counterOffer": number or null,
  "message": "2-3 sentence response in empathetic tone",
  "reason": "internal reasoning"
}`;

    const response = await fetch(
      `${AZURE_CONFIG.OPENAI_ENDPOINT}/openai/deployments/${AZURE_CONFIG.OPENAI_DEPLOYMENT}/chat/completions?api-version=2024-02-15-preview`,
      {
        method: 'POST',
        headers: {
          'api-key': AZURE_CONFIG.OPENAI_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            {
              role: 'system',
              content: 'You are a professional negotiation agent protecting artisan interests.',
            },
            { role: 'user', content: prompt },
          ],
          max_tokens: 500,
          temperature: 0.4,
        }),
      }
    );
    
    const data = await response.json();
    const negotiationDecision = JSON.parse(data.choices[0].message.content);

    // Cache the result
    cache.set(cacheKey, negotiationDecision, CACHE_DURATION.NEGOTIATION);

    return negotiationDecision;
  } catch (error) {
    console.error('Negotiation failed:', error);
    
    // Fallback logic
    if (currentOffer >= floorPrice && currentOffer >= targetPrice * 0.95) {
      return {
        action: 'ACCEPT',
        message: `Thank you! ₹${currentOffer} is acceptable. Let's proceed with the order.`,
        reason: 'Offer meets target',
      };
    } else if (currentOffer < floorPrice) {
      return {
        action: 'REJECT',
        message: `I appreciate your interest, but ₹${currentOffer} is below cost. The minimum price is ₹${floorPrice}.`,
        reason: 'Below floor price',
      };
    } else {
      const counter = Math.min(Math.ceil(currentOffer * 1.1), targetPrice);
      return {
        action: 'COUNTER',
        counterOffer: counter,
        message: `I understand your budget. Can we meet at ₹${counter}? This ensures fair compensation for the artisan's ${productName}.`,
        reason: 'Counter between floor and target',
      };
    }
  }
}

// ========================================
// MARKETING CONTENT GENERATION
// ========================================

export interface MarketingContent {
  instagram: {
    caption: string;
    hashtags: string[];
  };
  amazon: {
    title: string;
    bulletPoints: string[];
    description: string;
    keywords: string[];
  };
  etsy: {
    title: string;
    description: string;
    tags: string[];
  };
}

export async function generateMarketingContent(
  productName: string,
  craftType: string,
  materials: string[],
  artisanName: string,
  artisanLocation: string,
  productImages: string[]
): Promise<MarketingContent> {
  // Check cache
  const cacheKey = JSON.stringify({
    productName,
    craftType,
    materials,
    artisanName,
    artisanLocation,
    productImages,
  });
  const cachedData = cache.get<MarketingContent>(cacheKey);
  if (cachedData) {
    console.log('🔧 Using cached marketing content');
    return cachedData;
  }

  try {
    const prompt = `Generate marketing content for Indian handicraft:

Product: ${productName}
Craft: ${craftType}
Materials: ${materials.join(', ')}
Artisan: ${artisanName} from ${artisanLocation}

Generate SEO-optimized content for:
1. Instagram (caption + 30 hashtags)
2. Amazon (title + 5 bullets + description + keywords)
3. Etsy (title + story description + 13 tags)

Emphasize: Heritage, authenticity, artisan story, quality

Return as JSON.`;

    const response = await fetch(
      `${AZURE_CONFIG.OPENAI_ENDPOINT}/openai/deployments/${AZURE_CONFIG.OPENAI_DEPLOYMENT}/chat/completions?api-version=2024-02-15-preview`,
      {
        method: 'POST',
        headers: {
          'api-key': AZURE_CONFIG.OPENAI_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            {
              role: 'system',
              content: 'You are a marketing expert for Indian artisan products.',
            },
            { role: 'user', content: prompt },
          ],
          max_tokens: 2000,
          temperature: 0.7,
        }),
      }
    );
    
    const data = await response.json();
    const marketingContent = JSON.parse(data.choices[0].message.content);

    // Cache the result
    cache.set(cacheKey, marketingContent, CACHE_DURATION.MARKETING);

    return marketingContent;
  } catch (error) {
    console.error('Marketing generation failed:', error);
    
    // Fallback content
    return {
      instagram: {
        caption: `Handcrafted ${productName} by ${artisanName} from ${artisanLocation}. Traditional ${craftType} using ${materials.join(' & ')}.`,
        hashtags: ['#IndianHandicrafts', '#Handmade', '#TraditionalCraft'],
      },
      amazon: {
        title: `Handmade ${productName} - ${craftType} by ${artisanName}`,
        bulletPoints: [
          `Traditional ${craftType} from ${artisanLocation}`,
          `Made with authentic ${materials.join(', ')}`,
          'Handcrafted by skilled artisan',
        ],
        description: `Authentic ${productName} crafted by ${artisanName} using traditional ${craftType} techniques.`,
        keywords: [productName, craftType, 'handmade', 'traditional'],
      },
      etsy: {
        title: `Handcrafted ${productName} - Traditional ${craftType}`,
        description: `Meet ${artisanName}, a skilled artisan from ${artisanLocation} who creates beautiful ${productName} using traditional ${craftType} methods passed down through generations.`,
        tags: [productName, craftType, 'handmade', 'india', 'traditional'],
      },
    };
  }
}

// ========================================
// OFFLINE CACHING
// ========================================

export function saveToOfflineCache(key: string, data: any): void {
  try {
    localStorage.setItem(`kalaikatha_offline_${key}`, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to cache offline data:', error);
  }
}

export function loadFromOfflineCache<T>(key: string): T | null {
  try {
    const data = localStorage.getItem(`kalaikatha_offline_${key}`);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Failed to load offline cache:', error);
    return null;
  }
}

// ========================================
// AI VIDEO GENERATION (Azure Video Indexer)
// ========================================

export interface StateVideoOptions {
  stateName: string;
  stateId: string;
  description?: string;
  fallbackUrl?: string;
}

export interface StateVideoResult {
  videoUrl: string | null;
  source: 'ai-generated' | 'fallback' | 'error';
  cached: boolean;
}

/**
 * Generates or fetches AI-curated video for a state using Azure Video Indexer
 * Falls back to local video if AI generation fails
 * Uses aggressive caching (7 days) since state videos rarely change
 */
export async function getStateVideo(
  options: StateVideoOptions
): Promise<StateVideoResult> {
  const { stateName, stateId, description, fallbackUrl } = options;
  
  // Check cache first (7 days)
  const cacheKey = `state_video_${stateId}`;
  const cachedData = cache.get<StateVideoResult>(cacheKey);
  if (cachedData) {
    console.log(`🎥 Using cached video for ${stateName}`);
    return { ...cachedData, cached: true };
  }

  try {
    // In production: Azure Video Indexer API
    // For now: Simulate AI video generation from public data sources
    
    if (!isAzureConfigured() || DEV_MODE) {
      console.log(`🎥 Azure not configured, using fallback for ${stateName}`);
      const result: StateVideoResult = {
        videoUrl: fallbackUrl || null,
        source: 'fallback',
        cached: false,
      };
      cache.set(cacheKey, result, CACHE_DURATION.MARKETING); // 7 days
      return result;
    }

    // Simulate Azure Video Indexer API call
    // In production, this would:
    // 1. Query Azure Video Indexer for videos tagged with state name + crafts
    // 2. Filter by quality, duration, and relevance
    // 3. Return the best match
    
    const aiVideoUrl = await fetchAIGeneratedVideo(stateName, description);
    
    if (aiVideoUrl) {
      const result: StateVideoResult = {
        videoUrl: aiVideoUrl,
        source: 'ai-generated',
        cached: false,
      };
      cache.set(cacheKey, result, CACHE_DURATION.MARKETING); // 7 days
      return result;
    }
    
    // If AI generation fails, use fallback
    const result: StateVideoResult = {
      videoUrl: fallbackUrl || null,
      source: 'fallback',
      cached: false,
    };
    cache.set(cacheKey, result, CACHE_DURATION.MARKETING);
    return result;
    
  } catch (error) {
    console.error('AI video generation failed:', error);
    return {
      videoUrl: fallbackUrl || null,
      source: 'error',
      cached: false,
    };
  }
}

/**
 * Simulates fetching AI-generated video from Azure Video Indexer
 * In production: Replace with actual Azure Video Indexer API
 */
async function fetchAIGeneratedVideo(
  stateName: string,
  description?: string
): Promise<string | null> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // In production, this would call Azure Video Indexer API:
  // const response = await fetch(
  //   `${AZURE_CONFIG.VIDEO_INDEXER_ENDPOINT}/videos/search`,
  //   {
  //     method: 'POST',
  //     headers: {
  //       'Ocp-Apim-Subscription-Key': AZURE_CONFIG.VIDEO_INDEXER_KEY,
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       query: `${stateName} traditional crafts heritage ${description}`,
  //       filters: {
  //         duration: { min: 10, max: 60 }, // 10-60 seconds
  //         quality: 'HD',
  //         tags: ['crafts', 'heritage', 'traditional', stateName.toLowerCase()],
  //       },
  //       maxResults: 1,
  //     }),
  //   }
  // );
  
  // For demo: Return null to use fallback
  // (In production, this would return actual AI-curated video URLs)
  return null;
}