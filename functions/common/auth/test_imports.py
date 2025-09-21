#!/usr/bin/env python3
"""
Test script to verify that all dependencies for the auth feature can be imported successfully.
"""

def test_imports():
    try:
        import firebase_admin
        print("✓ firebase_admin imported successfully")
    except ImportError as e:
        print(f"✗ firebase_admin import failed: {e}")
        return False

    try:
        import pytest
        print("✓ pytest imported successfully")
    except ImportError as e:
        print(f"✗ pytest import failed: {e}")
        return False

    try:
        import pytest_mock
        print("✓ pytest-mock imported successfully")
    except ImportError as e:
        print(f"✗ pytest-mock import failed: {e}")
        return False

    print("\nAll dependency checks completed.")
    return True

if __name__ == "__main__":
    test_imports()
