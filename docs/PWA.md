# Math Sprouts PWA Documentation

Math Sprouts is now a Progressive Web App (PWA). This means it can be installed on your device and works offline.

## Features
- **Installable**: Add to Home Screen on iOS, Android, and Desktop.
- **Offline Support**: Core gameplay and assets are cached for play without internet.
- **Persistent Progress**: Your garden and settings are stored in `localStorage` and persist across reloads and offline sessions.

## Technical Implementation
- **Service Worker**: Located at `/public/sw.js`. It uses a `cache-first` strategy for static assets and a versioned cache (`mathsprouts-v1`).
- **Manifest**: Located at `/public/manifest.json`. Defines the app name, icons, and theme colors.
- **Registration**: Managed by `src/serviceWorkerRegistration.js` and initialized in `src/index.js`.

## How to Test

### Desktop (Chrome/Edge)
1. Open Chrome DevTools (F12).
2. Go to the **Application** tab.
3. Check **Manifest**: Ensure it's detected and shows the icons.
4. Check **Service Workers**: Ensure `sw.js` is registered and "Activated and is running".
5. **Offline Test**:
   - Go to **Network** tab and check "Offline".
   - Reload the page. The app should still load and be playable.
6. **Install**: Look for the install icon in the address bar or use the "Install" button in the app.

### Android (Chrome)
1. Open the app in Chrome.
2. A prompt to "Add Math Sprouts to Home screen" should appear (or use the "Install" button in the app).
3. Once installed, turn off Wi-Fi/Data and open the app from the home screen.

### iOS (Safari)
1. Open the app in Safari.
2. Tap the **Share** button (box with upward arrow).
3. Scroll down and tap **Add to Home Screen**.
4. Open the app from the home screen.

## Deployment Requirements
- **HTTPS**: PWAs require a secure connection (HTTPS) to work in production.
- **Static Hosting**: Can be hosted on Netlify, Vercel, GitHub Pages, or any static file server.

## Cache Management
To update the app code for users:
1. Increment the `CACHE_NAME` version in `public/sw.js` (e.g., `mathsprouts-v2`).
2. The service worker will detect the change, download the new files, and update on the next reload.
