# Simple IPTV Test App

A minimal IPTV player for webOS TV testing.

## Features
- Load M3U playlists from URL
- Parse and display channels
- Play HLS streams using HLS.js
- localStorage caching
- Remote control support
- Emergency cache clear

## Build & Deploy

```bash
# Package the app
ares-package simple-iptv-test

# Install on TV
ares-install --device lg-tv com.simpleiptv.test_1.0.0_all.ipk

# Launch
ares-launch --device lg-tv com.simpleiptv.test
```

## Default M3U URL
Pre-configured with your IPTV provider URL.

## Controls
- **Arrow Keys**: Navigate channels
- **Enter/OK**: Play channel
- **Back/Escape**: Close player
- **Load Playlist**: Import channels from URL
- **Clear Cache**: Remove all cached data

## Memory Optimized
- No frameworks (vanilla JavaScript)
- No animations
- Minimal dependencies (only HLS.js)
- Lightweight DOM manipulation
