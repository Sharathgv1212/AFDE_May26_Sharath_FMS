# 3-Day Commit Plan

Evaluation flags "last-day bulk uploads" — so spread commits across all three days. Below is a copy-paste-ready sequence of meaningful commits.

## Initial setup (Day 1, morning)

```bash
# Run once, in the project root
git init
git branch -M main
git remote add origin https://github.com/<your-username>/AFDE_Jan26_Sharath_FMS.git
```

> Replace `<your-username>` with your GitHub username and create the repo on GitHub first (Public, no README — we already have one).

## Day 1 — Backend & Database

```bash
git add .gitignore README.md requirements.txt
git commit -m "chore: initial project structure with .gitignore and README"

git add database/schema.sql
git commit -m "feat(db): add SQLite schema with seed data for feedback table"

git add backend/database.py backend/models.py backend/schemas.py
git commit -m "feat(backend): add SQLAlchemy engine, ORM model, and Pydantic schemas"

git add backend/crud.py
git commit -m "feat(backend): implement CRUD layer with search and stats aggregation"

git add backend/routers/ backend/main.py backend/requirements.txt
git commit -m "feat(api): add FastAPI routers for feedback CRUD, search, and stats with CORS"

git push -u origin main
```

## Day 2 — Frontend & Integration

```bash
git add frontend/package.json frontend/vite.config.js frontend/index.html frontend/.env.example
git commit -m "chore(frontend): bootstrap Vite + React project"

git add frontend/src/main.jsx frontend/src/App.jsx frontend/src/api.js frontend/src/services/
git commit -m "feat(frontend): add routing, axios instance, and feedback service layer"

git add frontend/src/components/
git commit -m "feat(frontend): add reusable StarRating, FeedbackCard, FeedbackForm, StatCard components"

git add frontend/src/pages/Dashboard.jsx
git commit -m "feat(frontend): build dashboard with stats and rating distribution chart"

git add frontend/src/pages/SubmitFeedback.jsx
git commit -m "feat(frontend): build submit feedback page with form validation"

git add frontend/src/pages/FeedbackList.jsx
git commit -m "feat(frontend): build listing page with keyword/rating/program search"

git add frontend/src/pages/FeedbackDetails.jsx frontend/src/pages/EditFeedback.jsx
git commit -m "feat(frontend): build feedback details and edit pages with delete confirmation"

git add frontend/src/styles.css
git commit -m "style(frontend): add responsive plain-CSS styling"

git push
```

## Day 3 — Testing, docs, screenshots

```bash
git add backend/smoke_test.py
git commit -m "test(backend): add end-to-end smoke test script for all endpoints"

git add docs/API.md docs/FMS.postman_collection.json
git commit -m "docs: add API reference and Postman collection for testing"

git add start_backend.bat start_backend.sh start_frontend.bat start_frontend.sh
git commit -m "chore: add one-command run scripts for backend and frontend"

git add screenshots/
git commit -m "docs: add UI and API testing screenshots"

git add docs/SCREENSHOTS.md docs/COMMIT_PLAN.md
git commit -m "docs: add screenshot capture guide and commit plan"

# Final pass — update README with screenshot section if needed
git add README.md
git commit -m "docs: finalize README for submission"

git push
```

## Tips

- **Don't squash** — evaluators want to see progression.
- **Use prefixes** (`feat:`, `fix:`, `docs:`, `chore:`, `test:`, `style:`) — looks professional.
- **Commit each logical chunk separately** — even within a day.
- **Push at least once per day** — don't accumulate local commits.
- If you make a mistake in a commit message: `git commit --amend -m "new message"` (only before pushing).
