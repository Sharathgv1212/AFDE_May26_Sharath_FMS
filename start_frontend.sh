#!/usr/bin/env bash
# Start the React + Vite frontend on macOS / Linux.
set -e

cd "$(dirname "$0")/frontend"

if [ ! -d "node_modules" ]; then
    echo "Installing npm dependencies..."
    npm install
fi

echo
echo "Starting Vite dev server at http://localhost:5173"
echo "Press Ctrl+C to stop."
echo

npm run dev
