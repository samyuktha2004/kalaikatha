"""Helper functions for managing collaboration profiles."""
from google.cloud import firestore
from .schema import CollaborationProfile, StylePreferences
from typing import Optional, List, Dict, Any
from datetime import datetime

db = firestore.Client()

def create_collaboration_profile(
    artisan_id: str,
    name: str,
    craft_type: str,
    style_preferences: StylePreferences,
    collaboration_interests: List[str],
    location: str
) -> str:
    """Create a new collaboration profile document."""
    profile_ref = db.collection('collaboration_profiles').document(artisan_id)
    
    profile_data: CollaborationProfile = {
        'artisan_id': artisan_id,
        'name': name,
        'craft_type': craft_type,
        'style_preferences': style_preferences,
        'collaboration_interests': collaboration_interests,
        'location': location,
        'created_at': firestore.SERVER_TIMESTAMP,
        'updated_at': firestore.SERVER_TIMESTAMP,
        'active': True,
        'embedding': []  # Will be populated by update_profile_embedding
    }
    
    profile_ref.set(profile_data)
    return artisan_id

def get_collaboration_profile(artisan_id: str) -> Optional[Dict[str, Any]]:
    """Retrieve a collaboration profile by artisan ID."""
    profile_ref = db.collection('collaboration_profiles').document(artisan_id)
    profile = profile_ref.get()
    return profile.to_dict() if profile.exists else None

def update_profile_preferences(
    artisan_id: str,
    style_preferences: StylePreferences
) -> bool:
    """Update an artisan's style preferences."""
    profile_ref = db.collection('collaboration_profiles').document(artisan_id)
    
    try:
        profile_ref.update({
            'style_preferences': style_preferences,
            'updated_at': firestore.SERVER_TIMESTAMP
        })
        return True
    except Exception as e:
        print(f"Error updating profile: {str(e)}")
        return False

def get_potential_collaborators(
    artisan_id: str,
    limit: int = 5
) -> List[Dict[str, Any]]:
    """Get potential collaborators based on craft type and interests."""
    profile = get_collaboration_profile(artisan_id)
    if not profile:
        return []
    
    # Query profiles with matching interests
    matches_ref = db.collection('collaboration_profiles').where(
        'active', '==', True
    ).where(
        'collaboration_interests', 'array_contains_any', [profile['craft_type']]
    ).limit(limit)
    
    matches = matches_ref.stream()
    return [match.to_dict() for match in matches if match.id != artisan_id]