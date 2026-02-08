$componentsToCreate = @(
    @{name="toggle"; dir="packages/form/toggle/toggle"; desc="Toggle switch component"; keywords=@("toggle","switch","checkbox","form")},
    @{name="breadcrumb"; dir="packages/navigation/breadcrumb/breadcrumb"; desc="Breadcrumb navigation component"; keywords=@("breadcrumb","navigation","path","trail")},
    @{name="navbar"; dir="packages/navigation/navbar/navbar"; desc="Navbar component"; keywords=@("navbar","navigation","menu","header")},
    @{name="sidebar"; dir="packages/navigation/sidebar/sidebar"; desc="Sidebar component"; keywords=@("sidebar","navigation","menu","drawer")},
    @{name="tabs"; dir="packages/navigation/tabs/tabs"; desc="Tabs component"; keywords=@("tabs","navigation","tabbed","panel")},
    @{name="tooltip"; dir="packages/overlay/tooltip/tooltip"; desc="Tooltip component"; keywords=@("tooltip","overlay","hint","popup")},
    @{name="dropdown"; dir="packages/overlay/dropdown/dropdown"; desc="Dropdown component"; keywords=@("dropdown","menu","select","overlay")},
    @{name="modal"; dir="packages/overlay/modal/modal"; desc="Modal component"; keywords=@("modal","dialog","popup","overlay")},
    @{name="carousel"; dir="packages/media/carousel/carousel"; desc="Carousel component"; keywords=@("carousel","slider","gallery","media")},
    @{name="datepicker"; dir="packages/form/datepicker/datepicker"; desc="Datepicker component"; keywords=@("datepicker","date","calendar","form")},
    @{name="slider"; dir="packages/form/slider/slider"; desc="Slider component"; keywords=@("slider","range","input","form")},
    @{name="timeline"; dir="packages/data/timeline/timeline"; desc="Timeline component"; keywords=@("timeline","chronology","events","history")},
    @{name="pagination"; dir="packages/data/pagination/pagination"; desc="Pagination component"; keywords=@("pagination","pager","navigation","data")},
    @{name="progress"; dir="packages/components/progress/progress"; desc="Progress bar component"; keywords=@("progress","loading","bar","indicator")},
    @{name="search-box"; dir="packages/utility/search-bar"; desc="Search box component"; keywords=@("search","input","find","filter")},
    @{name="hero"; dir="packages/components/hero"; desc="Hero section component"; keywords=@("hero","banner","header","section")}
)

$template = @'
{
  "name": "@muxima-ui/{NAME}",
  "version": "1.0.0",
  "description": "{DESC} for Angular 18+ - Muxima UI",
  "keywords": [
    "angular",
    {KEYWORDS}
    "muxima-ui"
  ],
  "author": "Muxima UI Team (jokerscript)",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/Aldemiro20/muxima-ui.git",
    "directory": "{DIR}"
  },
  "homepage": "https://muxima-ui.vercel.app/components/{NAME}",
  "bugs": {
    "url": "https://github.com/Aldemiro20/muxima-ui/issues"
  },
  "documentation": "https://muxima-ui.vercel.app",
  "publishConfig": {
    "access": "public"
  },
  "peerDependencies": {
    "@angular/common": "^18.0.0",
    "@angular/core": "^18.0.0"
  },
  "dependencies": {
    "tslib": "^2.3.0"
  },
  "sideEffects": false
}
'@

$created = 0
foreach ($comp in $componentsToCreate) {
    $packagePath = Join-Path $comp.dir "package.json"
    
    if (-not (Test-Path $packagePath)) {
        $keywords = ($comp.keywords | ForEach-Object { "`"$_`"" }) -join ",`n    "
        $content = $template -replace '{NAME}', $comp.name
        $content = $content -replace '{DESC}', $comp.desc
        $content = $content -replace '{DIR}', $comp.dir
        $content = $content -replace '{KEYWORDS}', "$keywords,`n    "
        
        Set-Content -Path $packagePath -Value $content -Encoding UTF8
        Write-Host "Criado: $packagePath" -ForegroundColor Green
        $created++
    } else {
        Write-Host "Existe: $packagePath" -ForegroundColor Yellow
    }
}

Write-Host "`nTotal criados: $created" -ForegroundColor Cyan
