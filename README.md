# Feedback Management System (FMS)

**Capstone Project — Phase 1**
Repository: `AFDE_Jan26_Sharath_FMS`

A full-stack web application for centralized feedback collection, search, and management. Built with **React (Vite)**, **FastAPI**, and **SQLite**, following REST API design principles and clean architecture practices.

---

## Project Overview

Organizations rely on scattered tools (Google Forms, Excel, email) to collect feedback, which makes consolidation, search, and analysis difficult. The Feedback Management System centralizes this entire workflow into a single web application.

This Phase 1 implementation delivers:

- A REST API for full CRUD on feedback entries
- Search & filter by keyword, rating, and program
- A responsive React UI with Dashboard, Submit, Listing, Details, and Edit pages
- A SQLite-backed schema designed to scale toward future analytics, sentiment analysis, and semantic search

## Features Implemented

- Submit feedback (participant name, program, rating 1–5, comments)
- View all feedback with sorting (newest first)
- View detailed feedback entry
- Update / edit feedback (admin)
- Delete feedback
- Keyword search across name / program / comments
- Filter by rating and program
- Dashboard with total count, average rating, rating distribution chart, recent entries
- Form validation, error handling, responsive layout

## Technology Stack

| Layer            | Technology                          |
| ---------------- | ----------------------------------- |
| Frontend         | React 18, React Router, Axios, Vite |
| Backend          | Python 3.11+, FastAPI, SQLAlchemy   |
| Database         | SQLite (Phase 1)                    |
| API Testing      | Swagger UI (built-in) / Postman     |
| Version Control  | Git / GitHub                        |

## Repository Structure

```
AFDE_Jan26_Sharath_FMS/
├── frontend/                 # React + Vite app
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/            # Route-level pages
│   │   ├── services/         # API service layer
│   │   ├── api.js            # Axios instance
│   │   ├── App.jsx           # Routes & layout
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── backend/                  # FastAPI app
│   ├── main.py               # Entry point + CORS + exception handlers
│   ├── database.py           # SQLAlchemy engine + session
│   ├── models.py             # ORM models
│   ├── schemas.py            # Pydantic schemas
│   ├── crud.py               # DB operations
│   ├── routers/
│   │   ├── feedback.py       # /feedback endpoints
│   │   └── search.py         # /search endpoint
│   └── requirements.txt
│
├── database/
│   └── schema.sql            # Canonical SQL schema + seed data
│
├── docs/
│   └── API.md                # API documentation
│
├── screenshots/              # UI & API screenshots
│
├── README.md
├── requirements.txt          # Top-level Python requirements
└── .gitignore
```

---

## Setup Instructions

### Prerequisites

- Python 3.11 or higher
- Node.js 18 or higher
- npm 9 or higher

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/AFDE_Jan26_Sharath_FMS.git
cd AFDE_Jan26_Sharath_FMS
```

### 2. Backend setup

```bash
cd backend
python -m venv .venv
# Windows
.venv\Scripts\activate
# macOS / Linux
source .venv/bin/activate

pip install -r requirements.txt
uvicorn main:app --reload
```

The API runs at `http://localhost:8000` and the auto-generated Swagger UI is at `http://localhost:8000/docs`.

The SQLite database (`feedback.db`) is created automatically on first run.

### 3. Database setup (optional — manual)

The backend creates tables automatically. To create the schema manually and load seed data:

```bash
cd database
sqlite3 ../backend/feedback.db < schema.sql
```

### 4. Frontend setup

In a new terminal:

```bash
cd frontend
npm install
npm run dev
```

The React app runs at `http://localhost:5173`.

If your backend runs on a different URL, copy `.env.example` to `.env` and set `VITE_API_URL` accordingly.

---

## API Overview

Base URL: `http://localhost:8000`

| Method | Endpoint               | Description                              |
| ------ | ---------------------- | ---------------------------------------- |
| GET    | `/feedback`            | Retrieve all feedback (with filters)     |
| GET    | `/feedback/{id}`       | Retrieve feedback by ID                  |
| POST   | `/feedback`            | Submit feedback                          |
| PUT    | `/feedback/{id}`       | Update feedback                          |
| DELETE | `/feedback/{id}`       | Delete feedback                          |
| GET    | `/feedback/stats`      | Aggregate dashboard statistics           |
| GET    | `/search`              | Search feedback (keyword + filters)      |

Full documentation with request/response examples is in [`docs/API.md`](docs/API.md).

### Example: Submit feedback

```bash
curl -X POST http://localhost:8000/feedback \
  -H "Content-Type: application/json" \
  -d '{
    "participant_name": "Sharath",
    "program_name": "FastAPI Workshop",
    "rating": 5,
    "comments": "Excellent session."
  }'
```

---

## Screenshots

Add screenshots to the `screenshots/` folder after running the app:

- `dashboard.png` — Dashboard view with stats and rating distribution
- `submit.png` — Submit Feedback form
- `list.png` — Listing with search & filter
- `details.png` — Feedback details view
- `swagger.png` — Auto-generated Swagger UI at `/docs`
- `postman.png` — Example Postman collection run

---

## Rating Scale

| Rating | Meaning   |
| ------ | --------- |
| 1      | Poor      |
| 2      | Fair      |
| 3      | Good      |
| 4      | Very Good |
| 5      | Excellent |

---

## Scalability & Future Work

The application is designed to extend toward:

- Authentication and authorization (JWT)
- Sentiment analysis on comments
- Analytics dashboards with charts
- Semantic / AI-powered search
- GenAI-based summarization
- PostgreSQL + cloud deployment

---

## Evaluation Criteria Mapping

| Criteria                  | Weightage | Where to Look                                  |
| ------------------------- | --------- | ---------------------------------------------- |
| Frontend Development      | 20%       | `frontend/src/` (pages, components, styles)    |
| Backend API Development   | 25%       | `backend/` (routers, main.py, schemas)         |
| Database Integration      | 15%       | `backend/database.py`, `backend/models.py`, `database/schema.sql` |
| CRUD Functionality        | 15%       | `backend/crud.py`, `backend/routers/feedback.py` |
| Search & Filtering        | 10%       | `backend/routers/search.py`, `frontend/src/pages/FeedbackList.jsx` |
| Code Quality & Structure  | 10%       | Modular layout, separation of concerns         |
| Documentation             | 5%        | This README + `docs/API.md`                    |

---

## Author

**Sharath** — Capstone Phase 1, AFDE Jan 26 Batch

## License

For academic / capstone evaluation use.
