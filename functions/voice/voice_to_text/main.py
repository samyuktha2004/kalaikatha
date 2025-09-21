"""Voice to text conversion with authentication."""
import functions_framework
from google.cloud import speech_v1
from common.error_handling import error_wrapper, KalaikathaError, ErrorType
from common.auth.auth import verify_token

@functions_framework.http
@error_wrapper
def voice_to_text(request):
    """Convert voice to text with authentication."""
    # Handle CORS preflight requests
    if request.method == 'OPTIONS':
        headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Allow-Headers': 'Content-Type,Authorization',
            'Access-Control-Max-Age': '3600'
        }
        return ('', 204, headers)

    # Set CORS headers for main request
    headers = {'Access-Control-Allow-Origin': '*'}
    
    # Verify user authentication
    user_data = verify_token(request)
    
    if not request.files:
        return ({'error': 'No audio file provided'}, 400, headers)
    
    audio_file = request.files['audio']
    language_code = request.form.get('language_code', 'hi-IN')
    
    # Setup Speech-to-Text client
    client = speech_v1.SpeechClient()
    audio = speech_v1.RecognitionAudio(content=audio_file.read())
    config = speech_v1.RecognitionConfig(
        encoding=speech_v1.RecognitionConfig.AudioEncoding.LINEAR16,
        sample_rate_hertz=16000,
        language_code=language_code,
        enable_automatic_punctuation=True
    )
    
    try:
        response = client.recognize(config=config, audio=audio)
        return {
            "success": True,
            "text": response.results[0].alternatives[0].transcript,
            "confidence": response.results[0].alternatives[0].confidence,
            "user": user_data['uid'],
            "language": language_code
        }, 200
            
    except Exception as e:
        raise KalaikathaError(
            ErrorType.API_ERROR,
            "Speech recognition failed",
            {"api_error": str(e)}
        )