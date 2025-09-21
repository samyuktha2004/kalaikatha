const BASE_URL = import.meta.env.DEV
  ? 'http://localhost:5003/kalakatha-34eba/us-central1'
  : 'https://us-central1-kalakatha-34eba.cloudfunctions.net';

export const api = {
  helloWorld: async () => {
    const response = await fetch(`${BASE_URL}/hello_world`);
    if (!response.ok) throw new Error('Failed to fetch hello world');
    return response.json();
  },

  generateContent: async (data) => {
    const response = await fetch(`${BASE_URL}/generate_content`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to generate content');
    return response.json();
  },

  suggestPrice: async (data) => {
    const response = await fetch(`${BASE_URL}/suggest_price`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to suggest price');
    return response.json();
  },

  voiceToText: async (audioBlob) => {
    const formData = new FormData();
    formData.append('audio', audioBlob);
    const response = await fetch(`${BASE_URL}/voice_to_text`, {
      method: 'POST',
      body: formData,
    });
    if (!response.ok) throw new Error('Failed to convert voice to text');
    return response.json();
  },

  textToVoice: async (data) => {
    const response = await fetch(`${BASE_URL}/text_to_voice`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to convert text to voice');
    return response.blob();
  },

  calculateShipping: async (data) => {
    const response = await fetch(`${BASE_URL}/calculate_shipping`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to calculate shipping');
    return response.json();
  },

  processPayment: async (data) => {
    const response = await fetch(`${BASE_URL}/process_payment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to process payment');
    return response.json();
  },

  getAnalyticsData: async () => {
    const response = await fetch(`${BASE_URL}/get_analytics_data`);
    if (!response.ok) throw new Error('Failed to get analytics data');
    return response.json();
  },

  findPartners: async (data) => {
    const response = await fetch(`${BASE_URL}/find_partners`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to find partners');
    return response.json();
  },
};
