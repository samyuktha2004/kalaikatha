"""
Cloud Function to enhance uploaded images using Cloud Vision API and Pillow.

This function is triggered by Cloud Storage events (google.storage.object.finalize)
on the kalakatha-uploads bucket. It analyzes the image with Cloud Vision API,
applies conditional enhancements like sharpening and compression using Pillow,
and saves the enhanced image to the kalakatha-processed bucket.
Optimized for performance with conditional processing and efficient memory usage.
"""
import functions_framework
from google.cloud import storage
from google.cloud import vision
from PIL import Image, ImageEnhance, ImageFilter
import os
from io import BytesIO

# Initialize clients globally for performance
storage_client = storage.Client()
vision_client = vision.ImageAnnotatorClient()

# Thresholds for conditional enhancement
LIGHTING_SCORE_THRESHOLD = 0.3

def analyze_image_quality(image_content):
    """
    Analyze image quality using Cloud Vision API.
    Returns dict with quality metrics.
    """
    image = vision.Image(content=image_content)

    # Get image properties for lighting analysis
    props_response = vision_client.image_properties(image=image)
    props = props_response.image_properties_annotation

    # Calculate lighting score based on dominant colors
    color_score = sum(color.fraction for color in props.dominant_colors.colors)

    # Get safe search for content moderation
    safe_response = vision_client.safe_search_detection(image=image)
    safe_search = safe_response.safe_search_annotation

    # Get labels for metadata
    labels_response = vision_client.label_detection(image=image)
    labels = [label.description for label in labels_response.label_annotations[:5]]

    return {
        'lighting_score': color_score,
        'safe_search': safe_search,
        'labels': labels
    }

def enhance_image(image_bytes, needs_enhancement):
    """
    Apply conditional image enhancements using Pillow.
    Optimized to work in memory without temporary files.
    """
    with Image.open(BytesIO(image_bytes)) as img:
        # Convert to RGB if necessary
        if img.mode not in ('RGB', 'L'):
            img = img.convert('RGB')

        if needs_enhancement:
            # Apply sharpening filter
            img = img.filter(ImageFilter.SHARPEN)

            # Increase brightness slightly
            enhancer = ImageEnhance.Brightness(img)
            img = enhancer.enhance(1.2)

            # Increase contrast
            enhancer = ImageEnhance.Contrast(img)
            img = enhancer.enhance(1.1)

        # Save to memory buffer with compression
        output_buffer = BytesIO()
        img.save(output_buffer, 'JPEG', quality=85, optimize=True)
        return output_buffer.getvalue()

@functions_framework.cloud_event
def enhance_image_trigger(cloud_event):
    """
    Optimized event-driven Cloud Function to enhance uploaded images.

    Features:
    - Conditional enhancement based on image quality analysis
    - In-memory processing to reduce I/O
    - Content moderation with safe search
    - Metadata enrichment with labels
    """
    data = cloud_event.data
    bucket_name = data["bucket"]
    file_name = data["name"]

    # Only process images from the specified uploads bucket
    if bucket_name != "kalakatha-uploads":
        print(f"Skipping {file_name} from bucket {bucket_name}")
        return

    # Skip non-image files
    if not file_name.lower().endswith(('.png', '.jpg', '.jpeg', '.gif', '.bmp')):
        print(f"Skipping non-image file: {file_name}")
        return

    try:
        # Download image to memory
        bucket = storage_client.bucket(bucket_name)
        blob = bucket.blob(file_name)
        image_bytes = blob.download_as_bytes()

        # Analyze image quality
        analysis = analyze_image_quality(image_bytes)

        # Content moderation
        if (analysis['safe_search'].adult > 3 or analysis['safe_search'].violence > 3):
            print(f"Image {file_name} rejected due to content policy")
            return

        # Determine if enhancement is needed
        needs_enhancement = analysis['lighting_score'] < LIGHTING_SCORE_THRESHOLD

        # Apply enhancements
        enhanced_bytes = enhance_image(image_bytes, needs_enhancement)

        # Upload enhanced image
        output_bucket = storage_client.bucket("kalakatha-processed")
        output_blob = output_bucket.blob(file_name)
        output_blob.upload_from_string(enhanced_bytes, content_type='image/jpeg')

        # Add metadata
        metadata = {
            'labels': ','.join(analysis['labels']),
            'enhanced': str(needs_enhancement).lower(),
            'lighting_score': f"{analysis['lighting_score']:.3f}",
            'safe_search_adult': str(analysis['safe_search'].adult),
            'safe_search_violence': str(analysis['safe_search'].violence)
        }
        output_blob.metadata = metadata
        output_blob.patch()

        print(f"Successfully processed {file_name} (enhanced: {needs_enhancement})")

    except Exception as e:
        print(f"Error processing {file_name}: {str(e)}")
        raise
