#!/bin/bash

echo "========================================"
echo "EPAM Corporate PR Agent - Local Run"
echo "========================================"
echo

echo "Starting EPAM Corporate PR Agent..."
echo

echo "Step 1: Activating virtual environment..."
source venv/bin/activate
if [ $? -ne 0 ]; then
    echo "ERROR: Virtual environment not found. Please run setup_unix.sh first."
    exit 1
fi

echo "Step 2: Starting backend server..."
python run_agent.py &
BACKEND_PID=$!

echo "Step 3: Waiting for backend to start..."
sleep 5

echo "Step 4: Starting frontend server..."
cd frontend
npm run dev &
FRONTEND_PID=$!

echo
echo "========================================"
echo "Application Started!"
echo "========================================"
echo
echo "Backend: http://localhost:8000"
echo "Frontend: http://localhost:3000"
echo
echo "Press Ctrl+C to stop both servers..."

# Function to cleanup on exit
cleanup() {
    echo
    echo "Stopping servers..."
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    exit 0
}

# Set trap to cleanup on script exit
trap cleanup SIGINT SIGTERM

# Wait for user to stop
wait
