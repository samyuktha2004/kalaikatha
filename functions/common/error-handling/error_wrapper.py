"""Error handling utilities for cloud functions."""
from functools import wraps
from typing import Callable, Any
import logging

def error_wrapper(func: Callable) -> Callable:
    """Decorator to handle errors in cloud functions.
    
    Args:
        func: The cloud function to wrap
        
    Returns:
        Wrapped function with error handling
    """
    @wraps(func)
    def wrapper(*args, **kwargs) -> Any:
        try:
            return func(*args, **kwargs)
        except Exception as e:
            logging.error(f"Error in {func.__name__}: {str(e)}")
            return {
                "error": str(e),
                "status": "error",
                "function": func.__name__
            }, 500
    return wrapper