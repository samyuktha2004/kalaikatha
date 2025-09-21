import base64
import functions_framework
from flask import jsonify
from google.cloud import texttospeech

# Initialize the Text-to-Speech client
tts_client = texttospeech.TextToSpeechClient()

@functions_framework.http
def text_to_voice(request):
    """
    HTTP Cloud Function to convert text into speech for Tamil or Hindi.
    
    Expected JSON payload:
    {
        "text": "Your text to synthesize...",
        "language_code": "ta-IN" | "hi-IN"
    }
    """
    request_json = request.get_json(silent=True)

    # --- Input Validation ---
    if not request_json:
        return jsonify({"error": "Invalid JSON payload"}), 400
        
    text_input = request_json.get('text')
    lang_code = request_json.get('language_code')

    if not all([text_input, lang_code]):
        return jsonify({"error": "Missing 'text' or 'language_code'"}), 400
    
    if lang_code not in ["ta-IN", "hi-IN"]:
        return jsonify({"error": "Unsupported language. Use 'ta-IN' for Tamil or 'hi-IN' for Hindi."}), 400
        
    try:
        # --- 1. Configure API Request ---
        synthesis_input = texttospeech.SynthesisInput(text=text_input)
        
        voice = texttospeech.VoiceSelectionParams(
            language_code=lang_code,
            ssml_gender=texttospeech.SsmlVoiceGender.NEUTRAL
        )
        
        audio_config = texttospeech.AudioConfig(
            audio_encoding=texttospeech.AudioEncoding.MP3
        )
        
        # --- 2. Call Text-to-Speech API ---
        print(f"Requesting speech synthesis for language: {lang_code}")
        response = tts_client.synthesize_speech(
            input=synthesis_input, voice=voice, audio_config=audio_config
        )
        
        # --- 3. Encode Audio and Return ---
        # The API returns audio content in binary format.
        # We must encode it in base64 to send it in a JSON response.
        audio_base64 = base64.b64encode(response.audio_content).decode("utf-8")
        
        return jsonify({"audio_content": audio_base64}), 200

    except Exception as e:
        print(f"An error occurred: {e}")
        return jsonify({"error": f"Failed to synthesize speech: {e}"}), 500