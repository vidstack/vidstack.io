import { spawnSync } from 'child_process';
import minimist from 'minimist';

const args = minimist(process.argv.slice(2));

spawnSync('rimraf', ['plugins/dist']);

spawnSync(
	'node',
	[
		'.scripts/build.js',
		'--bundle',
		'--entry=plugins/*/index.ts',
		'--external=vite,svelte,rollup,shiki',
		'--outbase=plugins',
		'--outdir=plugins/dist',
		args.w || args.watch ? '--watch' : ''
	],
	{ stdio: 'inherit' }
);
