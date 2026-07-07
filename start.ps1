# Devendiran T - Portfolio Startup Script
# PowerShell version with colored output

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   Devendiran T - Portfolio Website" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "🚀 Starting development server..." -ForegroundColor Green
Write-Host ""
Write-Host "📍 The portfolio will open at: " -NoNewline -ForegroundColor White
Write-Host "http://localhost:5173" -ForegroundColor Cyan
Write-Host ""
Write-Host "⚡ Status: " -NoNewline -ForegroundColor White
Write-Host "Ready to launch!" -ForegroundColor Green
Write-Host ""
Write-Host "🛑 Press Ctrl+C to stop the server" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Set location to script directory
Set-Location -Path $PSScriptRoot

# Start development server
npm run dev
