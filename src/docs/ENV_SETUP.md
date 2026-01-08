# Environment Setup Guide

Quick guide to configure Azure & Firebase credentials.

---

## 🚀 Quick Start

1. **Copy the sample file:**
   ```bash
   cp .env.sample .env.local
   ```

2. **Fill in your credentials** (see sections below)

3. **Restart dev server:**
   ```bash
   npm run dev
   ```

---

## 📋 Current Configuration Status

**✅ Already Configured:**
- Azure OpenAI (GPT-4)
- Azure Computer Vision
- Azure Blob Storage
- Azure Translator
- Azure Speech Services (Vani)
- Firebase (Auth & Analytics)

**🎉 ALL SERVICES READY - Just create the blob container and start testing!**

---

## 🔑 How to Get Credentials

### **Azure OpenAI**

**Already configured!** ✅

- Endpoint: `https://kalaikatha.openai.azure.com/`
- Deployment: `gpt-4`

### **Azure Computer Vision**

**Already configured!** ✅

- Endpoint: `https://kalaikatha-vision-ai.cognitiveservices.azure.com/`

### **Azure Speech Services** (Optional)

1. Go to [Azure Portal](https://portal.azure.com)
2. Create **Speech Services** resource
3. Choose region: **Central India** (lowest latency)
4. Copy **Key** and **Region** to `.env.local`

### **Azure Translator** (Optional)

1. Go to [Azure Portal](https://portal.azure.com)
2. Create **Translator** resource
3. Choose region: **Central India**
4. Copy **Key** and **Region** to `.env.local`

### **Azure Blob Storage** (Required for Production)

**Already configured!** ✅

- Storage Account: `kalaikathadata001`
- Endpoint: `https://kalaikathadata001.blob.core.windows.net/`
- Container: `artisan-uploads`

**To create the container (one-time setup):**
1. Go to [Azure Portal](https://portal.azure.com)
2. Search for storage account: `kalaikathadata001`
3. Go to **Containers** (left sidebar)
4. Click **+ Container**
5. Name: `artisan-uploads`
6. Public access level: **Blob** (allows public read for uploaded images)

### **Firebase** (Optional)

**Already configured!** ✅

- Project: `kalaikatha-96535`
- Used for: Production authentication & analytics

---

## 🧪 Testing Configuration

### **Check if Azure is working:**

```bash
# Start dev server
npm run dev

# Open browser console, look for:
✅ Azure AI Service running with REAL credentials
```

### **Check if Firebase is working:**

```bash
# Browser console should show:
✅ Firebase initialized successfully
```

---

## 🔒 Security Notes

**NEVER commit `.env.local` to Git!**

- ✅ `.env.sample` - Safe to commit (no credentials)
- ❌ `.env.local` - Contains secrets, DO NOT COMMIT
- ✅ `.gitignore` - Already ignores `.env.local`

---

## 💰 Cost Impact

With current configuration:

- **Azure OpenAI** - ~$0-5/month (free tier: $200 credit)
- **Azure Vision** - ~$0-2/month (free tier: 5,000 calls)
- **Firebase** - $0/month (free tier: 50K reads/day)

**Total: ~$0-7/month** (stays in free tier for development)

---

## 🐛 Troubleshooting

**"Azure running in DEV MODE"**
- Check `.env.local` exists
- Verify `VITE_` prefix on all variables
- Restart dev server

**"Firebase not initialized"**
- Firebase is optional for development
- App works without Firebase (uses mock auth)

**"CORS errors with Azure"**
- Check endpoint URLs have trailing `/`
- Verify keys are correct (no extra spaces)

---

**Need help?** Check `docs/SETUP.md` for full deployment guide.