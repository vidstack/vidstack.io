import type { PluginSimple } from 'markdown-it';
import type Token from 'markdown-it/lib/token';
import container from 'markdown-it-container';

import type { MarkdownParser } from '../types';

export const containerPlugin: PluginSimple = (parser: MarkdownParser) => {
	parser
		.use(...createContainer('note'))
		.use(...createContainer('tip'))
		.use(...createContainer('info'))
		.use(...createContainer('warning'))
		.use(...createContainer('danger'));
};

type ContainerArgs = [
	typeof container,
	string,
	{
		render(tokens: Token[], idx: number): string;
	}
];

function createContainer(type: string): ContainerArgs {
	return [
		container,
		type,
		{
			render(tokens, idx) {
				const token = tokens[idx];
				const title = token.info.trim().slice(type.length).trim();
				if (token.nesting === 1) {
					return `<Admonition type="${type}"${title ? `title="${title}"` : ''}>`;
				} else {
					return `</Admonition>\n`;
				}
			}
		}
	];
}
