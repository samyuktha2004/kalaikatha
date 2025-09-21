#!/bin/bash
# Exit on any error
set -e

echo "Building React application..."
cd app
npm run build
cd ..

echo "Deploying Firebase configuration..."
firebase deploy --only firestore:rules,hosting,storage

echo "Deploying Cloud Functions..."

# Deploy process_image function with Cloud Storage trigger
gcloud functions deploy process_image \
  --runtime=python311 \
  --trigger-event=google.storage.object.finalize \
  --trigger-resource=kalakatha-uploads \
  --memory=1024MB \
  --region=us-central1 \
  --source=functions/content/process_image \
  --entry-point=process_image

# Deploy generate_content_trigger function with Cloud Storage trigger
gcloud functions deploy generate_content_trigger \
  --runtime=python311 \
  --trigger-event=google.storage.object.finalize \
  --trigger-resource=kalakatha-processed \
  --memory=512MB \
  --region=us-central1 \
  --source=functions/content/generate_content_trigger \
  --entry-point=generate_content_trigger

# Deploy content generation function
gcloud functions deploy generate_content \
  --runtime=python311 \
  --trigger-http \
  --region=us-central1 \
  --memory=1024MB \
  --source=functions/content/generate_content \
  --entry-point=generate_content

# Deploy voice processing functions
gcloud functions deploy voice_to_text \
  --runtime=python311 \
  --trigger-http \
  --region=us-central1 \
  --memory=256MB \
  --source=functions/voice/voice_to_text \
  --entry-point=voice_to_text

gcloud functions deploy text_to_voice \
  --runtime=python311 \
  --trigger-http \
  --region=us-central1 \
  --memory=256MB \
  --source=functions/voice/text_to_voice \
  --entry-point=text_to_voice

# Deploy commerce functions
gcloud functions deploy calculate_shipping \
  --runtime=python311 \
  --trigger-http \
  --region=us-central1 \
  --memory=256MB \
  --source=functions/commerce/calculate_shipping \
  --entry-point=calculate_shipping

gcloud functions deploy process_payment \
  --runtime=python311 \
  --trigger-http \
  --region=us-central1 \
  --memory=256MB \
  --source=functions/commerce/process_payment \
  --entry-point=process_payment

# Deploy analytics function
gcloud functions deploy get_analytics_data \
  --runtime=python311 \
  --trigger-http \
  --region=us-central1 \
  --memory=256MB \
  --source=functions/commerce/get_analytics_data \
  --entry-point=get_analytics_data

echo "Deployment complete!"