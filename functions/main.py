"""Main entry point for Cloud Functions."""
import functions_framework
from content.generate_content.main import generate_content
from commerce.suggest_price.main import suggest_price
from voice.voice_to_text.main import voice_to_text
from voice.text_to_voice.main import text_to_voice
from commerce.calculate_shipping.main import calculate_shipping
from commerce.process_payment.main import process_payment
from commerce.get_analytics_data.main import get_analytics_data
from collaboration.collaborate import find_partners
from common.firebase_init import firebase_app

@functions_framework.http
def hello_world(request):
    """Simple hello world function for testing connectivity."""
    # Handle CORS preflight requests
    if request.method == 'OPTIONS':
        headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type,Authorization',
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Max-Age': '3600'
        }
        return ('', 204, headers)

    # Set CORS headers for main request
    headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type,Authorization',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Expose-Headers': 'Content-Type,Authorization'
    }

    return ({
        'message': 'hello world'
    }, 200, headers)

# Re-export all HTTP functions for deployment
generate_content = generate_content
suggest_price = suggest_price
voice_to_text = voice_to_text
text_to_voice = text_to_voice
calculate_shipping = calculate_shipping
process_payment = process_payment
get_analytics_data = get_analytics_data
find_partners = find_partners
hello_world = hello_world
