# Setup Guide

**Goal:** Get Kalaikatha running in production

---

## Quick Start (Development)

```bash
npm install
npm run dev
```

Works with mock data, no Azure needed.

---

## Production Setup (5-6 hours)

### **Phase 1: Azure Account** (10 min)

1. Create account at https://portal.azure.com
2. Free $200 credit for 30 days
3. Create resource group: `kalaikatha-prod` (Central India region)

### **Phase 2: Critical Services** (1 hour) - $7/month

**Storage Account** (Required)
```
Name: kalaikathastorage
Performance: Standard
Replication: LRS
Containers: product-images, artisan-photos, vault-secrets
```

**SQL Database** (Required)
```
Name: kalaikatha-db
Tier: Basic ($5/month)
Alternative: Cosmos DB Serverless
```

**Azure AD B2C** (Required - Free)
```
Tenant: kalaikatha
Domain: kalaikatha.onmicrosoft.com
User flows: Sign up/in, Profile edit, Password reset
```

### **Phase 3: AI Services** (30 min) - Free Tier

**Azure OpenAI** (Recommended - $18/month free credit)
```
Region: East US
Models: gpt-4, gpt-4-vision-preview
Use: Pricing, negotiation, marketing, trade secrets
```

**Computer Vision** (Recommended - 5k images/month free)
```
Region: Central India
Use: Image analysis, OCR, quality check
```

**Skip for MVP:**
- Speech Services (browser TTS works)
- Translator (static UI translated)

### **Phase 4: Environment Variables** (5 min)

Create `.env.local`:

```bash
# CRITICAL (Must have)
AZURE_STORAGE_CONNECTION_STRING=<from storage>
AZURE_SQL_CONNECTION_STRING=<from sql>
AZURE_AD_B2C_TENANT=kalaikatha
AZURE_AD_B2C_CLIENT_ID=<from B2C>

# RECOMMENDED (Free tier)
AZURE_OPENAI_ENDPOINT=<from openai>
AZURE_OPENAI_KEY=<from openai>
AZURE_VISION_ENDPOINT=<from vision>
AZURE_VISION_KEY=<from vision>
```

### **Phase 5: Database Schema** (15 min)

```sql
CREATE TABLE Users (
  id UNIQUEIDENTIFIER PRIMARY KEY,
  email NVARCHAR(255) UNIQUE,
  phone NVARCHAR(20),
  name NVARCHAR(255),
  type NVARCHAR(20), -- 'buyer' or 'artisan'
  createdAt DATETIME DEFAULT GETDATE()
);

CREATE TABLE Artisans (
  id UNIQUEIDENTIFIER PRIMARY KEY,
  userId UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Users(id),
  bio NVARCHAR(MAX),
  craft NVARCHAR(100),
  location NVARCHAR(100),
  acceptingCommissions BIT DEFAULT 1,
  minimumBudget DECIMAL(10,2)
);

CREATE TABLE Products (
  id UNIQUEIDENTIFIER PRIMARY KEY,
  artisanId UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Artisans(id),
  name NVARCHAR(255),
  description NVARCHAR(MAX),
  price DECIMAL(10,2),
  imageUrl NVARCHAR(500)
);

CREATE TABLE CustomOrders (
  id UNIQUEIDENTIFIER PRIMARY KEY,
  buyerId UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Users(id),
  artisanId UNIQUEIDENTIFIER,
  productName NVARCHAR(255),
  budget DECIMAL(10,2),
  status NVARCHAR(50), -- 'pending', 'accepted', 'rejected'
  createdAt DATETIME DEFAULT GETDATE()
);

CREATE TABLE SavedArtisans (
  userId UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Users(id),
  artisanId UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Artisans(id),
  PRIMARY KEY (userId, artisanId)
);
```

### **Phase 6: Backend API** (2-3 hours)

**Azure Functions (Recommended):**

```typescript
// GET /api/artisans
export async function getArtisans(req, res) {
  const artisans = await sql.query('SELECT * FROM Artisans');
  res.json(artisans);
}

// POST /api/orders
export async function createOrder(req, res) {
  const { buyerId, artisanId, productName, budget } = req.body;
  await sql.query('INSERT INTO CustomOrders...');
  res.json({ success: true });
}

// POST /api/upload
export async function uploadImage(req, res) {
  const blob = await blobService.uploadStream(req.file);
  res.json({ url: blob.url });
}
```

### **Phase 7: Frontend Integration** (1 hour)

Update hooks to use real API:

```typescript
// /hooks/useArtisans.ts
const response = await fetch('/api/artisans');
const artisans = await response.json();
setArtisans(artisans);
```

### **Phase 8: Deploy** (30 min)

**Azure Static Web Apps:**
```bash
npm run build
swa deploy
```

---

## Cost Breakdown

### **MVP (Minimal):**
```
Azure SQL:     $5/month
Blob Storage:  $2/month
AD B2C:        $0 (free)
Total:         $7/month
```

### **Recommended (With AI):**
```
Above:         $7/month
OpenAI:        $0 (free $18 credit)
Vision:        $0 (free 5k/month)
Total:         $7/month
```

---

## Getting Credentials

**Storage:**
- Storage Account → Access Keys → Connection string

**SQL:**
- SQL Database → Connection strings → ADO.NET

**OpenAI:**
- OpenAI Service → Keys and Endpoint

**Vision:**
- Computer Vision → Keys and Endpoint

**B2C:**
- AD B2C → App registrations → Create → Copy Client ID

---

## Credit Optimization

**Free Tiers:**
- OpenAI: $18/month = 1.8M tokens
- Vision: 5k images/month
- Speech: 5M chars/month (skip)
- Translator: 2M chars/month (skip)

**Tips:**
- Use Basic SQL ($5 not Standard $15)
- Enable cost alerts ($5, $10, $20)
- Compress images before upload
- Monitor usage weekly

**Skip for MVP:**
- Speech Services (browser works)
- Translator (static UI done)
- Azure Maps (custom SVG works)

---

## Checklist

**Must Have (Tier 1):**
- [ ] Azure SQL setup
- [ ] Blob Storage setup
- [ ] AD B2C setup
- [ ] Database schema created
- [ ] Backend API deployed
- [ ] Frontend integrated

**Recommended (Tier 2):**
- [ ] Azure OpenAI enabled
- [ ] Computer Vision enabled

**Optional (Tier 3):**
- [ ] Speech Services
- [ ] Translator
- [ ] Analytics

---

**Last Updated:** Jan 7, 2026
