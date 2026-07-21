jest.mock('electron', () => ({
  contextBridge: {
    exposeInMainWorld: jest.fn(),
  },
}));

import { contextBridge } from 'electron';

import { electronAPI } from '../electron/preload';

const exposeInMainWorldMock = jest.mocked(contextBridge.exposeInMainWorld);

describe('preload bridge', () => {
  it('exposes only the intentional runtime metadata API', () => {
    expect(Object.keys(electronAPI)).toEqual(['platform', 'versions']);
    expect(Object.keys(electronAPI.versions)).toEqual(['electron', 'chrome', 'node']);
    expect(exposeInMainWorldMock).toHaveBeenCalledTimes(1);
    expect(exposeInMainWorldMock).toHaveBeenCalledWith('electronAPI', electronAPI);
  });
});
