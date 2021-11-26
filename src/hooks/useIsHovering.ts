import React, { useEffect, useRef, useState } from 'react';

import { noop } from '$utils/fn';

export function useIsHovering<T extends HTMLElement = HTMLElement>() {
	const [isHovering, setIsHovering] = useState(false);

	const ref = useRef<T>();

	const handleMouseOut = () => setIsHovering(false);
	const handleMouseOver = () => setIsHovering(true);

	useEffect(() => {
		const node = ref.current;

		if (node) {
			node.addEventListener('mouseout', handleMouseOut);
			node.addEventListener('mouseover', handleMouseOver);

			return () => {
				node.removeEventListener('mouseout', handleMouseOut);
				node.removeEventListener('mouseover', handleMouseOver);
			};
		}

		return noop;
	}, []);

	return [ref as React.RefObject<T>, isHovering] as const;
}
