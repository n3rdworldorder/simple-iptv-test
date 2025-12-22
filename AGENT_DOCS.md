# Project Documentation: simple-iptv-test

## Overview

**simple-iptv-test** is a lightweight project designed to test and demonstrate IPTV (Internet Protocol Television) playlist handling. It provides example M3U playlist files, a simple web interface, and a Node.js server for serving and interacting with IPTV streams.

## Project Structure

- `index.html`: The main web interface for interacting with the IPTV playlists.
- `server.js`: Node.js server that serves the web interface and playlist files.
- `example_m3u_small.m3u` / `example_m3u_large.m3u`: Example M3U playlist files for testing IPTV clients or parsers.
- `com.simpleiptv.test_1.0.0_all.ipk`: Example IPK package, possibly for deployment on set-top boxes or similar devices.
- `appinfo.json`: Metadata about the application (version, name, etc.).
- `package.json`: Node.js project manifest, including dependencies and scripts.
- `README.md`: Project overview and basic usage instructions.

## Key Concepts

- **M3U Playlists**: Standard format for IPTV channel lists. The example files can be used to test playlist parsing and playback.
- **Web Interface**: Allows users to load and interact with playlists in a browser.
- **Node.js Server**: Serves static files and may provide additional endpoints for playlist or stream handling.

## Usage

1. Install dependencies (if any):
   ```sh
   npm install
   ```
2. Start the server:
   ```sh
   node server.js
   ```
3. Open `index.html` in a browser (served by the Node.js server) to interact with the IPTV playlists.

## For Agents/LLMs

- The project is intended for demonstration and testing of IPTV playlist handling.
- The main logic is in `server.js` (Node.js) and `index.html` (frontend UI).
- Example playlists are provided for testing parsing and playback features.
- The project does not require a database or external services.
- Modifications may include adding playlist parsing, stream proxying, or UI enhancements.

## Additional Notes

- The `.ipk` file is for packaging and may not be relevant for all use cases.
- The project is self-contained and easy to extend for IPTV-related experiments.
