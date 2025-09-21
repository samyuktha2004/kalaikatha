"""
Main entry point for Firebase Cloud Functions.
This file contains the primary function definitions and global configurations.
"""

from firebase_functions import https_fn
from firebase_functions.options import set_global_options
from firebase_admin import initialize_app
from google.cloud import aiplatform
import json

# Set global options for cost control and performance.
# max_instances limits the number of concurrent containers to prevent cost overruns.
set_global_options(max_instances=10)

# Initialize Firebase Admin SDK for accessing Firebase services.
initialize_app()

# Initialize Vertex AI client and model globally for performance optimization
aiplatform.init(location="us-central1")  # Adjust region as needed
model = aiplatform.GenerativeModel(model_name="gemini-pro")

# Import Cloud Storage triggered functions
from ..content.process_image.main import enhance_image_trigger

@https_fn.on_request()
def generate_content(req: https_fn.Request) -> https_fn.Response:
    """
    HTTP Cloud Function to generate content using Vertex AI's Gemini API.

    Expected JSON payload:
    {
        "image_url": "...",
        "keywords": ["...", "..."],
        "content_type": "website|amazon|etsy|social_media"
    }
    """
    if req.method != 'POST':
        return https_fn.Response(
            json.dumps({"error": "Method not allowed"}),
            status=405,
            headers={"Content-Type": "application/json"}
        )

    try:
        request_json = req.json
    except Exception:
        return https_fn.Response(
            json.dumps({"error": "Invalid JSON payload"}),
            status=400,
            headers={"Content-Type": "application/json"}
        )

    image_url = request_json.get('image_url')
    keywords = request_json.get('keywords')
    content_type = request_json.get('content_type')

    if not all([image_url, keywords, content_type]):
        return https_fn.Response(
            json.dumps({"error": "Missing required parameters (image_url, keywords, content_type)"}),
            status=400,
            headers={"Content-Type": "application/json"}
        )

    try:
        prompt = _construct_prompt(image_url, keywords, content_type)

        response = model.generate_content(
            prompt,
            generation_config={
                "max_output_tokens": 2048,
                "temperature": 0.7,
                "top_p": 0.8
            },
        )

        generated_text = response.text

        formatted_content = _format_content(generated_text, content_type)

        return https_fn.Response(
            json.dumps({"generated_content": formatted_content}),
            status=200,
            headers={"Content-Type": "application/json"}
        )

    except Exception as e:
        return https_fn.Response(
            json.dumps({"error": f"Failed to generate content: {str(e)}"}),
            status=500,
            headers={"Content-Type": "application/json"}
        )

def _construct_prompt(image_url, keywords, content_type):
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
    if content_type == "website":
        return {"long_form_story": generated_text}
    elif content_type == "amazon":
        return {"product_description": generated_text}
    elif content_type == "etsy":
        return {"etsy_description": generated_text}
    elif content_type == "social_media":
        return {"social_media_posts": generated_text.split("\n\n")}
    else:
        return {"raw_text": generated_text}

@https_fn.on_request()
def find_partners(req: https_fn.Request) -> https_fn.Response:
    """
    HTTP Cloud Function to find compatible artisan partners for hackathon demo.

    This is a mock matchmaking engine that returns hard-coded JSON responses
    of 3-5 compatible artisans with human-readable rationale.

    Expected JSON payload:
    {
        "artisan_id": "the_id_of_the_requesting_artisan",
        "style_choices": ["modern", "rustic", "minimalist"]
    }
    """
    if req.method != 'POST':
        return https_fn.Response(
            json.dumps({"error": "Method not allowed"}),
            status=405,
            headers={"Content-Type": "application/json"}
        )

    try:
        request_json = req.json
    except Exception:
        return https_fn.Response(
            json.dumps({"error": "Invalid JSON payload"}),
            status=400,
            headers={"Content-Type": "application/json"}
        )

    # Input validation
    artisan_id = request_json.get('artisan_id')
    style_choices = request_json.get('style_choices')

    if not all([artisan_id, style_choices]):
        return https_fn.Response(
            json.dumps({"error": "Missing 'artisan_id' or 'style_choices'"}),
            status=400,
            headers={"Content-Type": "application/json"}
        )

    if not isinstance(style_choices, list) or len(style_choices) == 0:
        return https_fn.Response(
            json.dumps({"error": "'style_choices' must be a non-empty list"}),
            status=400,
            headers={"Content-Type": "application/json"}
        )

    try:
        # Generate hard-coded matches based on style choices
        matches = _generate_mock_matches(style_choices)

        return https_fn.Response(
            json.dumps({"matches": matches}),
            status=200,
            headers={"Content-Type": "application/json"}
        )

    except Exception as e:
        return https_fn.Response(
            json.dumps({"error": f"An internal server error occurred: {str(e)}"}),
            status=500,
            headers={"Content-Type": "application/json"}
        )

def _generate_mock_matches(style_choices):
    """
    Generate hard-coded mock matches for the hackathon demo.

    This function returns 3-5 compatible artisans with human-readable rationale
    based on the provided style choices.

    Args:
        style_choices: List of preferred styles from moodboard quiz

    Returns:
        List of match dictionaries with profile and reason
    """
    # Mock artisan database for demo purposes
    mock_artisans = [
        {
            "id": "artisan_001",
            "name": "Priya Sharma",
            "craft": "Textile Weaving",
            "location": "Jaipur, India",
            "profile_image_url": "https://example.com/priya.jpg",
            "styles": ["traditional", "rustic", "minimalist"]
        },
        {
            "id": "artisan_002",
            "name": "Ahmed Hassan",
            "craft": "Pottery",
            "location": "Marrakech, Morocco",
            "profile_image_url": "https://example.com/ahmed.jpg",
            "styles": ["modern", "geometric", "minimalist"]
        },
        {
            "id": "artisan_003",
            "name": "Maria Rodriguez",
            "craft": "Jewelry Making",
            "location": "Mexico City, Mexico",
            "profile_image_url": "https://example.com/maria.jpg",
            "styles": ["bohemian", "rustic", "vintage"]
        },
        {
            "id": "artisan_004",
            "name": "Chen Wei",
            "craft": "Wood Carving",
            "location": "Beijing, China",
            "profile_image_url": "https://example.com/chen.jpg",
            "styles": ["traditional", "modern", "minimalist"]
        },
        {
            "id": "artisan_005",
            "name": "Fatima Al-Zahra",
            "craft": "Calligraphy",
            "location": "Istanbul, Turkey",
            "profile_image_url": "https://example.com/fatima.jpg",
            "styles": ["traditional", "elegant", "geometric"]
        }
    ]

    matches = []
    for artisan in mock_artisans:
        # Find shared styles
        shared_styles = list(set(style_choices) & set(artisan["styles"]))

        if shared_styles:  # Only include if there's at least one shared style
            reason = _generate_match_reason(shared_styles, artisan["craft"])

            profile = {
                "id": artisan["id"],
                "name": artisan["name"],
                "craft": artisan["craft"],
                "location": artisan["location"],
                "profile_image_url": artisan["profile_image_url"]
            }

            matches.append({
                "reason": reason,
                "profile": profile
            })

            if len(matches) >= 5:  # Limit to 5 matches
                break

    return matches

def _generate_match_reason(shared_styles, matched_craft):
    """
    Generate a human-readable reason for the match.

    Args:
        shared_styles: List of shared style preferences
        matched_craft: The craft of the matched artisan

    Returns:
        String containing the match rationale
    """
    if len(shared_styles) > 1:
        style_text = f"{' and '.join(shared_styles[:-1])} and {shared_styles[-1]}" if len(shared_styles) > 2 else ' and '.join(shared_styles)
        return f"A great potential match because of your shared interest in {style_text} styles and their expertise in {matched_craft}."
    elif len(shared_styles) == 1:
        return f"A great potential match because of your shared love for the {shared_styles[0]} style and their expertise in {matched_craft}."
    else:
        return f"This artisan's expertise in {matched_craft} could complement your style preferences beautifully."

@https_fn.on_request()
def get_regional_products(req: https_fn.Request) -> https_fn.Response:
    """
    HTTP Cloud Function to get regional products for MVP demo.

    This function returns hard-coded JSON array of 5 products for the requested region.
    For hackathon demo purposes only.

    Expected JSON payload:
    {
        "region": "Rajasthan"
    }
    """
    if req.method != 'POST':
        return https_fn.Response(
            json.dumps({"error": "Method not allowed"}),
            status=405,
            headers={"Content-Type": "application/json"}
        )

    try:
        request_json = req.json
    except Exception:
        return https_fn.Response(
            json.dumps({"error": "Invalid JSON payload"}),
            status=400,
            headers={"Content-Type": "application/json"}
        )

    # Input validation
    region = request_json.get('region')

    if not region:
        return https_fn.Response(
            json.dumps({"error": "Missing 'region' parameter"}),
            status=400,
            headers={"Content-Type": "application/json"}
        )

    try:
        # Generate hard-coded products based on region
        products = _generate_mock_products(region)

        return https_fn.Response(
            json.dumps({"products": products}),
            status=200,
            headers={"Content-Type": "application/json"}
        )

    except Exception as e:
        return https_fn.Response(
            json.dumps({"error": f"An internal server error occurred: {str(e)}"}),
            status=500,
            headers={"Content-Type": "application/json"}
        )

def _generate_mock_products(region):
    """
    Generate hard-coded mock products for the hackathon demo.

    This function returns 5 products with details for the specified region.

    Args:
        region: The region to get products for

    Returns:
        List of product dictionaries
    """
    # Mock product database for demo purposes
    mock_products = {
        "Rajasthan": [
            {
                "id": "prod_001",
                "name": "Blue Pottery Vase",
                "craft": "Pottery",
                "description": "Handcrafted blue pottery vase with traditional geometric patterns",
                "price": 2500,
                "currency": "INR",
                "artisan_name": "Rajesh Kumar",
                "image_url": "https://example.com/rajasthan-pottery.jpg",
                "category": "Home Decor"
            },
            {
                "id": "prod_002",
                "name": "Block Print Scarf",
                "craft": "Textile Printing",
                "description": "Cotton scarf with traditional block printing from Bagru",
                "price": 1200,
                "currency": "INR",
                "artisan_name": "Meera Textiles",
                "image_url": "https://example.com/rajasthan-scarf.jpg",
                "category": "Fashion"
            },
            {
                "id": "prod_003",
                "name": "Meenakari Jewelry Box",
                "craft": "Metal Work",
                "description": "Brass jewelry box with intricate enamel work",
                "price": 3500,
                "currency": "INR",
                "artisan_name": "Jaipur Gems",
                "image_url": "https://example.com/rajasthan-jewelry.jpg",
                "category": "Accessories"
            },
            {
                "id": "prod_004",
                "name": "Leather Camel Saddle",
                "craft": "Leather Work",
                "description": "Traditional camel saddle with intricate leather tooling",
                "price": 4500,
                "currency": "INR",
                "artisan_name": "Desert Crafts",
                "image_url": "https://example.com/rajasthan-saddle.jpg",
                "category": "Home Decor"
            },
            {
                "id": "prod_005",
                "name": "Rajasthani Mirror Work Cushion",
                "craft": "Embroidery",
                "description": "Hand embroidered cushion with mirror work details",
                "price": 1800,
                "currency": "INR",
                "artisan_name": "Rajasthan Crafts",
                "image_url": "https://example.com/rajasthan-cushion.jpg",
                "category": "Home Decor"
            }
        ],
        "Tamil Nadu": [
            {
                "id": "prod_006",
                "name": "Bronze Nataraja Statue",
                "craft": "Bronze Casting",
                "description": "Traditional bronze statue of Lord Nataraja in dancing pose",
                "price": 15000,
                "currency": "INR",
                "artisan_name": "Swami Bronze Works",
                "image_url": "https://example.com/tamil-bronze.jpg",
                "category": "Spiritual"
            },
            {
                "id": "prod_007",
                "name": "Kanchipuram Silk Saree",
                "craft": "Weaving",
                "description": "Pure silk saree with traditional temple border design",
                "price": 8500,
                "currency": "INR",
                "artisan_name": "Kanchipuram Silks",
                "image_url": "https://example.com/tamil-saree.jpg",
                "category": "Fashion"
            },
            {
                "id": "prod_008",
                "name": "Thanjavur Painting",
                "craft": "Painting",
                "description": "Traditional Thanjavur painting on wood with gold foil",
                "price": 12000,
                "currency": "INR",
                "artisan_name": "Thanjavur Arts",
                "image_url": "https://example.com/tamil-painting.jpg",
                "category": "Art"
            },
            {
                "id": "prod_009",
                "name": "Palm Leaf Basket",
                "craft": "Basket Weaving",
                "description": "Handwoven basket from palm leaves with intricate patterns",
                "price": 800,
                "currency": "INR",
                "artisan_name": "Tamil Crafts",
                "image_url": "https://example.com/tamil-basket.jpg",
                "category": "Home Decor"
            },
            {
                "id": "prod_010",
                "name": "Chettinad Tile Work Plate",
                "craft": "Tile Work",
                "description": "Decorative plate with traditional Chettinad tile patterns",
                "price": 2200,
                "currency": "INR",
                "artisan_name": "Chettinad Tiles",
                "image_url": "https://example.com/tamil-plate.jpg",
                "category": "Home Decor"
            }
        ],
        "Kerala": [
            {
                "id": "prod_011",
                "name": "Coconut Shell Carving",
                "craft": "Wood Carving",
                "description": "Intricately carved coconut shell with traditional motifs",
                "price": 1500,
                "currency": "INR",
                "artisan_name": "Kerala Carvers",
                "image_url": "https://example.com/kerala-coconut.jpg",
                "category": "Home Decor"
            },
            {
                "id": "prod_012",
                "name": "Banana Fiber Bag",
                "craft": "Fiber Weaving",
                "description": "Eco-friendly bag made from banana fiber",
                "price": 600,
                "currency": "INR",
                "artisan_name": "Green Crafts",
                "image_url": "https://example.com/kerala-bag.jpg",
                "category": "Fashion"
            },
            {
                "id": "prod_013",
                "name": "Brass Urli",
                "craft": "Metal Work",
                "description": "Traditional Kerala brass vessel for rituals",
                "price": 3200,
                "currency": "INR",
                "artisan_name": "Kerala Metals",
                "image_url": "https://example.com/kerala-urli.jpg",
                "category": "Spiritual"
            },
            {
                "id": "prod_014",
                "name": "Cane Work Lamp",
                "craft": "Cane Work",
                "description": "Handcrafted lamp with cane work details",
                "price": 1800,
                "currency": "INR",
                "artisan_name": "Cane Crafts",
                "image_url": "https://example.com/kerala-lamp.jpg",
                "category": "Home Decor"
            },
            {
                "id": "prod_015",
                "name": "Spice Box Set",
                "craft": "Wood Work",
                "description": "Traditional spice box set with 7 compartments",
                "price": 2500,
                "currency": "INR",
                "artisan_name": "Spice Crafts",
                "image_url": "https://example.com/kerala-spice.jpg",
                "category": "Kitchen"
            }
        ]
    }

    # Return products for the requested region, or default to Rajasthan if not found
    return mock_products.get(region, mock_products.get("Rajasthan", []))
