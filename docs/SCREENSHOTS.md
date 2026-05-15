# Screenshot Capture Guide

Use this guide to capture the screenshots required for submission. Save each PNG into `screenshots/` with the filename listed below.

## Prerequisites

1. Backend running: `start_backend.bat` (or `./start_backend.sh`). API at http://localhost:8000.
2. Frontend running: `start_frontend.bat` (or `./start_frontend.sh`). UI at http://localhost:5173.
3. Seed data loaded — either let the form generate it, or run the schema script:
   ```bash
   cd database
   sqlite3 ../backend/feedback.db < schema.sql
   ```

Optional but recommended: run `python backend/smoke_test.py` first to confirm everything is healthy.

---

## UI Screenshots (React frontend)

### 1. `dashboard.png`
- URL: http://localhost:5173/
- Capture: full window. Should show stat cards (Total, Average Rating, Most Recent), rating distribution bar chart, and recent feedback cards.

### 2. `submit.png`
- URL: http://localhost:5173/submit
- Capture: form filled in (e.g. participant name "Sharath", program "FastAPI Workshop", rating 5 stars, comment). Capture **before** clicking submit so the form is visible.

### 3. `submit_success.png` *(optional)*
- After clicking submit, capture the green success banner before the redirect.

### 4. `list.png`
- URL: http://localhost:5173/feedback
- Capture: the listing page with **search/filter active** — e.g. type "react" in keyword box, click Search, then capture results.

### 5. `details.png`
- Click "View details" on any feedback card. URL will be `/feedback/{id}`.
- Capture the detail card showing rating stars, program, submitted timestamp, and comments.

### 6. `edit.png` *(optional, scores extra polish points)*
- Click "Edit" on the details page. Capture the pre-filled form.

---

## API Screenshots

### 7. `swagger.png`
- URL: http://localhost:8000/docs
- Capture: full Swagger UI showing all endpoints (Feedback, Search, Health) expanded or collapsed — your call.

### 8. `swagger_try.png` *(optional)*
- In Swagger, expand `POST /feedback`, click "Try it out", paste a sample body, click "Execute". Capture the response section.

### 9. `postman_collection.png`
- Import `docs/FMS.postman_collection.json` into Postman (File → Import).
- Capture the collection tree with all 12 requests visible in the left panel.

### 10. `postman_post.png`
- Run "Feedback - Create (POST)". Capture the request body on top and the 201 response (with feedback_id) on the bottom.

### 11. `postman_search.png`
- Run "Search - Combined (keyword + rating + program)". Capture the response array with filtered results.

### 12. `postman_validation.png`
- Run "Validation - Invalid Rating (expect 422)". Capture the 422 response showing the structured validation error envelope.

---

## Capture Tips

- **Use 100% zoom in the browser** — screenshots look sharp.
- **Light theme** for both Postman and the browser is easier to read in PDF reports.
- **Crop tightly** — full-screen captures with taskbars distract. On Windows, `Win + Shift + S` lets you snip a region.
- Keep filenames lowercase with underscores, e.g. `postman_search.png` — consistent and Git-friendly.

---

## Quick Checklist

- [ ] dashboard.png
- [ ] submit.png
- [ ] list.png
- [ ] details.png
- [ ] swagger.png
- [ ] postman_collection.png
- [ ] postman_post.png
- [ ] postman_search.png
- [ ] postman_validation.png

Bonus polish:
- [ ] submit_success.png
- [ ] edit.png
- [ ] swagger_try.png
