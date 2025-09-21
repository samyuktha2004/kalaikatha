import base64
import functions_framework
from flask import jsonify
from google.cloud import speech

# Initialize the Speech-to-Text client
speech_client = speech.SpeechClient()

@functions_framework.http
def voice_to_text(request):
    """
    HTTP Cloud Function to transcribe audio in Tamil or Hindi to text.
    
    Expected JSON payload:
    {
        "audio_content": "<base64_encoded_audio_string>",
        "language_code": "ta-IN" | "hi-IN",
        "sample_rate_hertz": 16000
    }
    """
    request_json = request.get_json(silent=True)

    # --- Input Validation ---
    if not request_json:
        return jsonify({"error": "Invalid JSON payload"}), 400
    
    audio_b64 = request_json.get('audio_content')
    lang_code = request_json.get('language_code')
    sample_rate = request_json.get('sample_rate_hertz', 16000) # Default to 16000Hz if not provided

    if not all([audio_b64, lang_code]):
        return jsonify({"error": "Missing 'audio_content' or 'language_code'"}), 400

    if lang_code not in ["ta-IN", "hi-IN"]:
        return jsonify({"error": "Unsupported language. Use 'ta-IN' for Tamil or 'hi-IN' for Hindi."}), 400

    try:
        # --- 1. Decode Audio and Configure API ---
        audio_bytes = base64.b64decode(audio_b64)
        
        recognition_audio = speech.RecognitionAudio(content=audio_bytes)
        
        config = speech.RecognitionConfig(
            encoding=speech.RecognitionConfig.AudioEncoding.LINEAR16,
            sample_rate_hertz=sample_rate,
            language_code=lang_code,
            model="default", # Use "latest_long" for longer audio files
        )

        # --- 2. Call Speech-to-Text API ---
        print(f"Requesting transcription for language: {lang_code}")
        response = speech_client.recognize(config=config, audio=recognition_audio)
        
        if not response.results:
            return jsonify({"transcription": ""}), 200
            
        # --- 3. Extract and Return Transcription ---
        transcription = response.results[0].alternatives[0].transcript
        print(f"Transcription result: {transcription}")
        
        return jsonify({"transcription": transcription}), 200

    except Exception as e:
        print(f"An error occurred: {e}")
        return jsonify({"error": f"Failed to process audio: {e}"}), 500