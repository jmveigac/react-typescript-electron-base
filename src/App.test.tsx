import { render, screen } from '@testing-library/react';

import App from './App';

afterEach(() => {
  delete window.electronAPI;
});

describe('App', () => {
  it('renders the template summary in a browser preview', () => {
    render(<App />);

    expect(
      screen.getByRole('heading', { name: /react \+ typescript \+ electron/i }),
    ).toBeInTheDocument();
    expect(screen.getByText('Browser preview')).toBeInTheDocument();
    expect(screen.getByText(/renderer isolated/i)).toBeInTheDocument();
  });

  it('shows runtime metadata exposed by the preload bridge', () => {
    window.electronAPI = {
      platform: 'win32',
      versions: {
        electron: '43.1.1',
        chrome: '150.0.0.0',
        node: '24.18.0',
      },
    };

    render(<App />);

    expect(screen.getByText('Electron runtime')).toBeInTheDocument();
    expect(screen.getByText('Electron 43.1.1')).toBeInTheDocument();
    expect(screen.getByText(/Chromium 150\.0\.0\.0 · Node 24\.18\.0/)).toBeInTheDocument();
  });
});
