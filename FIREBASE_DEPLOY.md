# Firebase Deployment Guide

## ✅ Firebase Initialized Successfully!

Your Kalaikatha project is now configured for Firebase Hosting with automatic GitHub Actions deployment.

---

## 🔥 What's Configured:

### 1. **Firebase Hosting**
   - ✅ Project: `kalaikatha-96535`
   - ✅ Public directory: `dist`
   - ✅ Single-page app routing enabled
   - ✅ Auto-deploy on push to `main`

### 2. **Firestore Database**
   - ✅ Security rules configured
   - ✅ Indexes configured
   - ✅ User authentication rules
   - ✅ Artisan/Buyer data protection

### 3. **GitHub Actions**
   - ✅ Auto-deploy on merge to `main`
   - ✅ Preview deployments on pull requests
   - ✅ Environment variables configured

---

## 🚀 Quick Deployment

### Option 1: Push to GitHub (Auto-Deploy)

```bash
git push origin main
```

Your site will automatically deploy to:
**https://kalaikatha-96535.web.app**

### Option 2: Manual Deploy

```bash
npm run build
firebase deploy
```

---

## 🔑 Add GitHub Secrets for Environment Variables

To make Azure services work in production, add these secrets:

1. **Go to GitHub Repository**: https://github.com/samyuktha2004/kalaikatha
2. **Settings** → **Secrets and variables** → **Actions**
3. **Click "New repository secret"**
4. **Add each variable** (copy values from your `.env.local`):

### Required Secrets:

```
VITE_AZURE_VISION_ENDPOINT
VITE_AZURE_VISION_KEY
VITE_AZURE_OPENAI_ENDPOINT
VITE_AZURE_OPENAI_KEY
VITE_AZURE_OPENAI_DEPLOYMENT
VITE_AZURE_TRANSLATOR_KEY
VITE_AZURE_TRANSLATOR_REGION
VITE_AZURE_TRANSLATOR_ENDPOINT
VITE_AZURE_SPEECH_KEY
VITE_AZURE_SPEECH_REGION
VITE_AZURE_STORAGE_ACCOUNT
VITE_AZURE_STORAGE_KEY
VITE_AZURE_STORAGE_CONTAINER
VITE_FIREBASE_API_KEY
VITE_FIREBASE_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID
VITE_FIREBASE_MEASUREMENT_ID
```

---

## 🔧 Update Azure CORS for Firebase Domain

1. **Go to Azure Portal**: https://portal.azure.com
2. **Navigate to**: Storage Account `kalaikathadata001`
3. **Settings** → **Resource sharing (CORS)**
4. **Add allowed origin**:
   ```
   https://kalaikatha-96535.web.app
   ```
5. **Also add** (if using custom domain later):
   ```
   https://kalaikatha-96535.firebaseapp.com
   ```
6. **Click Save**

---

## 📊 Deployment Status

Check deployment status:
- **GitHub Actions**: https://github.com/samyuktha2004/kalaikatha/actions
- **Firebase Console**: https://console.firebase.google.com/project/kalaikatha-96535/hosting

---

## 🎯 Your Live URLs

After deployment, your app will be available at:

- **Primary**: https://kalaikatha-96535.web.app
- **Alternative**: https://kalaikatha-96535.firebaseapp.com

---

## 🐛 Troubleshooting

### Build Fails on GitHub Actions

**Check the workflow file includes npm install:**
```yaml
- name: Install dependencies
  run: npm ci
- name: Build
  run: npm run build
```

### Environment Variables Not Working

**Verify secrets are added in GitHub:**
- Go to Settings → Secrets → Actions
- Check all VITE_ variables are present
- Redeploy after adding secrets

### CORS Errors in Production

**Update Azure Storage CORS:**
- Add Firebase hosting URL to allowed origins
- Include both `.web.app` and `.firebaseapp.com` domains

### Firebase Deploy Command Fails

**Login again:**
```bash
firebase logout
firebase login
firebase deploy
```

---

## 🎬 Next Steps

1. **Push to GitHub** - Automatic deployment will start
2. **Add GitHub Secrets** - For Azure services to work
3. **Update Azure CORS** - Allow Firebase domain
4. **Test the live site** - Visit your Firebase URL
5. **Custom Domain** (Optional) - Add in Firebase Console

---

## 📝 Firebase Commands Reference

```bash
# Deploy hosting only
firebase deploy --only hosting

# Deploy Firestore rules
firebase deploy --only firestore:rules

# View hosting URLs
firebase hosting:channel:list

# Open Firebase console
firebase open hosting

# Run local emulator
firebase emulators:start
```

---

## ✅ Success Checklist

- [x] Firebase initialized
- [x] GitHub Actions configured
- [x] Firestore rules set up
- [ ] GitHub secrets added
- [ ] Azure CORS updated
- [ ] First deployment successful
- [ ] Live site tested

---

**Your Kalaikatha project is ready for Firebase Hosting! 🎉**

Simply push to GitHub and your site will auto-deploy to:
**https://kalaikatha-96535.web.app**
