import React, { useEffect, useRef, useState } from 'react';

import { noop } from '$utils/fn';

export function useIsFocusing<T extends HTMLElement = HTMLElement>() {
	const [isFocusing, setIsFocusing] = useState(false);

	const ref = useRef<T>();

	useEffect(() => {
		const node = ref.current;

		const handleFocus = () => setIsFocusing(true);
		const handleBlur = () => setIsFocusing(false);

		const handleDocumentClick = (e: PointerEvent) => {
			if (e.target && (e.target as HTMLElement).contains(node as Node))
				window.requestAnimationFrame(() => {
					setIsFocusing(false);
				});
		};

		if (node) {
			node.addEventListener('focus', handleFocus);
			node.addEventListener('blur', handleBlur);
			node.addEventListener('pointerleave', handleBlur);
			document.addEventListener('pointerdown', handleDocumentClick);

			return () => {
				node.removeEventListener('focus', handleFocus);
				node.removeEventListener('blur', handleBlur);
				node.removeEventListener('pointerleave', handleBlur);
				document.removeEventListener('pointerdown', handleDocumentClick);
			};
		}

		return noop;
	}, []);

	return [ref as React.RefObject<T>, isFocusing] as const;
}
