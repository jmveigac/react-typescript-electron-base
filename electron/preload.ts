import { contextBridge } from 'electron';

export const electronAPI = Object.freeze({
  platform: process.platform,
  versions: Object.freeze({
    electron: process.versions.electron ?? '',
    chrome: process.versions.chrome ?? '',
    node: process.versions.node,
  }),
});

contextBridge.exposeInMainWorld('electronAPI', electronAPI);
