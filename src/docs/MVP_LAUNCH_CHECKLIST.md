# MVP Launch Checklist

**Goal:** Launch Kalaikatha MVP with maximum impact on limited Azure credits

---

## ✅ Phase 1: Critical Setup (Week 1)

### **Azure Blob Storage** (MUST HAVE)
- [ ] Create Storage Account in Azure Portal
- [ ] Name: `kalaikathastorage` (or unique name)
- [ ] Region: **UAE North**
- [ ] Create container: `artisan-uploads` (public read)
- [ ] Copy credentials to `.env.local`:
  ```bash
  VITE_AZURE_STORAGE_ACCOUNT=kalaikathastorage
  VITE_AZURE_STORAGE_KEY=<from Access Keys>
  ```
- [ ] Test: Upload 1 image, verify public URL works
- [ ] **Cost: $1-2/month**

### **Azure Computer Vision** (Already Configured)
- [x] Endpoint configured
- [x] API key configured
- [ ] Test: Analyze 1 image
- [ ] Verify: Auto-enhancement works
- [ ] **Cost: $0 (free tier)**

### **Verify Development Mode**
- [ ] Run `npm run dev`
- [ ] Check console: "Azure AI Service running with REAL credentials"
- [ ] Test: Upload image → Should see enhancement suggestions

---

## ⚡ Phase 2: High-Value AI (Week 2)

### **Azure OpenAI (GPT-4)**
- [x] Endpoint configured
- [x] API key configured
- [ ] Test: Generate pricing for 1 product
- [ ] Test: Generate marketing copy
- [ ] Verify: Caching works (check console for "Using cached pricing")
- [ ] **Cost: $3-8/month**

### **Optimize for Credits**
- [ ] Enable aggressive caching (already in code)
- [ ] Set usage limits in `.env.local`:
  ```bash
  VITE_MAX_AI_CALLS_PER_DAY=10
  ```
- [ ] Monitor: Check Azure Portal daily for costs

### **Azure Translator (Optional)**
- [ ] Create Translator resource
- [ ] Add to `.env.local`
- [ ] Test: Translate 1 buyer message
- [ ] **Cost: $0-2/month**

---

## 🟢 Phase 3: Polish (Week 3+)

### **Azure Speech Services (Optional)**
- [ ] Create Speech Services resource
- [ ] Add to `.env.local`
- [ ] Test: Voice input (compare with browser fallback)
- [ ] **Cost: $0-2/month**

### **Skip if Low on Credits**
- Browser Web Speech API works fine (85% vs 95% accuracy)
- Only deploy if you have >$100 credits remaining

---

## 📊 Budget Monitoring

### **Set Up Cost Alerts**
1. [ ] Azure Portal → Cost Management → Budgets
2. [ ] Create budget: $20/month
3. [ ] Alerts at: $5, $10, $15
4. [ ] Email notifications enabled

### **Daily Checks (First 2 Weeks)**
- [ ] Check Azure Portal → Cost Analysis
- [ ] Verify staying in free tiers
- [ ] Monitor API call counts

### **Weekly Optimization**
- [ ] Review cache hit rates (console logs)
- [ ] Identify expensive API calls
- [ ] Adjust caching durations if needed

---

## 🧪 Testing Checklist

### **Tier 1 Features (Critical)**
- [ ] Upload product image (Blob Storage)
- [ ] Auto-enhance photo (Computer Vision)
- [ ] View enhanced image in gallery
- [ ] Quality warning for blurry images

### **Tier 2 Features (High Value)**
- [ ] Generate pricing suggestion (GPT-4)
- [ ] Generate Instagram caption (GPT-4)
- [ ] Test negotiation bot (GPT-4)
- [ ] Verify caching (check console logs)

### **Tier 3 Features (Optional)**
- [ ] Voice input (browser vs Azure)
- [ ] Text-to-speech (browser vs Azure)
- [ ] Translation (static UI vs dynamic)

---

## 🚀 Launch Readiness

### **Before Public Launch**
- [ ] All Tier 1 features working
- [ ] Azure costs confirmed <$10/month
- [ ] Cost alerts configured
- [ ] 10+ test artisans with real data
- [ ] 100+ test products uploaded

### **Post-Launch Monitoring (First Week)**
- [ ] Daily Azure cost checks
- [ ] API usage patterns
- [ ] Cache hit rates (should be >70%)
- [ ] User feedback on AI features

---

## 💰 Budget Projections

### **Conservative (Tier 1 Only)**
```
Month 1: $2-5   (setup + testing)
Month 2-6: $1-2 (steady state)
Total 6 months: $10-15 (from $200 credit)
Remaining: $185-190
```

### **Balanced (Tier 1 + Tier 2)**
```
Month 1: $5-10  (setup + testing)
Month 2-6: $4-8 (steady state)
Total 6 months: $25-50 (from $200 credit)
Remaining: $150-175
```

### **Full (All Tiers)**
```
Month 1: $8-15  (setup + testing)
Month 2-6: $5-12 (steady state)
Total 6 months: $33-75 (from $200 credit)
Remaining: $125-167
```

**Recommendation:** Start with Balanced, upgrade to Full only if credits allow

---

## ⚠️ Red Flags to Watch

### **Cost Warnings**
- ❌ Costs >$10 in first week → Disable GPT-4, use fallbacks
- ❌ Cache hit rate <50% → Increase cache durations
- ❌ >1000 API calls/day → Add rate limiting

### **Technical Issues**
- ❌ Images not uploading → Check Storage Account permissions
- ❌ "CORS error" → Verify endpoint URLs have trailing `/`
- ❌ "401 Unauthorized" → Check API keys (no extra spaces)

---

## 🎯 Success Metrics

### **Week 1 Targets**
- [ ] 10 artisans onboarded
- [ ] 50 products uploaded
- [ ] 100 images enhanced
- [ ] Azure costs <$5

### **Week 4 Targets**
- [ ] 50 artisans active
- [ ] 200 products live
- [ ] 500 AI pricing calls
- [ ] Azure costs <$15 total
- [ ] 70%+ cache hit rate

---

## 📞 Support Resources

**Azure Issues:**
- [Azure Portal](https://portal.azure.com)
- [Azure Support](https://azure.microsoft.com/en-us/support/)
- [Cost Management Guide](https://learn.microsoft.com/en-us/azure/cost-management-billing/)

**Kalaikatha Docs:**
- [AZURE_MVP_PRIORITY.md](AZURE_MVP_PRIORITY.md) - Feature priorities
- [ENV_SETUP.md](ENV_SETUP.md) - Setup guide
- [FEATURES.md](FEATURES.md) - What's built
- [TECHNICAL.md](TECHNICAL.md) - Architecture

---

**Ready to launch?** Start with Phase 1, monitor costs daily, scale gradually! 🚀
