/**
 * Azure Services Verification Script
 * Run this in browser console to verify all services are configured
 */

console.log('🔍 Verifying Azure Services Configuration...\n');

// Check environment variables
const checks = {
  'Computer Vision': {
    endpoint: import.meta.env.VITE_AZURE_VISION_ENDPOINT,
    key: import.meta.env.VITE_AZURE_VISION_KEY
  },
  'OpenAI GPT-4': {
    endpoint: import.meta.env.VITE_AZURE_OPENAI_ENDPOINT,
    key: import.meta.env.VITE_AZURE_OPENAI_KEY,
    deployment: import.meta.env.VITE_AZURE_OPENAI_DEPLOYMENT
  },
  'Translator': {
    key: import.meta.env.VITE_AZURE_TRANSLATOR_KEY,
    region: import.meta.env.VITE_AZURE_TRANSLATOR_REGION
  },
  'Speech Services': {
    key: import.meta.env.VITE_AZURE_SPEECH_KEY,
    region: import.meta.env.VITE_AZURE_SPEECH_REGION
  },
  'Blob Storage': {
    account: import.meta.env.VITE_AZURE_STORAGE_ACCOUNT,
    key: import.meta.env.VITE_AZURE_STORAGE_KEY,
    container: import.meta.env.VITE_AZURE_STORAGE_CONTAINER
  },
  'Firebase': {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID
  }
};

let allConfigured = true;

Object.entries(checks).forEach(([service, config]) => {
  const isConfigured = Object.values(config).every(val => val && val !== '');
  const status = isConfigured ? '✅' : '❌';
  console.log(`${status} ${service}: ${isConfigured ? 'Configured' : 'Missing credentials'}`);
  if (!isConfigured) {
    allConfigured = false;
    console.log('   Missing:', Object.entries(config)
      .filter(([k, v]) => !v || v === '')
      .map(([k]) => k)
      .join(', '));
  }
});

console.log('\n' + (allConfigured ? '✅ All Azure services are configured!' : '❌ Some services are missing credentials'));

export default checks;
