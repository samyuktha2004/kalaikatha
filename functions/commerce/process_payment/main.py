"""Payment processing function using Razorpay."""
import functions_framework
import razorpay
import os
from ...common.auth import verify_token
from ...common.error_handling import handle_errors

client = razorpay.Client(
    auth=(os.getenv('RAZORPAY_KEY_ID'), os.getenv('RAZORPAY_SECRET_KEY'))
)

@functions_framework.http
@handle_errors
def process_payment(request):
    """Create Razorpay order and return order_id."""
    user = verify_token(request)
    
    request_json = request.get_json()
    if not request_json:
        raise ValueError("No request data provided")
        
    amount = request_json.get('amount')
    currency = request_json.get('currency', 'INR')
    receipt = request_json.get('receipt')
    
    if not amount:
        raise ValueError("Amount is required")
    
    # Create Razorpay order
    order_data = {
        'amount': int(amount * 100),  # Convert to paise
        'currency': currency,
        'receipt': receipt,
        'payment_capture': 1
    }
    
    order = client.order.create(data=order_data)
    
    return {
        "success": True,
        "order_id": order['id'],
        "amount": order['amount'] / 100  # Convert back to rupees
    }