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
      "lesson_type_id": 1,
      "place_id": 42,
      "code": "ECA1140",
      "count": 1140,
      "created": "2025-09-09T14:57:31+02:00",
      "modified": "2025-09-09T14:57:31+02:00",
      "price": 150,
      "max_subscriptors": 12,
      "is_public": true,
      "subscriptions": 0,
      "applications": 0,
      "application_booked": 0,
      "old_id": null,
      "is_complete": false,
      "is_sent": false,
      "is_validate": false,
      "contact_person": "Lausanne",
      "description": null,
      "extra": null,
      "optional_company": null,
      "optional_phone": null,
      "optional_email": null,
      "optional_address": null,
      "optional_city": null,
      "optional_zip": null,
      "optional_comment": null,
      "periodes": [
        {
          "id": 107823,
          "lesson_id": 51995,
          "date": "2026-04-17",
          "start": "2026-04-14T18:00:00+02:00",
          "end": "2026-04-14T22:00:00+02:00",
          "breaktime_id": 1
        }
      ],
      "place": {
        "id": 42,
        "name": "Auto-moto-école ECA",
        "is_partner": true,
        "code": "ECA",
        "zip": "1003",
        "street": "13, av. Louis Ruchonnet",
        "street_extra": "",
        "capacity": 14,
        "city_id": 1,
        "lat": 46.518257,
        "lng": 6.626263,
        "slug": "eca",
        "price": 150,
        "mail": "info@eca-auto-ecole.ch",
        "phone": "021 312 11 17",
        "city": {
          "id": 1,
          "name": "Lausanne",
          "lat": 46.519653,
          "lng": 6.632273,
          "slug": "lausanne",
          "state_id": 1
        }
      },
      "lesson_type": {
        "id": 1,
        "name": "Secouriste",
        "slug": "secouriste",
        "color": "#52abff",
        "expiration": "+6 years",
        "default_teacher_fee": 35
      },
      "min_periode": {
        "id": 107823,
        "lesson_id": 51995,
        "date": "2026-04-17",
        "start": "2026-04-14T18:00:00+02:00",
        "end": "2026-04-14T22:00:00+02:00",
        "breaktime_id": 1
      },
      "max_periode": {
        "id": 107824,
        "lesson_id": 51995,
        "date": "2026-04-18",
        "start": "2026-04-14T09:00:00+02:00",
        "end": "2026-04-14T16:00:00+02:00",
        "breaktime_id": 2
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
| `lesson_type_id` | integer | ID of the lesson type |
| `place_id` | integer | ID of the venue |
| `code` | string | Unique lesson code (e.g. `ECA1140`) |
| `count` | integer | Sequential count number |
| `created` | string | Creation datetime (ISO 8601) |
| `modified` | string | Last modification datetime (ISO 8601) |
| `price` | float | Lesson price (CHF) |
| `max_subscriptors` | integer | Maximum number of participants |
| `is_public` | boolean | Whether the lesson is publicly visible |
| `subscriptions` | integer | Current number of confirmed subscriptions |
| `applications` | integer | Number of teacher applications |
| `application_booked` | integer | Number of booked teacher applications |
| `old_id` | integer\|null | Legacy ID (if migrated) |
| `is_complete` | boolean | `true` when the lesson is fully booked |
| `is_sent` | boolean | Whether confirmation emails have been sent |
| `is_validate` | boolean | Whether the lesson has been validated |
| `contact_person` | string\|null | Contact person name |
| `description` | string\|null | Lesson description |
| `extra` | string\|null | Extra information |
| `optional_company` | string\|null | Optional company name override |
| `optional_phone` | string\|null | Optional phone override |
| `optional_email` | string\|null | Optional email override |
| `optional_address` | string\|null | Optional address override |
| `optional_city` | string\|null | Optional city override |
| `optional_zip` | string\|null | Optional postal code override |
| `optional_comment` | string\|null | Optional comment override |
| `periodes` | array | All scheduled sessions (see below) |
| `place` | object | Venue details (see below) |
| `lesson_type` | object | Lesson type details (see below) |
| `min_periode` | object | Earliest session — useful for displaying the start date |
| `max_periode` | object | Latest session — useful for displaying the end date |

#### Periode (session)

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer | Session ID |
| `lesson_id` | integer | Parent lesson ID |
| `date` | string | Session date (`YYYY-MM-DD`) |
| `start` | string | Start datetime (ISO 8601) |
| `end` | string | End datetime (ISO 8601) |
| `breaktime_id` | integer | Break time configuration ID |

#### Place (venue)

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer | Place ID |
| `name` | string | Venue name |
| `is_partner` | boolean | Whether it is a partner venue |
| `code` | string | Venue code |
| `zip` | string | Postal code |
| `street` | string | Street address |
| `street_extra` | string\|null | Additional address line |
| `capacity` | integer | Room capacity |
| `city_id` | integer | ID of the city |
| `lat` / `lng` | float | GPS coordinates |
| `slug` | string | URL slug |
| `price` | float | Default lesson price at this venue (CHF) |
| `mail` | string\|null | Contact email |
| `phone` | string\|null | Contact phone |
| `city` | object | City details (see below) |

#### City

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer | City ID |
| `name` | string | City name |
| `lat` / `lng` | float | GPS coordinates |
| `slug` | string | URL slug |
| `state_id` | integer | ID of the canton/state |

#### LessonType

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer | Type ID |
| `name` | string | Type name (e.g. `Secouriste`) |
| `slug` | string | URL slug |
| `color` | string | Hex color code |
| `expiration` | string | Certificate validity duration |
| `default_teacher_fee` | float | Default teacher fee (CHF) |

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
