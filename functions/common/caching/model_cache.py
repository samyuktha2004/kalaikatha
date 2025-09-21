"""Caching utilities for AI models and clients."""
from google.cloud import aiplatform
from google.cloud import texttospeech
from functools import lru_cache

@lru_cache(maxsize=1)
def get_ai_model(model_name="gemini-pro"):
    """Get cached AI model instance."""
    aiplatform.init()
    return aiplatform.Model(model_name)

@lru_cache(maxsize=1)
def get_tts_client():
    """Get cached Text-to-Speech client."""
    return texttospeech.TextToSpeechClient()