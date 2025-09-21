#!/usr/bin/env python3
"""Test script to verify that all required dependencies can be imported."""

def test_imports():
    try:
        import firebase_admin
        print("✓ firebase_admin imported successfully")
        
        from google.cloud import storage
        print("✓ google.cloud.storage imported successfully")
        
        from google.cloud import firestore
        print("✓ google.cloud.firestore imported successfully")
        
        from google.cloud import vision
        print("✓ google.cloud.vision imported successfully")
        
        from google.cloud import texttospeech
        print("✓ google.cloud.texttospeech imported successfully")
        
        from google.cloud import speech
        print("✓ google.cloud.speech imported successfully")
        
        import google.cloud.aiplatform as aiplatform
        print("✓ google.cloud.aiplatform imported successfully")
        
        import functions_framework
        print("✓ functions_framework imported successfully")
        
        from PIL import Image
        print("✓ PIL.Image imported successfully")
        
        import razorpay
        print("✓ razorpay imported successfully")
        
        print("All imports successful!")
        return True
    except ImportError as e:
        print(f"✗ Import failed: {e}")
        return False

if __name__ == "__main__":
    success = test_imports()
    exit(0 if success else 1)
