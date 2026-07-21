import { build, context } from 'esbuild';
import { copyFile, mkdir, rm } from 'node:fs/promises';
import path from 'node:path';

const rootDir = process.cwd();
const outDir = path.join(rootDir, 'dist', 'renderer');
const indexHtml = path.join(rootDir, 'index.html');

async function prepareOutput() {
  await rm(outDir, { recursive: true, force: true });
  await mkdir(outDir, { recursive: true });
  await copyFile(indexHtml, path.join(outDir, 'index.html'));
}

const options = {
  entryPoints: [path.join(rootDir, 'src', 'index.tsx')],
  bundle: true,
  outdir: outDir,
  entryNames: 'index',
  assetNames: 'assets/[name]-[hash]',
  format: 'esm',
  platform: 'browser',
  target: ['chrome150'],
  sourcemap: true,
  loader: {
    '.png': 'file',
    '.svg': 'file',
  },
};

async function run() {
  const mode = process.argv[2];
  await prepareOutput();

  if (mode === '--build') {
    await build({ ...options, minify: true });
    return;
  }

  if (mode === '--serve') {
    const ctx = await context(options);
    await ctx.watch();
    const server = await ctx.serve({
      host: '127.0.0.1',
      port: 5173,
      servedir: outDir,
    });
    console.log(`Renderer available at http://${server.host}:${server.port}`);
    return;
  }

  throw new Error('Use --build or --serve');
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
