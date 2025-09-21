const functions = require('firebase-functions');

exports.hello_world = functions.https.onRequest((request, response) => {
  // Handle CORS preflight requests
  if (request.method === 'OPTIONS') {
    response.set('Access-Control-Allow-Origin', '*');
    response.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
    response.set('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    response.set('Access-Control-Allow-Credentials', 'true');
    response.set('Access-Control-Max-Age', '3600');
    response.status(204).send('');
    return;
  }

  // Set CORS headers for main request
  response.set('Access-Control-Allow-Origin', '*');
  response.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
  response.set('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  response.set('Access-Control-Allow-Credentials', 'true');

  // Add CORS header to allow requests from localhost:5174 (frontend dev server)
  // Changed to allow all origins for development
  response.set('Access-Control-Allow-Origin', '*');

  response.json({ message: 'hello world' });
});
