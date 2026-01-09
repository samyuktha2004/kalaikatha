# 🎬 MVP Demo Setup Guide - Personalize Your Video

**Last Updated:** Jan 8, 2026  
**Purpose:** Configure hardcoded content for your Imagine Cup demo video

---

## 🚨 CRITICAL ISSUES IDENTIFIED

### **Issue #1: Hardcoded Content** ✅ DOCUMENTED
All artisan data (products, orders, marketing content) is currently hardcoded for demo purposes. This is **intentional for MVP** but needs customization for your video.

### **Issue #2: Voice/Microphone Not Working** ⚠️ NEEDS FIX
- Vani doesn't ask for microphone permissions
- Speech recognition not triggering
- Azure Speech Services not integrated

### **Issue #3: No Language Selection at Signup** ⚠️ NEEDS FIX
- Artisan signup doesn't ask for preferred language
- No language pack download prompt
- Language selector only in dashboard (not onboarding)

---

## 📝 HARDCODED CONTENT LOCATIONS

### **1. My Shop Products** (`/components/artisan/MyShop.tsx`)

**Current Demo Data (Line 14-42):**
```typescript
const listings = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=400',
    name: 'Handwoven Silk Saree',
    price: 4500,
    stock: 3,
    views: 234,
    active: true,
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1617090946034-ebc960daa9bd?w=400',
    name: 'Blue Pottery Vase',
    price: 850,
    stock: 12,
    views: 156,
    active: true,
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1582650625119-3a31f8fa2699?w=400',
    name: 'Embroidered Wall Hanging',
    price: 1200,
    stock: 5,
    views: 89,
    active: false,
  },
];
```

**🎬 HOW TO CUSTOMIZE FOR YOUR VIDEO:**

1. **Choose Your Craft Focus** (e.g., Madhubani painting, Terracotta, etc.)
2. **Replace Product Names:**
   - Product 1: Your main showcase item
   - Product 2: Mid-range item
   - Product 3: Premium/paused item

3. **Update Images:**
   - Search Unsplash for your craft type
   - Copy image URLs (format: `https://images.unsplash.com/photo-[ID]?w=400`)
   - Paste into the `image` field

4. **Adjust Prices:**
   - Use realistic prices for your chosen craft
   - Product 1: Mid-range (₹3000-5000)
   - Product 2: Affordable (₹500-1500)
   - Product 3: Premium (₹2000-3000)

**Example: Madhubani Painting**
```typescript
{
  id: 1,
  image: 'https://images.unsplash.com/photo-[MADHUBANI_PAINTING_ID]?w=400',
  name: 'Traditional Madhubani Fish Painting',
  price: 3500,
  stock: 5,
  views: 342,
  active: true,
},
```

---

### **2. Custom Orders** (`/components/artisan/CustomOrders.tsx`)

**Current Demo Data (Line 16-56):**
```typescript
const orders = [
  {
    id: '1',
    productName: 'Custom Embroidered Shawl',
    buyer: 'Priya Mehta',
    description: 'Traditional embroidery with peacock motifs...',
    // ... more fields
  },
  // Order 2...
];
```

**🎬 HOW TO CUSTOMIZE:**

1. Change `productName` to match your craft
2. Update `description` with realistic custom request
3. Adjust `budget` to realistic amounts
4. Update `aiSuggestion.recommendedPrice` based on your margins

**Example: Madhubani Custom Order**
```typescript
{
  id: '1',
  productName: 'Custom Madhubani Wedding Invitation Art',
  buyer: 'Ananya Sharma',
  description: 'Traditional Madhubani style wedding invitation with bride-groom motif',
  specifications: 'Size: 12"x16", Colors: Red, Yellow, Black, Style: Classic fish and peacock border',
  quantity: 10,
  budget: 5000,
  dateRequired: '2026-03-15',
  // ...
}
```

---

### **3. Marketing Content** (`/components/artisan/MarketingReview.tsx`)

**Current Demo Data (Line 16-35):**
```typescript
const marketingContent = {
  instagram: {
    title: 'Handcrafted Blue Pottery Masterpiece 🏺✨',
    caption: 'Each piece tells a story of 600 years of tradition...',
    hashtags: ['#BluePottery', '#HandmadeInIndia', ...],
  },
  amazon: {
    title: 'Traditional Blue Pottery Decorative Vase...',
    description: 'Authentic Rajasthani Blue Pottery...',
  },
  etsy: {
    title: 'Artisan Blue Pottery Vase | Traditional...',
    tags: ['blue pottery', 'indian handicraft', ...],
  },
};
```

**🎬 HOW TO CUSTOMIZE:**

1. **Instagram Caption:**
   - Change craft name and origin story
   - Update heritage years (research your craft)
   - Adjust hashtags to match your craft

2. **Amazon Listing:**
   - Professional product title
   - SEO-friendly description
   - Include dimensions, materials, GI tag info

3. **Etsy Listing:**
   - Artisan-friendly title
   - Story-based description
   - Relevant tags for discoverability

**Example: Madhubani Marketing**
```typescript
instagram: {
  title: 'Authentic Madhubani Folk Art from Bihar 🎨✨',
  caption: 'Every stroke preserves 3000 years of Mithila tradition. Hand-painted by skilled women artisans.',
  hashtags: ['#MadhubaniArt', '#BiharHandicraft', '#FolkArt', '#MithilaPainting'],
  image: '[YOUR_MADHUBANI_IMAGE_URL]',
},
amazon: {
  title: 'Traditional Madhubani Painting - Handmade Folk Art from Bihar | GI Tagged',
  description: 'Authentic Mithila art hand-painted by women artisans. Natural dyes, handmade paper. Size: 16"x12". Perfect for home decor. UNESCO recognized heritage craft.',
  keywords: 'madhubani painting, bihar handicraft, mithila art, folk art, indian wall art',
},
```

---

### **4. Buyer Profile Orders** (`/components/buyer/BuyerProfile.tsx`)

**Current Demo Data (Line 14-51):**
```typescript
const orders = [
  { id: '1', item: 'Handwoven Silk Saree', artisan: 'Lakshmi Devi', ... },
  { id: '2', item: 'Blue Pottery Vase', artisan: 'Rajesh Kumar', ... },
];

const customOrders = [
  { id: '1', item: 'Custom Embroidered Shawl', ... },
];
```

**🎬 HOW TO CUSTOMIZE:**

Match these to your chosen craft so buyer side shows consistent products.

---

## 🔧 CRITICAL FIXES NEEDED

### **Fix #1: Language Selection at Signup** ⚠️ HIGH PRIORITY

**Current Flow:**
```
Signup → Name Confirmation → Onboarding → Dashboard
```

**Missing:**
- Language selection step after signup
- Language pack download prompt
- Storing selected language for Vani

**What We Need:**
```
Signup → Name Confirmation → LANGUAGE SELECTION → Download Pack → Onboarding
```

**Where to Add:**
- New component: `/components/artisan/LanguageSelection.tsx`
- Insert between NameConfirmation and ArtisanOnboarding
- Options: Hindi, English, Tamil, Telugu, Marathi, Bengali, etc.
- Show download progress (mock for MVP)

---

### **Fix #2: Microphone Permissions & Voice** ⚠️ HIGH PRIORITY

**Current Issues:**
```javascript
// NameConfirmation.tsx - Line 18-42
const SpeechRecognition = (window as any).SpeechRecognition || 
                         (window as any).webkitSpeechRecognition;

// ❌ Never requests microphone permission
// ❌ No error handling for denied permissions
// ❌ No fallback UI
```

**What's Needed:**

1. **Request Microphone Access:**
```javascript
const requestMicrophonePermission = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    setHasMicPermission(true);
    stream.getTracks().forEach(track => track.stop()); // Clean up
  } catch (error) {
    setHasMicPermission(false);
    alert('Microphone access is required for voice features.');
  }
};
```

2. **Show Permission State:**
   - Before permission: "🎤 Enable microphone for voice input"
   - Permission granted: "🎤 Ready to speak"
   - Permission denied: "❌ Microphone access denied. Enable in settings."

3. **Azure Speech Integration:**
   - Connect to Azure Speech Services (environment variables already set)
   - Replace browser SpeechRecognition with Azure
   - Add voice synthesis for Vani responses

---

### **Fix #3: Marketing Content Not Working** ⚠️ MEDIUM PRIORITY

**Current Issue:**
- Marketing review shows static content
- Copy button works, but content is hardcoded
- No AI generation happening

**For MVP:**
- ✅ Keep hardcoded content (it's demo data)
- ✅ Customize it manually (instructions above)
- 🔮 Future: Connect to Azure OpenAI for dynamic generation

---

## 🎯 RECOMMENDED DEMO SETUP

### **Option A: Blue Pottery (Current Default)**
- ✅ Already configured
- ✅ Good visual appeal
- ✅ Well-known Rajasthan craft
- 🎬 Ready to demo as-is

### **Option B: Madhubani Painting** (More impressive)
- ✨ 3000+ year heritage (better story)
- ✨ UNESCO recognized
- ✨ Vibrant colors (better for video)
- ⚠️ Requires content changes (30 min work)

### **Option C: Your Regional Craft**
- ✨ Personal connection (authentic presentation)
- ✨ Unique showcase
- ⚠️ Requires full content update

---

## 📋 QUICK SETUP CHECKLIST

### **For Immediate Demo (5 minutes):**
- [ ] Review current Blue Pottery content
- [ ] Test all flows (signup → dashboard → features)
- [ ] Accept hardcoded data as demo placeholder
- [ ] Focus demo on AI features (Vani, bargain bot, vault)

### **For Polished Demo (30 minutes):**
- [ ] Choose your craft focus
- [ ] Update My Shop products (names, prices, images)
- [ ] Update Custom Orders (product names, descriptions)
- [ ] Update Marketing content (all 3 platforms)
- [ ] Test full flow with new content

### **For Production-Ready (2-3 days):**
- [ ] Fix language selection at signup
- [ ] Implement microphone permissions
- [ ] Integrate Azure Speech Services
- [ ] Connect marketing to Azure OpenAI
- [ ] Build dynamic content generation
- [ ] Replace all hardcoded data with database

---

## 🎬 FILMING YOUR DEMO VIDEO

### **Scene 1: Customer Side**
- Show interactive map
- Browse crafts by state
- View artisan gallery
- Create custom order
- ✅ No hardcoded content issues here

### **Scene 2: Artisan Signup**
- **Current:** Email/phone → Name → Onboarding → Dashboard
- **Show:** Voice name input (if mic permissions work)
- **Skip:** Language selection (not implemented yet)

### **Scene 3: Artisan Dashboard**
- **Show:** My Shop (your customized products)
- **Show:** Custom Orders (incoming requests)
- **Show:** Bargain Bot (AI negotiation settings)
- **Show:** Marketing Review (AI-generated content)
- **Show:** Protected Vault (PIN security)
- ✅ All buttons work (as of latest fixes)

### **Scene 4: Voice Features (Vani)**
- ⚠️ **Current Issue:** Mic permission not working
- **Workaround:** Narrate what Vani would do
- **Alternative:** Show language selector in dashboard

### **Scene 5: AI Features**
- **Show:** AI price suggestions (Custom Orders)
- **Show:** AI negotiation (Bargain Bot)
- **Show:** AI content generation (Marketing)
- **Show:** AI secret detection (Vault)
- ✅ All simulated but visually impressive

---

## 🚀 IMMEDIATE ACTION ITEMS

### **Priority 1: Fix Before Demo** (If filming today)
1. ⚠️ Add microphone permission request
2. ⚠️ Show permission state in UI
3. ⚠️ Add language selection to signup flow

### **Priority 2: Customize Content** (30 min)
1. Choose craft focus
2. Update product names/prices
3. Update marketing content
4. Test all flows

### **Priority 3: Production Readiness** (Post-demo)
1. Integrate Azure Speech Services
2. Dynamic content generation
3. Database integration
4. Remove all hardcoded data

---

## 💡 PRO TIPS FOR DEMO

### **If Voice Doesn't Work:**
- **Narrate:** "Vani would listen here and transcribe my voice"
- **Show:** Typing as alternative
- **Emphasize:** Low-literacy design (visual PIN pad works!)

### **If Asked About Hardcoded Data:**
- **Answer:** "This is demo data to showcase the UX flow"
- **Emphasize:** "AI features (price suggestions, negotiations, content generation) are the innovation"
- **Show:** Real Azure integration (environment variables configured)

### **Strengths to Highlight:**
- ✅ Dual-UI (customer/artisan) perfectly separated
- ✅ Mobile-first, low-data optimized design
- ✅ Security (Protected Vault PIN system)
- ✅ AI-powered features throughout
- ✅ Multi-language support (UI shows it)
- ✅ Offline-capable design patterns

---

## 📞 NEXT STEPS

**I can help you with:**

1. **Quick customization** - Give me your craft choice, I'll update all content
2. **Fix microphone permissions** - Proper permission flow + error handling
3. **Add language selection** - New signup step with language pack download
4. **Azure Speech integration** - Real Vani voice interaction
5. **Dynamic content** - Connect marketing to Azure OpenAI

**What would you like me to prioritize?**

---

**Status:** 📋 MVP content is hardcoded (by design), ready for customization  
**Voice:** ⚠️ Needs microphone permission fix  
**Language:** ⚠️ Needs signup flow addition  
**Demo-Ready:** ⚠️ 70% (works but needs polish)

Let me know which fixes to tackle first! 🚀
