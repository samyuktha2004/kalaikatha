"""Logging configuration for cloud functions."""
import logging
import google.cloud.logging

def setup_logging():
    """Initialize Google Cloud Logging."""
    client = google.cloud.logging.Client()
    client.setup_logging()
    
    # Set default logging level
    logging.getLogger().setLevel(logging.INFO)