# Kalaikatha Comprehensive Knowledge Base

## Overview

Kalaikatha is an AI-powered marketplace assistant designed specifically for Indian artisans, featuring voice assistance and cultural context awareness. This knowledge base provides complete documentation for users, developers, and administrators.

## Table of Contents

1. [User Guides](#1-user-guides)
2. [Developer Guides](#2-developer-guides)
3. [API Documentation](#3-api-documentation)
4. [Architecture Overview](#4-architecture-overview)
5. [FAQs](#5-faqs)
6. [Troubleshooting](#6-troubleshooting)
7. [Best Practices](#7-best-practices)
8. [Component Documentation](#8-component-documentation)
9. [AI Tools Documentation](#9-ai-tools-documentation)

---

## 1. User Guides

### Artisan Onboarding Guide

**Welcome to Kalaikatha!** This guide helps traditional Indian artisans get started with our AI-powered platform.

#### Step 1: Account Creation
1. Visit the Kalaikatha website
2. Click "Join as Artisan"
3. Choose your preferred language (Hindi, Bengali, Tamil, Telugu, Marathi, Gujarati, English)
4. Provide basic information:
   - Full name
   - Craft specialty (e.g., pottery, weaving, jewelry)
   - Location (state/district)
   - Contact information

#### Step 2: Voice Profile Setup
1. Allow microphone access when prompted
2. Say "नमस्ते, मैं एक [your craft] हूं" (Hello, I am a [your craft])
3. The AI will recognize your craft and set up your profile
4. Add details about your craft heritage and family tradition

#### Step 3: Product Catalog Setup
1. Use voice commands to add products
2. Say "नया उत्पाद जोड़ें" (Add new product)
3. Describe your product using voice
4. AI will generate descriptions and pricing suggestions

#### Step 4: Marketplace Integration
1. Connect to platforms like Amazon India, Flipkart
2. AI generates SEO-optimized listings
3. Set up payment methods
4. Start receiving orders

### Customer Discovery Guide

#### Finding Authentic Crafts
1. Browse by region (Rajasthan, Kerala, Bengal, etc.)
2. Search by craft type (handloom, pottery, jewelry)
3. Use voice search: "मुझे राजस्थानी कढ़ाई दिखाओ" (Show me Rajasthani embroidery)
4. Read artisan stories and heritage information

#### Making Purchases
1. Add items to cart
2. Review artisan profiles and stories
3. Secure checkout with multiple payment options
4. Track orders and communicate with artisans

### Voice Assistant Usage

#### Supported Languages
- Hindi (hi-IN)
- Bengali (bn-IN)
- Tamil (ta-IN)
- Telugu (te-IN)
- Marathi (mr-IN)
- Gujarati (gu-IN)
- English (en-IN)

#### Common Voice Commands
- "नया उत्पाद जोड़ें" - Add new product
- "मेरी बिक्री देखें" - View my sales
- "कीमत सुझाव" - Price suggestions
- "छवि सुधारें" - Enhance image
- "कंटेंट बनाएं" - Generate content

#### Tips for Better Recognition
- Speak clearly and at normal pace
- Use traditional craft terminology
- Minimize background noise
- Test in quiet environment first

### AI Tools Overview

#### Content Generator
Creates marketplace descriptions with cultural context
- Supports 6 Indian languages
- SEO optimization for Indian platforms
- Cultural storytelling integration

#### Image Enhancer
Improves craft photography for better sales
- Background removal
- Brightness/contrast adjustment
- Marketplace-specific resizing

#### Pricing Assistant
Provides fair pricing based on market data
- Regional cost considerations
- Material and labor analysis
- Festival season pricing

#### Story Generator
Preserves and shares craft heritage
- Family tradition documentation
- Cultural significance explanation
- Multi-language storytelling

#### Artist Collaboration
Connects artisans for joint projects
- Skill-based matching
- Location proximity
- Project management tools

#### AI Dashboard
Tracks business performance
- Usage analytics
- Sales insights
- Growth recommendations

---

## 2. Developer Guides

### Getting Started

#### Prerequisites
- Node.js 18+
- Python 3.9+
- Firebase CLI
- Google Cloud SDK
- Git

#### Installation
```bash
git clone https://github.com/username/kalaikatha.git
cd kalaikatha
cd app && npm install
cd ../functions && pip install -r requirements.txt
```

#### Environment Setup
```bash
# Firebase configuration
cp .env.example .env
# Add your Firebase and Google Cloud credentials
```

### Development Environment Setup

#### Frontend Development
```bash
cd app
npm run dev
# App runs on http://localhost:5173
```

#### Backend Development
```bash
cd functions
firebase serve --only functions
# Functions available on http://localhost:5001
```

#### Testing
```bash
# Frontend tests
npm run test

# Backend tests
python -m pytest
```

### Contributing Guidelines

#### Code Standards
- Use React 19 best practices
- Follow ESLint configuration
- Write comprehensive tests
- Document all components

#### Git Workflow
```bash
git checkout -b feature/new-feature
# Make changes
git commit -m "Add new feature"
git push origin feature/new-feature
# Create pull request
```

#### Pull Request Process
1. Update documentation
2. Add tests for new features
3. Ensure all tests pass
4. Get code review approval

### Deployment Guide

#### Development Deployment
```bash
firebase use development
npm run build
firebase deploy --only hosting
```

#### Production Deployment
```bash
firebase use production
npm run build
firebase deploy
```

#### Environment Variables
- Set production API keys
- Configure monitoring
- Enable analytics

---

## 3. API Documentation

### Authentication

All endpoints require Firebase ID tokens.

**Header:**
```
Authorization: Bearer <firebase_id_token>
```

### Content Generation API

**POST /generate-content**

Generates AI-powered product descriptions.

**Request:**
```json
{
  "product_details": {
    "name": "Handwoven Saree",
    "category": "Textiles",
    "materials": ["cotton", "silk"],
    "technique": "handloom"
  },
  "platform": "amazon",
  "language": "hi"
}
```

**Response:**
```json
{
  "success": true,
  "content": "Authentic handwoven saree...",
  "metadata": {
    "model": "gemini-pro",
    "tokens": 150
  }
}
```

### Voice Processing API

**POST /voice-to-text**

Converts speech to text.

**Request:**
- Content-Type: multipart/form-data
- audio: Audio file
- language_code: "hi-IN"

**Response:**
```json
{
  "success": true,
  "text": "नमस्ते, मैं एक कुम्हार हूं",
  "confidence": 0.95
}
```

### Pricing API

**POST /suggest-price**

Provides pricing recommendations.

**Request:**
```json
{
  "category": "pottery",
  "materials": ["clay"],
  "complexity_score": 7,
  "region": "Rajasthan"
}
```

**Response:**
```json
{
  "success": true,
  "price_range": {
    "min": 500,
    "max": 1500,
    "recommended": 800
  }
}
```

### Collaboration API

**POST /find-partners**

Finds collaboration opportunities.

**Request:**
```json
{
  "craft_type": "pottery",
  "skills": ["painting", "glazing"],
  "location": "Jaipur"
}
```

**Response:**
```json
{
  "partners": [
    {
      "id": "artisan123",
      "name": "Rajesh Kumar",
      "compatibility_score": 0.85
    }
  ]
}
```

---

## 4. Architecture Overview

### System Architecture

```
┌─────────────────┐    ┌─────────────────┐
│   React 19      │    │   Firebase      │
│   Frontend      │◄──►│   Hosting       │
│                 │    │                 │
└─────────────────┘    └─────────────────┘
         │                       │
         ▼                       ▼
┌─────────────────┐    ┌─────────────────┐
│ Google Cloud    │    │ Cloud Functions │
│ AI Services     │◄──►│ (Python/Node)   │
│                 │    │                 │
└─────────────────┘    └─────────────────┘
         │                       │
         ▼                       ▼
┌─────────────────┐    ┌─────────────────┐
│ Firestore DB    │    │ Analytics       │
│ Real-time       │    │ & Monitoring    │
└─────────────────┘    └─────────────────┘
```

### Frontend Architecture

#### Component Structure
```
src/
├── components/
│   ├── common/          # Shared components
│   ├── forms/           # Form components
│   └── layout/          # Layout components
├── pages/               # Page components
│   ├── auth/            # Authentication
│   ├── ai-tools/        # AI features
│   └── dashboard/       # Analytics
├── services/            # API services
├── hooks/               # Custom hooks
├── utils/               # Utilities
└── styles/              # CSS styles
```

#### State Management
- React Context for authentication
- React Context for shopping cart
- Local state for component-specific data

### Backend Architecture

#### Cloud Functions Structure
```
functions/
├── content/             # Content generation
├── voice/               # Voice processing
├── commerce/            # Business logic
├── collaboration/       # Partner matching
└── common/              # Shared utilities
```

#### Database Schema

**Users Collection:**
```json
{
  "userId": "string",
  "profile": {
    "name": "string",
    "craft": "string",
    "location": "string",
    "language": "string"
  },
  "preferences": {},
  "createdAt": "timestamp"
}
```

**Products Collection:**
```json
{
  "productId": "string",
  "artisanId": "string",
  "details": {
    "name": "string",
    "category": "string",
    "price": "number",
    "description": "string"
  },
  "images": ["url"],
  "createdAt": "timestamp"
}
```

### AI Integration

#### Google Cloud Services Used
- **Gemini AI**: Content generation and understanding
- **Speech-to-Text**: Voice recognition in Indian languages
- **Text-to-Speech**: Voice synthesis
- **Vision AI**: Image enhancement
- **Translation API**: Multilingual support

#### AI Processing Flow
1. User input (voice/text)
2. Cultural context processing
3. AI model inference
4. Response generation
5. Cultural adaptation
6. Output delivery

---

## 5. FAQs

### General FAQs

**Q: What is Kalaikatha?**
A: Kalaikatha is an AI-powered platform that helps Indian artisans sell their traditional crafts online using voice commands and intelligent automation.

**Q: Which languages are supported?**
A: We support 6 Indian languages: Hindi, Bengali, Tamil, Telugu, Marathi, and Gujarati, plus English.

**Q: Is the platform free?**
A: Basic features are free. Premium AI tools have subscription tiers.

**Q: How do I get started?**
A: Visit our website, click "Join as Artisan", and follow the voice-guided onboarding process.

### Artisan FAQs

**Q: I don't know how to use computers. Can I still use Kalaikatha?**
A: Yes! Our voice-first design allows you to use the platform entirely through voice commands in your native language.

**Q: How does pricing work?**
A: Our AI analyzes market data, material costs, and regional factors to suggest fair prices for your products.

**Q: Can I sell on other platforms?**
A: Yes, our content generator creates optimized listings for Amazon India, Flipkart, and other marketplaces.

**Q: How do I connect with other artisans?**
A: Use our Artist Collaboration tool to find compatible artisans in your area for joint projects.

### Technical FAQs

**Q: What browsers are supported?**
A: Modern browsers including Chrome, Firefox, Safari, and Edge. Mobile browsers are fully supported.

**Q: Is my data secure?**
A: Yes, we use Firebase authentication and encrypt all sensitive data. We comply with Indian data protection regulations.

**Q: Can I use the platform offline?**
A: Basic features work offline, but AI tools require internet connection.

**Q: How fast is the AI response?**
A: Most AI operations complete within 2-5 seconds, depending on complexity.

### AI Tools FAQs

**Q: How accurate is the voice recognition?**
A: Over 95% accuracy for clear speech in supported languages, with continuous improvement.

**Q: Can AI understand traditional craft terms?**
A: Yes, our models are trained on extensive Indian craft terminology and cultural context.

**Q: What if I don't like the AI suggestions?**
A: You can edit all AI-generated content before publishing.

**Q: How does image enhancement work?**
A: AI analyzes your photos and applies professional enhancements while preserving cultural authenticity.

---

## 6. Troubleshooting

### Common Issues

#### Voice Assistant Not Working
**Symptoms:** Voice commands not recognized
**Solutions:**
1. Check microphone permissions
2. Ensure quiet environment
3. Try different browsers
4. Clear browser cache

#### Slow Loading Times
**Symptoms:** Pages load slowly
**Solutions:**
1. Check internet connection
2. Clear browser cache
3. Try incognito mode
4. Contact support if persistent

#### Login Problems
**Symptoms:** Can't log in to account
**Solutions:**
1. Verify email/password
2. Check email verification
3. Reset password if needed
4. Clear browser cookies

### Voice Issues

#### Poor Recognition Quality
- Speak clearly and slowly
- Minimize background noise
- Use headset microphone
- Test in different environments

#### Language Not Detected
- Ensure correct language selection
- Use standard pronunciation
- Try English fallback
- Contact support for new dialects

### API Errors

#### 401 Unauthorized
- Check authentication token
- Refresh login session
- Verify account permissions

#### 429 Rate Limited
- Wait before retrying
- Upgrade subscription tier
- Contact support for limits

#### 500 Internal Error
- Try again later
- Check service status
- Report to support team

### Performance Issues

#### High Memory Usage
- Close unused tabs
- Clear browser cache
- Update browser
- Use Chrome for best performance

#### Slow AI Responses
- Check internet speed
- Try during off-peak hours
- Use simpler prompts
- Contact support for optimization

---

## 7. Best Practices

### Development Best Practices

#### Code Quality
- Use TypeScript for type safety
- Follow React 19 patterns
- Write comprehensive unit tests
- Document all components

#### Performance
- Implement code splitting
- Optimize images
- Use lazy loading
- Monitor bundle size

#### Security
- Validate all inputs
- Use HTTPS everywhere
- Implement proper authentication
- Regular security audits

### Security Best Practices

#### Data Protection
- Encrypt sensitive data
- Use secure authentication
- Implement access controls
- Regular backups

#### API Security
- Rate limiting
- Input validation
- Error handling
- Audit logging

### Accessibility Guidelines

#### WCAG 2.1 AA Compliance
- High contrast colors
- Keyboard navigation
- Screen reader support
- Large touch targets

#### Voice Interface
- Clear voice prompts
- Error recovery
- Multi-language support
- Cultural sensitivity

### Performance Optimization

#### Frontend
- Bundle splitting
- Image optimization
- Caching strategies
- Progressive loading

#### Backend
- Database indexing
- Query optimization
- Caching layers
- Load balancing

---

## 8. Component Documentation

### Core Components

#### ResponsiveContainer
Provides responsive layout container with breakpoints.

**Props:**
- `children`: ReactNode
- `maxWidth`: string
- `padding`: string

**Usage:**
```jsx
<ResponsiveContainer maxWidth="1200px">
  <YourContent />
</ResponsiveContainer>
```

#### ErrorBoundary
Catches JavaScript errors in component tree.

**Props:**
- `fallback`: ReactNode
- `onError`: function

#### LoadingSpinner
Displays loading state with cultural theming.

**Props:**
- `size`: 'small' | 'medium' | 'large'
- `color`: string

### AI Tool Components

#### VoiceAssistantPage
Main voice interface component.

**Features:**
- Multi-language support
- Real-time transcription
- Command processing
- Accessibility features

#### ContentGeneratorPage
AI content creation interface.

**Features:**
- Form validation
- Platform selection
- Preview functionality
- Export options

#### ImageEnhancerPage
Photo enhancement tool.

**Features:**
- Drag & drop upload
- Real-time preview
- Multiple enhancement options
- Batch processing

### Form Components

#### ImageUploader
Handles file uploads with validation.

**Props:**
- `onUpload`: function
- `maxSize`: number
- `acceptedTypes`: string[]

#### ProcessingStep
Shows processing status with progress.

**Props:**
- `step`: number
- `totalSteps`: number
- `label`: string

### Layout Components

#### Navigation
Main app navigation with responsive design.

**Features:**
- Mobile hamburger menu
- Active state indication
- Accessibility support

#### ResponsiveNavigation
Adaptive navigation for different screen sizes.

**Features:**
- Breakpoint detection
- Touch optimization
- Voice navigation support

---

## 9. AI Tools Documentation

### Voice Assistant

#### Overview
Multilingual voice interface for hands-free platform navigation.

#### Features
- **6 Indian Languages**: Hindi, Bengali, Tamil, Telugu, Marathi, Gujarati
- **Voice Commands**: 50+ craft-specific commands
- **Cultural Understanding**: Recognizes traditional terminology
- **Accessibility**: Screen reader compatible

#### Usage
1. Click microphone icon
2. Allow browser permissions
3. Speak commands clearly
4. View transcribed text and responses

#### Commands
- "नया उत्पाद जोड़ें" - Add product
- "मेरी बिक्री देखें" - View sales
- "कीमत सुझाव" - Price suggestions
- "छवि सुधारें" - Enhance image
- "कंटेंट बनाएं" - Generate content

### Content Generator

#### Overview
AI-powered content creation for marketplace listings.

#### Features
- **Multi-platform**: Amazon, Flipkart, Etsy, Instagram
- **Cultural Context**: Heritage-aware descriptions
- **SEO Optimization**: Indian market keywords
- **Multilingual**: 6 language support

#### Input Fields
- Product name
- Category
- Materials used
- Craft technique
- Target platform
- Language preference

#### Output
- SEO-optimized description
- Cultural storytelling
- Platform-specific formatting
- Character count optimization

### Image Enhancer

#### Overview
Professional photo enhancement for craft products.

#### Features
- **Background Removal**: AI-powered isolation
- **Quality Enhancement**: Brightness, contrast, saturation
- **Resizing**: Marketplace-specific dimensions
- **Batch Processing**: Multiple images

#### Supported Formats
- JPEG, PNG, WebP
- Maximum 10MB per image
- Up to 10 images per batch

#### Enhancement Options
- Auto-enhance
- Manual adjustments
- Background removal
- Watermark addition

### Pricing Assistant

#### Overview
Market-aware pricing recommendations.

#### Features
- **Market Analysis**: Competitive pricing data
- **Cost Calculation**: Material and labor costs
- **Regional Factors**: Location-based adjustments
- **Festival Pricing**: Seasonal recommendations

#### Input Parameters
- Craft category
- Materials used
- Complexity level
- Production time
- Artisan location

#### Output
- Price range (min/max)
- Recommended price
- Confidence score
- Market comparison

### Story Generator

#### Overview
Heritage storytelling for cultural preservation.

#### Features
- **Family Traditions**: Generational craft stories
- **Cultural Significance**: Historical context
- **Multilingual**: Native language narratives
- **SEO Friendly**: Searchable content

#### Story Elements
- Family background
- Craft origins
- Traditional techniques
- Cultural importance
- Modern adaptations

#### Output Formats
- Website content
- Social media posts
- Product descriptions
- Blog articles

### Artist Collaboration

#### Overview
AI-powered artisan matchmaking.

#### Features
- **Skill Matching**: Complementary abilities
- **Location Based**: Regional connections
- **Project Management**: Collaboration tools
- **Portfolio Sharing**: Visual showcases

#### Matching Criteria
- Craft type compatibility
- Skill complementarity
- Geographic proximity
- Availability

#### Collaboration Types
- Joint product creation
- Skill sharing workshops
- Bulk order fulfillment
- Cultural exchange

### AI Dashboard

#### Overview
Business analytics and growth tracking.

#### Features
- **Usage Analytics**: AI tool performance
- **Sales Insights**: Revenue tracking
- **Growth Metrics**: Business development
- **Recommendations**: AI-suggested improvements

#### Metrics Tracked
- Tool usage frequency
- Content generation success
- Sales conversion rates
- Customer engagement
- Geographic reach

#### Reports Available
- Daily usage summary
- Monthly performance
- Growth trends
- Comparative analysis

---

*This comprehensive knowledge base covers all aspects of the Kalaikatha platform. For additional support, contact our team at support@kalaikatha.com*
