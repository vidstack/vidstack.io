import path from 'path';
import minimist from 'minimist';
import globby from 'fast-glob';
import { build } from 'esbuild';
import kleur from 'kleur';

const args = minimist(process.argv.slice(2));

if (!args.entry) {
  console.error(kleur.red(`\n\n🚨 Missing entry argument \`--entry\`\n\n`));
}

if (!args.outdir) {
  console.error(kleur.red(`\n\n🚨 Missing outdir argument \`--outdir\`\n\n`));
}

const requireShim = [
  "import __path from 'path';",
  "import { fileURLToPath as __fileURLToPath } from 'url';",
  "import { createRequire as __createRequire } from 'module';",
  'const require = __createRequire(import.meta.url);',
  'var __require = function(x) { return require(x); };',
  '__require.__proto__.resolve = require.resolve;',
  'const __filename = __fileURLToPath(import.meta.url);',
  'const __dirname = __path.dirname(__filename);',
  '\n',
].join('\n');

async function main() {
  const entryPoints = (args.entry.includes(',') ? args.entry.split(',') : [args.entry])
    .map((glob) => globby.sync(glob))
    .flat();

  const outdir = path.resolve(process.cwd(), args.outdir);

  await build({
    entryPoints,
    outdir,
    outbase: args.outbase,
    logLevel: 'warning',
    platform: args.platform ?? 'node',
    format: 'esm',
    target: 'es2019',
    watch: args.watch || args.w,
    splitting: args.splitting ?? false,
    chunkNames: 'chunks/[name].[hash]',
    minify: args.minify ?? args.prod,
    banner: { js: requireShim },
    legalComments: 'none',
    sourcemap: true,
    treeShaking: true,
    incremental: args.watch || args.w,
    define: { __DEV__: args.prod ? 'false' : 'true' },
    bundle: args.bundle,
    external: args.bundle ? [...(args.external?.split(',') ?? [])] : undefined,
  });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
