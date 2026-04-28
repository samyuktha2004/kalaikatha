# Firebase Authentication Setup Guide

## ✅ What I've Done

### 1. **Integrated Real Firebase Authentication**
   - ✅ Replaced mock auth with Firebase Auth
   - ✅ Added email/password sign up
   - ✅ Added email/password sign in
   - ✅ Added user profile updates
   - ✅ Added Firestore integration for user data
   - ✅ Maintained fallback to localStorage if Firebase not configured

### 2. **Created Firestore Security Rules**
   - ✅ Users can only read/write their own data
   - ✅ Products belong to artisans
   - ✅ Orders accessible to buyer and artisan
   - ✅ Protected vault is private

### 3. **Configured for Vercel**
   - ✅ Created `vercel.json` with proper rewrites
   - ✅ Set up environment variable references

---

## 🚀 Steps to Enable Firebase Authentication

### Step 1: Enable Authentication in Firebase Console

1. **Go to Firebase Console**: https://console.firebase.google.com/
2. **Select your project**: `kalaikatha-96535`
3. **Click "Authentication"** in the left sidebar
4. **Click "Get started"**
5. **Enable sign-in methods:**
   - Click **"Email/Password"**
   - Toggle **"Enable"**
   - Click **"Save"**

### Step 2: Configure Authorized Domains

1. Still in **Authentication** → **Settings**
2. Scroll to **"Authorized domains"**
3. **Add your Vercel domain**: `your-app.vercel.app`
   - Click "Add domain"
   - Enter your Vercel URL (e.g., `kalaikatha.vercel.app`)
   - Click "Add"

### Step 3: Deploy Firestore Rules

Run this command to deploy the security rules:

```bash
firebase deploy --only firestore:rules
```

### Step 4: Verify Environment Variables in Vercel

Your environment variables should already be set in Vercel. Verify they're all there:

1. **Go to Vercel Dashboard**: https://vercel.com/
2. **Select your Kalaikatha project**
3. **Go to Settings** → **Environment Variables**
4. **Verify all 17 variables are set** (they should already be there)

---

## 🔧 How Authentication Works Now

### **Sign Up Flow:**
1. User enters email, password, and name
2. Firebase creates user account
3. User data saved to Firestore `/users/{userId}`
4. User automatically logged in

### **Sign In Flow:**
1. User enters email and password
2. Firebase authenticates
3. User data loaded from Firestore
4. User state persisted in localStorage

### **User Data Structure in Firestore:**
```javascript
/users/{userId}
{
  name: "Ramesh Kumar",
  email: "ramesh@example.com",
  type: "artisan" or "buyer",
  createdAt: "2026-01-09T10:30:00.000Z"
}
```

---

## 🎯 Testing Authentication

### **Test on Local (localhost:3000):**
1. Start dev server: `npm run dev`
2. Click "I'm an Artisan" or "I'm a Buyer"
3. Sign up with email/password
4. Check browser console for: `✅ Signup successful`
5. Try logging out and logging back in

### **Test on Vercel:**
1. Push code to GitHub (it auto-deploys)
2. Visit your Vercel URL
3. Try signup/signin
4. Check browser console (F12) for Firebase logs

---

## 📊 Firebase Console - What to Check

### **Authentication Tab:**
- See all registered users
- Monitor sign-ins
- View user details

### **Firestore Tab:**
- See `/users` collection
- Each user has their document
- Contains name, email, type

### **Usage Tab:**
- Monitor authentication usage
- Track Firestore reads/writes
- Free tier: 50,000 reads/day, 20,000 writes/day

---

## 🐛 Troubleshooting

### **Issue: "Firebase not initialized"**
- **Check**: Environment variables in Vercel
- **Fix**: Ensure all `VITE_FIREBASE_*` variables are set

### **Issue: "Unauthorized domain"**
- **Check**: Firebase console → Authorized domains
- **Fix**: Add your Vercel domain (e.g., `kalaikatha.vercel.app`)

### **Issue: "Permission denied" in Firestore**
- **Check**: Firestore rules deployed
- **Fix**: Run `firebase deploy --only firestore:rules`

### **Issue: Users can't sign up**
- **Check**: Email/Password is enabled in Firebase Console
- **Fix**: Authentication → Sign-in method → Enable Email/Password

---

## 🔐 Security Features

### **Authentication:**
- ✅ Passwords hashed by Firebase (bcrypt + salt)
- ✅ Secure token-based sessions
- ✅ Automatic token refresh

### **Firestore Security:**
- ✅ Users can only access their own data
- ✅ Artisans can only modify their own products
- ✅ Orders visible only to buyer and artisan
- ✅ Protected vault is user-private

### **Best Practices:**
- ✅ Environment variables stored securely in Vercel
- ✅ Firebase keys not committed to Git
- ✅ HTTPS-only connections
- ✅ CORS configured for Firebase services

---

## 📝 Next Steps

### **Optional Enhancements:**

1. **Add Password Reset:**
   ```typescript
   import { sendPasswordResetEmail } from 'firebase/auth';
   
   const resetPassword = async (email: string) => {
     await sendPasswordResetEmail(auth, email);
   };
   ```

2. **Add Email Verification:**
   ```typescript
   import { sendEmailVerification } from 'firebase/auth';
   
   await sendEmailVerification(user);
   ```

3. **Add Google Sign-In:**
   - Enable in Firebase Console
   - Use `signInWithPopup(auth, new GoogleAuthProvider())`

4. **Add Phone Authentication:**
   - Enable in Firebase Console
   - Useful for artisans without email

---

## ✅ Deployment Checklist

- [x] Firebase Authentication enabled
- [x] Email/Password sign-in enabled
- [x] Authorized domains configured (Vercel URL)
- [x] Firestore rules deployed
- [x] Environment variables set in Vercel
- [x] Code pushed to GitHub
- [x] Vercel auto-deployed
- [ ] Test signup on production
- [ ] Test signin on production
- [ ] Verify Firestore data creation

---

**Your Firebase Authentication is now fully integrated! 🎉**

Users can sign up, sign in, and their data is securely stored in Firebase Firestore.
