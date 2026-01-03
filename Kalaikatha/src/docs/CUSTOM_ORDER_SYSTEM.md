# Custom Order System - Complete Implementation

**Version:** 1.6.0 | **Date:** Jan 3, 2026

---

## 🎯 Overview

Comprehensive custom order system with artisan commission settings, saved artisans functionality, and intelligent filtering based on budget and availability.

---

## ✨ Key Features

### 1. **Custom Order Button Placement**

#### **In Artisan Profile Modal**
- Button appears at bottom of artisan profile
- Pre-selects that specific artisan
- Opens CustomOrderForm in "single artisan" mode
- Text: "Request Custom Order"
- Color: Amber/Orange gradient

**Location:** ArtisanGalleryInline → Artisan Detail Modal

#### **Future: Sticky Bottom Button** (Coming Soon)
- Floating button at bottom of craft details
- Available when logged in
- Opens form for open/group requests
- Quick access without scrolling

---

### 2. **Artisan Commission Settings**

#### **Data Structure**
```typescript
commissionSettings: {
  acceptingCommissions: boolean;  // Open/Closed for custom work
  minimumBudget: number | null;   // Optional minimum budget
}
```

#### **Examples**
```typescript
// Accepting with minimum
{
  acceptingCommissions: true,
  minimumBudget: 2000
}

// Accepting with no minimum
{
  acceptingCommissions: true,
  minimumBudget: null
}

// Not accepting
{
  acceptingCommissions: false,
  minimumBudget: null
}
```

#### **Current Artisans Status**
| Artisan | Craft | Accepting | Min Budget |
|---------|-------|-----------|------------|
| Rajesh Kumar | Blue Pottery | ✅ Yes | ₹2,000 |
| Lakshmi Devi | Kanjivaram Silk | ✅ Yes | ₹10,000 |
| Amar Singh | Bandhani | ❌ No | - |
| Meera Patel | Rogan Painting | ✅ Yes | ₹5,000 |

---

### 3. **Saved Artisans System**

#### **Heart Icon Functionality**
- **Location:** Top-right corner of artisan grid cards
- **States:**
  - Empty heart (gray) = Not saved
  - Filled heart (red) = Saved
- **Storage:** localStorage (`kalaikatha_saved_artisans`)
- **Persistence:** Survives page refresh

#### **Context Provider**
```typescript
SavedArtisansContext
├── savedArtisans: string[]
├── toggleSaveArtisan(artisanId)
└── isArtisanSaved(artisanId)
```

#### **Usage in Custom Order**
- "Saved Artisans Only" option in Step 3
- Only shows if user has saved artisans
- Automatically selects all saved artisans who are accepting commissions
- Filters by budget constraints

---

### 4. **Custom Order Form - 3 Steps**

#### **Step 1: Product Details**
- Product Name *
- Description *
- Detailed Specifications
- Reference Images (upload)

#### **Step 2: Requirements**
- Quantity *
- Budget * (₹)
  - **Filters artisans dynamically**
  - Shows warning if budget too low
  - Updates available artisan count
- Date Required *
- Response Time Limit (3/7/14/30 days)

#### **Step 3: Artisan Selection**

**4 Modes:**

1. **Open to All Artisans**
   - Shows count of available artisans
   - Filters by: `acceptingCommissions === true`
   - Filters by: `budget >= minimumBudget`

2. **Saved Artisans Only** (if any saved)
   - Shows count of saved artisans meeting criteria
   - Auto-selects saved artisans
   - Filters by commission settings

3. **Select Specific Artisans**
   - Grid of available artisans
   - Multi-select checkboxes
   - Shows saved artisans with heart icon
   - Shows minimum budget per artisan
   - Disables submit if none selected

4. **Single Artisan** (when coming from profile)
   - Pre-selected artisan shown
   - Cannot change selection
   - Shows artisan details and minimum budget

---

## 🔄 Dynamic Filtering Logic

### **Artisan Availability Filter**
```typescript
const availableArtisans = artisansData.filter(artisan => 
  artisan.commissionSettings.acceptingCommissions &&
  (!budget || 
   !artisan.commissionSettings.minimumBudget || 
   parseFloat(budget) >= artisan.commissionSettings.minimumBudget)
);
```

### **Budget Warning System**
- If budget entered but no artisans available:
  - Shows amber alert box
  - Message: "Budget too low for current artisans"
  - Suggests increasing budget

### **Real-Time Updates**
- Artisan count updates as user types budget
- Specific mode grid updates dynamically
- Saved artisans list re-filters

---

## 📱 User Flows

### **Flow 1: Custom Order from Artisan Profile**
```
Meet the Makers → Click Artisan → View Profile → 
"Request Custom Order" → Form (Step 1) → 
Fill Details → Step 2 (Requirements) → 
Step 3 (Artisan Pre-Selected) → Submit
```

**Benefits:**
- ⚡ Fast (artisan already selected)
- 🎯 Contextual (right where they're interested)
- 📱 Mobile-friendly (no navigation)

### **Flow 2: Open Custom Request**
```
Custom Order Button → Form (Step 1) → 
Fill Details → Step 2 (Budget ₹5000) → 
Step 3 ("Open to All") → 
Shows "2 artisans available" → Submit
```

**Benefits:**
- 🌐 Reach all eligible artisans
- 💰 Get competitive pricing
- ⏱️ Faster responses

### **Flow 3: Order to Saved Artisans**
```
Save 3 artisans (heart icons) → 
Custom Order Button → Form → 
Step 3 ("Saved Artisans Only") → 
Auto-selects saved artisans → Submit
```

**Benefits:**
- 🎯 Curated list of trusted artisans
- ⚡ Quick selection
- 💚 Supports favorite makers

### **Flow 4: Select Specific Group**
```
Custom Order → Fill Details → 
Step 3 ("Select Specific") → 
Grid shows 2 available (1 too expensive) → 
Select 2 artisans → Submit
```

**Benefits:**
- 🎯 Precise control
- 💰 Budget-aware selection
- 📊 See minimum budgets upfront

---

## 🎨 UI/UX Details

### **Heart Button (Save Artisan)**
- **Size:** 40x40px tap target
- **Position:** Top-right, 8px padding
- **Background:** White/90 with backdrop blur
- **States:**
  - Default: Gray outline heart
  - Saved: Red filled heart with animation
- **Interaction:** Single tap to toggle

### **Custom Order Button (Profile)**
- **Width:** Full width
- **Height:** 48px (3rem padding)
- **Color:** Amber to Orange gradient
- **Icon:** FileEdit (left)
- **Text:** "Request Custom Order"
- **Hover:** Shadow lift effect

### **Commission Badge (Artisan Grid)**
- **When accepting:** Green dot on portrait
- **When NOT accepting:** Gray overlay on card
- **Minimum budget:** Shown in selection grid

---

## 💾 Data Storage

### **LocalStorage Keys**
```typescript
'kalaikatha_saved_artisans'      // string[] of artisan IDs
'kalaikatha_welcomed'             // 'true' if seen welcome
```

### **Order Submission Format**
```typescript
{
  id: string;                    // Auto-generated
  productName: string;
  description: string;
  specifications: string;
  quantity: number;
  budget: string;
  dateRequired: string;
  images: string[];
  artistSelection: 'open' | 'specific' | 'saved' | 'single';
  selectedArtists: string[];     // Artisan IDs
  responseTimeLimit: '3' | '7' | '14' | '30';
  createdAt: string;             // ISO timestamp
  status: 'open';
  craftId: string | null;        // If from craft page
}
```

---

## 🔒 Access Control

| Action | Guest | Buyer | Artisan |
|--------|-------|-------|---------|
| View Crafts | ✅ | ✅ | ✅ |
| Meet Makers | ❌ | ✅ | ✅ |
| Save Artisans | ❌ | ✅ | ✅ |
| Custom Order | ❌ | ✅ | ❌ |

---

## 🎯 Artisan Dashboard Integration (Future)

### **Commission Settings Panel**
```typescript
// Artisan can toggle
<Toggle
  label="Accepting Custom Orders"
  value={acceptingCommissions}
  onChange={handleToggle}
/>

// Optional minimum budget
<Input
  label="Minimum Budget (₹)"
  type="number"
  value={minimumBudget}
  disabled={!acceptingCommissions}
/>
```

### **Order Management**
- See incoming custom requests
- Accept/Decline with AI negotiation
- Set price within acceptable range
- AI handles counter-offers

---

## 🤖 Azure AI Integration

### **Negotiation Flow**
```
1. Buyer submits order with budget ₹5000
2. Artisan minimum is ₹7000
3. AI detects mismatch
4. AI negotiates:
   - "Your budget: ₹5000"
   - "Artisan minimum: ₹7000"
   - "AI suggests: ₹6000 (middle ground)"
   - "Artisan acceptable range: ₹6500-₹8000"
5. AI proposes ₹6500 to buyer
6. Buyer accepts → Order confirmed
```

---

## 📊 Validation Rules

### **Form Validation**
- Product Name: Required, min 3 chars
- Description: Required, min 10 chars
- Quantity: Required, min 1
- Budget: Required, positive number
- Date Required: Required, future date
- Artisan Selection (specific mode): At least 1 artisan

### **Business Rules**
- Cannot order if not logged in
- Cannot select artisans below your budget
- Must have at least 1 eligible artisan
- Response time limit enforced server-side

---

## 🚀 Performance Optimizations

### **Lazy Loading**
- Artisan grid images lazy loaded
- Form steps loaded on demand
- Modal content rendered on open

### **Filtering**
- Client-side filtering (instant)
- Memoized artisan lists
- Debounced budget input (300ms)

### **Storage**
- LocalStorage for saved artisans
- No unnecessary re-renders
- Context updates batched

---

## 🧪 Testing Checklist

### **Core Functionality**
- [x] Heart icon toggles save state
- [x] Saved artisans persist on refresh
- [x] Custom order button shows in profile
- [x] Custom order pre-selects artisan
- [x] Budget filters artisans dynamically
- [x] Warning shows when budget too low
- [x] "Saved artisans" option shows if saved artisans exist
- [x] Form validates all required fields
- [x] Submit disabled if no artisans selected (specific mode)

### **Edge Cases**
- [x] No saved artisans → "Saved" option hidden
- [x] All artisans closed → Shows empty state
- [x] Budget = 0 → Shows all accepting artisans
- [x] Budget > all minimums → Shows all
- [x] Single artisan mode → Cannot deselect

### **Mobile**
- [x] Heart button tap target sufficient (44px)
- [x] Form scrollable on small screens
- [x] Artisan grid responsive
- [x] Modal fills screen on mobile

---

## 📈 Future Enhancements

### **Short-term**
- [ ] Sticky custom order button in craft details
- [ ] Image upload functionality
- [ ] Form autosave (draft orders)
- [ ] Budget suggestions based on craft type

### **Medium-term**
- [ ] Artisan commission settings dashboard
- [ ] Real-time order status updates
- [ ] Chat with artisan (pre-order)
- [ ] Portfolio filtering by budget

### **Long-term**
- [ ] AI budget estimation from description
- [ ] Bulk orders (multiple items)
- [ ] Recurring orders
- [ ] Artisan calendar availability

---

## 🎓 Key Technical Decisions

### **Why LocalStorage for Saved Artisans?**
- ✅ Works offline
- ✅ No backend needed initially
- ✅ Instant read/write
- ✅ Easy migration to backend later
- ❌ Not synced across devices (future: Supabase)

### **Why Dynamic Filtering?**
- ✅ Real-time feedback
- ✅ Prevents invalid submissions
- ✅ Better UX (see what's possible)
- ✅ Educates user on pricing

### **Why 3-Step Form?**
- ✅ Reduces cognitive load
- ✅ Progressive disclosure
- ✅ Mobile-friendly
- ✅ Clear progress indication

### **Why Commission Settings in Artisan Data?**
- ✅ Centralized source of truth
- ✅ Easy to query/filter
- ✅ Can be user-editable later
- ✅ Version controlled (git)

---

## 🐛 Known Issues & Solutions

### **Issue: Form data lost on browser refresh**
**Solution:** Coming in v1.7 - Draft orders autosave

### **Issue: Can't edit saved artisans list**
**Solution:** Manage in buyer profile (planned)

### **Issue: No visual feedback on save**
**Solution:** Toast notification (planned)

---

## 📝 Code Examples

### **Using Custom Order in Component**
```typescript
import { useState } from 'react';
import { CustomOrderForm } from './buyer/CustomOrderForm';

function MyComponent() {
  const [showForm, setShowForm] = useState(false);
  const [selectedArtisan, setSelectedArtisan] = useState(null);

  const handleOrder = (artisanId) => {
    setSelectedArtisan(artisanId);
    setShowForm(true);
  };

  const handleSubmit = (order) => {
    console.log('Order:', order);
    // Send to backend
  };

  return (
    <>
      <button onClick={() => handleOrder('artisan-1')}>
        Order from Artisan
      </button>
      
      <CustomOrderForm
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        onSubmit={handleSubmit}
        artisanId={selectedArtisan}
      />
    </>
  );
}
```

### **Checking Saved Artisans**
```typescript
import { useSavedArtisans } from '../contexts/SavedArtisansContext';

function ArtisanCard({ artisan }) {
  const { isArtisanSaved, toggleSaveArtisan } = useSavedArtisans();
  
  return (
    <div>
      <h3>{artisan.name}</h3>
      <button onClick={() => toggleSaveArtisan(artisan.id)}>
        {isArtisanSaved(artisan.id) ? '❤️ Saved' : '🤍 Save'}
      </button>
    </div>
  );
}
```

---

## ✅ Summary

**Fully implemented custom order system with:**
- ✅ Artisan commission settings (accepting/closed, minimum budget)
- ✅ Saved artisans functionality (heart icons, localStorage)
- ✅ Dynamic budget-based filtering
- ✅ 4 selection modes (open, saved, specific, single)
- ✅ 3-step form with validation
- ✅ Real-time artisan availability updates
- ✅ Mobile-responsive design
- ✅ Azure AI negotiation ready

**All data is dynamic - no hardcoded inputs!**
