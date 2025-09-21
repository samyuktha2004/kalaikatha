import functions_framework
from flask import jsonify
from google.cloud import aiplatform

# Initialize the Vertex AI client (ensure your Cloud Function has the necessary permissions)
aiplatform.init(location="asia-east1") # Replace with your desired Vertex AI region (e.g., us-central1)
model = aiplatform.GenerativeModel(model_name="gemini-pro") # Or gemini-pro-vision for multimodal input

@functions_framework.http
def generate_content(request):
    """
    HTTP Cloud Function to generate content using Vertex AI's Gemini API.

    Expected JSON payload:
    {
        "image_url": "...",
        "keywords": ["...", "..."],
        "content_type": "website|amazon|etsy|social_media"
    }
    """
    if request.method != 'POST':
        return jsonify({"error": "Method not allowed"}), 405

    request_json = request.get_json(silent=True)
    if not request_json:
        return jsonify({"error": "Invalid JSON payload"}), 400

    image_url = request_json.get('image_url')
    keywords = request_json.get('keywords')
    content_type = request_json.get('content_type')

    if not all([image_url, keywords, content_type]):
        return jsonify({"error": "Missing required parameters (image_url, keywords, content_type)"}), 400

    try:
        prompt = _construct_prompt(image_url, keywords, content_type)
        print(f"Generated Prompt: {prompt}") # For debugging

        # **Integration with Gemini API (Conceptual)**
        # Replace this with actual Vertex AI SDK call
        response = model.generate_content(
            prompt,
            generation_config={
                "max_output_tokens": 2048, # Adjust as needed
                "temperature": 0.7,      # Adjust for creativity
                "top_p": 0.8               # Adjust for sampling
            },
        )

        generated_text = response.text

        # Format the output based on the content type
        formatted_content = _format_content(generated_text, content_type)

        return jsonify({"generated_content": formatted_content}), 200

    except Exception as e:
        print(f"Error generating content: {e}")
        return jsonify({"error": f"Failed to generate content: {e}"}), 500

def _construct_prompt(image_url, keywords, content_type):
    """Constructs the prompt for the Gemini API based on the content type."""
    base_prompt = f"Generate content related to an image at this URL: {image_url}. " \
                  f"The main keywords are: {', '.join(keywords)}. "

    if content_type == "website":
        return base_prompt + "Write a long-form story or article that is engaging and informative."
    elif content_type == "amazon":
        return base_prompt + "Create a compelling product description suitable for Amazon, highlighting key features and benefits."
    elif content_type == "etsy":
        return base_prompt + "Generate an appealing product description for Etsy, emphasizing the craftsmanship and uniqueness."
    elif content_type == "social_media":
        return base_prompt + "Create a few short, engaging text blocks suitable for different social media platforms (e.g., Instagram, Twitter, Facebook). Include relevant hashtags."
    else:
        raise ValueError(f"Unsupported content type: {content_type}")

def _format_content(generated_text, content_type):
    """Formats the generated text based on the content type."""
    if content_type == "website":
        return {"long_form_story": generated_text}
    elif content_type == "amazon":
        return {"product_description": generated_text}
    elif content_type == "etsy":
        # You might want to further refine the Etsy description here
        return {"etsy_description": generated_text}
    elif content_type == "social_media":
        # Split the generated text into suitable social media posts
        # This will depend on how Gemini structures the output
        return {"social_media_posts": generated_text.split("\n\n")} # Example split
    else:
        return {"raw_text": generated_text}