import React, { useEffect, useRef, useState } from 'react';

import { noop } from '$utils/fn';

export function useIsFocusing<T extends HTMLElement = HTMLElement>() {
	const [isFocusing, setIsFocusing] = useState(false);

	const ref = useRef<T>();

	useEffect(() => {
		const node = ref.current;

		const handleFocus = () => setIsFocusing(true);
		const handleBlur = () => setIsFocusing(false);

		const handleClick = (e: PointerEvent) => {
			if (e.target && !(e.target as HTMLElement).contains(node as Node))
				window.requestAnimationFrame(() => {
					setIsFocusing(false);
				});
		};

		if (node) {
			node.addEventListener('focus', handleFocus);
			node.addEventListener('blur', handleBlur);
			document.addEventListener('pointerdown', handleClick);

			return () => {
				node.removeEventListener('focus', handleFocus);
				node.removeEventListener('blur', handleBlur);
				node.removeEventListener('pointerleave', handleBlur);
				document.removeEventListener('pointerdown', handleClick);
			};
		}

		return noop;
	}, []);

	return [ref as React.RefObject<T>, isFocusing] as const;
}
