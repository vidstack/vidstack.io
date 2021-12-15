import NextDocument, {
	DocumentContext,
	Head,
	Html,
	Main,
	NextScript,
} from 'next/document';

const themeScript = `
if (
	localStorage['vidstack::theme'] === 'dark' ||
	(!('vidstack::theme' in localStorage) &&
		window.matchMedia('(prefers-color-scheme: dark)').matches)
) {
	document.documentElement.classList.add('dark');
} else {
	document.documentElement.classList.remove('dark');
}
`;

const contrastScript = `
if (localStorage['vidstack::constrast-level'] === 'high') {
	document.documentElement.classList.add('high-contrast');
} else {
	document.documentElement.classList.remove('high-contrast');
}
`;

const scrollbarWidthScript = `
document.addEventListener("DOMContentLoaded", function(event) {
	var scrollDiv = document.createElement("div");
	scrollDiv.style.width = '100px';
	scrollDiv.style.height = '100px';
	scrollDiv.style.overflow = 'scroll';
	scrollDiv.style.position = 'absolute';
	scrollDiv.style.top = '-9999px';
	document.body.appendChild(scrollDiv);
	window.requestAnimationFrame(() => {
		var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
		document.documentElement.style.setProperty('--scrollbar-width', scrollbarWidth + 'px');
		document.body.removeChild(scrollDiv);
	})
});
`;

export default class Document extends NextDocument {
	static async getInitialProps(ctx: DocumentContext): Promise<any> {
		const initialProps = await NextDocument.getInitialProps(ctx);
		return { ...initialProps };
	}

	render() {
		return (
			<Html lang="en" className="antialiased">
				<Head>
					<link
						rel="apple-touch-icon"
						sizes="180x180"
						href="/apple-touch-icon.png"
					/>
					<link
						rel="icon"
						type="image/png"
						sizes="32x32"
						href="/favicon-32x32.png"
					/>
					<link
						rel="icon"
						type="image/png"
						sizes="16x16"
						href="/favicon-16x16.png"
					/>
					<link rel="manifest" href="/manifest.json" />
					<script dangerouslySetInnerHTML={{ __html: themeScript }}></script>
					<script dangerouslySetInnerHTML={{ __html: contrastScript }}></script>
					<script
						dangerouslySetInnerHTML={{ __html: scrollbarWidthScript }}
					></script>
				</Head>

				<body className="w-screen min-h-screen bg-surface text-gray-400 dark:text-gray-400 overflow-x-hidden">
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}
