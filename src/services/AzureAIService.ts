/**
 * Azure AI Service Layer
 * Optimized for low-bandwidth, low-end devices
 * All operations use progressive enhancement and offline fallbacks
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
  OPENAI_DEPLOYMENT: 'gpt-4', // Deployment name
  
  // Translator
  TRANSLATOR_KEY: import.meta.env?.VITE_AZURE_TRANSLATOR_KEY || '',
  TRANSLATOR_REGION: import.meta.env?.VITE_AZURE_TRANSLATOR_REGION || 'centralindia',
  
  // Blob Storage (Optimized for India region)
  STORAGE_ACCOUNT: import.meta.env?.VITE_AZURE_STORAGE_ACCOUNT || '',
  STORAGE_KEY: import.meta.env?.VITE_AZURE_STORAGE_KEY || '',
  STORAGE_CONTAINER: 'artisan-uploads',
};

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
  // For low-end devices, use smaller chunks
  const chunkSize = isLowEndDevice() ? 256 * 1024 : 1024 * 1024; // 256KB vs 1MB
  const totalChunks = Math.ceil(file.size / chunkSize);
  
  // Mock upload for now (replace with Azure Blob Storage SDK)
  for (let i = 0; i < totalChunks; i++) {
    const start = i * chunkSize;
    const end = Math.min(start + chunkSize, file.size);
    const chunk = file.slice(start, end);
    
    // Simulate network delay (replace with actual upload)
    await new Promise(resolve => setTimeout(resolve, 100));
    
    if (onProgress) {
      onProgress(Math.round(((i + 1) / totalChunks) * 100));
    }
  }
  
  // Return mock URL (replace with actual Azure Blob URL)
  return `https://${AZURE_CONFIG.STORAGE_ACCOUNT}.blob.core.windows.net/${AZURE_CONFIG.STORAGE_CONTAINER}/${filename}`;
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
        { name: 'textile', confidence: 0.92 },
        { name: 'fabric', confidence: 0.88 },
        { name: 'handloom', confidence: 0.85 },
      ],
      tags: ['traditional', 'handmade', 'craft', 'textile', 'colorful'],
      description: 'A beautiful handcrafted textile with traditional patterns',
      colors: ['orange', 'blue', 'red'],
      tradeSecrets: [
        {
          type: 'technique',
          confidence: 0.9,
          reason: 'Unique weaving pattern detected',
        },
      ],
      enhancementSuggestions: [
        '✅ Photo quality looks great!',
        '💡 Try capturing in natural daylight for even better results',
      ],
    };
  }

  try {
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
    
    return {
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
// ENHANCEMENT SUGGESTIONS
// ========================================

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
  try {
    const response = await fetch(
      `https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&to=${targetLanguage}`,
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
    return data[0].translations[0].text;
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
    return JSON.parse(data.choices[0].message.content);
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
    return JSON.parse(data.choices[0].message.content);
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
    return JSON.parse(data.choices[0].message.content);
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