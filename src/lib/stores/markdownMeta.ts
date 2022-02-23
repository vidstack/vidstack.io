import { writable } from 'svelte/store';

export type MarkdownFrontmatter = Record<string, unknown>;

export type MarkdownHeader = {
	level: number;
	title: string;
	slug: string;
	children: MarkdownHeader[];
};

export type MarkdownMeta = {
	title: string;
	description: string;
	excerpt: string;
	headers: MarkdownHeader[];
	frontmatter: MarkdownFrontmatter;
	lastUpdated: number;
};

export const markdownMeta = writable<MarkdownMeta | null>(null);
export const activeMarkdownCategory = writable<string | null>(null);
