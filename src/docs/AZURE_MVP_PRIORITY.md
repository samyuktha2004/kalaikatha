# Azure Setup Priority Guide (MVP-First)

**As Imagine Cup Tech Lead:** This guide prioritizes Azure services by MVP necessity to maximize impact even with limited credits.

---

## 🎯 Priority Tiers

### **TIER 1: CRITICAL (Deploy First)**
*Core functionality breaks without these*

### **TIER 2: HIGH VALUE (Deploy Second)**
*Major features, but has decent offline fallbacks*

### **TIER 3: OPTIONAL (Deploy Last)**
*Nice-to-have, strong offline alternatives*

---

## 📊 Credit Allocation Strategy

**Recommended Budget Split:**
- 🔴 Tier 1: **60%** of credits ($120 of $200 free tier)
- 🟡 Tier 2: **30%** of credits ($60)
- 🟢 Tier 3: **10%** of credits ($20)

---

## 🔴 TIER 1: CRITICAL - Deploy First

### **1. Azure Blob Storage** 
**Priority: #1 HIGHEST**

**Why Critical:**
- No product photos = No marketplace
- No artisan portfolios = No discovery
- Can't demo without images
- localStorage has 5MB limit (unusable)

**Setup:**
```bash
# Azure Portal → Storage Accounts → Create
Name: kalaikathastorage
Region: Central India
Performance: Standard
Replication: LRS (cheapest)

# Create Container
Name: artisan-uploads
Access: Blob (public read)
```

**Cost:**
- Free: 5GB storage
- After: $0.02/GB/month
- **Estimated: $0.50-2/month**

**Env Vars:**
```bash
VITE_AZURE_STORAGE_ACCOUNT=kalaikathastorage
VITE_AZURE_STORAGE_KEY=<from Access Keys>
VITE_AZURE_STORAGE_CONTAINER=artisan-uploads
```

**Impact Without:**
- ❌ Can't upload product photos
- ❌ Can't save artisan portfolios
- ❌ No image gallery (core feature)
- ❌ MVP unusable

---

### **2. Azure Computer Vision**
**Priority: #2**

**Why Critical:**
- Auto photo enhancement (artisans use old phones)
- Quality scoring (reject blurry images)
- Object detection (auto-tag products)
- Critical for illiterate users (vision-first UX)

**Setup:**
```bash
# Already configured! ✅
VITE_AZURE_VISION_ENDPOINT=https://kalaikatha-vision-ai.cognitiveservices.azure.com/
VITE_AZURE_VISION_KEY=<your key>
```

**Cost:**
- Free: 5,000 calls/month
- After: $1/1,000 calls
- **Estimated: $0-3/month (stays in free tier)**

**Features Enabled:**
- Auto enhance low-quality photos (brighten, sharpen)
- Detect blur/bad lighting → warn user
- Extract text from handwritten notes (recipes, measurements)
- Auto-tag products (pottery, textile, jewelry)

**Impact Without:**
- ⚠️ Poor quality photos (artisans won't know)
- ⚠️ Manual tagging (artisans can't type)
- ⚠️ Blurry images uploaded (buyers won't buy)
- Browser fallback exists but 60% less accurate

---

## 🟡 TIER 2: HIGH VALUE - Deploy Second

### **3. Azure OpenAI (GPT-4)**
**Priority: #3**

**Why High Value:**
- Smart pricing (prevents artisans being exploited)
- Marketing copy (artisans can't write English)
- Negotiation bot (saves artisan time)

**But Has Fallbacks:**
- Rule-based pricing works (not as smart)
- Template marketing (generic but functional)
- Manual negotiation (slower but possible)

**Setup:**
```bash
# Already configured! ✅
VITE_AZURE_OPENAI_ENDPOINT=https://kalaikatha.openai.azure.com/
VITE_AZURE_OPENAI_KEY=<your key>
VITE_AZURE_OPENAI_DEPLOYMENT=gpt-4
```

**Cost:**
- $0.03/1K input tokens, $0.06/1K output
- **Estimated: $3-8/month** (most expensive service)

**Usage Optimization:**
```javascript
// Smart caching to save credits
- Cache pricing suggestions: 24 hours
- Cache marketing: 7 days  
- Negotiation: Real-time (can't cache)
- Limit: 5 negotiations/artisan/day
```

**Features Enabled:**
1. **Smart Pricing** (saves $5-50 per product)
   - Material cost analysis
   - Labor time estimation
   - Market demand tracking
   - Competitor pricing

2. **Marketing Generator** (saves 2-3 hours/product)
   - Instagram captions
   - Amazon descriptions
   - Etsy SEO
   - WhatsApp messages

3. **Negotiation Bot** (saves 1 hour/day)
   - Auto-responds to buyers
   - Never accepts below floor price
   - Multi-language
   - Max 5 rounds then notify artisan

**Impact Without:**
- ⚠️ Basic rule-based pricing (60% accurate)
- ⚠️ Template marketing (no storytelling)
- ⚠️ Manual negotiation (artisan time)
- Still functional, just less intelligent

**Credit Saving Tips:**
- Use GPT-4-mini for marketing (10x cheaper)
- Only use full GPT-4 for pricing & negotiation
- Cache aggressively
- Limit free tier users to 3 AI calls/day

---

### **4. Azure Translator**
**Priority: #4**

**Why High Value:**
- Buyer-artisan messages (different languages)
- Dynamic content translation
- Real-time chat

**But Has Fallbacks:**
- Static UI works (pre-translated JSON)
- Google Translate (buyers can copy-paste)

**Setup:**
```bash
# Azure Portal → Translator → Create
Region: Central India
Pricing: F0 (Free tier)
```

**Cost:**
- Free: 2M chars/month
- After: $10/1M chars
- **Estimated: $0-2/month (stays in free tier)**

**Env Vars:**
```bash
VITE_AZURE_TRANSLATOR_KEY=<your key>
VITE_AZURE_TRANSLATOR_REGION=centralindia
```

**Features Enabled:**
- Translate buyer messages to artisan's language
- Translate artisan product descriptions to buyer's language
- Real-time chat translation

**Impact Without:**
- ⚠️ UI still works (8 languages pre-translated)
- ⚠️ Messages stay in original language
- ⚠️ Product descriptions not translated
- Language barrier, but not broken

---

## 🟢 TIER 3: OPTIONAL - Deploy Last

### **5. Azure Speech Services**
**Priority: #5**

**Why Optional:**
- Browser Web Speech API works offline
- Accuracy: Azure 95%, Browser 85%
- Only 10% improvement for high cost

**Setup:**
```bash
# Azure Portal → Speech Services → Create
Region: Central India
Pricing: F0 (Free tier)
```

**Cost:**
- Free: 5 hours STT/month, unlimited TTS
- After: $1/hour STT
- **Estimated: $0-2/month**

**Env Vars:**
```bash
VITE_AZURE_SPEECH_KEY=<your key>
VITE_AZURE_SPEECH_REGION=centralindia
```

**Features Enabled:**
- Better accuracy for Indian accents
- More natural TTS voices
- Offline mode still works (browser fallback)

**Impact Without:**
- ✅ Browser Web Speech works fine
- ⚠️ Slightly worse accuracy for dialects
- ⚠️ Robotic TTS (but functional)
- Not a blocker for MVP

---

## 📋 MVP Deployment Checklist

### **Week 1: Critical Setup**
- [ ] Azure Blob Storage (MUST HAVE)
- [ ] Azure Computer Vision (MUST HAVE)
- [ ] Test: Upload photo → Auto-enhance → Display

### **Week 2: High Value Features**
- [ ] Azure OpenAI (GPT-4-mini first)
- [ ] Test: Generate pricing for 1 product
- [ ] Test: Generate marketing copy
- [ ] Azure Translator (if credits allow)

### **Week 3: Polish**
- [ ] Azure Speech (if credits remain)
- [ ] Optimize: Add caching to save credits
- [ ] Monitor: Set up usage alerts

---

## 💰 Cost Projections (Monthly)

### **Minimal MVP (Tier 1 Only)**
```
Blob Storage:     $1-2
Computer Vision:  $0 (free tier)
----------------
Total:            $1-2/month
```

### **Full MVP (Tier 1 + 2)**
```
Blob Storage:     $1-2
Computer Vision:  $0-3
OpenAI GPT-4:     $3-8
Translator:       $0-2
----------------
Total:            $4-15/month
```

### **Complete (All Tiers)**
```
Blob Storage:     $1-2
Computer Vision:  $0-3
OpenAI GPT-4:     $3-8
Translator:       $0-2
Speech:           $0-2
----------------
Total:            $4-17/month
```

---

## ⚡ Credit-Saving Strategies

### **1. Aggressive Caching**
```javascript
// Cache AI responses
Pricing suggestions: 24 hours
Marketing copy: 7 days
Translations: 30 days (by content hash)
Vision analysis: Forever (by image hash)
```

### **2. Tiered Access**
```javascript
// Free users
- 3 AI pricing suggestions/day
- 5 marketing generations/week
- 10 image enhancements/day

// Verified artisans (phone verified)
- Unlimited (we pay)
```

### **3. Smart Model Selection**
```javascript
// Use cheaper models when possible
Marketing: GPT-4-mini (10x cheaper)
Negotiation: GPT-4 (needs intelligence)
Pricing: GPT-4-mini first → escalate to GPT-4 if complex
```

### **4. Batch Processing**
```javascript
// Process multiple images together
Single image: 1 API call
5 images batch: 1 API call (5x savings)
```

### **5. Usage Alerts**
```bash
# Azure Portal → Cost Management → Budgets
Alert at: $5, $10, $15
Auto-disable at: $20
```

## 🚀 Next Steps

1. **Start with Tier 1** (today)
   - Set up Blob Storage
   - Already have Vision configured

2. **Monitor usage** (week 1)
   - Check Azure Portal daily
   - Verify staying in free tiers

3. **Add Tier 2** (week 2)
   - Enable OpenAI with caching
   - Test pricing & marketing

4. **Optimize** (week 3)
   - Add usage limits
   - Implement caching
   - Set up alerts

5. **Scale smart** (week 4+)
   - Only add Tier 3 if credits allow
   - Focus on core features first
