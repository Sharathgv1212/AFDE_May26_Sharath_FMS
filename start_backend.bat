@echo off
REM Start the FastAPI backend on Windows.
REM Runs from the project root as a Python package:
REM     py -m uvicorn backend.main:app --reload

cd /d "%~dp0"

IF NOT EXIST ".venv" (
    echo Creating virtual environment...
    py -m venv .venv
)

call .venv\Scripts\activate

echo Installing dependencies...
pip install -q -r requirements.txt

echo.
echo Starting FastAPI server at http://localhost:8000
echo Swagger UI:   http://localhost:8000/docs
echo Press Ctrl+C to stop.
echo.

py -m uvicorn backend.main:app --reload
