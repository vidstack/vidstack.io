import { useContext } from 'react';

import { ThemeContext } from '$context/ThemeContext';

export function useDarkTheme() {
	const { theme, setTheme } = useContext(ThemeContext);

	return [
		theme === 'dark',
		(darkTheme: boolean) => {
			setTheme(darkTheme ? 'dark' : 'light');
		},
	] as const;
}
