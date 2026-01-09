# Netlify Deployment Guide for Kalaikatha

## ✅ What I Fixed

### 1. **Created `netlify.toml`**
   - Set publish directory to `dist`
   - Set build command to `npm run build`
   - Added redirect rules for SPA routing
   - Set Node.js version to 20

### 2. **Created `public/_redirects`**
   - Added fallback to `index.html` for all routes
   - Prevents 404 errors on page refresh

### 3. **Fixed `vite.config.ts`**
   - Changed output directory from `build` to `dist`
   - Netlify expects `dist` by default

### 4. **Updated `package.json`**
   - Added `preview` script for local testing

---

## 🚀 Steps to Deploy on Netlify

### Step 1: Update Your Netlify Site

1. **Go to Netlify Dashboard**: https://app.netlify.com/
2. **Find your Kalaikatha site**
3. **Go to "Site settings"**

### Step 2: Verify Build Settings

1. Click **"Build & deploy"** → **"Continuous deployment"**
2. Verify settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Production branch**: `main`

### Step 3: Redeploy from GitHub

1. Go to **"Deploys"** tab
2. Click **"Trigger deploy"** → **"Deploy site"**
3. Or push to GitHub and auto-deploy will trigger

### Step 4: Verify Environment Variables

Make sure all these are set in **Site settings** → **Environment variables**:

**Copy these from your `.env.local` file** (don't commit this file to GitHub):

```
VITE_AZURE_VISION_ENDPOINT=<your-endpoint>
VITE_AZURE_VISION_KEY=<your-key>

VITE_AZURE_OPENAI_ENDPOINT=<your-endpoint>
VITE_AZURE_OPENAI_KEY=<your-key>
VITE_AZURE_OPENAI_DEPLOYMENT=gpt-4

VITE_AZURE_TRANSLATOR_KEY=<your-key>
VITE_AZURE_TRANSLATOR_REGION=uaenorth
VITE_AZURE_TRANSLATOR_ENDPOINT=https://api.cognitive.microsofttranslator.com/

VITE_AZURE_SPEECH_KEY=<your-key>
VITE_AZURE_SPEECH_REGION=uaenorth

VITE_AZURE_STORAGE_ACCOUNT=<your-account>
VITE_AZURE_STORAGE_KEY=<your-key>
VITE_AZURE_STORAGE_CONTAINER=artisan-uploads

VITE_FIREBASE_API_KEY=<your-key>
VITE_FIREBASE_AUTH_DOMAIN=<your-domain>
VITE_FIREBASE_PROJECT_ID=<your-project-id>
VITE_FIREBASE_STORAGE_BUCKET=<your-bucket>
VITE_FIREBASE_MESSAGING_SENDER_ID=<your-sender-id>
VITE_FIREBASE_APP_ID=<your-app-id>
VITE_FIREBASE_MEASUREMENT_ID=<your-measurement-id>
```

> **Note**: Copy the actual values from your local `.env.local` file into Netlify's environment variable settings.

---

## 🔧 Configure Azure for Netlify Origin

Once deployed, your Netlify URL will be something like: `https://kalaikatha.netlify.app`

### Update Azure CORS Settings

1. **Go to Azure Portal**: https://portal.azure.com
2. **Navigate to Storage Account**: `kalaikathadata001`
3. **Go to**: Settings → **Resource sharing (CORS)**
4. **Under Blob service**, add:
   - **Allowed origins**: `https://kalaikatha.netlify.app` (replace with your actual Netlify URL)
   - **Allowed methods**: `GET, POST, PUT, DELETE, OPTIONS`
   - **Allowed headers**: `*`
   - **Exposed headers**: `*`
   - **Max age**: `3600`
5. Click **Save**

### Update Firebase Authorized Domains

1. **Go to Firebase Console**: https://console.firebase.google.com/
2. **Select your project**: `kalaikatha-96535`
3. **Go to**: Authentication → Settings → **Authorized domains**
4. **Add your Netlify URL**: `kalaikatha.netlify.app`
5. Click **Add**

---

## 🐛 Troubleshooting

### If you still see a blank white screen:

1. **Check Build Logs on Netlify**
   - Go to Deploys → Click latest deploy → View build log
   - Look for errors

2. **Check Browser Console**
   - Open deployed site
   - Press F12 → Console tab
   - Look for red errors

3. **Common Issues:**

   **Issue**: Environment variables not loading
   - **Fix**: Make sure all variables start with `VITE_`
   - Redeploy after adding variables

   **Issue**: "Failed to fetch" errors
   - **Fix**: Update Azure CORS with Netlify URL

   **Issue**: Firebase authentication errors
   - **Fix**: Add Netlify domain to Firebase authorized domains

   **Issue**: 404 on page refresh
   - **Fix**: Already handled by `_redirects` file

4. **Force Clear Deploy Cache**
   - Netlify → Site settings → Build & deploy
   - Click "Clear cache and retry deploy"

---

## ✅ Testing After Deployment

1. **Open your Netlify URL**
2. **Test these features:**
   - ✅ Welcome screen loads
   - ✅ Map displays correctly
   - ✅ Can switch languages
   - ✅ Artisan signup works
   - ✅ Firebase authentication works
   - ✅ Page refresh doesn't show 404

3. **Check Console (F12)**
   - Should see: `✅ Firebase initialized successfully`
   - Should see: `✅ Azure AI Service running with REAL credentials`

---

## 📊 Performance Tips

1. **Enable Netlify CDN**
   - Already enabled by default
   - Assets are cached globally

2. **Enable Build Plugins** (Optional)
   - Netlify → Build settings → Plugins
   - Add "Lighthouse" for performance monitoring

3. **Custom Domain** (Optional)
   - Netlify → Domain settings
   - Add your custom domain
   - Update Azure CORS and Firebase accordingly

---

## 🎉 Success!

Once deployed, your app will be live at: **https://your-site.netlify.app**

All features will work:
- ✅ AI Photo Studio
- ✅ Smart Pricing
- ✅ Marketing Generator
- ✅ Voice Assistant (Vani)
- ✅ Multi-language support
- ✅ Autonomous Bargain Bot
- ✅ Protected Vault

**Your Imagine Cup 2026 project is live! 🚀**
