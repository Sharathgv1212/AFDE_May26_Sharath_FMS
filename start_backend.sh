#!/usr/bin/env bash
# Start the FastAPI backend on macOS / Linux.
# Runs from the project root as a Python package:
#     python -m uvicorn backend.main:app --reload
set -e

cd "$(dirname "$0")"

if [ ! -d ".venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv .venv
fi

# shellcheck source=/dev/null
source .venv/bin/activate

echo "Installing dependencies..."
pip install -q -r requirements.txt

echo
echo "Starting FastAPI server at http://localhost:8000"
echo "Swagger UI:   http://localhost:8000/docs"
echo "Press Ctrl+C to stop."
echo

python -m uvicorn backend.main:app --reload
