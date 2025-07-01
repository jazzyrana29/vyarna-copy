# Baby Tracker App

A simple Expo-powered React Native app for logging your baby’s feedings, sleep sessions, and diaper changes.

---

## 📋 Prerequisites

1. **Node.js & npm**
   Install from [https://nodejs.org/](https://nodejs.org/) (LTS version recommended).

2. **Expo CLI**
   Install globally (or use `npx`):

   ```bash
   npm install --global expo-cli
   ```

3. **Expo Go** (on your device)

    - **iOS** (App
      Store): [https://apps.apple.com/app/expo-go/id982107779](https://apps.apple.com/app/expo-go/id982107779)
    - **Android** (Play
      Store): [https://play.google.com/store/apps/details?id=host.exp.exponent](https://play.google.com/store/apps/details?id=host.exp.exponent)

4. **Expo Account**
   You’ll need a free Expo account to publish projects or collaborate.

5. **EmailJS Account**
   Sign up at [https://www.emailjs.com/](https://www.emailjs.com/) to send emails from your app.

6. **Deepchk**
   A tool to detect unused dependencies in your project. Install it globally:

   ```bash
   npm install --save-dev depcheck
   npm install --global jq
   ```

---

## 🚀 Getting Started

1. **Clone the repository**

   ```bash
   git clone git@gitlab.com:vyarna/Vyarna.git
   cd Vyarna
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Create and configure environment file**

   ```bash
   cp .env-example .env
   ```

   Then open `.env` and fill in your EmailJS service ID, template ID, user ID, etc.

4. **Start the Expo development server**

   ```bash
   npx expo start
   ```

   This will open the Expo Dev Tools in your browser and display a QR code.

---

## Build

You can build the project for different platforms using these npm scripts:

```bash
# Web (export static files)
npm run build:web
# runs: npx expo export --platform web

# Android (EAS build)
npm run build:android
# runs: eas build --platform android

# iOS (EAS build)
npm run build:ios # runs: eas build --platform ios
```

---

## 🛠️ Common Commands

- **Run on Android emulator**

  ```bash
  npx expo run:android
  ```

- **Run on iOS simulator** (macOS + Xcode)

  ```bash
  npx expo run:ios
  ```

- **Run in web browser**

  ```bash
  npx expo run:web
  ```

- **Clear Metro cache**

  ```bash
  npx expo start --clear
  ```

---

## 🕵️ Deepchk Commands

1. **Generate report**

   ```bash
   npm run depcheck:report
   ```

   Creates `depcheck-report.json` with unused dependencies.

2. **Prune unused deps**

   ```bash
   npm run depcheck:prune
   ```

   Uninstalls all packages listed in `depcheck-report.json`.

3. **Full deepchk**

   ```bash
   npm run depcheck
   ```

   Runs report and prune in sequence.

---

## 📂 Project Structure

```
.
├── App.tsx                # App entrypoint
├── babel.config.js        # Babel config (NativeWind plugin)
├── tailwind.config.js     # TailwindCSS config for NativeWind
├── package.json
├── .env-example           # Sample env vars
└── src/
    ├── components/        # Reusable UI components (PrimaryButton, EntryItem…)
    ├── screens/           # Home, AddEntry, Settings screens
    ├── navigation/        # React Navigation setup
    ├── state/             # Zustand store (babyStore.ts)
    ├── types/             # Shared TypeScript types
    └── utils/             # Helpers, constants, etc.
```

---

## 🎯 Next Steps

- Build out additional UI components under `src/components/`
- Add data persistence (SQLite or AsyncStorage)
- Implement settings (e.g. profile management, backups)
- Write unit and integration tests

---

Happy coding! If you run into any issues, please open an issue or reach out. 😊
