# Sync prototype assets to plugin/castory/public/
# Usage: .\scripts\sync-assets.ps1

$ErrorActionPreference = 'Stop'
$root   = Split-Path -Parent $PSScriptRoot
$proto  = Join-Path $root 'prototypes'
$plugin = Join-Path $root 'plugin\castory\public'

New-Item -ItemType Directory -Force -Path "$plugin\css\components" | Out-Null
New-Item -ItemType Directory -Force -Path "$plugin\js\components" | Out-Null
New-Item -ItemType Directory -Force -Path "$plugin\css\pages" | Out-Null
New-Item -ItemType Directory -Force -Path "$plugin\js\pages" | Out-Null

Copy-Item -Path "$proto\shared\css\*" -Destination "$plugin\css\" -Recurse -Force
Copy-Item -Path "$proto\shared\js\*" -Destination "$plugin\js\" -Recurse -Force

Copy-Item "$proto\home\page.css" "$plugin\css\pages\home.css" -Force
Copy-Item "$proto\explore\page.css" "$plugin\css\pages\explore.css" -Force
Copy-Item "$proto\library\page.css" "$plugin\css\pages\library.css" -Force
Copy-Item "$proto\profile\page.css" "$plugin\css\pages\profile.css" -Force
Copy-Item "$proto\trending-video\page.css" "$plugin\css\pages\trending-video.css" -Force
Copy-Item "$proto\trending-audio\page.css" "$plugin\css\pages\trending-audio.css" -Force
Copy-Item "$proto\new-episodes\page.css" "$plugin\css\pages\new-episodes.css" -Force

Copy-Item "$proto\home\script.js" "$plugin\js\pages\home.js" -Force
Copy-Item "$proto\explore\script.js" "$plugin\js\pages\explore.js" -Force
Copy-Item "$proto\library\script.js" "$plugin\js\pages\library.js" -Force
Copy-Item "$proto\profile\script.js" "$plugin\js\pages\profile.js" -Force
Copy-Item "$proto\trending-video\app.js" "$plugin\js\pages\trending-video.js" -Force
Copy-Item "$proto\trending-audio\script.js" "$plugin\js\pages\trending-audio.js" -Force
Copy-Item "$proto\new-episodes\js\main.js" "$plugin\js\pages\new-episodes.js" -Force

# Preserve WP-only bridge (not in prototypes)
if (-not (Test-Path "$plugin\js\castory-wp-bridge.js")) {
  Write-Warning 'castory-wp-bridge.js missing — restore from plugin source.'
}

Write-Host "Synced assets to $plugin"
