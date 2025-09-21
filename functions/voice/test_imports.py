#!/usr/bin/env python3
"""
Test script to verify that all dependencies for the voice feature can be imported successfully.
"""

def test_imports():
    try:
        import firebase_admin
        print("✓ firebase_admin imported successfully")
    except ImportError as e:
        print(f"✗ firebase_admin import failed: {e}")
        return False

    try:
        from google.cloud import texttospeech
        print("✓ google-cloud-texttospeech imported successfully")
    except ImportError as e:
        print(f"✗ google-cloud-texttospeech import failed: {e}")
        return False

    try:
        from google.cloud import speech
        print("✓ google-cloud-speech imported successfully")
    except ImportError as e:
        print(f"✗ google-cloud-speech import failed: {e}")
        return False

    print("\nAll dependency checks completed.")
    return True

if __name__ == "__main__":
    test_imports()
