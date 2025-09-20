@echo off
echo ========================================
echo EPAM Corporate PR Agent - Local Run
echo ========================================
echo.

echo Starting EPAM Corporate PR Agent...
echo.

echo Step 1: Activating virtual environment...
call venv\Scripts\activate
if %errorlevel% neq 0 (
    echo ERROR: Virtual environment not found. Please run setup_windows.bat first.
    pause
    exit /b 1
)

echo Step 2: Starting backend server...
start "Backend Server" cmd /k "python run_agent.py"

echo Step 3: Waiting for backend to start...
timeout /t 5 /nobreak >nul

echo Step 4: Starting frontend server...
cd frontend
start "Frontend Server" cmd /k "npm run dev"

echo.
echo ========================================
echo Application Started!
echo ========================================
echo.
echo Backend: http://localhost:8000
echo Frontend: http://localhost:3000
echo.
echo Press any key to close this window...
pause >nul
