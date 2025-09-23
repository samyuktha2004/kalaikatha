# 🔒 Security Configuration Guide

## ⚠️ **IMPORTANT SECURITY NOTICE**

This project has been secured and all sensitive data has been removed from version control.

## 🔧 **Setup Instructions**

### 1. Environment Variables Setup

1. **Copy the example environment file:**
   ```bash
   cp app/.env.example app/.env
   ```

2. **Fill in your Firebase configuration in `app/.env`:**
   - Get your Firebase config from [Firebase Console](https://console.firebase.google.com/)
   - Project Settings → General → Your apps → Config

3. **For Functions development:**
   ```bash
   cp functions/.env.example functions/.env.local
   ```

### 2. Service Account Setup

1. **Generate a new service account key:**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Navigate to IAM & Admin → Service Accounts
   - Create or select your service account
   - Generate a new JSON key

2. **Store the service account key securely:**
   - **DO NOT** place it in the project directory
   - Store it in a secure location outside the repository
   - Set the `GOOGLE_APPLICATION_CREDENTIALS` environment variable

3. **For local development:**
   ```bash
   export GOOGLE_APPLICATION_CREDENTIALS="/path/to/your/service-account-key.json"
   ```

## 🚫 **Files Never to Commit**

The following files are automatically ignored by `.gitignore`:

- `*.env` files (except `.env.example`)
- `*-firebase-adminsdk-*.json`
- `*service-account*.json`
- `kalakatha-34eba-*.json`

## 🔍 **Security Checklist**

- [x] Service account keys removed from repository
- [x] Environment files removed from tracking
- [x] Proper `.gitignore` implemented
- [x] API keys removed from documentation
- [x] Example environment files created
- [ ] **TODO: Regenerate service account key in Google Cloud Console**
- [ ] **TODO: Rotate Firebase API keys if needed**

## 🛡️ **Best Practices**

1. **Never commit sensitive data**
2. **Use environment variables for all secrets**
3. **Regularly rotate API keys and service account keys**
4. **Monitor repository for accidentally committed secrets**
5. **Use secret scanning tools in CI/CD**

## 🆘 **Emergency Response**

If sensitive data was accidentally committed:

1. **Immediately rotate all exposed credentials**
2. **Use `git filter-branch` or BFG Repo-Cleaner to remove from history**
3. **Force push the cleaned repository**
4. **Notify team members to re-clone the repository**

## 📞 **Contact**

For security concerns, contact the project maintainer immediately.