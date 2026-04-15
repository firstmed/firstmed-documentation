# GET /b2b/companies/:company_id/lessons

Returns all upcoming lessons taking place at venues owned by the specified company (Auto-Écoles). Results are ordered by earliest session date ascending.

---

## Authentication

A Bearer JWT token is required in every request.

```
Authorization: Bearer <token>
```

---

## Request

```
GET /b2b/companies/{company_id}/lessons.json
```

### URL Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `company_id` | integer | ID of the company (Auto-École) |

### Query Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | integer | `1` | Page number |
| `limit` | integer | `25` | Results per page |

---

## Response

### 200 OK

```json
{
  "success": true,
  "data": [
    {
      "id": 51995,
      "code": "ECA1140",
      "price": 150,
      "max_subscriptors": 12,
      "subscriptions": 0,
      "is_complete": false,
      "contact_person": "Lausanne",
      "description": null,
      "periodes": [
        {
          "id": 107823,
          "date": "2026-04-17",
          "start": "2026-04-14T18:00:00+02:00",
          "end": "2026-04-14T22:00:00+02:00"
        }
      ],
      "place": {
        "id": 42,
        "name": "Auto-moto-école ECA",
        "street": "13, av. Louis Ruchonnet",
        "zip": "1003",
        "lat": 46.518257,
        "lng": 6.626263,
        "mail": "info@eca-auto-ecole.ch",
        "phone": "021 312 11 17",
        "city": {
          "id": 1,
          "name": "Lausanne",
          "slug": "lausanne"
        }
      },
      "lesson_type": {
        "id": 1,
        "name": "Secouriste",
        "slug": "secouriste",
        "color": "#52abff",
        "expiration": "+6 years"
      },
      "min_periode": {
        "date": "2026-04-17",
        "start": "2026-04-14T18:00:00+02:00",
        "end": "2026-04-14T22:00:00+02:00"
      },
      "max_periode": {
        "date": "2026-04-18",
        "start": "2026-04-14T09:00:00+02:00",
        "end": "2026-04-14T16:00:00+02:00"
      }
    }
  ],
  "pagination": {
    "page_count": 2,
    "current_page": 1,
    "has_next_page": true,
    "has_prev_page": false,
    "count": 37,
    "limit": 25
  }
}
```

### Response Fields

#### Lesson

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer | Lesson ID |
| `code` | string | Unique lesson code (e.g. `ECA1140`) |
| `price` | float | Lesson price (CHF) |
| `max_subscriptors` | integer | Maximum number of participants |
| `subscriptions` | integer | Current number of confirmed subscriptions |
| `is_complete` | boolean | `true` when the lesson is fully booked |
| `contact_person` | string\|null | Contact person name |
| `description` | string\|null | Lesson description |
| `periodes` | array | All scheduled sessions (see below) |
| `place` | object | Venue details (see below) |
| `lesson_type` | object | Lesson type details (see below) |
| `min_periode` | object | Earliest session — useful for displaying the start date |
| `max_periode` | object | Latest session — useful for displaying the end date |

#### Periode (session)

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer | Session ID |
| `date` | string | Session date (`YYYY-MM-DD`) |
| `start` | string | Start datetime (ISO 8601) |
| `end` | string | End datetime (ISO 8601) |

#### Place (venue)

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer | Place ID |
| `name` | string | Venue name |
| `street` | string | Street address |
| `zip` | string | Postal code |
| `lat` / `lng` | float | GPS coordinates |
| `mail` | string\|null | Contact email |
| `phone` | string\|null | Contact phone |
| `city` | object | City details (`id`, `name`, `slug`) |

#### LessonType

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer | Type ID |
| `name` | string | Type name (e.g. `Secouriste`) |
| `slug` | string | URL slug |
| `color` | string | Hex color code |
| `expiration` | string | Certificate validity duration |

---

## Error Responses

### 401 Unauthorized
No token or invalid/expired token.

```json
{
  "success": false,
  "data": {
    "message": "Authentication is required to continue",
    "url": "/b2b/companies/42/lessons.json",
    "code": 401
  }
}
```

### 403 Forbidden
Valid token but the user does not have access to this company's data.

```json
{
  "success": false,
  "data": {
    "message": "You are not a member of this company.",
    "url": "/b2b/companies/42/lessons.json",
    "code": 403
  }
}
```
