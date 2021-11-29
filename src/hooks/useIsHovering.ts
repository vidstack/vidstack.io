import React, { useEffect, useRef, useState } from 'react';

import { noop } from '$utils/fn';

export type UseIsHoveringProps = {
	delay?: number;
};

export function useIsHovering<T extends HTMLElement = HTMLElement>({
	delay,
}: UseIsHoveringProps = {}) {
	const timerId = useRef(-1);
	const [isHovering, setIsHovering] = useState(false);

	const ref = useRef<T>();

	const handleMouseOut = () => {
		timerId.current = window.setTimeout(() => {
			setIsHovering(false);
			timerId.current = -1;
		}, delay ?? 0);
	};

	const handleMouseOver = () => {
		window.clearTimeout(timerId.current);
		setIsHovering(true);
	};

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
