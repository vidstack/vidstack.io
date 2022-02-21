import { browser } from '$app/env';
import { derived, get, writable } from 'svelte/store';
import { mediaQuery } from './mediaQuery';

export type ColorScheme = 'light' | 'dark' | 'system';

const LOCAL_STORAGE_KEY = 'vidstack::color-scheme';

const prefersDarkColorScheme = mediaQuery('(prefers-color-scheme: dark)');

export const colorSchemes: ColorScheme[] = ['light', 'dark', 'system'];

const __colorScheme = writable<ColorScheme>(currentColorScheme());
export const colorScheme = {
	...__colorScheme,
	set(scheme: ColorScheme) {
		saveColorScheme(scheme);
		__colorScheme.set(scheme);
	}
};

export const isDarkColorScheme = derived(
	[colorScheme, prefersDarkColorScheme],
	([$scheme, $prefersDark]) => $scheme === 'dark' || ($scheme === 'system' && $prefersDark)
);

function currentColorScheme(): ColorScheme {
	const savedValue = browser && localStorage[LOCAL_STORAGE_KEY];
	return savedValue ? savedValue : 'system';
}

function saveColorScheme(scheme: ColorScheme) {
	if (!browser) return;

	localStorage[LOCAL_STORAGE_KEY] = scheme;

	const isDarkScheme = scheme === 'dark' || (scheme === 'system' && get(prefersDarkColorScheme));
	document.documentElement.classList[isDarkScheme ? 'add' : 'remove']('dark');
}
