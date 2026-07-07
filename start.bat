@echo off
echo ========================================
echo   Devendiran T - Portfolio Website
echo ========================================
echo.
echo Starting development server...
echo.
echo The portfolio will open at: http://localhost:5173
echo.
echo Press Ctrl+C to stop the server.
echo ========================================
echo.

cd /d "%~dp0"
npm run dev

pause
