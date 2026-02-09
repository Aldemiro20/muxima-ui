# Script to remove BOM (Byte Order Mark) from all package.json files

$packagesPath = "packages"
$fixed = 0
$checked = 0

Write-Host "Scanning for package.json files with BOM..." -ForegroundColor Cyan

# Find all package.json files
$packageFiles = Get-ChildItem -Path $packagesPath -Recurse -Filter "package.json" | 
    Where-Object { $_.Directory.Name -notmatch "node_modules|dist" }

Write-Host "Found $($packageFiles.Count) package.json files to check" -ForegroundColor Green

foreach ($file in $packageFiles) {
    $checked++
    
    # Read file as bytes to check for BOM
    $bytes = [System.IO.File]::ReadAllBytes($file.FullName)
    
    # Check if file starts with UTF-8 BOM (EF BB BF)
    $hasBom = ($bytes.Length -ge 3 -and $bytes[0] -eq 0xEF -and $bytes[1] -eq 0xBB -and $bytes[2] -eq 0xBF)
    
    if ($hasBom) {
        Write-Host "  Fixing BOM in: $($file.FullName)" -ForegroundColor Yellow
        
        # Read content
        $content = [System.IO.File]::ReadAllText($file.FullName)
        
        # Remove BOM if present at start of string
        if ($content[0] -eq [char]0xFEFF) {
            $content = $content.Substring(1)
        }
        
        # Write back without BOM
        $utf8NoBom = New-Object System.Text.UTF8Encoding $false
        [System.IO.File]::WriteAllText($file.FullName, $content, $utf8NoBom)
        
        $fixed++
    }
}

Write-Host ""
Write-Host "Scan complete!" -ForegroundColor Green
Write-Host "  Checked: $checked files" -ForegroundColor Cyan
Write-Host "  Fixed: $fixed files" -ForegroundColor $(if ($fixed -gt 0) { "Yellow" } else { "Green" })

if ($fixed -eq 0) {
    Write-Host "  All files are clean!" -ForegroundColor Green
}
