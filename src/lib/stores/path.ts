import { page } from '$app/stores';
import { derived } from 'svelte/store';

export const isReactPath = derived(page, ($page) => /\/react\/?/.test($page.url.pathname));
export const isComponentsPath = derived(page, ($page) =>
	/\/components\/?/.test($page.url.pathname)
);
export const isApiPath = derived(page, ($page) => /\/api\/?/.test($page.url.pathname));
