#!/usr/bin/env python3
"""
Test script to verify that all dependencies for the functions feature can be imported successfully.
"""

def test_imports():
    try:
        import firebase_admin
        print("✓ firebase_admin imported successfully")
    except ImportError as e:
        print(f"✗ firebase_admin import failed: {e}")
        return False

    try:
        from google.cloud import aiplatform
        print("✓ google-cloud-aiplatform imported successfully")
    except ImportError as e:
        print(f"✗ google-cloud-aiplatform import failed: {e}")
        return False

    try:
        import PIL
        print("✓ PIL (Pillow) imported successfully")
    except ImportError as e:
        print(f"✗ PIL (Pillow) import failed: {e}")
        return False

    try:
        import requests
        print("✓ requests imported successfully")
    except ImportError as e:
        print(f"✗ requests import failed: {e}")
        return False

    try:
        import razorpay
        print("✓ razorpay imported successfully")
    except ImportError as e:
        print(f"✗ razorpay import failed: {e}")
        return False

    try:
        from google.cloud import vision
        print("✓ google-cloud-vision imported successfully")
    except ImportError as e:
        print(f"✗ google-cloud-vision import failed: {e}")
        return False

    print("\nAll dependency checks completed.")
    return True

if __name__ == "__main__":
    test_imports()
