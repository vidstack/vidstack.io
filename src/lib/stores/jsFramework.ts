import { browser } from '$app/env';
import { writable } from 'svelte/store';

const LOCAL_STORAGE_KEY = 'vidstack::js-framework';

const initValue = () => {
	const savedValue = browser && localStorage[LOCAL_STORAGE_KEY];
	return savedValue ? savedValue : 'js';
};

export type JsFrameworkType = 'vanilla' | 'react';

const store = writable<JsFrameworkType>(initValue());

export const jsFramework = {
	...store,
	set(value: JsFrameworkType) {
		if (browser) {
			localStorage[LOCAL_STORAGE_KEY] = value;
		}

		store.set(value);
	}
} as const;
