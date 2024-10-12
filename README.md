# react-typescript-electron-base

## React, TS, Electron Base App

This is a base project to create React Typescript Electron applications

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser. 

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm bump:version`

Runs the bumpVersion.js script to automatically increment the version number in package.json.

### `npm prebuild`

Runs the updateManifest.js script before the build process to ensure manifest.json is updated with the latest data from package.json.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

### `npm test`

Launches the test runner in interactive watch mode.\
See the section about running tests for more information.

### `npm postinstall`

Runs after all dependencies have been installed. Uses electron-builder to install app dependencies necessary for Electron.

### `npm run electron:dev`

Runs the app in development mode with Electron. Uses concurrently to run multiple commands: disables the default browser, starts the React app, waits for it to be ready, and starts the Electron app.

### `npm run electron:build`

Builds the React app, compiles TypeScript for Electron, and then packages the Electron app using electron-builder.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However, we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
