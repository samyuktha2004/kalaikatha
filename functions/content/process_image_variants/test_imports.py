#!/usr/bin/env python3
"""Test script to verify that all required dependencies can be imported."""

def test_imports():
    try:
        import functions_framework
        print("✓ functions_framework imported successfully")
        
        from google.cloud import storage
        print("✓ google.cloud.storage imported successfully")
        
        from PIL import Image
        print("✓ PIL.Image imported successfully")
        
        print("All imports successful!")
        return True
    except ImportError as e:
        print(f"✗ Import failed: {e}")
        return False

if __name__ == "__main__":
    success = test_imports()
    exit(0 if success else 1)
