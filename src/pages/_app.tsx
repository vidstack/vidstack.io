import 'focus-visible/dist/focus-visible.min';
import '$css/global.css';

import ProgressBar from '@badrap/bar-of-progress';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Router from 'next/router';
import { useState } from 'react';

import {
	ContrastLevel,
	ContrastLevelContext,
	initialContrastLevel,
	saveContrastLevel,
} from '$context/ContrastLevelContext';
import {
	initialTheme,
	saveTheme,
	Theme,
	ThemeContext,
} from '$context/ThemeContext';
import { inBrowser } from '$utils/browser';

const progress = new ProgressBar({
	size: 2,
	color: '#f53d7a',
	className: 'page-load-progress',
	delay: 100,
});

// This fixes safari jumping to the bottom of the page when closing the search modal using the
// `esc` key.
if (typeof window !== 'undefined') {
	progress.start();
	progress.finish();
}

Router.events.on('routeChangeStart', progress.start);
Router.events.on('routeChangeComplete', () => {
	progress.finish();
	window.scrollTo(0, 0);
});
Router.events.on('routeChangeError', progress.finish);

function App({ Component, pageProps, router }: AppProps) {
	const [contrastLevel, setContrastLevel] = useState(initialContrastLevel());
	const [theme, setTheme] = useState(initialTheme());

	function updateContrastLevel(level: ContrastLevel) {
		setContrastLevel(level);
		saveContrastLevel(level);
	}

	function updateTheme(theme: Theme) {
		setTheme(theme);
		saveTheme(theme);
	}

	return (
		<>
			<Head>
				<meta key="twitter:site" name="twitter:site" content="@vidstackhq" />

				<meta
					key="twitter:creator"
					name="twitter:creator"
					content="@vidstackhq"
				/>

				<meta
					key="og:url"
					property="og:url"
					content={`https://vidstack.io${router.pathname}`}
				/>
			</Head>
			<ThemeContext.Provider value={{ theme, setTheme: updateTheme }}>
				<ContrastLevelContext.Provider
					value={{
						contrastLevel,
						setContrastLevel: updateContrastLevel,
					}}
				>
					<Component {...pageProps} />
				</ContrastLevelContext.Provider>
			</ThemeContext.Provider>
		</>
	);
}

export default App;
