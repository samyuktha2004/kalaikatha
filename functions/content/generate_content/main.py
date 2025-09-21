"""
Content generation using Vertex AI for product descriptions.
This module provides an HTTP function to generate compelling product descriptions
using Google's Vertex AI Gemini model, focusing on cultural and artisanal aspects.

Optimization Note: Consider caching the AI model initialization globally to avoid
reinitializing on each request, which can improve performance and reduce latency.
"""

import functions_framework
import os
import json
from typing import Dict, Any
from google.cloud import aiplatform
from common.firebase_init import firebase_app

# Initialize Vertex AI
aiplatform.init(project=os.getenv('GOOGLE_CLOUD_PROJECT', 'kalaikatha-dev'))
model = aiplatform.Model("gemini-pro")

def generate_prompt(data):
    """Generate prompt for content generation."""
    return f"""Create a compelling product description and story for this handcrafted item:
    Category: {data.get('category', 'craft')}
    Style: {data.get('style', 'traditional')}
    Keywords: {', '.join(data.get('keywords', []))}
    Image URL: {data.get('image_url', '')}
    
    Please provide:
    1. A detailed product description (150-200 words)
    2. The artisan's story behind this piece (100-150 words)
    
    Format the response as JSON with 'description' and 'story' fields."""

@functions_framework.http
def generate_content(request):
    """Generate product content using Vertex AI."""
    # Handle CORS preflight requests
    if request.method == 'OPTIONS':
        headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Allow-Headers': 'Content-Type,Authorization',
            'Access-Control-Max-Age': '3600'
        }
        return ('', 204, headers)

    # Set CORS headers for main request
    headers = {'Access-Control-Allow-Origin': '*'}

    try:
        request_json = request.get_json()
        if not request_json:
            raise ValueError("No request data provided")

        # Generate the prompt
        prompt = generate_prompt(request_json)
        
        # Generate content
        response = model.predict(prompt)
        content = json.loads(response.predictions[0])
        
        return ({
            'success': True,
            'content': content['description'],
            'story': content['story']
        }, 200, headers)

    except Exception as e:
        return ({
            'success': False,
            'error': str(e)
        }, 500, headers)

def _create_prompt(product_details: dict[str, Any]) -> str:
    """
    Creates an optimized prompt for the AI model based on product details.

    The prompt is designed to generate descriptions that highlight cultural
    significance, traditional craftsmanship, and unique artisan features.

    Args:
        product_details: Dictionary containing product information including
                        name, category, materials, and technique.

    Returns:
        str: Formatted prompt string for the AI model.
    """
    return f"""
    Create a compelling product description for:
    Product: {product_details.get('name', '')}
    Category: {product_details.get('category', '')}
    Materials: {product_details.get('materials', [])}
    Technique: {product_details.get('technique', '')}

    Focus on cultural significance and craftsmanship.
    Include origin and traditional importance.
    Highlight unique features and artisan expertise.
    """

if __name__ == "__main__":
    # This is used when running locally only
    import os
    os.environ["GOOGLE_CLOUD_PROJECT"] = "your-project-id"
    functions_framework.run(port=8080)
