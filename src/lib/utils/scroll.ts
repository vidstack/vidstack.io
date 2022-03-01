export function hideDocumentScrollbar(hidden: boolean) {
	window.requestAnimationFrame(() => {
		document.documentElement.classList[hidden ? 'add' : 'remove']('overflow-hidden');
		document.documentElement.classList[!hidden ? 'add' : 'remove']('overflow-x-hidden');
	});
}
