import { vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  exposeInMainWorld: vi.fn(),
}));

vi.mock('electron', () => ({
  contextBridge: {
    exposeInMainWorld: mocks.exposeInMainWorld,
  },
}));

import { electronAPI } from '../electron/preload';

describe('preload bridge', () => {
  it('exposes only the intentional runtime metadata API', () => {
    expect(Object.keys(electronAPI)).toEqual(['platform', 'versions']);
    expect(Object.keys(electronAPI.versions)).toEqual(['electron', 'chrome', 'node']);
    expect(mocks.exposeInMainWorld).toHaveBeenCalledOnce();
    expect(mocks.exposeInMainWorld).toHaveBeenCalledWith('electronAPI', electronAPI);
  });
});
