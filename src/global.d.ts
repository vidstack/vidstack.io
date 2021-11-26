declare module '*.svg' {
	const url: string;
	const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;

	export { ReactComponent };
	export default url;
}
