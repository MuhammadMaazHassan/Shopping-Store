@echo off
echo Starting Shopping Store Backend and Frontend...
echo.

echo Starting Backend Server...
start cmd /k "cd backend && npm run dev"

timeout /t 3 /nobreak > nul

echo Starting Frontend Server...
start cmd /k "cd frontend && npm run dev"

echo.
echo Servers started!
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
echo.
pause