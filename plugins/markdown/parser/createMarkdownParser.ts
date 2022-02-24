import MarkdownIt from 'markdown-it';

import {
	anchorPlugin,
	codePlugin,
	admonitionPlugin,
	createShikiPlugin,
	customComponentPlugin,
	emojiPlugin,
	extractHeadersPlugin,
	extractTitlePlugin,
	hoistTagsPlugin,
	importCodePlugin,
	linksPlugin,
	tocPlugin,
	stepsPlugin
} from './plugins';
import { type MarkdownParser } from './types';

export async function createMarkdownParser(): Promise<MarkdownParser> {
	const parser = MarkdownIt({
		html: true
	});

	parser.use(emojiPlugin);
	parser.use(anchorPlugin);
	parser.use(tocPlugin);
	parser.use(extractHeadersPlugin);
	parser.use(extractTitlePlugin);
	parser.use(admonitionPlugin);
	parser.use(stepsPlugin);
	parser.use(customComponentPlugin);
	parser.use(linksPlugin);
	parser.use(codePlugin);
	parser.use(importCodePlugin);
	parser.use(hoistTagsPlugin);
	parser.use(await createShikiPlugin());

	return parser;
}
