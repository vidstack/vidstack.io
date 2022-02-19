import { createFilter } from '@rollup/pluginutils';
import type { Plugin } from 'vite';

import { createMarkdownParser, parseMarkdownToSvelte, MarkdownParser } from './parser';

export const PLUGIN_NAME = '@vidstack/markdown' as const;

const DEFAULT_INCLUDE_RE = /\.md($|\?)/;

export function svelteMarkdownPlugin(): Plugin {
	let parser: MarkdownParser;
	let isBuild: boolean;
	let define: Record<string, unknown> | undefined;

	const filter = createFilter(DEFAULT_INCLUDE_RE);

	/** Page system file paths. */
	const files = new Set<string>();

	return {
		name: PLUGIN_NAME,
		enforce: 'pre' as const,
		async configResolved(config) {
			isBuild = config.command === 'build';
			define = config.define;
			parser = await createMarkdownParser();
		},
		transform(code, id) {
			if (filter(id)) {
				const { component } = parseMarkdownToSvelte(parser, code, id, {
					escapeConstants: isBuild,
					define
				});

				return component;
			}

			return null;
		},
		async handleHotUpdate(ctx) {
			const { file, read } = ctx;

			// Hot reload `.md` files as `.svelte` files.
			if (files.has(file)) {
				const content = await read();

				const { component } = parseMarkdownToSvelte(parser, content, file, {
					escapeConstants: isBuild,
					define
				});

				ctx.read = () => component;
			}
		}
	};
}
