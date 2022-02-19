import type { PluginSimple } from 'markdown-it';
import { isLinkExternal } from '../utils/isLink';

/**
 * Resolves link URLs.
 */
export const linksPlugin: PluginSimple = (parser) => {
	// Attrs that going to be added to external links.
	const externalAttrs = {
		target: '_blank',
		rel: 'noopener noreferrer'
	};

	parser.renderer.rules.link_open = (tokens, idx, options, env, self) => {
		const token = tokens[idx];
		const hrefIndex = token.attrIndex('href');

		if (hrefIndex >= 0) {
			const hrefAttr = token.attrs?.[hrefIndex];
			const hrefLink = hrefAttr[1];

			const internalLinkMatch = hrefLink.match(/^((?:.*)(?:\/|\.md|\.html))(#.*)?$/);

			if (isLinkExternal(hrefLink, '/')) {
				Object.entries(externalAttrs ?? {}).forEach(([key, val]) => {
					token.attrSet(key, val);
				});
			} else if (internalLinkMatch) {
				const rawPath = internalLinkMatch?.[1];
				const rawHash = internalLinkMatch?.[2] ?? '';

				// Set new path.
				hrefAttr[1] = rawPath.replace(/\.(md|html)/, '') + rawHash;

				const links = env.links || (env.links = []);
				links.push(hrefAttr[1]);
			}
		}

		return self.renderToken(tokens, idx, options);
	};
};
