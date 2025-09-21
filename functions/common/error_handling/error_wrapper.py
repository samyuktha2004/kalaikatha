"""
Enhanced error handling utilities for cloud functions.
This module provides standardized error types, custom exception classes,
and a decorator for consistent error handling across all Firebase functions.
"""

from enum import Enum
from typing import Any, Dict, Optional, Callable
import functools
import logging

class ErrorType(Enum):
    """Enumeration of possible error types for consistent error categorization."""
    VALIDATION_ERROR = "VALIDATION_ERROR"  # Input validation failures
    AUTH_ERROR = "AUTH_ERROR"           # Authentication/authorization issues
    PROCESSING_ERROR = "PROCESSING_ERROR"  # General processing errors
    API_ERROR = "API_ERROR"             # External API or service errors

class KalaikathaError(Exception):
    """
    Custom exception class for application-specific errors.

    This exception provides structured error information including type,
    message, and optional additional details for better error handling.
    """

    def __init__(self, error_type: ErrorType, message: str, details: Optional[Dict[str, Any]] = None):
        """
        Initialize the custom error.

        Args:
            error_type: The category of error from ErrorType enum.
            message: Human-readable error message.
            details: Optional dictionary with additional error context.
        """
        self.error_type = error_type
        self.message = message
        self.details = details or {}
        super().__init__(self.message)

def handle_errors(func: Callable) -> Callable:
    """Decorator for standardized error handling in Cloud Functions.
    
    Args:
        func: The cloud function to wrap
        
    Returns:
        Wrapped function with error handling
        
    Example:
        @handle_errors
        def my_cloud_function(request):
            # Function logic here
            pass
    """
    @functools.wraps(func)
    def wrapper(*args, **kwargs) -> tuple[Dict[str, Any], int]:
        try:
            return func(*args, **kwargs)
        except KalaikathaError as e:
            error_msg = {
                "success": False,
                "error": {
                    "type": e.error_type.value,
                    "message": e.message,
                    "details": e.details
                }
            }
            logging.error(f"KalaikathaError in {func.__name__}: {str(e)}")
            return error_msg, 400
        except Exception as e:
            # Log unexpected errors (Error Reporting removed for compatibility)
            logging.error(f"Unexpected error in {func.__name__}: {str(e)}")
            error_msg = {
                "success": False,
                "error": {
                    "type": ErrorType.PROCESSING_ERROR.value,
                    "message": "An unexpected error occurred",
                    "details": {"error": str(e)}
                }
            }
            return error_msg, 500
    return wrapper

# Keep existing error_wrapper for backward compatibility
error_wrapper = handle_errors
