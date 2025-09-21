"""
Text to voice conversion cloud function using Google Cloud Text-to-Speech.
This module provides an HTTP function to convert text input into speech audio
using Google's TTS service with Indian English voice configuration.

Optimization Note: Consider caching the TextToSpeechClient instance globally
to avoid creating a new client on each request, which can improve performance.
"""

import base64
import functions_framework
from typing import Dict, Any
from ...common.auth.auth import auth_handler
from ...common.error_handling.error_wrapper import error_wrapper
from google.cloud import texttospeech

@functions_framework.http
@error_wrapper
def text_to_voice(request) -> Dict[str, Any]:
    """
    Convert text to speech using Google Cloud Text-to-Speech service.

    This function takes text input and generates MP3 audio using a neutral
    Indian English voice. The audio is returned as base64-encoded content.

    Args:
        request: HTTP request object containing JSON with 'text' field.

    Returns:
        Dict containing base64-encoded audio content and status.

    Raises:
        Returns error dict for validation failures.
    """
    # Validate request has JSON body
    if not request.get_json():
        return {"error": "No JSON data provided"}, 400

    data = request.get_json()

    # Validate required 'text' field
    if "text" not in data:
        return {"error": "Missing text field"}, 400

    # Create Text-to-Speech client (consider caching this client globally)
    from ...common.caching.model_cache import get_tts_client
    client = get_tts_client()

    # Set the text input for synthesis
    synthesis_input = texttospeech.SynthesisInput(text=data["text"])

    # Configure voice parameters for Indian English
    voice = texttospeech.VoiceSelectionParams(
        language_code="en-IN",
        ssml_gender=texttospeech.SsmlVoiceGender.NEUTRAL
    )

    # Configure audio output format
    audio_config = texttospeech.AudioConfig(
        audio_encoding=texttospeech.AudioEncoding.MP3
    )

    # Perform the text-to-speech synthesis
    response = client.synthesize_speech(
        input=synthesis_input, voice=voice, audio_config=audio_config
    )

    # Return base64-encoded audio content
    return {
        "audio_content": base64.b64encode(response.audio_content).decode('utf-8'),
        "status": "success"
    }
