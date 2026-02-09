# Script to update all component package.json files to support Angular 15+# Script to update all component package.json files to support Angular 15+



$packagesPath = "packages"$packagesPath = "packages"



# Find all package.json files in the packages directory# Find all package.json files in the packages directory

$packageFiles = Get-ChildItem -Path $packagesPath -Recurse -Filter "package.json" | Where-Object { $_.Directory.Name -notmatch "node_modules|dist" }$packageFiles = Get-ChildItem -Path $packagesPath -Recurse -Filter "package.json" | 

    Where-Object { $_.Directory.Name -notmatch "node_modules|dist" }

Write-Host "Found $($packageFiles.Count) package.json files to update" -ForegroundColor Green

Write-Host "Found $($packageFiles.Count) package.json files to update" -ForegroundColor Green

foreach ($file in $packageFiles) {

    Write-Host "Processing: $($file.FullName)" -ForegroundColor Cyanforeach ($file in $packageFiles) {

        Write-Host "Processing: $($file.FullName)" -ForegroundColor Cyan

    # Read the package.json content    

    $content = Get-Content $file.FullName -Raw | ConvertFrom-Json    # Read the package.json content

        $content = Get-Content $file.FullName -Raw | ConvertFrom-Json

    # Check if peerDependencies exists and has Angular dependencies    

    if ($content.peerDependencies) {    # Check if peerDependencies exists and has Angular dependencies

        $updated = $false    if ($content.peerDependencies) {

                $updated = $false

        # Update @angular/common        

        if ($content.peerDependencies.'@angular/common') {        # Update @angular/common

            $oldVersion = $content.peerDependencies.'@angular/common'        if ($content.peerDependencies.'@angular/common') {

            $content.peerDependencies.'@angular/common' = ">=15.0.0"            $oldVersion = $content.peerDependencies.'@angular/common'

            Write-Host "  Updated @angular/common from $oldVersion to >=15.0.0" -ForegroundColor Yellow            $content.peerDependencies.'@angular/common' = ">=15.0.0"

            $updated = $true            Write-Host "  Updated @angular/common: $oldVersion -> >=15.0.0" -ForegroundColor Yellow

        }            $updated = $true

                }

        # Update @angular/core        

        if ($content.peerDependencies.'@angular/core') {        # Update @angular/core

            $oldVersion = $content.peerDependencies.'@angular/core'        if ($content.peerDependencies.'@angular/core') {

            $content.peerDependencies.'@angular/core' = ">=15.0.0"            $oldVersion = $content.peerDependencies.'@angular/core'

            Write-Host "  Updated @angular/core from $oldVersion to >=15.0.0" -ForegroundColor Yellow            $content.peerDependencies.'@angular/core' = ">=15.0.0"

            $updated = $true            Write-Host "  Updated @angular/core: $oldVersion -> >=15.0.0" -ForegroundColor Yellow

        }            $updated = $true

                }

        # Update @angular/forms        

        if ($content.peerDependencies.'@angular/forms') {        # Update @angular/forms

            $oldVersion = $content.peerDependencies.'@angular/forms'        if ($content.peerDependencies.'@angular/forms') {

            $content.peerDependencies.'@angular/forms' = ">=15.0.0"            $oldVersion = $content.peerDependencies.'@angular/forms'

            Write-Host "  Updated @angular/forms from $oldVersion to >=15.0.0" -ForegroundColor Yellow            $content.peerDependencies.'@angular/forms' = ">=15.0.0"

            $updated = $true            Write-Host "  Updated @angular/forms: $oldVersion -> >=15.0.0" -ForegroundColor Yellow

        }            $updated = $true

                }

        # Update @angular/platform-browser        

        if ($content.peerDependencies.'@angular/platform-browser') {        # Update @angular/platform-browser

            $oldVersion = $content.peerDependencies.'@angular/platform-browser'        if ($content.peerDependencies.'@angular/platform-browser') {

            $content.peerDependencies.'@angular/platform-browser' = ">=15.0.0"            $oldVersion = $content.peerDependencies.'@angular/platform-browser'

            Write-Host "  Updated @angular/platform-browser from $oldVersion to >=15.0.0" -ForegroundColor Yellow            $content.peerDependencies.'@angular/platform-browser' = ">=15.0.0"

            $updated = $true            Write-Host "  Updated @angular/platform-browser: $oldVersion -> >=15.0.0" -ForegroundColor Yellow

        }            $updated = $true

                }

        # Update @angular/cdk if present        

        if ($content.peerDependencies.'@angular/cdk') {        # Update @angular/cdk if present

            $oldVersion = $content.peerDependencies.'@angular/cdk'        if ($content.peerDependencies.'@angular/cdk') {

            $content.peerDependencies.'@angular/cdk' = ">=15.0.0"            $oldVersion = $content.peerDependencies.'@angular/cdk'

            Write-Host "  Updated @angular/cdk from $oldVersion to >=15.0.0" -ForegroundColor Yellow            $content.peerDependencies.'@angular/cdk' = ">=15.0.0"

            $updated = $true            Write-Host "  Updated @angular/cdk: $oldVersion -> >=15.0.0" -ForegroundColor Yellow

        }            $updated = $true

                }

        if ($updated) {        

            # Save the updated package.json with proper formatting        if ($updated) {

            $content | ConvertTo-Json -Depth 10 | Set-Content $file.FullName -Encoding UTF8            # Save the updated package.json with proper formatting

            Write-Host "  Saved changes successfully" -ForegroundColor Green            $content | ConvertTo-Json -Depth 10 | Set-Content $file.FullName -Encoding UTF8

        } else {            Write-Host "  ✓ Saved changes" -ForegroundColor Green

            Write-Host "  No Angular dependencies found" -ForegroundColor Gray        } else {

        }            Write-Host "  - No Angular dependencies found" -ForegroundColor Gray

    } else {        }

        Write-Host "  No peerDependencies found" -ForegroundColor Gray    } else {

    }        Write-Host "  - No peerDependencies found" -ForegroundColor Gray

}    }

}

Write-Host ""

Write-Host "All package.json files updated successfully!" -ForegroundColor GreenWrite-Host "`nAll package.json files updated successfully!" -ForegroundColor Green

Write-Host "Components now support Angular 15 and above" -ForegroundColor GreenWrite-Host "Components now support Angular 15 and above" -ForegroundColor Green

