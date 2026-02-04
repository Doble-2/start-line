# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Deploy web (Vercel)

This project is configured to export a static web build to `dist/`.

### Local build

```bash
npm run build
```

### Deploy

1. Push your repo to GitHub/GitLab/Bitbucket.
2. Import it in Vercel.
3. In Vercel project settings:
   - Build Command: `npm run build` (or `npm run vercel-build`)
   - Output Directory: `dist`

`vercel.json` includes a rewrite to `index.html` so Expo Router routes work on refresh/deep links.

## Android APK / AAB (EAS)

This project includes an `eas.json` with profiles for APK (preview) and AAB (production).

### One-time setup

```bash
npm i -g eas-cli
eas login
eas build:configure
```

On first build, EAS may ask you to set an Android package (Application ID). Pick something like `com.tuempresa.startline`.

### Build APK (installable)

```bash
npm run build:apk
```

### Build AAB (Play Store)

```bash
npm run build:aab
```

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
