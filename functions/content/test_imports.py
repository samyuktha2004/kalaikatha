#!/usr/bin/env python3
"""Test script to verify all dependencies are installed and can be imported."""

try:
    import firebase_admin
    print("✓ firebase_admin imported successfully")
except ImportError as e:
    print(f"✗ firebase_admin import failed: {e}")

try:
    from google.cloud import aiplatform
    print("✓ google.cloud.aiplatform imported successfully")
except ImportError as e:
    print(f"✗ google.cloud.aiplatform import failed: {e}")

try:
    from google.cloud import storage
    print("✓ google.cloud.storage imported successfully")
except ImportError as e:
    print(f"✗ google.cloud.storage import failed: {e}")

try:
    from google.cloud import firestore
    print("✓ google.cloud.firestore imported successfully")
except ImportError as e:
    print(f"✗ google.cloud.firestore import failed: {e}")

try:
    import functions_framework
    print("✓ functions_framework imported successfully")
except ImportError as e:
    print(f"✗ functions_framework import failed: {e}")

try:
    from PIL import Image
    print("✓ PIL (Pillow) imported successfully")
except ImportError as e:
    print(f"✗ PIL import failed: {e}")

try:
    import requests
    print("✓ requests imported successfully")
except ImportError as e:
    print(f"✗ requests import failed: {e}")

try:
    import cv2
    print("✓ opencv-python imported successfully")
except ImportError as e:
    print(f"✗ opencv-python import failed: {e}")

print("\nAll dependency checks completed.")
