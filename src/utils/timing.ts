export function wait(delay: number) {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(void 0);
		}, delay);
	});
}
