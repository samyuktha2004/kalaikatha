"""Cloud Function to trigger content generation when images are processed."""
import functions_framework
from google.cloud import storage
from google.cloud import firestore
from ..generate_content.main import generate_content
import json

storage_client = storage.Client()
db = firestore.Client()

@functions_framework.cloud_event
def generate_content_trigger(cloud_event):
    """Generate content when a processed image is uploaded."""
    data = cloud_event.data

    bucket_name = data["bucket"]
    file_name = data["name"]
    
    # Only trigger for processed images bucket
    if bucket_name != "kalakatha-processed":
        return

    try:
        # Get the processed image blob
        bucket = storage_client.bucket(bucket_name)
        blob = bucket.blob(file_name)
        
        # Get image metadata (labels from Vision API)
        metadata = blob.metadata or {}
        labels = metadata.get('labels', '').split(',')
        
        # Generate public URL for the image
        image_url = f"https://storage.googleapis.com/{bucket_name}/{file_name}"
        
        # Prepare product details for content generation
        product_details = {
            "image_url": image_url,
            "keywords": labels,
            "category": labels[0] if labels else "craft",  # Use first label as category
            "style": "traditional Indian"
        }

        # Generate content using our existing function
        content_response = generate_content({
            "json": lambda: product_details,
            "get_json": lambda: product_details
        })
        
        if not content_response.get('success'):
            raise Exception("Content generation failed")

        # Create new product document in Firestore
        product_ref = db.collection('products').document()
        product_ref.set({
            'image_url': image_url,
            'description': content_response['content'],
            'labels': labels,
            'metadata': metadata,
            'status': 'draft',
            'created_at': firestore.SERVER_TIMESTAMP
        })

        print(f"Successfully generated content for {file_name}")
        
    except Exception as e:
        print(f"Error processing {file_name}: {str(e)}")
        raise