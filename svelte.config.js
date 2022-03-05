import path from 'path';
import adapter from '@sveltejs/adapter-auto';
import * as preprocess from 'svelte-preprocess';
import Icons from 'unplugin-icons/vite';

import { componentsPlugin } from './node-lib/dist/components-plugin/index.js';
import { svelteMarkdownPlugin } from './node-lib/dist/markdown-plugin/index.js';
import { highlightCodePlugin } from './node-lib/dist/highlight-plugin/index.js';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md'],

	// @ts-expect-error - CJS -> ESM conversion.
	preprocess: [preprocess.default.typescript()],

	kit: {
		adapter: adapter(),

		vite: {
			resolve: {
				alias: {
					$actions: path.resolve('./src/lib/actions'),
					$components: path.resolve('./src/lib/components'),
					$fonts: path.resolve('./src/lib/fonts'),
					$img: path.resolve('./src/lib/img'),
					$polyfills: path.resolve('./src/lib/polyfills'),
					$stores: path.resolve('./src/lib/stores'),
					$styles: path.resolve('./src/lib/styles'),
					$utils: path.resolve('./src/lib/utils')
				}
			},
			plugins: [
				componentsPlugin(),
				svelteMarkdownPlugin({ baseUrl: '/' }),
				highlightCodePlugin(),
				Icons({ compiler: 'svelte' })
			]
		}
	}
};

export default config;
