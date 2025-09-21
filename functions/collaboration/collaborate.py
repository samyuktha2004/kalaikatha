import functions_framework
from flask import jsonify
from google.cloud import firestore

# Initialize Firestore client. Reusing the client across invocations is a best practice.
db = firestore.Client()

@functions_framework.http
def find_partners(request):
    """
    HTTP Cloud Function to find compatible artisan partners.
    
    Expected JSON payload:
    {
        "artisan_id": "the_id_of_the_requesting_artisan",
        "style_choices": ["modern", "rustic", "minimalist"]
    }
    """
    request_json = request.get_json(silent=True)

    # --- 1. Input Validation ---
    if not request_json:
        return jsonify({"error": "Invalid JSON payload"}), 400
    
    artisan_id = request_json.get('artisan_id')
    style_choices = request_json.get('style_choices')

    if not all([artisan_id, style_choices]):
        return jsonify({"error": "Missing 'artisan_id' or 'style_choices'"}), 400

    if not isinstance(style_choices, list) or len(style_choices) == 0:
        return jsonify({"error": "'style_choices' must be a non-empty list."}), 400

    try:
        # --- 2. Fetch the Requesting Artisan's Profile ---
        # We need their own data (especially their craft) to generate good reasons.
        artisan_ref = db.collection('artisans').document(artisan_id)
        artisan_doc = artisan_ref.get()
        if not artisan_doc.exists:
            return jsonify({"error": "Requesting artisan not found"}), 404
        artisan_data = artisan_doc.to_dict()
        artisan_craft = artisan_data.get('craft')

        # --- 3. Query Firestore for Potential Matches ---
        artisans_ref = db.collection('artisans')
        # Use 'array-contains-any' to find documents where the style_choices array
        # contains any of the preferred styles. This is highly efficient.
        query = artisans_ref.where('style_choices', 'array-contains-any', style_choices).limit(6)
        
        potential_matches = query.stream()

        # --- 4. Process Matches and Generate Reasons ---
        matches = []
        for doc in potential_matches:
            # Skip the artisan who is making the request
            if doc.id == artisan_id:
                continue

            matched_data = doc.to_dict()
            
            # Find commonalities to build the reason
            matched_styles = matched_data.get('style_choices', [])
            shared_styles = list(set(style_choices) & set(matched_styles))
            
            matched_craft = matched_data.get('craft')
            
            reason = _generate_reason(artisan_craft, matched_craft, shared_styles)
            
            # We don't need to return every field, just the public profile.
            profile = {
                "id": doc.id,
                "name": matched_data.get("name"),
                "craft": matched_data.get("craft"),
                "location": matched_data.get("location"),
                "profile_image_url": matched_data.get("profile_image_url")
            }
            
            matches.append({
                "reason": reason,
                "profile": profile
            })

            # Ensure we only return up to 5 matches
            if len(matches) >= 5:
                break
        
        return jsonify({"matches": matches}), 200

    except Exception as e:
        print(f"An unexpected error occurred: {e}")
        return jsonify({"error": "An internal server error occurred"}), 500


def _generate_reason(own_craft, matched_craft, shared_styles):
    """A helper function to create a human-readable reason for a match."""
    reason_parts = []
    
    # Reason 1: Shared craft
    if own_craft and own_craft == matched_craft:
        reason_parts.append(f"your shared craft in {own_craft}")
    
    # Reason 2: Shared styles
    if len(shared_styles) > 1:
        # e.g., "modern and rustic styles"
        style_text = f"{' and '.join(shared_styles[:-1])} and {shared_styles[-1]}" if len(shared_styles) > 2 else ' and '.join(shared_styles)
        reason_parts.append(f"a mutual interest in {style_text} styles")
    elif len(shared_styles) == 1:
        reason_parts.append(f"a shared love for the {shared_styles[0]} style")

    if not reason_parts:
        return "This artisan has a complementary style that could be a great fit for a collaboration."

    return f"A great potential match because of {' and '.join(reason_parts)}."