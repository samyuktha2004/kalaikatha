"""Schema definitions for collaboration profiles."""
from typing import List, TypedDict
from google.cloud import firestore
from datetime import datetime

class StylePreferences(TypedDict):
    colors: List[str]
    materials: List[str]
    patterns: List[str]
    themes: List[str]

class CollaborationProfile(TypedDict):
    artisan_id: str
    name: str
    craft_type: str
    style_preferences: StylePreferences
    collaboration_interests: List[str]
    location: str
    created_at: datetime
    updated_at: datetime
    active: bool
    embedding: List[float]  # Vector embedding for similarity matching

# Example document structure
EXAMPLE_PROFILE = {
    'artisan_id': 'user123',
    'name': 'Rajesh Kumar',
    'craft_type': 'textile_weaving',
    'style_preferences': {
        'colors': ['indigo', 'crimson', 'ivory'],
        'materials': ['silk', 'cotton', 'zari'],
        'patterns': ['geometric', 'floral', 'traditional'],
        'themes': ['contemporary', 'fusion']
    },
    'collaboration_interests': ['jewelry', 'block_printing'],
    'location': 'Gujarat',
    'created_at': firestore.SERVER_TIMESTAMP,
    'updated_at': firestore.SERVER_TIMESTAMP,
    'active': True,
    'embedding': []  # Will be populated by the ML model
}