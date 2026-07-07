# Profile Photo Setup Script

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   Profile Photo Setup" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if public folder exists
if (-not (Test-Path "public")) {
    Write-Host "Creating public folder..." -ForegroundColor Green
    New-Item -ItemType Directory -Path "public" -Force | Out-Null
}

# Check if photo exists
if (Test-Path "public\profile.jpg") {
    Write-Host "✓ Photo found: public\profile.jpg" -ForegroundColor Green
    $file = Get-Item "public\profile.jpg"
    Write-Host "  File size: $($file.Length / 1KB) KB" -ForegroundColor Gray
    Write-Host ""
    Write-Host "Your photo is ready! Run: npm run dev" -ForegroundColor Green
} else {
    Write-Host "✗ Photo not found" -ForegroundColor Red
    Write-Host ""
    Write-Host "To add your photo:" -ForegroundColor Yellow
    Write-Host "1. Save your photo as 'profile.jpg'" -ForegroundColor White
    Write-Host "2. Copy it to: $PWD\public" -ForegroundColor White
    Write-Host "3. Run this script again to verify" -ForegroundColor White
    Write-Host ""
    Write-Host "Or drag and drop your photo here and press Enter..." -ForegroundColor Cyan
    
    $photoPath = Read-Host "Photo path"
    
    if ($photoPath -and (Test-Path $photoPath)) {
        Write-Host "Copying photo..." -ForegroundColor Green
        Copy-Item $photoPath "public\profile.jpg"
        Write-Host "✓ Photo added successfully!" -ForegroundColor Green
        Write-Host "Run: npm run dev" -ForegroundColor Cyan
    }
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
pause
