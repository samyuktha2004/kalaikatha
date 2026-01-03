# Kalaikatha - Technical Documentation
## 📋 Quick Reference

### Project Overview
Kalaikatha is a dual-UI platform connecting Indian heritage artisans with customers through an AI-powered ecosystem. Features include an interactive map for craft discovery, voice-first artisan dashboard, and AI-powered price negotiation.

### Tech Stack
- **Frontend:** React + TypeScript + Tailwind CSS v4.0
- **Animation:** Motion (Framer Motion)
- **Icons:** Lucide React
- **State:** Context API (Auth, Theme)
- **Future:** Supabase backend integration

---

## 🔐 Authentication System

### Navigation Structure
```
[Kalaikatha] [🌙 Theme] [🎨 Artisan] [👤 Login]
```

### Access Control
| View | Access | Login Required |
|------|--------|----------------|
| Customer Discovery | Public | ❌ No |
| Meet the Makers | Public | ✅ Yes |
| Artisan Dashboard | Protected | ✅ Yes (Artisan only) |

### Login Methods
- **Email + Password**
- **Phone (10-digit) + Password**
- Toggle between methods in auth screen

### Voice Input (Artisan Only)
- 🎤 Name field voice-to-text
- 🎤 Phone field voice-to-text
- Browser API (Chrome/Edge)
- Indian English (en-IN)
- Numbers auto-extracted from speech

### User Flows

#### General Login
```
Click "Login" → Choose Buyer/Artisan → Enter credentials → Auto-redirect
```

#### Artisan Portal
```
Click "Artisan" → Login (artisan pre-selected) → Dashboard
```

### Theming
| Type | Colors | Message |
|------|--------|---------|
| Buyer | Indigo → Purple | "Discover Heritage Crafts" |
| Artisan | Amber → Orange | "Share Your Artistry" |

---

## 🗺️ Customer Features

### Interactive Map
- State-wise craft discovery
- Search by craft/state/story
- Click states to explore
- Dark mode support
- Mobile-responsive

### Craft Discovery
- Instagram-style galleries
- Detailed craft information
- Artisan profiles
- WhatsApp integration
- Custom order requests

### Requirements
- **Browsing:** No login
- **Contact Artisans:** Login required
- **Place Orders:** Login required

---

## 🎨 Artisan Features

### Dashboard (Protected)
- Voice assistant "Vani"
- Profile management
- Order management
- Inventory tracking
- Analytics (planned)

### Custom Orders
- View incoming requests
- Set minimum prices
- AI-powered negotiation
- Accept/counter offers
- Time-limited responses

### AI Negotiation
- Azure AI-powered
- Respects minimum prices
- Auto-bargaining within range
- Optimal pricing for both parties
- Human override available

---

## 👥 User Profiles

### Buyer Profile
- Order history
- Active negotiations
- Favorite artisans
- Custom order creation

### Artisan Profile
- Craft portfolio
- Specializations
- Base pricing
- Customer reviews

---

## 🎨 Design System

### Color Palette

**Buyer Theme:**
```css
Primary: #4F46E5 → #9333EA (Indigo to Purple)
Background: Stone/Amber tones
Accent: Pink #EC4899
```

**Artisan Theme:**
```css
Primary: #F59E0B → #EA580C (Amber to Orange)
Background: Warm earth tones
Accent: Red #DC2626
```

### Dark Mode
- Full component support
- Smooth transitions
- Preserved brand colors
- Optimized contrast

### Responsive Breakpoints
```
Mobile:  < 640px  (sm)
Tablet:  640-1024px (md)
Desktop: > 1024px (lg)
```

---

## 📱 Mobile Optimization

### Responsive Features
- Fixed top bar (never hides)
- No horizontal scroll
- Touch targets: 44px minimum
- Compact UI elements
- Mobile-first design

### Key Fixes
- ✅ Search bar positioning (below nav)
- ✅ Viewport constraints
- ✅ Responsive font sizing
- ✅ Overflow handling

---

## 🔗 Integrations (Planned)

### WhatsApp Business
- Direct messaging
- Order notifications
- Customer support

### Payment (Razorpay)
- UPI transfers
- Card payments
- Secure processing

### Azure AI
- Photo enhancement
- Price negotiation
- Voice recognition
- Multi-language support

---

## 🚀 Code Structure

### Component Architecture
```
App.tsx
├── ThemeProvider
└── AuthProvider
    ├── TopBar (navigation)
    ├── AuthScreen (modal)
    └── Views
        ├── CustomerFlow
        │   ├── InteractiveMap
        │   ├── StateDrawer
        │   ├── CraftDetails
        │   └── BuyerProfile
        └── ArtisanFlow
            ├── ArtisanDashboard
            ├── CustomOrders
            ├── MyShop
            └── AIStudio
```

### Key Files
| File | Purpose |
|------|---------|
| `/App.tsx` | Root component, navigation |
| `/components/AuthScreen.tsx` | Authentication UI |
| `/contexts/AuthContext.tsx` | Auth state management |
| `/contexts/ThemeContext.tsx` | Dark/light mode |
| `/data/mockData.ts` | Sample data |

---

## ⚡ Optimization Highlights

### Code Improvements (v1.4)
- ✅ Extracted theme constants
- ✅ Reduced duplicate styles
- ✅ Consolidated repeated logic
- ✅ Removed unused imports
- ✅ Simplified conditional rendering

### Documentation Cleanup
- ✅ Removed 4 redundant files
- ✅ Consolidated into single doc
- ✅ Improved scanability
- ✅ Added quick reference tables

---

## 🔒 Security Notes

### Client-Side
- Input validation
- XSS protection
- Pattern matching (phone/email)

### Future Backend
- JWT authentication
- bcrypt password hashing
- Rate limiting
- HTTPS only

---

## ♿ Accessibility

### Current Features
- Voice input for low-literacy users
- Large touch targets (48px)
- High contrast support
- Screen reader labels
- Keyboard navigation

### Planned
- Multi-language voice
- Regional language support
- Reduced motion mode
- Full ARIA compliance

---

## 🎯 Recent Changes

### v1.4 - Code & Doc Optimization
- Refactored AuthScreen with theme constants
- Reduced App.tsx complexity
- Consolidated 5 docs into 1
- Improved code maintainability

### v1.3 - Navigation Redesign
- Removed confusing toggle
- Added Artisan Portal button
- Protected artisan dashboard
- Simplified auth flow

### v1.2 - Voice & Phone Auth
- Voice input for artisans
- Phone number login
- Dynamic theming

### v1.1 - Mobile Fixes
- Fixed overflow issues
- Search bar positioning
- Responsive improvements

---

## 🔮 Roadmap

### Short-Term
- [ ] Supabase integration
- [ ] OTP verification
- [ ] Payment processing
- [ ] Real-time updates

### Long-Term
- [ ] Multi-language support
- [ ] Video portfolios
- [ ] AR craft preview
- [ ] Artisan collaboration tools
- [ ] Marketing automation

---

## 📊 Performance Metrics

### Bundle Size (Estimated)
- React core: ~140KB
- Tailwind: ~5KB (optimized)
- Motion: ~35KB
- Total: ~180KB gzipped

### Load Time Goals
- First Paint: < 1s
- Interactive: < 2s
- Full Load: < 3s

---

## 🐛 Known Issues

### Browser Compatibility
- Voice input: Chrome/Edge only (Safari limited, Firefox unsupported)
- Fallback: Manual text input always available

### Future Fixes
- [ ] Safari voice input support
- [ ] Offline mode
- [ ] PWA capabilities

---

## 📝 Development Guidelines

### Code Style
- TypeScript strict mode
- Functional components only
- Hooks for state management
- Tailwind for styling (no inline styles)

### Component Rules
- Single responsibility
- Props interface definitions
- Default exports for pages
- Named exports for utilities

### Commit Conventions
```
feat: New feature
fix: Bug fix
refactor: Code improvement
docs: Documentation update
style: Formatting changes
```

---

## 🤝 Contributing

### Before Starting
1. Read this documentation
2. Check `/guidelines/Guidelines.md`
3. Review component structure
4. Test on mobile devices

### Pull Request Checklist
- [ ] Code follows style guide
- [ ] Mobile responsive
- [ ] Dark mode tested
- [ ] Documentation updated
- [ ] No console errors

---

**For detailed setup instructions, see `/README.md`**
**For design guidelines, see `/guidelines/Guidelines.md`**
