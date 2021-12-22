declare module '*.svg' {
	const url: string;
	const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;

	export { ReactComponent };
	export default url;
}

declare module '*?highlight' {
	const code: string;
	const highlightedCode: string;
	export { code, highlightedCode };
}

declare function plausible(
	event: string,
	data?: { props?: Record<string, string | number | boolean> },
);
