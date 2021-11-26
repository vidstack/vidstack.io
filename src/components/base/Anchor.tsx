import composeRefs from '@seznam/compose-react-refs';
import clsx from 'clsx';
import type { ReactNode } from 'react';
import { useRef } from 'react';

import { useIsFocusing } from '$hooks/useIsFocusing';
import { useIsHovering } from '$hooks/useIsHovering';
import { undefinedIfFalsy } from '$utils/jsx';
import { isString } from '$utils/primitive';

import Tooltip from './Tooltip';

export type AnchorProps = {
	href: string;
	tooltip?: string;
	className?: string;
	external?: boolean;
	label?: string;
	children: ReactNode;
};

function Anchor({
	href,
	className,
	tooltip,
	external = false,
	label,
	children,
}: AnchorProps) {
	const tooltipId = useRef(`anchor-tooltip-${tooltip?.toLowerCase()}`);
	const hasTooltip = isString(tooltip);
	const [hoverRef, isHovering] = useIsHovering<HTMLAnchorElement>();
	const [focusRef, isFocusing] = useIsFocusing<HTMLAnchorElement>();

	return (
		<a
			className={clsx(
				'relative z-0 inline-flex justify-center focusable',
				className,
			)}
			href={href}
			target={undefinedIfFalsy(external, '_blank')}
			aria-describedby={undefinedIfFalsy(hasTooltip, tooltipId.current)}
			ref={composeRefs(hoverRef, focusRef)}
		>
			{children}

			{isString(label) && <span className="sr-only">{label}</span>}

			{hasTooltip && (
				<Tooltip id={tooltipId.current} visible={isHovering || isFocusing}>
					{tooltip}
				</Tooltip>
			)}
		</a>
	);
}

export default Anchor;
