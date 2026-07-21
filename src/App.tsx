import './App.css';

const stack = ['React 19', 'TypeScript 7', 'Vite 8', 'Electron 43'];

function App() {
  const runtime = window.electronAPI;

  return (
    <main className="app-shell">
      <section className="hero">
        <span className="eyebrow">Desktop starter</span>
        <h1>React + TypeScript + Electron</h1>
        <p className="hero-copy">
          A minimal desktop template with secure Electron defaults, a Vite-powered
          renderer and automated tests.
        </p>
        <div className="stack-list" aria-label="Template stack">
          {stack.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </section>

      <section className="status-grid" aria-label="Runtime status">
        <article className="status-card">
          <span className="status-label">Environment</span>
          <strong>{runtime ? 'Electron runtime' : 'Browser preview'}</strong>
          <p>{runtime ? `Platform: ${runtime.platform}` : 'Run npm start to open Electron.'}</p>
        </article>

        <article className="status-card">
          <span className="status-label">Security defaults</span>
          <strong>Renderer isolated</strong>
          <p>Context isolation and sandboxing are enabled; Node integration is disabled.</p>
        </article>

        <article className="status-card">
          <span className="status-label">Runtime versions</span>
          <strong>{runtime ? `Electron ${runtime.versions.electron}` : 'Available in Electron'}</strong>
          <p>
            {runtime
              ? `Chromium ${runtime.versions.chrome} · Node ${runtime.versions.node}`
              : 'The preload bridge exposes only platform and runtime version metadata.'}
          </p>
        </article>
      </section>
    </main>
  );
}

export default App;
