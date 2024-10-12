import { app, BrowserWindow } from 'electron';
import * as path from 'path';
import installExtension, { REACT_DEVELOPER_TOOLS } from "electron-devtools-installer";

function createWindow() {
    const window = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            // contextIsolation: false,
            preload: path.join(__dirname, 'preload.js')
        }
    });

    if (app.isPackaged) window.setMenu(null);

    window.loadURL(app.isPackaged ? `file://${__dirname}/../index.html` : 'http://localhost:3000/index.html').then(() => {
        window.setTitle(`${app.getName()} - Versión ${app.getVersion()}`);
    });

    if (!app.isPackaged) {
        window.webContents.openDevTools();

        // Hot Reloading on 'node_modules/.bin/electronPath'
        require('electron-reload')(__dirname, {
            electron: path.join(__dirname,
                '..',
                '..',
                'node_modules',
                '.bin',
                'electron' + (process.platform === "win32" ? ".cmd" : "")),
            forceHardReset: true,
            hardResetMethod: 'exit'
        });
    }
}

app.whenReady().then(() => {
    // DevTools
    installExtension(REACT_DEVELOPER_TOOLS)
        .then((name) => console.log(`Added Extension:  ${name}`))
        .catch((err) => console.log('An error occurred: ', err));

    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });

    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') {
            app.quit();
        }
    });
});