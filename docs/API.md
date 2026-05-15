# Feedback Management System — API Documentation

Base URL (local): `http://localhost:8000`

Auto-generated interactive Swagger UI: `http://localhost:8000/docs`

All endpoints accept and return `application/json`.

---

## 1. Health

### GET `/`

Returns API metadata.

**Response 200**
```json
{
  "name": "Feedback Management System API",
  "version": "1.0.0",
  "docs": "/docs"
}
```

---

## 2. Feedback CRUD

### GET `/feedback`

Retrieve all feedback entries, newest first.

**Query parameters**

| Name    | Type    | Required | Description                                |
| ------- | ------- | -------- | ------------------------------------------ |
| skip    | integer | No       | Number of records to skip (default 0)      |
| limit   | integer | No       | Max records returned (default 100, max 500)|
| rating  | integer | No       | Filter by rating (1–5)                     |
| program | string  | No       | Substring match against program_name       |

**Response 200**
```json
[
  {
    "feedback_id": 1,
    "participant_name": "Rahul Sharma",
    "program_name": "React Bootcamp",
    "rating": 5,
    "comments": "Excellent hands-on sessions.",
    "submitted_at": "2026-05-13T08:42:11.123456"
  }
]
```

---

### GET `/feedback/{id}`

Retrieve a single feedback entry.

**Response 200** — single feedback object (same shape as above).

**Response 404**
```json
{ "detail": "Feedback 42 not found" }
```

---

### POST `/feedback`

Submit a new feedback entry.

**Request body**
```json
{
  "participant_name": "Sharath",
  "program_name": "FastAPI Workshop",
  "rating": 5,
  "comments": "Excellent session — well paced."
}
```

| Field             | Type    | Required | Notes                              |
| ----------------- | ------- | -------- | ---------------------------------- |
| participant_name  | string  | Yes      | 2–120 chars                        |
| program_name      | string  | Yes      | 2–120 chars                        |
| rating            | integer | Yes      | 1–5                                |
| comments          | string  | No       | Up to 2000 chars                   |

**Response 201** — created feedback object including `feedback_id` and `submitted_at`.

**Response 422** — validation failure with field-level errors.

---

### PUT `/feedback/{id}`

Update one or more fields. All fields optional (partial update).

**Request body** — any subset of fields from POST.

**Response 200** — updated feedback object.

**Response 404** — feedback not found.

---

### DELETE `/feedback/{id}`

Delete a feedback entry.

**Response 200**
```json
{ "message": "Feedback 42 deleted successfully" }
```

**Response 404** — feedback not found.

---

## 3. Dashboard Stats

### GET `/feedback/stats`

Aggregate statistics for the dashboard.

**Response 200**
```json
{
  "total_feedback": 12,
  "average_rating": 4.17,
  "rating_distribution": { "1": 0, "2": 1, "3": 2, "4": 4, "5": 5 }
}
```

---

## 4. Search

### GET `/search`

Search feedback entries by keyword and/or filters. All parameters optional.

**Query parameters**

| Name    | Type    | Description                                              |
| ------- | ------- | -------------------------------------------------------- |
| keyword | string  | Substring match against name, program, and comments      |
| rating  | integer | Exact rating filter (1–5)                                |
| program | string  | Substring match against program_name                     |

**Response 200** — array of matching feedback objects (newest first).

**Example**
```
GET /search?keyword=react&rating=5
```

---

## Error Envelope

The API uses standard HTTP status codes plus the following error envelopes:

**404 / 400**
```json
{ "detail": "<human-readable message>" }
```

**422 — Validation error**
```json
{
  "detail": "Validation failed",
  "errors": [
    { "field": "rating", "message": "Input should be less than or equal to 5" }
  ]
}
```

---

## cURL Examples

```bash
# List all feedback
curl http://localhost:8000/feedback

# Filter by rating
curl 'http://localhost:8000/feedback?rating=5'

# Submit
curl -X POST http://localhost:8000/feedback \
  -H 'Content-Type: application/json' \
  -d '{"participant_name":"Sharath","program_name":"FastAPI Workshop","rating":5,"comments":"Great"}'

# Update
curl -X PUT http://localhost:8000/feedback/1 \
  -H 'Content-Type: application/json' \
  -d '{"rating":4}'

# Delete
curl -X DELETE http://localhost:8000/feedback/1

# Search
curl 'http://localhost:8000/search?keyword=workshop&rating=5'

# Stats
curl http://localhost:8000/feedback/stats
```
