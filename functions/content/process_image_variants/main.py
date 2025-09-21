"""Cloud Function to generate responsive image variants in WebP format."""
import functions_framework
from google.cloud import storage
from PIL import Image
import io
import os

storage_client = storage.Client()

VARIANTS = {
    'thumbnail': (200, 200),
    'medium': (800, 800),
    'large': None  # Original size
}

def resize_and_convert_to_webp(image, size=None):
    """Resize image and convert to WebP format."""
    if size:
        image.thumbnail(size, Image.Resampling.LANCZOS)
    
    # Convert to RGB if necessary (WebP doesn't support RGBA)
    if image.mode in ('RGBA', 'P'):
        image = image.convert('RGB')
    
    # Save as WebP with high quality
    output = io.BytesIO()
    image.save(output, format='WebP', quality=90, method=6)
    output.seek(0)
    return output

@functions_framework.cloud_event
def process_image_variants(cloud_event):
    """Generate responsive image variants when an image is uploaded."""
    data = cloud_event.data

    bucket_name = data["bucket"]
    file_name = data["name"]
    
    # Skip if not in uploads bucket or already processed
    if bucket_name != "kalakatha-uploads" or '/variants/' in file_name:
        return

    try:
        # Get source bucket and blob
        bucket = storage_client.bucket(bucket_name)
        source_blob = bucket.blob(file_name)
        
        # Download source image
        image_data = io.BytesIO()
        source_blob.download_to_file(image_data)
        image_data.seek(0)
        image = Image.open(image_data)

        # Generate base path for variants
        file_path, file_ext = os.path.splitext(file_name)
        
        # Process each variant
        for variant_name, size in VARIANTS.items():
            # Create variant path
            variant_path = f"{file_path}/variants/{variant_name}.webp"
            
            # Create and upload variant
            variant_blob = bucket.blob(variant_path)
            variant_data = resize_and_convert_to_webp(image.copy(), size)
            variant_blob.upload_from_file(
                variant_data, 
                content_type='image/webp',
                predefined_acl='publicRead'
            )
            
            # Add metadata
            width, height = image.size
            variant_blob.metadata = {
                'width': str(width),
                'height': str(height),
                'variant': variant_name,
                'original_name': file_name
            }
            variant_blob.patch()

        print(f"Successfully processed variants for {file_name}")
        
    except Exception as e:
        print(f"Error processing {file_name}: {str(e)}")
        raise
    finally:
        # Cleanup
        if 'image_data' in locals():
            image_data.close()
        if 'variant_data' in locals():
            variant_data.close()