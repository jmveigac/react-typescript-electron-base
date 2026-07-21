# React + TypeScript + Electron Base

Minimal desktop application template using React, TypeScript and Electron with secure renderer defaults, Jest coverage and GitHub Actions CI.

## Tooling decision

The renderer is bundled directly with **esbuild** instead of Create React App or Vite. The repository keeps the frontend build intentionally small: esbuild bundles the React/TypeScript renderer, TypeScript performs type checking, Jest runs tests, and Electron remains responsible for the desktop runtime.

The repository uses **npm only** for dependency management and project scripts. Tests run with **Jest** and React Testing Library; Babel is used only to transform TypeScript/TSX for Jest.

## Requirements

- Node.js 24 LTS recommended; Node.js 22.12+ is the minimum supported runtime for the current toolchain.
- npm

## Stack

- React 19
- TypeScript 7
- Electron 43
- esbuild
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

Renderer changes are rebuilt automatically by esbuild. Changes to the Electron main or preload process require restarting the development command.

## Commands

| Command | Purpose |
| --- | --- |
| `npm start` | Run the renderer dev server, compile Electron code in watch mode and launch Electron. |
| `npm run dev` | Run only the renderer development server in a browser. |
| `npm run check` | Type-check the renderer, tests, Electron main process and preload. |
| `npm test` | Run the Jest suite once. |
| `npm run test:watch` | Run Jest in watch mode. |
| `npm run build` | Bundle the renderer and compile Electron TypeScript. |
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

Development-only DevTools are opened only when Electron is running against the local renderer development server; packaged builds do not start development tooling.

## Tests and CI

Tests cover the React starter UI, the preload bridge surface and the BrowserWindow security configuration.

Pull requests targeting `main` run three independent GitHub Actions jobs:

- **Check** — `npm ci` and TypeScript validation.
- **Test** — `npm ci` and the Jest test suite.
- **Build** — `npm ci`, esbuild renderer bundle, Electron TypeScript compilation and an unpacked electron-builder package.

Dependabot checks npm and GitHub Actions dependencies weekly.
