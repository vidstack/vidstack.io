import { createContext } from 'react';

import { inBrowser } from '$utils/browser';

export type ContrastLevel = 'low' | 'high';

const storageKey = 'vidstack::contrast_level';

export function initialContrastLevel(): ContrastLevel {
	if (!inBrowser) return 'low';

	const savedLevel = localStorage[storageKey];

	if (savedLevel) {
		return savedLevel;
	} else {
		return document.documentElement.classList.contains('high-contrast')
			? 'high'
			: 'low';
	}
}

export function saveContrastLevel(level: ContrastLevel) {
	if (inBrowser) {
		const isHighContrast = level === 'high';
		localStorage[storageKey] = level;
		document.documentElement.classList[isHighContrast ? 'add' : 'remove'](
			'high-contrast',
		);
	}
}

export const ContrastLevelContext = createContext<{
	contrastLevel: ContrastLevel;
	setContrastLevel(level: ContrastLevel): void;
}>({
	contrastLevel: 'low',
	setContrastLevel() {},
});
