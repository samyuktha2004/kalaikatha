#!/usr/bin/env python3
"""Test script to verify Firebase connectivity."""

import os

# Set credentials
os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = '/Users/supriyarao/visual\ studio/kalaikatha/kalakatha-34eba-fdfa4a842dc5.json'
os.environ['GOOGLE_CLOUD_PROJECT'] = 'kalaikatha-dev'

try:
    from functions.common.firebase_init import firebase_app
    print("✓ Firebase app initialized successfully")
except Exception as e:
    print(f"✗ Firebase initialization failed: {e}")

try:
    from google.cloud import firestore
    db = firestore.Client()
    print("✓ Firestore client created successfully")
except Exception as e:
    print(f"✗ Firestore client creation failed: {e}")

try:
    from google.cloud import storage
    client = storage.Client()
    print("✓ Storage client created successfully")
except Exception as e:
    print(f"✗ Storage client creation failed: {e}")

print("\nConnectivity checks completed.")
