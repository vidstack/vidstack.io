import type { PluginSimple } from 'markdown-it';
import { resolveHighlightLines } from './resolveHighlightLines';
import { resolveLanguage } from './resolveLanguage';

/**
 * Plugin to enable styled code fences with line numbers, syntax highlighting, etc.
 */
export const codePlugin: PluginSimple = (parser) => {
	// Override default fence renderer.
	parser.renderer.rules.fence = (tokens, idx, options) => {
		const token = tokens[idx];

		// Get token info.
		const info = token.info ? parser.utils.unescapeAll(token.info).trim() : '';

		// Resolve language from token info.
		const language = resolveLanguage(info);

		// Try to get highlighted code.
		const code =
			options.highlight?.(token.content, language.name, '') ||
			parser.utils.escapeHtml(token.content);

		let html = code.replace(/\sclass="shiki" style=".*?"/, '').trim();

		// Code fences always have an ending `\n`, so we should trim the last line.
		const lines = code.split('\n').slice(0, -1);

		// Resolve highlight line ranges from token info.
		const highlightLinesRanges = resolveHighlightLines(info);

		const highlight = `[${highlightLinesRanges
			?.map((range) => `[${range[0]}, ${range[1]}]`)
			.join(',')}]`;

		// Resolve line-numbers mark from token info.
		const useLineNumbers = /:line-numbers\b/.test(info);

		html = `<CodeFence lang="${language.name}" ext="${language.ext}" lines={${lines.length}}${
			useLineNumbers ? ' lineNumbers' : ''
		}${
			(highlightLinesRanges?.length ?? 0) > 0 ? ` highlightLines={${highlight}}` : ''
		}>{@html \`${html}\`}</CodeFence>`;

		return html;
	};
};
