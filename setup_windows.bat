@echo off
echo ========================================
echo EPAM Corporate PR Agent - Windows Setup
echo ========================================
echo.

echo Step 1: Checking if Python is installed...
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Python is not installed or not in PATH
    echo Please install Python 3.11+ from https://www.python.org/downloads/
    echo Make sure to check "Add Python to PATH" during installation
    pause
    exit /b 1
)
echo Python is installed ✓

echo.
echo Step 2: Checking if Node.js is installed...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed or not in PATH
    echo Please install Node.js 18+ from https://nodejs.org/
    pause
    exit /b 1
)
echo Node.js is installed ✓

echo.
echo Step 3: Creating virtual environment...
python -m venv venv
if %errorlevel% neq 0 (
    echo ERROR: Failed to create virtual environment
    pause
    exit /b 1
)
echo Virtual environment created ✓

echo.
echo Step 4: Activating virtual environment...
call venv\Scripts\activate
if %errorlevel% neq 0 (
    echo ERROR: Failed to activate virtual environment
    pause
    exit /b 1
)
echo Virtual environment activated ✓

echo.
echo Step 5: Installing Python dependencies...
pip install -r requirements.txt
if %errorlevel% neq 0 (
    echo ERROR: Failed to install Python dependencies
    pause
    exit /b 1
)
echo Python dependencies installed ✓

echo.
echo Step 6: Setting up environment variables...
if not exist .env (
    copy env.example .env
    echo Environment file created. Please edit .env with your API keys.
) else (
    echo Environment file already exists.
)
echo Environment setup complete ✓

echo.
echo Step 7: Installing frontend dependencies...
cd frontend
npm install
if %errorlevel% neq 0 (
    echo ERROR: Failed to install frontend dependencies
    pause
    exit /b 1
)
echo Frontend dependencies installed ✓

cd ..

echo.
echo ========================================
echo Setup Complete! 
echo ========================================
echo.
echo IMPORTANT: Before running the application:
echo 1. Edit the .env file with your API keys:
echo    - GOOGLE_API_KEY=your_google_api_key
echo    - TAVILY_API_KEY=your_tavily_api_key
echo.
echo 2. To run the application:
echo    - Backend: python run_agent.py
echo    - Frontend: cd frontend && npm run dev
echo.
echo 3. Open http://localhost:3000 in your browser
echo.
pause
