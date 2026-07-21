# React + TypeScript + Electron Base

Minimal desktop application template using React, TypeScript, Vite and Electron with secure renderer defaults, Jest coverage and GitHub Actions CI.

## Tooling decision

This template uses **Vite instead of Create React App**. Create React App is deprecated for new applications, while this project only needs a client-side renderer inside Electron. Vite keeps the renderer setup small, provides fast development reloads and produces static assets that Electron can package directly.

The repository uses **npm only** for dependency management and project scripts. Tests run with **Jest** and React Testing Library; Babel is used only to transform TypeScript/TSX for Jest, while TypeScript itself remains responsible for type checking through `npm run check`.

## Requirements

- Node.js 24 LTS recommended; Node.js 22.12+ is the minimum supported runtime for the current toolchain.
- npm

## Stack

- React 19
- TypeScript 7
- Vite 8
- Electron 43
- electron-builder
- Jest + React Testing Library

## Use as a template

Create a repository from this template or clone it, then install the exact dependency tree from `package-lock.json`:

```bash
npm ci
```

Start the React renderer and Electron together:

```bash
npm start
```

Renderer changes use Vite hot reload. Changes to the Electron main or preload process require restarting the development command.

## Commands

| Command | Purpose |
| --- | --- |
| `npm start` | Run Vite, compile Electron code in watch mode and launch Electron. |
| `npm run dev` | Run only the Vite renderer in a browser. |
| `npm run check` | Type-check the renderer, tests, Electron main process and preload. |
| `npm test` | Run the Jest suite once. |
| `npm run test:watch` | Run Jest in watch mode. |
| `npm run build` | Build the renderer and compile Electron TypeScript. |
| `npm run electron:pack` | Create an unpacked Electron application for the current platform. |
| `npm run electron:build` | Create distributable packages with electron-builder. |
| `npm run version:patch` | Increment the patch version in `package.json` and `package-lock.json`. |

Generated output is written to `dist/` and packaged applications to `release/`.

## Electron security defaults

The renderer runs with:

- `contextIsolation: true`
- `nodeIntegration: false`
- `sandbox: true`

The preload bridge exposes only platform information and Electron/Chromium/Node runtime versions. Add new renderer-to-main capabilities deliberately through the preload layer rather than enabling Node.js in the renderer.

Development-only DevTools are opened only when Electron is running against the local Vite development server; packaged builds do not start development tooling.

## Tests and CI

Tests cover the React starter UI, the preload bridge surface and the BrowserWindow security configuration.

Pull requests targeting `main` run three independent GitHub Actions jobs:

- **Check** — `npm ci` and TypeScript validation.
- **Test** — `npm ci` and the Jest test suite.
- **Build** — `npm ci`, Vite production build, Electron TypeScript compilation and an unpacked electron-builder package.

Dependabot checks npm and GitHub Actions dependencies weekly.
