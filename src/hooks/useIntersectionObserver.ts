import { MutableRefObject, useEffect, useState } from 'react';

export function useIntersectionObserver<T extends Element>(
	ref: MutableRefObject<T>,
	options: IntersectionObserverInit = { rootMargin: '0px' },
): boolean {
	const [isIntersecting, setIntersecting] = useState<boolean>(false);

	useEffect(() => {
		const el = ref.current;
		const observer = new IntersectionObserver(([entry]) => {
			setIntersecting(entry.isIntersecting);
		}, options);

		if (el) {
			observer.observe(el);
		}

		return () => {
			observer.unobserve(el);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return isIntersecting;
}
