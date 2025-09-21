#!/usr/bin/env python3
"""
Test script for content generator functionality.
This script tests the content generation function locally.
"""

import json
import sys
import os

# Add parent directories to path for imports
sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(__file__))))

def test_prompt_generation():
    """Test the prompt generation function."""
    from main import generate_prompt
    
    test_data = {
        'category': 'pottery',
        'style': 'traditional',
        'keywords': ['handcrafted', 'clay', 'traditional'],
        'image_url': 'https://example.com/pottery.jpg'
    }
    
    prompt = generate_prompt(test_data)
    
    print("✅ Prompt Generation Test")
    print("=" * 50)
    print(f"Input: {json.dumps(test_data, indent=2)}")
    print(f"\nGenerated Prompt:\n{prompt}")
    print("=" * 50)
    
    # Verify prompt contains expected elements
    assert 'pottery' in prompt.lower()
    assert 'traditional' in prompt.lower()
    assert 'handcrafted' in prompt.lower()
    assert 'description' in prompt.lower()
    assert 'story' in prompt.lower()
    
    return True

def test_content_generation_structure():
    """Test the content generation function structure."""
    from main import generate_content
    
    print("\n✅ Function Structure Test")
    print("=" * 50)
    
    # Check if function is callable
    assert callable(generate_content)
    print("✓ generate_content function is callable")
    
    # Check function signature
    import inspect
    sig = inspect.signature(generate_content)
    assert 'request' in sig.parameters
    print("✓ Function has correct parameter signature")
    
    return True

def test_error_handling():
    """Test error handling in the content generator."""
    print("\n✅ Error Handling Test")
    print("=" * 50)
    
    # Test with missing data
    class MockRequest:
        def __init__(self, method='POST', json_data=None):
            self.method = method
            self._json_data = json_data
            
        def get_json(self):
            return self._json_data
    
    from main import generate_content
    
    # Test with no JSON data
    mock_request = MockRequest(json_data=None)
    try:
        result = generate_content(mock_request)
        print("✓ Handles missing JSON data gracefully")
    except Exception as e:
        print(f"✗ Error handling failed: {e}")
        return False
    
    # Test OPTIONS request (CORS)
    cors_request = MockRequest(method='OPTIONS')
    try:
        result = generate_content(cors_request)
        print("✓ Handles CORS preflight requests")
    except Exception as e:
        print(f"✗ CORS handling failed: {e}")
        return False
    
    return True

def test_dependencies():
    """Test if all required dependencies are available."""
    print("\n✅ Dependencies Test")
    print("=" * 50)
    
    dependencies = [
        'functions_framework',
        'google.cloud.aiplatform',
        'json',
        'os'
    ]
    
    for dep in dependencies:
        try:
            __import__(dep)
            print(f"✓ {dep} - Available")
        except ImportError as e:
            print(f"✗ {dep} - Missing: {e}")
            return False
    
    return True

def run_comprehensive_test():
    """Run all tests and provide a comprehensive report."""
    print("🧪 CONTENT GENERATOR COMPREHENSIVE TEST")
    print("=" * 60)
    
    tests = [
        ("Dependencies", test_dependencies),
        ("Function Structure", test_content_generation_structure), 
        ("Prompt Generation", test_prompt_generation),
        ("Error Handling", test_error_handling)
    ]
    
    passed = 0
    total = len(tests)
    
    for test_name, test_func in tests:
        try:
            if test_func():
                print(f"✅ {test_name}: PASSED")
                passed += 1
            else:
                print(f"❌ {test_name}: FAILED")
        except Exception as e:
            print(f"❌ {test_name}: ERROR - {e}")
    
    print("\n" + "=" * 60)
    print(f"📊 TEST RESULTS: {passed}/{total} tests passed")
    
    if passed == total:
        print("🎉 ALL TESTS PASSED! Content generator is working perfectly.")
        return True
    else:
        print("⚠️ Some tests failed. Please check the issues above.")
        return False

if __name__ == "__main__":
    success = run_comprehensive_test()
    sys.exit(0 if success else 1)