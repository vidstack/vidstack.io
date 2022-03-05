import { page } from '$app/stores';
import { derived } from 'svelte/store';

const elementNameRe = /\/components\/.*?\/(.*?)(\/|$)/;
export const elementTagName = derived(page, ($page) => {
	const path = $page.url.pathname;
	const name = path.match(elementNameRe)?.[1];
	return name ? `vds-${name}` : '';
});

/** Auto-generate in the future by using doc tags in `@vidstack/player`. */
export const EXPERIMENTAL_TAG_NAMES = new Set([
	'vds-media-sync',
	'vds-media-visibility',
	'vds-gesture'
]);

export const isElementExperimental = derived(elementTagName, ($tagName) =>
	EXPERIMENTAL_TAG_NAMES.has($tagName)
);
