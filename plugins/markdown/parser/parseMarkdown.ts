import fs from 'fs';
import path from 'path';
import LRUCache from 'lru-cache';
import matter from 'gray-matter';
import toml from 'toml';
import type {
	MarkdownMeta,
	MarkdownParser,
	MarkdownParserEnv,
	ParsedMarkdownResult,
	ParseMarkdownOptions
} from './types';
import { preventViteReplace } from './utils/preventViteReplace';
import { slugify } from './utils/slugify';

export type ParsedMarkdownToSvelteResult = {
	component: string;
	meta: MarkdownMeta;
};

const cache = new LRUCache<string, ParsedMarkdownToSvelteResult>({ max: 1024 });

export function parseMarkdownToSvelte(
	parser: MarkdownParser,
	source: string,
	filePath: string,
	options: ParseMarkdownOptions = {}
): ParsedMarkdownToSvelteResult {
	const cachedResult = cache.get(source);
	if (cachedResult) return cachedResult;

	const {
		html,
		meta,
		env: parserEnv
	} = parseMarkdown(parser, commentOutTemplateTags(source), filePath, {
		...options
	});

	const { hoistedTags = [] } = parserEnv as MarkdownParserEnv;

	addMarkdownMetaStore(hoistedTags);
	addSlug(options.baseUrl ?? '/', filePath, hoistedTags);

	const component =
		buildMetaExport(dedupeHoistedTags(hoistedTags), meta).join('\n') +
		`\n\n${uncommentTemplateTags(html)}`;

	const result: ParsedMarkdownToSvelteResult = {
		component,
		meta
	};

	cache.set(source, result);
	return result;
}

const OPENING_SCRIPT_TAG_RE = /<\s*script[^>]*>/;
const OPENING_SCRIPT_MODULE_TAG_RE = /<\s*script[^>]*\scontext="module"\s*[^>]*>/;
const CLOSING_SCRIPT_TAG_RE = /<\/script>/;

const OPENING_STYLE_TAG_RE = /<\s*style[^>]*>/;
const CLOSING_STYLE_TAG_RE = /<\/style>/;

const IMPORT_GLOBALS_CODE = [
	'Admonition',
	'CodeFence',
	'TableOfContents',
	'Steps',
	'Step',
	'TabbedLinks',
	'TableWrapper'
]
	.map((component) => `import ${component} from '$components/markdown/${component}.svelte';`)
	.join('\n');

function buildMetaExport(tags: string[], meta: MarkdownMeta): string[] {
	const code = `\nconst __markdown = ${JSON.stringify(meta, null, 2)};\nexport{ __markdown };\n`;

	const scriptModuleIndex = tags.findIndex((tag) => OPENING_SCRIPT_MODULE_TAG_RE.test(tag));

	if (scriptModuleIndex > -1) {
		const tagSrc = tags[scriptModuleIndex];
		tags[scriptModuleIndex] = tagSrc.replace(
			CLOSING_SCRIPT_TAG_RE,
			IMPORT_GLOBALS_CODE + code + `</script>`
		);
	} else {
		tags.unshift(`<script context="module">${IMPORT_GLOBALS_CODE}${code}</script>`);
	}

	return tags;
}

const TEMPLATE_TAG_RE =
	/(\{#(if|each|await|key).*\})|(\{:(else|then|catch).*\})|(\{\/(if|each|key|await)\})|(\{@(html|debug).*\})/gim;

function commentOutTemplateTags(source: string) {
	return source.replace(TEMPLATE_TAG_RE, (match) => {
		return `<!--&%& ${match} &%&-->`;
	});
}

const TEMPLATE_TAG_COMMENT_RE = /(<!--&%&\s)|(\s&%&-->)/gim;

function uncommentTemplateTags(source: string) {
	return source.replace(TEMPLATE_TAG_COMMENT_RE, '');
}

function dedupeHoistedTags(tags: string[] = []): string[] {
	const deduped = new Map();

	const merge = (key: string, tag: string, openingTagRe: RegExp, closingTagRE: RegExp) => {
		if (!deduped.has(key)) {
			deduped.set(key, tag);
			return;
		}

		const block = deduped.get(key)!;
		deduped.set(key, block.replace(closingTagRE, tag.replace(openingTagRe, '')));
	};

	tags.forEach((tag) => {
		if (OPENING_SCRIPT_MODULE_TAG_RE.test(tag)) {
			merge('module', tag, OPENING_SCRIPT_MODULE_TAG_RE, CLOSING_SCRIPT_TAG_RE);
		} else if (OPENING_SCRIPT_TAG_RE.test(tag)) {
			merge('script', tag, OPENING_SCRIPT_TAG_RE, CLOSING_SCRIPT_TAG_RE);
		} else if (OPENING_STYLE_TAG_RE.test(tag)) {
			merge('style', tag, OPENING_STYLE_TAG_RE, CLOSING_STYLE_TAG_RE);
		} else {
			// Treat unknowns as unique and leave them as-is.
			deduped.set(Symbol(), tag);
		}
	});

	return Array.from(deduped.values());
}

const ROOT_ROUTES_PATH = path.resolve(process.cwd(), 'src/routes');
function addSlug(baseUrl: string, filePath: string, hoistedTags: string[]) {
	const route = `${baseUrl}${path.relative(ROOT_ROUTES_PATH, filePath)}`;

	const slug = route
		.replace(/\/?(index|md).*?$/, '')
		.split('/')
		.map(slugify)
		.join('/');

	hoistedTags.push(
		[
			'<script context="module">',
			`export const /*#__PURE__*/__slug = \`${slug}\`;`,
			'</script>'
		].join('\n')
	);
}

function addMarkdownMetaStore(hoistedTags: string[]) {
	hoistedTags.push(
		[
			'<script>',
			[
				"import { markdownMeta } from '$stores/markdownMeta';",
				'markdownMeta.set(__markdown);',
				!hoistedTags.join('').includes('onDestroy') && "import { onDestroy } from 'svelte';",
				'onDestroy(() => { markdownMeta.set(null); });'
			]
				.filter(Boolean)
				.join('\n  '),
			'</script>'
		].join('\n')
	);
}

function parseMarkdown(
	parser: MarkdownParser,
	source: string,
	filePath: string,
	options: ParseMarkdownOptions = {}
): ParsedMarkdownResult {
	const {
		data: frontmatter,
		content,
		excerpt
	} = matter(source, {
		excerpt_separator: '<!-- more -->',
		engines: {
			toml: toml.parse.bind(toml)
		}
	});

	const parserEnv: MarkdownParserEnv = {
		filePath,
		frontmatter
	};

	let html = parser.render(content, parserEnv);

	const excerptHtml = parser.render(excerpt ?? '');

	if (options.escapeConstants) {
		html = preventViteReplace(html, options.define);
	}

	const { headers = [], importedFiles = [], links = [], title = '' } = parserEnv;

	const _title = frontmatter.title ?? title;
	const description = frontmatter.description;

	delete frontmatter['title'];
	delete frontmatter['description'];

	const result: ParsedMarkdownResult = {
		content,
		html,
		links,
		importedFiles,
		env: parserEnv,
		meta: {
			excerpt: excerptHtml,
			headers,
			title: _title,
			description,
			frontmatter,
			lastUpdated: Math.round(fs.statSync(filePath).mtimeMs)
		}
	};

	return result;
}
