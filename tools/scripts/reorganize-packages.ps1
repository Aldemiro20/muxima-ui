# Script para reorganizar componentes por categoria

$componentsMap = @{
    "components" = @(
        "button", "badge", "chip", "avatar", "card", "skeleton", 
        "loading", "progress", "accordion", "alert"
    );
    "form" = @(
        "input", "select", "autocomplete", "checkbox", "radio-button", 
        "toggle", "slider", "slider-range", "datepicker", "time-picker",
        "date-range-picker", "color-picker", "otp-input", "search-bar",
        "multi-select"
    );
    "data" = @(
        "table", "data-table", "pagination", "tree-view", "timeline",
        "stats-card"
    );
    "overlay" = @(
        "dialog", "modal", "drawer", "dropdown", "tooltip", "toast",
        "notification-center", "command-palette", "confirmation-dialog"
    );
    "navigation" = @(
        "navbar", "sidebar", "breadcrumb", "tabs", "stepper", "tour-guide"
    );
    "media" = @(
        "video-player", "image-cropper", "carousel", "document-viewer"
    );
    "advanced" = @(
        "chart", "kanban", "gantt-chart", "calendar", "rich-text-editor",
        "quill-editor", "code-diff-viewer", "smart-form-builder", 
        "shopping-cart", "file-manager", "comments"
    );
    "utility" = @(
        "copy-to-clipboard", "signature-pad", "drag-drop-zone", "file-upload",
        "virtual-keyboard", "voice-command", "gesture-controller", 
        "error-boundary", "language-selector", "user-profile-menu", "credit-card"
    )
}

Write-Host "Reorganizando componentes..." -ForegroundColor Cyan

foreach ($category in $componentsMap.Keys) {
    Write-Host "Categoria: $category" -ForegroundColor Yellow
    
    foreach ($component in $componentsMap[$category]) {
        $source = "packages\$component"
        $dest = "packages\$category\$component"
        
        if (Test-Path $source) {
            Write-Host "  Movendo $component..." -ForegroundColor Green
            New-Item -ItemType Directory -Path "packages\$category" -Force | Out-Null
            Move-Item -Path $source -Destination $dest -Force
        }
    }
}

Write-Host "Concluido!" -ForegroundColor Green
