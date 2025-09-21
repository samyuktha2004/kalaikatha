#!/usr/bin/env python3
"""
Test script to verify that all dependencies for the build feature can be imported successfully.
"""

def test_imports():
    try:
        import firebase_admin
        print("✓ firebase_admin imported successfully")
    except ImportError as e:
        print(f"✗ firebase_admin import failed: {e}")
        return False

    try:
        from google.cloud import storage
        print("✓ google-cloud-storage imported successfully")
    except ImportError as e:
        print(f"✗ google-cloud-storage import failed: {e}")
        return False

    try:
        from google.cloud import firestore
        print("✓ google-cloud-firestore imported successfully")
    except ImportError as e:
        print(f"✗ google-cloud-firestore import failed: {e}")
        return False

    try:
        import functions_framework
        print("✓ functions-framework imported successfully")
    except ImportError as e:
        print(f"✗ functions-framework import failed: {e}")
        return False

    print("\nAll dependency checks completed.")
    return True

if __name__ == "__main__":
    test_imports()
