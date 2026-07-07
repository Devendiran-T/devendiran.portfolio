@echo off
echo ========================================
echo   Devendiran T - Portfolio Website
echo   Starting Frontend + Backend
echo ========================================
echo.
echo Opening two terminal windows...
echo.
echo Frontend: http://localhost:5173
echo Backend:  http://localhost:5000
echo.
echo Close both windows to stop the servers.
echo ========================================
echo.

cd /d "%~dp0"

REM Start backend in new window
start "Portfolio Backend" cmd /k "cd backend && npm run dev"

REM Wait 2 seconds
timeout /t 2 /nobreak >nul

REM Start frontend in new window
start "Portfolio Frontend" cmd /k "npm run dev"

echo.
echo Both servers are starting in separate windows...
echo.
pause
