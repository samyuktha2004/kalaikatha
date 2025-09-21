import os
from io import BytesIO

from PIL import Image, ImageFilter, ImageEnhance
from google.cloud import storage, vision

# Initialize Cloud clients.
# It's a best practice to initialize clients outside the function handler
# to reuse them across function invocations.
storage_client = storage.Client()
vision_client = vision.ImageAnnotatorClient()

# Get the destination bucket from an environment variable.
DESTINATION_BUCKET = os.environ.get('DESTINATION_BUCKET_NAME')
# Define a threshold for what is considered a "low quality" lighting score.
LIGHTING_SCORE_THRESHOLD = 0.3

def enhance_image(event, context):
    """
    A Cloud Function triggered by a Cloud Storage event.
    1.  Analyzes image properties using the Cloud Vision API.
    2.  If lighting is poor, applies sharpening and brightness enhancements.
    3.  Compresses and saves the result to a different bucket.
    """
    source_bucket_name = event['bucket']
    file_name = event['name']

    # --- Pre-flight Checks ---
    if not DESTINATION_BUCKET:
        print("ERROR: DESTINATION_BUCKET_NAME environment variable not set.")
        return

    # Avoid infinite loops by ensuring the source is not the destination.
    if source_bucket_name == DESTINATION_BUCKET:
        print(f"Skipping file '{file_name}' to prevent recursive triggers.")
        return

    print(f"Processing file: {file_name} from bucket: {source_bucket_name}.")

    # --- 1. Download the Image ---
    source_bucket = storage_client.bucket(source_bucket_name)
    source_blob = source_bucket.blob(file_name)
    image_bytes = source_blob.download_as_bytes()

    # --- 2. Analyze Image with Cloud Vision API ---
    needs_enhancement = False
    try:
        image_for_vision = vision.Image(content=image_bytes)
        response = vision_client.image_properties(image=image_for_vision)
        props = response.image_properties_annotation

        # Check for poor lighting conditions.
        # This is a simple heuristic: if the image is dominated by very dark or
        # very bright colors, the fraction scores will be high. We check if the
        # combined score of mid-range colors is low.
        color_score = sum(color.fraction for color in props.dominant_colors.colors)
        if color_score < LIGHTING_SCORE_THRESHOLD:
            print(f"Low lighting score detected ({color_score:.2f}). Scheduling enhancement.")
            needs_enhancement = True
        else:
            print(f"Image quality appears acceptable (score: {color_score:.2f}). Skipping enhancement.")

        # Note: The Vision API does not provide a direct 'blurriness' score.
        # Advanced blur detection would require custom models or complex algorithms.

    except Exception as e:
        print(f"Error during Vision API analysis: {e}. Proceeding with compression only.")


    # --- 3. Enhance and Compress Image with Pillow ---
    with Image.open(BytesIO(image_bytes)) as img:
        if needs_enhancement:
            print("Applying sharpening and brightness enhancement...")
            # Apply a sharpening filter
            sharpened_img = img.filter(ImageFilter.SHARPEN)
            # Increase brightness slightly
            enhancer = ImageEnhance.Brightness(sharpened_img)
            final_img = enhancer.enhance(1.2) # Increase brightness by 20%
        else:
            final_img = img

        # Save the processed image to an in-memory buffer with compression.
        output_buffer = BytesIO()
        # Ensure image is in a saveable format like RGB
        if final_img.mode in ("RGBA", "P"):
            final_img = final_img.convert("RGB")
        final_img.save(output_buffer, "JPEG", quality=85) # Apply 85% quality compression
        output_bytes = output_buffer.getvalue()


    # --- 4. Upload Enhanced Image to Destination Bucket ---
    destination_bucket = storage_client.bucket(DESTINATION_BUCKET)
    destination_blob = destination_bucket.blob(file_name)

    # Use the original content type if available
    content_type = source_blob.content_type or 'image/jpeg'
    destination_blob.upload_from_string(output_bytes, content_type=content_type)

    print(f"Successfully processed and saved '{file_name}' to bucket '{DESTINATION_BUCKET}'.")