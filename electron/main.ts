import { app, BrowserWindow } from 'electron';
import path from 'node:path';

import { createWindowOptions } from './window-options';

function createWindow(): BrowserWindow {
  const window = new BrowserWindow(
    createWindowOptions(path.join(__dirname, 'preload.js')),
  );

  const devServerUrl = process.env.VITE_DEV_SERVER_URL;
  const isDevelopment = !app.isPackaged && Boolean(devServerUrl);

  if (isDevelopment && devServerUrl) {
    void window.loadURL(devServerUrl);
    window.webContents.openDevTools();
  } else {
    void window.loadFile(path.join(__dirname, '../renderer/index.html'));
    window.setMenu(null);
  }

  window.once('ready-to-show', () => {
    window.setTitle(`${app.getName()} v${app.getVersion()}`);
    window.show();
  });

  return window;
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
