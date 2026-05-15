# Start the FastAPI backend on Windows (PowerShell).
# Run from the project root:
#     .\start_backend.ps1
#
# If PowerShell blocks the script with an execution-policy error, run once:
#     Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
# Or run this script with:
#     powershell -ExecutionPolicy Bypass -File .\start_backend.ps1

$ErrorActionPreference = "Stop"

# Move to the folder this script lives in (project root)
Set-Location -Path $PSScriptRoot

# Create venv on first run
if (-not (Test-Path ".venv")) {
    Write-Host "Creating virtual environment..." -ForegroundColor Cyan
    py -m venv .venv
}

# Activate venv
& .\.venv\Scripts\Activate.ps1

Write-Host "Installing dependencies..." -ForegroundColor Cyan
pip install -q -r requirements.txt

Write-Host ""
Write-Host "Starting FastAPI server at http://localhost:8000" -ForegroundColor Green
Write-Host "Swagger UI:   http://localhost:8000/docs" -ForegroundColor Green
Write-Host "Press Ctrl+C to stop." -ForegroundColor Yellow
Write-Host ""

py -m uvicorn backend.main:app --reload
