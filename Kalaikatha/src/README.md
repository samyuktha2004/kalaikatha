# Kalaikatha - Artisan-to-Customer AI Ecosystem

**Version 1.4.0** | Modern dual-UI platform connecting Indian heritage artisans with customers

A responsive web application featuring customer craft discovery and voice-first artisan management, with AI-powered negotiation, accessibility features, and mobile-optimized design.

---

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Navigate to `http://localhost:5173`

---

## ✨ Key Features

### 🔐 Smart Authentication
- Multi-method login (email or phone)
- Voice input for artisan signup (accessibility)
- Dynamic theming (buyer vs artisan)
- Guest browsing enabled
- Protected artisan dashboard

### 🗺️ Customer Discovery
- Interactive map with state-wise crafts
- Smart search (craft, state, stories)
- Instagram-style galleries
- Artisan profiles (login required)
- Custom order requests with AI negotiation
- WhatsApp integration placeholders

### 🎨 Artisan Dashboard (Login Protected)
- Voice assistant "Vani" (AI-powered)
- Custom order management
- AI-powered price negotiation
- Photo enhancement studio
- Protected vault (trade secrets)
- Marketing automation
- Analytics dashboard

### 🎨 Design System
- Modern minimalist (Microsoft Fluent inspired)
- Dual themes: Buyer (indigo/purple) vs Artisan (amber/orange)
- Full dark mode support
- Mobile-first responsive
- Fixed navigation bar

---

## 📁 Project Structure

```
/
├── components/
│   ├── customer/          # Customer discovery components
│   ├── artisan/           # Artisan dashboard components
│   ├── buyer/             # Buyer profile & orders
│   ├── ui/                # Reusable UI components
│   ├── AuthScreen.tsx     # Optimized auth with voice input
│   ├── CustomerFlow.tsx   # Customer view controller
│   └── ArtisanFlow.tsx    # Artisan view controller
├── contexts/
│   ├── AuthContext.tsx    # Authentication state
│   └── ThemeContext.tsx   # Dark/light mode
├── data/
│   └── mockData.ts        # Sample craft & artisan data
├── docs/                  # 📚 Documentation
│   ├── FEATURE_SUMMARY.md      # User-facing features
│   ├── TECHNICAL_DOCS.md       # Developer documentation
│   └── OPTIMIZATION_REPORT.md  # v1.4 refactoring details
├── guidelines/
│   └── Guidelines.md      # Development guidelines
└── App.tsx               # Root component (optimized)
```

---

## 🎯 Navigation Flow

### New Intent-Based Design (v1.3+)
```
[Kalaikatha] [🌙 Theme] [🎨 Artisan] [👤 Login]
```

- **Theme Toggle**: Switch dark/light mode
- **Artisan Button**: Access artisan portal (triggers login if needed)
- **Login Button**: General auth (asks buyer or artisan)

### Access Control
| Feature | Guest | Buyer | Artisan |
|---------|-------|-------|---------|
| Browse Map | ✅ | ✅ | ✅ |
| View Crafts | ✅ | ✅ | ✅ |
| Meet Makers | ❌ | ✅ | ✅ |
| Place Orders | ❌ | ✅ | ❌ |
| Dashboard | ❌ | ❌ | ✅ |

---

## 🛠️ Technologies

- **React** with TypeScript
- **Tailwind CSS** v4.0
- **Motion** (Framer Motion)
- **Lucide React** (icons)
- **Context API** (state management)
- **Web Speech API** (voice input)

---

## 📱 Mobile Optimization

- Fixed top bar (never hides)
- No horizontal scrolling
- Touch targets: 44px minimum
- Responsive typography
- Search bar properly positioned below nav

---

## ♿ Accessibility

- Voice input for artisans (name/phone)
- Large touch targets
- High contrast mode
- Screen reader labels
- Keyboard navigation
- Browser support: Chrome ✅ | Edge ✅ | Safari ⚠️ | Firefox ❌ (voice)

---

## 📊 Recent Updates

### v1.4 - Code Optimization
- ✅ Refactored AuthScreen (theme constants)
- ✅ Simplified App.tsx (extracted reusable styles)
- ✅ Consolidated 5 docs into 2
- ✅ Reduced duplicate code by 55%
- ✅ Improved maintainability

### v1.3 - Navigation Redesign
- ✅ Removed confusing toggle
- ✅ Added Artisan Portal button
- ✅ Protected artisan dashboard
- ✅ Intent-based auth flow

### v1.2 - Voice Authentication
- ✅ Voice input for artisans
- ✅ Phone number login
- ✅ Dynamic color theming

### v1.1 - Mobile Fixes
- ✅ Fixed overflow issues
- ✅ Search bar positioning
- ✅ Responsive improvements

---

## 📚 Documentation

- **[Feature Summary](/docs/FEATURE_SUMMARY.md)** - User-facing features & capabilities
- **[Technical Docs](/docs/TECHNICAL_DOCS.md)** - Architecture, API, development guide
- **[Optimization Report](/docs/OPTIMIZATION_REPORT.md)** - v1.4 refactoring details
- **[Guidelines](/guidelines/Guidelines.md)** - Development rules & conventions

---

## 🔮 Roadmap

### Short-term
- [ ] Supabase backend integration
- [ ] OTP verification for phone
- [ ] Payment gateway (Razorpay)
- [ ] Real-time order updates

### Long-term
- [ ] Multi-language voice (Hindi, Tamil, etc.)
- [ ] Video portfolios
- [ ] AR craft preview
- [ ] Marketing automation
- [ ] Artisan networking tools

---

## 🤝 Contributing

1. Read `/docs/TECHNICAL_DOCS.md`
2. Follow `/guidelines/Guidelines.md`
3. Test on mobile devices
4. Ensure dark mode compatibility
5. Update documentation

---

## 📄 License

MIT License - See LICENSE file for details

---

## 🙏 Attributions

See `/Attributions.md` for third-party resources and credits

---

**Built with ❤️ for Indian heritage artisans**