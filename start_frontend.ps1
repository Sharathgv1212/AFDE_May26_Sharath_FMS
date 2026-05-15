# Start the React + Vite frontend on Windows (PowerShell).
# Run from the project root:
#     .\start_frontend.ps1
#
# If PowerShell blocks the script with an execution-policy error, run once:
#     Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
# Or run this script with:
#     powershell -ExecutionPolicy Bypass -File .\start_frontend.ps1

$ErrorActionPreference = "Stop"

# Move into the frontend folder (relative to this script's location)
Set-Location -Path (Join-Path $PSScriptRoot "frontend")

# Install npm dependencies on first run
if (-not (Test-Path "node_modules")) {
    Write-Host "Installing npm dependencies (one-time, takes ~1 minute)..." -ForegroundColor Cyan
    npm install
}

Write-Host ""
Write-Host "Starting Vite dev server at http://localhost:5173" -ForegroundColor Green
Write-Host "Press Ctrl+C to stop." -ForegroundColor Yellow
Write-Host ""

npm run dev
