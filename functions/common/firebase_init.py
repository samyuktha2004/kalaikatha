"""Shared Firebase initialization module."""
import os
import firebase_admin
from firebase_admin import credentials

def get_firebase_app():
    """Get or create Firebase app instance."""
    try:
        return firebase_admin.get_app()
    except ValueError:
        cred = credentials.ApplicationDefault()
        return firebase_admin.initialize_app(cred, {
            'projectId': os.getenv('GOOGLE_CLOUD_PROJECT', 'kalaikatha-dev')
        })

# Initialize Firebase on module import
firebase_app = get_firebase_app()