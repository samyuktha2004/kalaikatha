# Technical Architecture

**Stack:** React + Vite + TypeScript + Tailwind CSS v4  
**AI:** Azure OpenAI, Computer Vision, Speech, Translator  
**Storage:** Azure Blob Storage  
**Auth:** Firebase Authentication  
**Deployment:** Vercel (frontend), Azure Functions (API)

---

## System Architecture

```
User (Budget Smartphone, 2G Network)
  ↓
Frontend (React + Vite)
  ↓ Offline-first (localStorage caching)
  ↓
Azure Functions API
  ↓
┌─────────────┬──────────────┬──────────────┬────────────────┐
│ Azure       │ Azure        │ Azure        │ Azure          │
│ Blob Storage│ Computer     │ OpenAI       │ Speech         │
│             │ Vision       │ GPT-4        │ Services       │
└─────────────┴──────────────┴──────────────┴────────────────┘
  ↓
Azure Cosmos DB (planned)
```

---

## AI Features

### 1. Computer Vision (Photo Enhancement)
**Purpose:** Turn scratched-lens photos into studio-quality images  
**Input:** 5MB dim, blurry photo  
**Output:** 400KB enhanced image + quality score (0-100)  
**Process:**
- Object detection (bronze, sculpture, etc.)
- Quality analysis (blur, lighting, composition)
- Enhancement suggestions
- Tag generation for SEO
- **Caching:** 24 hours (saves API calls)

### 2. GPT-4 Vision (Trade Secret Detection)
**Purpose:** Auto-detect and protect family secrets  
**Input:** Voice transcript or video  
**Output:** Public content + Protected content  
**Detection:**
- Alloy ratios (87% copper, 13% tin)
- Temperature specs (187°C for 4.5 minutes)
- Chemical formulas (acid mixtures)
- Tool specifications (chisel angles)
- **Smart Split:** Marketing language vs Technical secrets

### 3. GPT-4 (Smart Pricing)
**Purpose:** Prevent artisan exploitation with fair pricing  
**Input:** Product details, craft type, materials, time  
**Output:** Floor/Suggested/Premium prices + reasoning  
**Calculation:**
```
Material Cost: ₹4,200 (bronze, tin, wax)
Labor Cost: ₹8,000 (10 days @ ₹800/day fair wage)
Expertise: +15% (9th generation master)
Uniqueness: +10% (one-of-a-kind, hand-chiseled)
━━━━━━━━━━━━━━━━━━━━━━━━━━━
Floor: ₹14,800 (never accept below)
Suggested: ₹18,500 (fair market value)
Premium: ₹22,000 (for luxury buyers)
```
**Caching:** 24 hours per product

### 4. GPT-4 (Autonomous Negotiation Bot)
**Purpose:** 24/7 bargaining while artisan works  
**Input:** Buyer offer + artisan's floor price  
**Output:** Professional English counter-offer  
**Behavior:**
- Never accepts below floor price
- Max 5 negotiation rounds
- Professional, respectful tone
- Value explanation (labor, expertise, uniqueness)
- **No caching:** Real-time decisions

**Example:**
```
Buyer: ₹11,100/piece (40% off)
Cost Analysis: Material ₹4,200 + Labor ₹8,000 = ₹12,200
AI Decision: REJECT (below cost)
Counter: ₹14,800 (20% off, fair bulk discount)
Message: "This reflects 120 hours manual labor and 9th-gen expertise"
```

### 5. GPT-4 (Marketing Content Generator)
**Purpose:** Tamil voice → English marketing copy  
**Input:** Voice description in Tamil  
**Output:** Platform-specific content  
**Platforms:**
- **Instagram:** Story-driven, hashtags, emotional (#BronzeArt)
- **Amazon:** SEO keywords, GI Tag, professional (Amazon search)
- **Etsy:** Handmade emphasis, artisan story (personal touch)
- **Caching:** 7 days (content reusable)

### 6. Speech Services (Vani Voice Assistant)
**Purpose:** Voice-first for illiterate artisans  
**Input:** Tamil/Hindi speech  
**Output:** Text transcription + TTS responses  
**Voices:**
- Tamil: ta-IN-PallaviNeural (Azure)
- Hindi: hi-IN-SwaraNeural (Azure)
- Fallback: Browser Web Speech API (offline)
- **Caching:** Never (real-time interaction)

### 7. Translator
**Purpose:** 10 Indian languages support  
**Input:** UI text, user content  
**Output:** Translated text  
**Caching:** 30 days (static UI text)

---

## Multi-Language System

### Language Selection Flow
```
Signup → Name Entry → LANGUAGE SELECTION
  ↓
User selects: தமிழ் (Tamil)
  ↓
Download progress: 0% → 100% (38 MB)
  ↓
Pack cached in localStorage
  ↓
App works 100% offline in Tamil
```

### Supported Languages
1. Hindi (हिन्दी)
2. English
3. Tamil (தமிழ்)
4. Telugu (తెలుగు)
5. Kannada (ಕನ್ನಡ)
6. Malayalam (മലയാളം)
7. Bengali (বাংলা)
8. Marathi (मराठी)
9. Gujarati (ગુજરાતી)
10. Punjabi (ਪੰਜਾਬੀ)

### Implementation
**Files:**
- `/locales/en.json, hi.json, ta.json` - Translation files
- `/hooks/useTranslation.ts` - Language hook with caching
- `/components/artisan/LanguageSelection.tsx` - Selection UI

**Usage:**
```typescript
const { t, lang, setLang } = useTranslation();

// Basic translation
t('dashboard.title') // → "டாஷ்போர்டு" (Tamil)

// Dynamic values
td('welcome.greeting', { name: 'Ramesh' }) 
// → "வணக்கம் Ramesh!" (Hello Ramesh!)
```

---

## Low-Data Optimizations

### Network Detection
```typescript
// Detect 2G/3G/4G/5G
const connection = navigator.connection;
if (connection.effectiveType === '2g') {
  // Enable aggressive compression
  // Disable animations
  // Use smaller images
}
```

### Image Compression
```
Original: 5MB photo
  ↓ Auto-compress on 2G
Compressed: 400KB (92% reduction)
  ↓
Quality: 70% JPEG
Max width: 800px
Progressive encoding
```

### Progressive Upload
```
File: 5MB image
  ↓ Split into chunks
Chunk size: 256KB
  ↓ Upload with retry
Progress: 0% → 25% → 50% → 75% → 100%
  ↓ Resume from last chunk on failure
Success: Azure Blob URL
```

### Caching Strategy
```
Aggressive Caching = 70% Cost Savings

Image Analysis: 24 hours
Pricing: 24 hours
Marketing: 7 days
Translation: 30 days
Negotiation: Never cache
Voice: Never cache
```

---

## Security

### Protected Vault
**Encryption:** Base64 (MVP) → bcrypt (production)  
**Storage:** localStorage (encrypted)  
**Access:** 4-6 digit PIN (visual number pad)  
**Protection:**
- 3 failed attempts = 5-minute lockout
- PIN reset option (emergency)
- Auto-lock after viewing
- Separate storage from public data

### Firebase Authentication
**Methods:** Email/password, Phone (OTP)  
**Protected Routes:** Artisan dashboard, custom orders  
**Guest Access:** Map, crafts browsing

### Environment Variables
**Storage:** `.env.local` (never committed)  
**Required:**
```
AZURE_STORAGE_CONNECTION_STRING
AZURE_VISION_KEY
AZURE_OPENAI_KEY
AZURE_TRANSLATOR_KEY
AZURE_SPEECH_KEY
FIREBASE_CONFIG
```

---

## Performance

### Bundle Size
```
Main bundle: ~180KB (gzipped)
Language pack: 38-45KB each
Total initial: ~220KB
Lazy-loaded: 600KB (charts, advanced features)
```

### Load Time
```
2G network: <8 seconds
3G network: <4 seconds
4G network: <2 seconds
```

### Offline Support
- Language packs cached (works offline)
- Photos queued for upload
- Browser speech API fallback
- localStorage for all user data

---

## Code Organization

### Custom Hooks
**Purpose:** State management, reusable logic  
**Files:**
```
/hooks/useAuthModal.ts - Login/signup modal
/hooks/useCustomerFlow.ts - Buyer journey
/hooks/useArtisanFlow.ts - Artisan journey
/hooks/useTranslation.ts - Multi-language
/hooks/useArtisanFeatures.ts - Voice, TTS, device
```

### Utilities
**Purpose:** Helper functions, constants  
**Files:**
```
/utils/constants.ts - Craft data, languages
/utils/storage.ts - localStorage helpers
/utils/deviceDetection.ts - Network detection
```

### Services
**Purpose:** External API integrations  
**Files:**
```
/services/AzureAIService.ts - All Azure features
/services/firebase.ts - Auth & analytics
```

### Components
**Purpose:** UI building blocks  
**Structure:**
```
/components/
  artisan/ - Dashboard, Studio, Vault, Orders
  customer/ - Map, Gallery, ArtisanProfile
  ui/ - Button, Card, Badge, Switch (design system)
  figma/ - ImageWithFallback
```

---

## Development Workflow

### Setup
```bash
npm install
cp .env.sample .env.local
# Add real Azure credentials to .env.local
npm run dev
```

### Testing Features
1. **Voice Input:** Allow mic permission in browser
2. **Photo Upload:** Create Azure container `artisan-uploads`
3. **AI Features:** Check console for API responses
4. **Offline:** Disable network, test language switching

### Build
```bash
npm run build
# Output: /dist folder (deploy to Vercel)
```

---

## Cost Optimization

### Free Tier Limits
- Computer Vision: 5,000 calls/month
- Translator: 2M characters/month
- Speech: 5 hours/month
- Blob Storage: 5GB
- Firebase: 50K reads/day

### Caching Impact
```
Without Caching:
Daily API calls: 1,000
Monthly cost: $45

With 70% Cache Hit:
Daily API calls: 300
Monthly cost: $13
Savings: $32/month (71%)
```

### $200 Credit Projection
```
Month 1: $15 (testing + demo)
Month 2-6: $10/month (50 artisans)
Month 7-12: $13/month (100 artisans)
Total: $88 (lasts 12+ months)
```

---

## Deployment

### Frontend (Vercel)
```
Repository: GitHub
Build: npm run build
Deploy: Automatic on push
Environment: .env variables in Vercel dashboard
```

### Backend (Azure Functions)
```
Language: Node.js 18
Hosting: Azure Functions (consumption plan)
CORS: Allow Vercel domain
Environment: .env in Azure portal
```

---

## Future Enhancements

### Backend (Post-Demo)
- Azure Cosmos DB for scalable storage
- Real WhatsApp Business API integration
- Payment gateway (Razorpay/Stripe)
- Order tracking system
- Analytics dashboard

### Features
- Video upload & analysis
- AR try-on (crafts in home)
- Blockchain certificates (authenticity)
- Multi-artisan collaboration
- Buyer custom design input

---

**For detailed user flows, see:**  
- `RAMESH_DEMO_FLOW.md` - Complete journey
- `AZURE_GUIDE.md` - Setup instructions
- `FEATURES.md` - Feature list
