#!/bin/bash

echo "========================================"
echo "EPAM Corporate PR Agent - Unix Setup"
echo "========================================"
echo

echo "Step 1: Checking if Python is installed..."
if ! command -v python3 &> /dev/null; then
    echo "ERROR: Python 3 is not installed"
    echo "Please install Python 3.11+ from https://www.python.org/downloads/"
    exit 1
fi
echo "Python is installed ✓"

echo
echo "Step 2: Checking if Node.js is installed..."
if ! command -v node &> /dev/null; then
    echo "ERROR: Node.js is not installed"
    echo "Please install Node.js 18+ from https://nodejs.org/"
    exit 1
fi
echo "Node.js is installed ✓"

echo
echo "Step 3: Creating virtual environment..."
python3 -m venv venv
if [ $? -ne 0 ]; then
    echo "ERROR: Failed to create virtual environment"
    exit 1
fi
echo "Virtual environment created ✓"

echo
echo "Step 4: Activating virtual environment..."
source venv/bin/activate
if [ $? -ne 0 ]; then
    echo "ERROR: Failed to activate virtual environment"
    exit 1
fi
echo "Virtual environment activated ✓"

echo
echo "Step 5: Installing Python dependencies..."
pip install -r requirements.txt
if [ $? -ne 0 ]; then
    echo "ERROR: Failed to install Python dependencies"
    exit 1
fi
echo "Python dependencies installed ✓"

echo
echo "Step 6: Setting up environment variables..."
if [ ! -f .env ]; then
    cp env.example .env
    echo "Environment file created. Please edit .env with your API keys."
else
    echo "Environment file already exists."
fi
echo "Environment setup complete ✓"

echo
echo "Step 7: Installing frontend dependencies..."
cd frontend
npm install
if [ $? -ne 0 ]; then
    echo "ERROR: Failed to install frontend dependencies"
    exit 1
fi
echo "Frontend dependencies installed ✓"

cd ..

echo
echo "========================================"
echo "Setup Complete!"
echo "========================================"
echo
echo "IMPORTANT: Before running the application:"
echo "1. Edit the .env file with your API keys:"
echo "   - GOOGLE_API_KEY=your_google_api_key"
echo "   - TAVILY_API_KEY=your_tavily_api_key"
echo
echo "2. To run the application:"
echo "   - Backend: python run_agent.py"
echo "   - Frontend: cd frontend && npm run dev"
echo
echo "3. Open http://localhost:3000 in your browser"
echo
