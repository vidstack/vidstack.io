import { useEffect, useState } from 'react';

export const useMediaQuery = (query: string) => {
	const [match, setMatch] = useState(false);

	useEffect(() => {
		const mediaQuery = window.matchMedia(query);
		setMatch(mediaQuery.matches);
		const handler = () => setMatch(mediaQuery.matches);
		mediaQuery.addEventListener('change', handler);
		return () => mediaQuery.removeEventListener('change', handler);
	}, [query]);

	return match;
};
