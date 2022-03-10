import { spawnSync } from 'child_process';
import minimist from 'minimist';

const args = minimist(process.argv.slice(2));

spawnSync('rimraf', ['node-lib/dist']);

spawnSync(
  'node',
  [
    '.scripts/build.js',
    '--bundle',
    '--entry=node-lib/*/index.ts',
    '--external=vite,svelte,rollup,shiki',
    '--outbase=node-lib',
    '--outdir=node-lib/dist',
    args.w || args.watch ? '--watch' : '',
  ],
  { stdio: 'inherit' },
);
