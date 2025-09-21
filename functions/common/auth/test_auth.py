"""Tests for authentication utilities."""
import pytest
from unittest.mock import Mock, patch
from firebase_admin import auth
from .auth import verify_token
from common.error_handling.error_wrapper import KalaikathaError, ErrorType

# Mock Firebase initialization to avoid credential requirements
import sys
from unittest.mock import MagicMock
sys.modules['firebase_admin'] = MagicMock()
sys.modules['firebase_admin.auth'] = MagicMock()
sys.modules['firebase_admin.firestore'] = MagicMock()
sys.modules['firebase_admin.credentials'] = MagicMock()

@pytest.fixture
def mock_request():
    """Create a mock request with auth header."""
    request = Mock()
    request.headers = {
        'Authorization': 'Bearer valid_token_123'
    }
    return request

@pytest.fixture
def mock_decoded_token():
    """Create a mock decoded token response."""
    return {
        'uid': 'test_user_123',
        'email': 'test@example.com',
        'name': 'Test User',
        'picture': 'https://example.com/photo.jpg'
    }

def test_verify_token_success(mock_request, mock_decoded_token):
    """Test successful token verification."""
    with patch('firebase_admin.auth.verify_id_token') as mock_verify:
        mock_verify.return_value = mock_decoded_token
        result = verify_token(mock_request)
        
        assert result['uid'] == mock_decoded_token['uid']
        assert result['email'] == mock_decoded_token['email']
        mock_verify.assert_called_once_with('valid_token_123')

def test_verify_token_missing_header():
    """Test error when Authorization header is missing."""
    request = Mock()
    request.headers = {}
    
    with pytest.raises(KalaikathaError) as exc_info:
        verify_token(request)
    
    assert exc_info.value.error_type == ErrorType.AUTH_ERROR
    assert "No authentication token provided" in str(exc_info.value)

def test_verify_token_invalid_format():
    """Test error when Authorization header has wrong format."""
    request = Mock()
    request.headers = {'Authorization': 'InvalidFormat token_123'}
    
    with pytest.raises(KalaikathaError) as exc_info:
        verify_token(request)
    
    assert exc_info.value.error_type == ErrorType.AUTH_ERROR
    assert "Invalid authorization header format" in str(exc_info.value)

def test_verify_token_firebase_error():
    """Test error when Firebase rejects token."""
    request = Mock()
    request.headers = {'Authorization': 'Bearer invalid_token'}
    
    with patch('firebase_admin.auth.verify_id_token') as mock_verify:
        mock_verify.side_effect = auth.InvalidIdTokenError('Invalid token')
        
        with pytest.raises(KalaikathaError) as exc_info:
            verify_token(request)
        
        assert exc_info.value.error_type == ErrorType.AUTH_ERROR
        assert "Invalid authentication token" in str(exc_info.value)