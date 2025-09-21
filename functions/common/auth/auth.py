"""Authentication utilities for cloud functions."""

import firebase_admin
from firebase_admin import auth, credentials
from typing import Dict, Any
from ..error_handling import KalaikathaError, ErrorType
import functions_framework
from flask import jsonify
from firebase_admin import firestore

def initialize_firebase():
    """Initialize Firebase Admin SDK if not already initialized."""
    try:
        firebase_admin.get_app()
    except ValueError:
        try:
            # Try Application Default Credentials first
            cred = credentials.ApplicationDefault()
            firebase_admin.initialize_app(cred)
        except Exception:
            # For local development, initialize without credentials
            # This allows the function to run locally without Google Cloud setup
            firebase_admin.initialize_app()

def verify_token(request) -> Dict[str, Any]:
    """
    Verify Firebase ID token from the HTTP request.

    Args:
        request: HTTP request object containing Authorization header

    Returns:
        Dict containing user information

    Raises:
        KalaikathaError: If token is missing or invalid
    """
    auth_header = request.headers.get('Authorization')
    if not auth_header:
        raise KalaikathaError(
            ErrorType.AUTH_ERROR,
            "No authentication token provided"
        )
    if not auth_header.startswith('Bearer '):
        raise KalaikathaError(
            ErrorType.AUTH_ERROR,
            "Invalid authorization header format"
        )
    token = auth_header.split('Bearer ')[1]
    try:
        decoded_token = auth.verify_id_token(token)
        return {
            "uid": decoded_token['uid'],
            "email": decoded_token.get('email'),
            "name": decoded_token.get('name'),
            "picture": decoded_token.get('picture')
        }
    except auth.InvalidIdTokenError:
        raise KalaikathaError(
            ErrorType.AUTH_ERROR,
            "Invalid authentication token"
        )
    except Exception as e:
        raise KalaikathaError(
            ErrorType.AUTH_ERROR,
            "Authentication failed",
            {"error": str(e)}
        )

def auth_required(func):
    """
    Decorator to require Firebase authentication for HTTP functions.
    Verifies token and attaches user data to request.
    """
    def wrapper(request, *args, **kwargs):
        user_data = verify_token(request)
        request.user = user_data
        return func(request, *args, **kwargs)
    return wrapper

# Initialize Firebase Admin SDK
initialize_firebase()

# Lazy initialization of Firestore client
_db = None

def get_firestore_client():
    """Get Firestore client with lazy initialization."""
    global _db
    if _db is None:
        try:
            _db = firestore.client()
        except Exception as e:
            # For local development without credentials
            print(f"Warning: Could not initialize Firestore client: {e}")
            _db = None
    return _db

# Initialize db to None for now - will be set when first accessed
db = None

@functions_framework.http
def auth_handler(request):
    """
    HTTP Cloud Function to handle user authentication and data storage.

    Steps:
    1. Verifies a Google ID token from the client.
    2. Checks if the artisan user exists in Firestore.
    3. If the user is new, stores their data.
    4. Returns a custom Firebase authentication token to the client.

    Expected JSON payload:
    {
        "google_id_token": "...",
        "name": "(Optional) The artisan's name",
        "craft": "(Optional) The artisan's craft",
        "location": "(Optional) The artisan's location"
    }
    """
    if request.method != 'POST':
        return jsonify({"error": "Method not allowed"}), 405

    request_json = request.get_json(silent=True)
    if not request_json or 'google_id_token' not in request_json:
        return jsonify({"error": "Invalid request: Missing 'google_id_token'"}), 400

    google_id_token = request_json.get('google_id_token')

    try:
        # Verify the Google ID token from the client
        decoded_token = auth.verify_id_token(google_id_token)
        uid = decoded_token['uid']
        email = decoded_token.get('email')

        # Check if the artisan already exists in Firestore 'artisans' collection
        artisan_ref = db.collection('artisans').document(uid)
        artisan_doc = artisan_ref.get()

        # If the artisan does not exist, create a new record
        if not artisan_doc.exists:
            name = request_json.get('name')
            craft = request_json.get('craft')
            location = request_json.get('location')

            if not all([name, craft, location]):
                return jsonify({"error": "Missing artisan data (name, craft, location) for new user"}), 400

            artisan_data = {
                'name': name,
                'craft': craft,
                'location': location,
                'email': email,
                'created_at': firestore.SERVER_TIMESTAMP,
            }
            artisan_ref.set(artisan_data)
            print(f"New artisan created with UID: {uid}")

        # Create a custom Firebase token for the front-end
        custom_token = auth.create_custom_token(uid)

        # Return the custom token to the client
        return jsonify({"token": custom_token.decode('utf-8')}), 200

    except auth.InvalidIdTokenError:
        return jsonify({"error": "Invalid or expired Google ID token"}), 403
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
        return jsonify({"error": "An internal server error occurred"}), 500
