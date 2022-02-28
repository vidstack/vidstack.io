/* eslint-disable @typescript-eslint/no-empty-interface */

/// <reference types="@sveltejs/kit" />
/// <reference types="unplugin-icons/types/svelte" />

// See https://kit.svelte.dev/docs/typescript for information about these interfaces
declare namespace App {
	interface Locals {}

	interface Platform {}

	interface Session {}

	interface Stuff {}
}

declare module '*?highlight' {
	const tokens: string;
	const code: string;
	/** Highlighted code. */
	const hlCode: string;
	export { tokens, code, hlCode };
}

declare module '*.md' {
	import { SvelteComponent } from 'svelte';

	type MarkdownFrontmatter = Record<string, unknown>;

	type MarkdownHeader = {
		level: number;
		title: string;
		slug: string;
		children: MarkdownHeader[];
	};

	type MarkdownMeta = {
		title: string;
		description: string;
		excerpt: string;
		headers: MarkdownHeader[];
		frontmatter: MarkdownFrontmatter;
		lastUpdated: number;
	};

	const component: SvelteComponent;
	const __markdown: MarkdownMeta;
	const __slug: string;

	export { __markdown, __slug };
	export default SvelteComponent;
}
