# Math Sprouts 🌱

A fun, educational math app for children ages 3-8.

## 🚀 PWA (Progressive Web App)
Math Sprouts is now a fully installable PWA!
- **Offline Support**: Play anywhere, even without internet.
- **Installable**: Add it to your home screen on iOS, Android, or Desktop.
- **Persistent**: Your progress and settings are saved locally.

For more details on testing and deployment, see [docs/PWA.md](./docs/PWA.md).

## 🛠 Project Stack
- **Framework**: Create React App (CRA)
- **Styling**: Tailwind CSS (via CDN)
- **State Management**: React Hooks (useState, useEffect, useCallback)
- **Persistence**: LocalStorage
- **Animations**: CSS Keyframes + canvas-confetti

## 🏗 Available Scripts

In the project directory, you can run:

### `npm start`
Runs the app in development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm run build`
Builds the app for production to the `build` folder.
**Note**: The Service Worker and PWA features are primarily active in the production build.

### `npm test`
Launches the test runner.

## 📦 Deployment
This app can be deployed to any static hosting provider (Netlify, Vercel, etc.).
**Requirement**: Must be served over **HTTPS** for PWA features to work.

---
Built with ❤️ for young mathematicians.
