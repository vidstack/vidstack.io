import { createContext } from 'react';

import { inBrowser } from '$utils/browser';

export const prefersDark = inBrowser
	? window.matchMedia('(prefers-color-scheme: dark)').matches
	: false;

export type Theme = 'light' | 'dark';

const storageKey = 'vidstack::theme';

export function initialTheme(): Theme {
	if (!inBrowser) return 'dark';

	if (
		localStorage[storageKey] === 'dark' ||
		(!(storageKey in localStorage) &&
			window.matchMedia('(prefers-color-scheme: dark)').matches)
	) {
		return 'dark';
	} else {
		return 'light';
	}
}

export function saveTheme(theme: Theme) {
	if (!inBrowser) return;

	const isDarkTheme = theme === 'dark';

	if (isDarkTheme && prefersDark) {
		localStorage.removeItem(storageKey);
	} else {
		localStorage[storageKey] = theme;
	}

	document.documentElement.classList[isDarkTheme ? 'add' : 'remove']('dark');
}

export const ThemeContext = createContext<{
	theme: Theme;
	setTheme(theme: Theme): void;
}>({
	theme: 'dark',
	setTheme() {},
});
