"""Shipping calculation function."""
import functions_framework
from ...common.auth import verify_token
from ...common.error_handling import handle_errors

@functions_framework.http
@handle_errors
def calculate_shipping(request):
    """Calculate shipping costs based on weight and pincode."""
    user = verify_token(request)
    
    request_json = request.get_json()
    if not request_json:
        raise ValueError("No request data provided")
        
    weight_grams = request_json.get('weight_grams', 0)
    destination_pincode = request_json.get('destination_pincode')
    
    if not destination_pincode:
        raise ValueError("Missing destination pincode")
    
    # Mock shipping calculation logic
    base_rate = 50  # Base shipping rate in INR
    weight_rate = 0.1  # Rate per gram
    shipping_cost = base_rate + (weight_grams * weight_rate)
    
    # Provide multiple shipping options
    options = [
        {
            "provider": "Standard Delivery",
            "cost": round(shipping_cost),
            "eta_days": 3
        },
        {
            "provider": "Express Delivery",
            "cost": round(shipping_cost * 1.5),
            "eta_days": 1
        }
    ]
    
    return {"success": True, "options": options}