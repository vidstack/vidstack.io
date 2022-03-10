import { browser } from '$app/env';
import { readable } from 'svelte/store';

export function mediaQuery(query: string) {
  if (!browser) return readable(false);

  const mediaQuery = window.matchMedia(query);

  return readable(mediaQuery.matches, (set) => {
    const handler = (event: MediaQueryListEvent) => {
      set(event.matches);
    };

    mediaQuery.addEventListener('change', handler);
    return () => {
      mediaQuery.removeEventListener('change', handler);
    };
  });
}
