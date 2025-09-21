# Kalaikatha API Documentation

## Authentication

All endpoints require authentication using Firebase ID tokens unless specified otherwise.

**Request Header:**

```
Authorization: Bearer <firebase_id_token>
```

## Content Generation

### POST /generate-content

Generates AI-powered product descriptions based on provided details.

**Request Headers:**

- `Authorization`: Required
- `Content-Type`: application/json

**Request Body:**

```json
{
  "product_details": {
    "name": "string",
    "category": "string",
    "materials": ["string"],
    "technique": "string"
  }
}
```

**Success Response (200):**

```json
{
  "success": true,
  "content": "string",
  "metadata": {
    "model": "gemini-pro",
    "timestamp": "string"
  }
}
```

**Error Response (400/401/500):**

```json
{
  "success": false,
  "error": {
    "type": "VALIDATION_ERROR | AUTH_ERROR | API_ERROR",
    "message": "string",
    "details": {}
  }
}
```

## Voice Processing

### POST /voice-to-text

Converts voice recordings to text with multi-language support.

**Request Headers:**

- `Authorization`: Required
- `Content-Type`: multipart/form-data

**Request Body:**

- `audio`: File (audio/wav, audio/mp3)
- `language_code`: string (default: "hi-IN")

**Success Response (200):**

```json
{
  "success": true,
  "text": "string",
  "confidence": 0.95,
  "language": "string"
}
```

**Error Response (400/401/500):**

```json
{
  "success": false,
  "error": {
    "type": "VALIDATION_ERROR | AUTH_ERROR | API_ERROR",
    "message": "string",
    "details": {}
  }
}
```

## Price Suggestions

### POST /suggest-price

Suggests product pricing based on market data and AI analysis.

**Request Headers:**

- `Authorization`: Required
- `Content-Type`: application/json

**Request Body:**

```json
{
  "category": "string",
  "materials": ["string"],
  "complexity_score": number
}
```

**Success Response (200):**

```json
{
  "success": true,
  "price_range": {
    "min": number,
    "max": number,
    "recommended": number
  },
  "confidence_score": number
}
```

**Error Response (400/401/500):**

```json
{
  "success": false,
  "error": {
    "type": "VALIDATION_ERROR | AUTH_ERROR | API_ERROR",
    "message": "string",
    "details": {}
  }
}
```

## Common HTTP Status Codes

- `200 OK`: Request successful
- `400 Bad Request`: Invalid input parameters
- `401 Unauthorized`: Missing or invalid authentication token
- `403 Forbidden`: Valid token but insufficient permissions
- `500 Internal Server Error`: Server-side error

## Rate Limits

- Content Generation: 100 requests per hour per user
- Voice Processing: 50 requests per hour per user
- Price Suggestions: 200 requests per hour per user

## Testing

To test the API endpoints, you can use the provided Postman collection:
[Download Postman Collection](./kalaikatha-api.postman_collection.json)

## Error Types

- `VALIDATION_ERROR`: Invalid input parameters
- `AUTH_ERROR`: Authentication/authorization issues
- `PROCESSING_ERROR`: Error during request processing
- `API_ERROR`: External API service errors
