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

## LG webOS Browser Support

LG webOS TVs do not ship Chrome/Firefox/etc. directly. Instead, each generation includes LG's own **LG Web Browser**, which is a WebKit/Chromium‑based engine. LG documents the web engine versions per platform here: <https://webostv.developer.lge.com/develop/specifications/web-api-and-web-engine>.

The table below summarizes the official mapping from **webOS TV platform → engine version**:

| TV platform             | Model year(s)    | Web engine            | Notes |
| ----------------------- | ---------------- | --------------------- | ----- |
| webOS TV 25             | 2025             | Chromium 120          | Latest generation at time of writing; near‑desktop Chromium feature set. |
| webOS TV 24             | 2024             | Chromium 108          | Modern Chromium with strong ES2015+ and CSS support. |
| webOS TV 23             | 2023             | Chromium 94           | Modern JS/CSS, solid MSE/EME and HLS/DASH support. |
| webOS TV 22             | 2022             | Chromium 87           | Good ES6+/CSS, reliable HTML5 video and MSE. |
| webOS TV 6.x            | 2021             | Chromium 79           | Approx. early‑2020 Chromium level; async/await and modern CSS widely available. |
| webOS TV 5.x            | 2020             | Chromium 68           | ES2015+ capable, good SVG/CSS, strong MSE/EME. Well‑suited to Hls.js. |
| webOS TV 4.x            | 2018–2019        | Chromium 53           | Chromium‑class engine with ES6, Promises, fetch, Flexbox, partial Grid. Stable MSE for HLS/DASH. |
| webOS TV 3.x            | 2016–2017        | Chromium 38 (QtWebEngine 5.2.1) | Earlier Chromium; mostly ES5 + some ES6, basic MSE. |
| webOS TV 2.x            | 2015             | WebKit 538.2          | WebKit engine; limited ES6; internal browser engine differs from app engine. |
| webOS TV 1.x            | 2014             | WebKit 537.41         | Earliest webOS TV engine; ES5‑only era. |

Additional note from LG: on webOS TV 1.x and 2.x, the **browser apps** (not web apps) use Chromium 26 and 34 respectively, even though the app engine is WebKit‑based.

### Which specific browser version is running?

LG does not publish a stable mapping from "TV model → exact Chrome/WebKit version" and firmware updates can change the underlying engine. In practice, you should:

1. **Inspect the user agent** inside the web app:

	```js
	console.log(navigator.userAgent);
	```

	On many models this includes a `Chrome/x.y.z` token that reflects the underlying Chromium build used by LG Web Browser.

2. **Treat the engine as a fixed target per TV**, not as a frequently updating desktop browser. Feature‑test instead of relying on a specific Chrome version number.

### Compatibility assumptions for this app

- The app is written to run comfortably on **webOS 4.0+** (2018 TVs and newer), where ES6, `fetch`, and modern CSS are reasonably supported.
- HLS playback uses **native HLS where available**, with **Hls.js** as a fallback for engines with robust MSE support.
- To support significantly older webOS (≤3.5) you would likely need additional transpilation/polyfills and more testing on those devices.

