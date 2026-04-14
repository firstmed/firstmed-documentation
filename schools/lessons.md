# GET /b2b/companies/:company_id/lessons

Returns all upcoming lessons taking place at venues owned by the specified company (Auto-Écoles).

A lesson is considered **upcoming** when its earliest session (`min_periode`) starts at least 2 hours from now. Results are ordered by earliest session date ascending.

---

## Authentication

Bearer JWT token required.

```
Authorization: Bearer <token>
```

---

## Authorization

| Role | Condition |
|------|-----------|
| **Admin** | Always allowed |
| **School** (role_id 4) | Allowed only if the authenticated user is linked to the company via `companies_users` |

Any other role receives `403 Forbidden`.

---

## Request

```
GET /b2b/companies/{company_id}/lessons.json
```

### URL Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `company_id` | integer | ID of the company (Auto-École) |

### Query Parameters (pagination)

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
        "capacity": 14,
        "street_extra": "",
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
| `code` | string | Unique lesson code (e.g. `ECA1140`) |
| `count` | integer | Sequential count number |
| `price` | float | Lesson price (CHF) |
| `max_subscriptors` | integer | Maximum number of participants |
| `subscriptions` | integer | Current number of subscriptions |
| `applications` | integer | Number of teacher applications |
| `application_booked` | integer | Number of booked applications |
| `is_public` | boolean | Whether the lesson is publicly visible |
| `is_complete` | boolean | Whether the lesson is fully booked |
| `is_sent` | boolean | Whether confirmation emails have been sent |
| `is_validate` | boolean | Whether the lesson has been validated |
| `contact_person` | string\|null | Contact person name |
| `description` | string\|null | Lesson description |
| `optional_*` | string\|null | Optional location/contact overrides |
| `periodes` | array | All scheduled sessions (see below) |
| `place` | object | Venue details (see below) |
| `lesson_type` | object | Lesson type details (see below) |
| `min_periode` | object | Earliest session |
| `max_periode` | object | Latest session |

#### Periode (session)

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer | Session ID |
| `lesson_id` | integer | Parent lesson ID |
| `date` | string | Session date (`YYYY-MM-DD`) |
| `start` | string | Start time (ISO 8601) |
| `end` | string | End time (ISO 8601) |
| `breaktime_id` | integer | Break time configuration ID |

#### Place (venue)

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer | Place ID |
| `name` | string | Venue name |
| `code` | string | Venue code |
| `street` | string | Street address |
| `zip` | string | Postal code |
| `lat` / `lng` | float | GPS coordinates |
| `capacity` | integer | Room capacity |
| `is_partner` | boolean | Whether it is a partner venue |
| `mail` | string\|null | Contact email |
| `phone` | string\|null | Contact phone |
| `city` | object | City with `id`, `name`, `slug`, `lat`, `lng`, `state_id` |

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
Valid token but user is not linked to this company (and is not Admin).

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

---

## Implementation Notes

- Only lessons at places where the company has `is_owner = 1` in `companies_places` are returned.
- "Upcoming" is defined as `min_periode.date + min_periode.start >= NOW() + 2 hours`.
- Results are ordered by `min_periode.date ASC` then `min_periode.start ASC`.
- The `companies_users` join table controls which users (role `School`) can access which company's data.

---

## Files

| File | Description |
|------|-------------|
| `src/Controller/B2b/Companies/LessonsController.php` | Controller |
| `config/routes.php` | Route definition |
| `config/permissions.php` | RBAC permission entry |
