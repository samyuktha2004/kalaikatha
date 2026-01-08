# ✅ Ramesh Demo: 100% Ready

---

## 🎬 What's Been Customized

### **1. My Shop Products** ✅
**Location:** `/components/artisan/MyShop.tsx`

```typescript
Product 1: Hand-Chiselled Bronze Nataraja (12")
- Price: ₹18,500
- Stock: 2
- Views: 342

Product 2: Traditional Temple Bell (Lost-Wax Cast)
- Price: ₹6,500
- Stock: 5
- Views: 218

Product 3: Antique Bell Metal Oil Lamp Set
- Price: ₹4,200
- Stock: 3
- Views: 156
```

### **2. Marketing Content** ✅
**Location:** `/components/artisan/MarketingReview.tsx`

**Instagram:**
```
Title: The Sacred Dance: Hand-Chiselled Bronze Nataraja ✨🕉️

Description: Unlike hollow machine-molds, this piece is a 
Solid Lost-Wax Cast, carrying a unique weight of 4.2kg, with 
over nine generations of craftsmanship history.

This is a 12-inch Nataraja, made using the traditional lost-wax 
method passed down to me from my grandfather and his ancestors to him. It took 10 days of 
intensive hand-chisel work.

Hashtags: #BronzeArt #Nataraja #ThanjavurBronze #LostWaxCasting
```

**Amazon:**
```
Title: Hand-Chiselled Bronze Nataraja Statue (12") - Solid 
Lost-Wax Cast | Thanjavur Heritage

Description: Authentic Thanjavur bronze sculpture crafted by 
9th generation master artisan. SOLID LOST-WAX CAST weighing 
4.2kg. Traditional hand-chisel work over 10 days. Premium 
golden patina finish. GI Tagged heritage craft from Tamil Nadu.
```

**Etsy:**
```
Title: Sacred Bronze Nataraja | 9th Generation Lost-Wax Cast | 
Thanjavur Temple Art

Description: This is not a mass-produced replica. Every curve, 
every detail is hand-chiselled using the traditional lost-wax 
method passed down through my family for 9 generations in 
Thanjavur, Tamil Nadu.

The Sacred Dance captured in 4.2kg of solid bronze. 10 days of 
intensive craftsmanship. The golden patina is achieved through 
a family secret technique.
```

### **3. Custom Orders - Dubai Hotel Scenario** ✅
**Location:** `/components/artisan/CustomOrders.tsx`

**Order #1: Dubai Luxury Hotel**
```
Product: 15 Dancing Nataraja Sculptures for Luxury Hotel
Buyer: Al Habtoor Palace Hotel - Dubai
Quantity: 15
Budget: ₹166,500 (40% discount - ₹11,100/piece)
Required: July 2026

AI Recommendation: ₹222,000 (20% discount - ₹14,800/piece)

AI Counter-Offer Message:
"Ramesh can offer a 20% discount for 15 units, and complete 
the order in 3 months. The price reflects 120 hours of manual 
labor per piece and a 9th-generation metal alloy secret. This 
is a one-of-a-kind sculpture, not a mass-produced replica. 
Does this work for your timeline?"

Analysis:
• Material cost: ₹4,200/piece × 15 = ₹63,000
• Labor: 10 days/piece × 15 = 150 days @ ₹800/day = ₹120,000
• 9th generation expertise premium: 15%
• Bulk discount (15 pieces): Justify 20% max
```

**Order #2: Temple Bell Set**
```
Product: Custom Temple Bell Set (3 sizes)
Buyer: Meenakshi Temple Trust
Budget: ₹45,000
Your Offer: ₹48,000
Status: Negotiating
```

### **4. Protected Vault - Bronze Secrets** ✅
**Location:** `/components/artisan/ProtectedVault.tsx`

```
Item 1: Golden Patina Secret Technique (Video)
- 9th generation alloy ratio
- Patina temperature (exact °C)
- Acid mixture formula

Item 2: Lost-Wax Mold Blueprint (Image)
- Wax layering technique
- Grandfather's chisel angles
- Cooling time secrets

Item 3: Bell Metal Alloy Composition (Document)
- Copper-tin ratio (family secret)
- Smelting temperature chart
- Sound tuning measurements
```

### **5. Bargain Bot Activity** ✅
**Location:** `/components/artisan/BargainBot.tsx`

```
Floor Price: ₹14,800
Negotiation Style: Firm (minimal compromise)
Urgency: 3/10 (patient)

Recent Activity:
• 5 min ago: Dubai hotel offered ₹11,100/piece (40% off). 
  AI counter-offered ₹14,800/piece (20% off) with value 
  justification.

• 2 hours ago: Temple Trust accepted ₹48,000 for bell set. 
  Order confirmed.

• 1 day ago: Rejected ₹10,000 offer for Nataraja. Below 
  minimum (₹14,800). Not negotiable.

• 3 days ago: Started negotiation for 12" Bronze Nataraja. 
  Initial offer: ₹12,500
```

---

## 🆕 Critical Fixes Implemented

### **1. Language Selection at Signup** ✅
**Location:** `/components/artisan/LanguageSelection.tsx`

**What's New:**
- ✅ 10 Indian languages (Hindi, English, Tamil, Telugu, Marathi, Bengali, Gujarati, Kannada, Malayalam, Punjabi)
- ✅ Visual language cards with flags and native names
- ✅ Simulated pack download (progress bar 0-100%)
- ✅ Pack size info (38-45 MB per language)
- ✅ Stores selection in localStorage for Vani
- ✅ Fully mobile-responsive

**Flow:**
```
Signup → Name Confirmation → LANGUAGE SELECTION → 
Download Pack → Onboarding → Dashboard
```

### **2. Microphone Permission System** ✅
**Location:** `/components/artisan/NameConfirmation.tsx`

**What's New:**
- ✅ Permission check on component mount
- ✅ Request permission BEFORE starting voice recognition
- ✅ Visual feedback (mic icon changes color)
- ✅ Error handling for denied permissions
- ✅ User-friendly alert messages with instructions
- ✅ Console logging for debugging
- ✅ Shows permission status (granted/denied/prompt needed)

**Flow:**
```
Click Mic → Browser Prompts "Allow?" → User Allows → 
Voice Recognition Starts → Tamil to Text
```

### **3. Protected Vault PIN Security** ✅
**Location:** `/components/artisan/ProtectedVault.tsx`

**What's New:**
- ✅ 4-6 digit PIN protection
- ✅ Visual PIN pad (illiterate-friendly, large buttons)
- ✅ First-time setup (PIN creation + confirmation)
- ✅ Returning user (PIN entry to unlock)
- ✅ Failed attempt tracking (3 attempts → 5 min lockout)
- ✅ PIN reset option
- ✅ Lock button (re-lock after viewing)

---

## 📋 Demo Flow Checklist

### **Scene 1: Signup & Language Selection**
- [ ] Open app in incognito (fresh state)
- [ ] Click "Artisan Login" → Sign Up
- [ ] Enter email/password
- [ ] Name Confirmation → Enter "Ramesh"
- [ ] **Language Selection appears** ⭐
- [ ] Select "தமிழ்" (Tamil)
- [ ] Watch download progress (0-100%)
- [ ] "Download Complete!" → Proceeds to onboarding

### **Scene 2: Voice Input (Microphone Permission)**
- [ ] On name screen, click 🎤 mic icon
- [ ] **Browser prompts: "Allow microphone?"** ⭐
- [ ] Click "Allow"
- [ ] Mic icon turns green
- [ ] Speak in Tamil (or simulate)
- [ ] Text transcribes
- [ ] Click "Confirm Name"

### **Scene 3: AI Studio (Photo Enhancement)**
- [ ] Navigate to Dashboard → "AI Studio"
- [ ] Upload bronze Nataraja photo
- [ ] Watch AI processing animation
- [ ] See enhanced photo (studio quality)
- [ ] Stats overlay (quality improvement %)

### **Scene 4: Protected Vault (PIN Security)**
- [ ] Navigate to "Protected Vault"
- [ ] **First time:** Click "Set Up PIN"
- [ ] Visual PIN pad appears
- [ ] Enter 6 digits (tap numbers)
- [ ] Dots fill up (••••••)
- [ ] "PIN Created!" message
- [ ] Vault unlocks
- [ ] See 3 protected items (bronze secrets)

### **Scene 5: Marketing Review (AI Content)**
- [ ] Navigate to "Marketing Review"
- [ ] View Instagram tab (Nataraja content)
- [ ] Switch to Amazon tab (professional listing)
- [ ] Switch to Etsy tab (story-driven)
- [ ] Click "Copy to Clipboard" for each
- [ ] Show "Copied!" confirmation

### **Scene 6: Custom Orders (Dubai Hotel)**
- [ ] Navigate to "Custom Orders"
- [ ] See Dubai hotel order (15 Natarajas)
- [ ] Buyer offers ₹166,500 (40% off)
- [ ] AI suggests ₹222,000 (20% off)
- [ ] Read AI reasoning (material + labor + expertise)
- [ ] See counter-offer message
- [ ] Click "Accept ₹222,000" button

### **Scene 7: Bargain Bot (Autonomous Negotiation)**
- [ ] Navigate to "Bargain-Bot Control"
- [ ] See configuration:
  - Floor Price: ₹14,800
  - Style: Firm
  - Urgency: 3/10
- [ ] Scroll activity feed:
  - Dubai hotel negotiation (active)
  - Temple bell accepted (completed)
  - Low offer rejected
- [ ] Show 24/7 autonomous operation

---

## 🎯 Key Demo Moments to Capture

### **Emotional Beats:**
1. **Frustration → Relief**
   - Before: Complicated English dashboards
   - After: Simple Tamil interface

2. **Fear → Security**
   - Before: Worried about exposing trade secrets
   - After: Protected vault with PIN

3. **Exploitation → Empowerment**
   - Before: Accepting lowball offers
   - After: AI negotiating fair prices

4. **Manual → Automated**
   - Before: 2 hours/day on failed listings
   - After: 15 min/day, AI handles rest

### **Technical Highlights:**
1. **Language Selection** (10 languages + download)
2. **Microphone Permission** (browser prompt → voice input)
3. **AI Photo Enhancement** (before/after split screen)
4. **Protected Vault PIN** (visual number pad, no typing)
5. **AI Negotiation** (Dubai hotel scenario with analysis)
6. **Multi-Platform Marketing** (Instagram/Amazon/Etsy content)

### **Impact Statistics:**
```
Ramesh's Results (6 Months):
• 0 → 47 international orders
• ₹3,000 → ₹42,000/month income (14x increase)
• 2 hours/day → 15 min/day (88% time saved)
• 0 → 3 trade secrets protected forever
• 100% in Tamil (never typed English)
```

---

## 📸 Screen Recording Sequences

### **Sequence 1: Signup Flow (2 min)**
```
1. Open app home
2. Click "Artisan Login"
3. Sign up form
4. Name confirmation (type "Ramesh")
5. **Language selection screen** ⭐
6. Scroll through 10 languages
7. Click "தமிழ்" (Tamil)
8. Watch download animation (0-100%)
9. "Download Complete!" message
10. Onboarding tutorial (6 slides in Tamil)
11. Dashboard appears
```

### **Sequence 2: Voice Features (1 min)**
```
1. Dashboard → Any field with mic icon
2. Click mic
3. **Browser permission prompt** ⭐
4. Click "Allow"
5. Mic icon glows green
6. Speak (simulate Tamil)
7. Text appears
8. Confirm
```

### **Sequence 3: AI Studio (1 min)**
```
1. Dashboard → "AI Studio" button
2. Upload photo interface
3. Select bronze Nataraja image
4. AI processing animation (2 sec)
5. Before/after slider reveal
6. Stats overlay (92% improvement)
7. Save button
```

### **Sequence 4: Protected Vault (1.5 min)**
```
1. Dashboard → "Protected Vault" button
2. "Vault is Locked" screen
3. Click "Set Up PIN"
4. Visual PIN pad appears
5. Tap numbers: 1-2-3-4-5-6
6. Dots fill: ••••••
7. "PIN Created!" success
8. Vault unlocks
9. Scroll 3 protected items:
   - Golden Patina Video (blurred)
   - Lost-Wax Blueprint (blurred)
   - Bell Metal Alloy Doc (blurred)
10. Click one item → Detail view
11. Click "Lock" button → Locks again
```

### **Sequence 5: Marketing Review (2 min)**
```
1. Dashboard → "Marketing Review"
2. Instagram tab selected (default)
3. Show content:
   - Title: "The Sacred Dance..."
   - Caption with story
   - Hashtags (#BronzeArt, etc.)
4. Click "Copy to Clipboard"
5. Alert: "Copied!"
6. Switch to Amazon tab
7. Show professional listing
8. Click "Copy"
9. Switch to Etsy tab
10. Show story-driven description
11. Click "Copy"
12. Show "Execute Posting" button (simulate)
```

### **Sequence 6: Custom Orders (2 min)**
```
1. Dashboard → "Custom Orders"
2. See 2 orders in list
3. Click Dubai hotel order (first)
4. Order details expand:
   - 15 Natarajas
   - ₹166,500 budget (40% off)
   - Required: July 2026
5. Azure AI Analysis panel:
   - Cost breakdown visible
   - ₹222,000 recommendation (20% off)
   - Counter-offer message generated
6. Scroll to read full reasoning
7. Click "Accept ₹222,000" button
8. Success message (simulated)
```

### **Sequence 7: Bargain Bot (1.5 min)**
```
1. Dashboard → "Bargain-Bot Control"
2. Configuration panel:
   - Floor Price: ₹14,800
   - Style: Firm (selected)
   - Urgency: 3/10 slider
3. Scroll activity feed:
   - Item 1: Dubai negotiation (active, purple)
   - Item 2: Temple bell (completed, blue)
   - Item 3: Rejected offer (rejected, red)
   - Item 4: Started negotiation (success, green)
4. Stats at bottom:
   - 8 Active
   - 24 Completed
   - ₹12,450 Earned Today
5. Click "Save Configuration" button
```

---

## 🎨 Visual Assets Needed

### **Photos/Images:**
1. **Bronze Nataraja** (12 inch, hand-chiselled)
   - Before: Dim, cluttered background, shaky
   - After: Studio lighting, clean, sharp details
   
2. **Workshop Scene** (Thanjavur bronze casting)
   - Traditional tools, molds, furnace
   - Ramesh working on bronze

3. **Phone with Scratched Lens** (budget smartphone)
   - Close-up showing scratches
   - Contrast with enhanced output

4. **Finished Products** (3 items)
   - Nataraja statue
   - Temple bell
   - Oil lamp set

### **Graphics/Overlays:**
1. **Language Download Animation**
   - Progress bar filling (0-100%)
   - Pack size (38 MB)
   - Language flag and name

2. **AI Processing Animation**
   - Waveform for voice input
   - Loading spinner for photo enhancement
   - Success checkmark

3. **Price Calculation Breakdown**
   - Material: ₹63,000
   - Labor: ₹120,000
   - Expertise: 15%
   - Total: ₹222,000

4. **Before/After Split Screen**
   - Photo quality comparison
   - Income comparison (₹3K → ₹42K)

5. **Statistics Overlays**
   - 14x income increase
   - 47 international orders
   - 88% time saved
   - 10 languages supported

---

## 🎤 Voiceover Scripts

### **Opening (Tamil with English subtitles):**
```
Tamil: "நான் ராமேஷ். எனது குடும்பத்தினர் 9 தலைமுறைகளாக 
வெண்கலம் வார்க்கிறார்கள். ஆனால் Amazon? Etsy? அவை 
ஆங்கிலத்தில் உள்ளன. எனது தொலைபேசி கேமரா கீறல்கள் 
நிறைந்தது. எங்கள் குடும்ப ரகசியத்தை யாரும் பார்க்க 
முடியாது என்பதை உறுதிப்படுத்த முடியவில்லை."

English Subtitle: "I'm Ramesh. My family has been casting 
bronze for 9 generations. But Amazon? Etsy? They're in 
English. My phone camera is scratched. And I can't ensure 
no one sees our family secrets."
```

### **Language Selection (Tamil with English subtitles):**
```
Tamil: "கலைக்கதா என்னிடம் தமிழைத் தேர்ந்தெடுக்கச் 
சொன்னது. ஒரு மொழிப் பொதியைப் பதிவிறக்கம் செய்தது, 
எனவே எல்லாம் ஆஃப்லைனில் வேலை செய்கிறது. வானி என்ற 
AI உதவியாளர் கூட தமிழில் பேசுகிறார்!"

English Subtitle: "KalaiKatha asked me to choose Tamil. It 
downloaded a language pack, so everything works offline. 
Even Vani, the AI assistant, speaks Tamil!"
```

### **Photo Enhancement:**
```
Tamil: "நான் என் கீறப்பட்ட கேமராவில், என் குழப்பமான 
பட்டறையில் ஒரு புகைப்படம் எடுத்தேன். கலைக்கதாவின் AI 
அதை ஒரு தொழில்முறை ஸ்டுடியோ ஷாட்டாக மாற்றியது. 
வெண்கல உளி வேலையின் சிக்கலான விவரங்கள் இப்போது 
தெளிவாகத் தெரிகின்றன."

English Subtitle: "I took a photo with my scratched camera 
in my cluttered workshop. KalaiKatha's AI turned it into a 
professional studio shot. The intricate details of the bronze 
chisel work are now clearly visible."
```

### **Protected Vault:**
```
Tamil: "நான் எப்படி தங்க பாட்டினாவை அடைகிறேன் என்பதை 
பதிவு செய்தேன். நான் AI-க்கு சொன்னேன், 'இது குடும்பத்திற்கு 
மட்டுமே.' அது Amazon க்கான அழகைப் பிரித்தெடுத்தது, 
மற்றும் தொழில்நுட்ப ரகசியங்களை PIN பாதுகாப்புடன் 
பாதுகாக்கப்பட்ட காஸாவில் பூட்டியது."

English Subtitle: "I recorded how I achieve the golden patina. 
I told the AI, 'This is for family only.' It extracted the 
beauty for Amazon, and locked the technical secrets in a 
Protected Vault with PIN security."
```

### **Dubai Negotiation:**
```
Tamil: "துபாயில் ஒரு ஆடம்பர ஹோட்டல் 15 நடராஜர்களை 40% 
தள்ளுபடியில் விரும்பியது. அது என் செலவுக்குக் கீழே! 
கலைக்கதாவின் AI என் பொருட்கள், உழைப்பு, மற்றும் 9வது 
தலைமுறை நிபுணத்துவத்தையும் கூட பகுப்பாய்வு செய்தது. 
அது 20% தள்ளுபடியை தொழில்முறை விளக்கத்துடன் 
எதிர்-வழங்கியது. நான் தமிழில் 'ஏற்றுக்கொள்' என்று 
மட்டும் சொன்னேன், அது சரியான ஆங்கிலத்தில் செய்தியை 
அனுப்பியது."

English Subtitle: "A luxury hotel in Dubai wanted 15 Natarajas 
at 40% off. That's below my cost! KalaiKatha's AI analyzed my 
materials, labor, and even my 9th-generation expertise. It 
counter-offered 20% off with a professional explanation. I just 
said 'Accept' in Tamil, and it sent the message in perfect English."
```

---

## 🎬 You're Ready to Film!

**What's Working:**
- ✅ Complete bronze casting persona (Ramesh from Thanjavur)
- ✅ 3-step signup with language selection
- ✅ Microphone permission + voice input
- ✅ AI photo enhancement (simulated)
- ✅ Protected vault with PIN security
- ✅ Dubai hotel negotiation scenario
- ✅ Multi-platform marketing content
- ✅ Bargain bot autonomous negotiation
- ✅ All in Tamil interface

**What to Film:**
1. Signup → Language selection → Tamil download
2. Voice input with mic permission
3. AI Studio photo enhancement
4. Protected Vault PIN setup
5. Marketing review (3 platforms)
6. Custom orders (Dubai scenario)
7. Bargain Bot negotiation

**Estimated Filming Time:** 2-3 hours for all sequences

---

**Need Help?**
- Screen recording tips?
- Voiceover recording?
- Video editing guidance?
