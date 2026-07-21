import { createWindowOptions } from '../electron/window-options';

describe('createWindowOptions', () => {
  it('uses secure renderer defaults', () => {
    const options = createWindowOptions('C:\\app\\preload.js');

    expect(options.webPreferences).toMatchObject({
      preload: 'C:\\app\\preload.js',
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
    });
    expect(options.show).toBe(false);
  });
});
