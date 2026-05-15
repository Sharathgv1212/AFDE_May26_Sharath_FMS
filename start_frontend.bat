@echo off
REM Start the React + Vite frontend on Windows.

cd /d "%~dp0frontend"

IF NOT EXIST "node_modules" (
    echo Installing npm dependencies...
    call npm install
)

echo.
echo Starting Vite dev server at http://localhost:5173
echo Press Ctrl+C to stop.
echo.

call npm run dev
