import composeRefs from '@seznam/compose-react-refs';
import clsx from 'clsx';
import type { ReactNode } from 'react';
import { useRef } from 'react';

import { useDarkTheme } from '$hooks/useDarkTheme';
import { useHighContrast } from '$hooks/useHighContrast';
import { useIsFocusing } from '$hooks/useIsFocusing';
import { useIsHovering } from '$hooks/useIsHovering';
import { ReactComponent as ArrowRightIcon } from '$svg/arrow-right.svg';
import { ReactComponent as ChevronIcon } from '$svg/chevron-down.svg';
import { undefinedIfFalsy } from '$utils/jsx';
import { isString } from '$utils/primitive';

import Tooltip from './Tooltip';

export type ButtonProps = {
	href?: string;
	tooltip?: string;
	className?: string;
	external?: boolean;
	label?: string;
	children: ReactNode;
	icon?: 'arrow';
	monochrome?: boolean;
	compact?: boolean;
	contained?: boolean;
	size?: 'small';
};

function Button({
	href,
	className,
	tooltip,
	label,
	children,
	external = false,
	icon,
	monochrome = false,
	compact = false,
	contained = false,
	size,
}: ButtonProps) {
	const tooltipId = useRef(`anchor-tooltip-${tooltip?.toLowerCase()}`);
	const hasTooltip = isString(tooltip);

	const [hoverRef, isHovering] = useIsHovering<any>();
	const [focusRef, isFocusing] = useIsFocusing<any>();
	const [isDarkTheme] = useDarkTheme();
	const [isHighContrast] = useHighContrast();

	const props = {
		className: clsx(
			'font-medium flex items-center flex-row group relative',
			size === 'small' ? 'text-base' : 'text-lg',
			!compact && 'pl-6 pr-5 py-3',
			contained && 'rounded-full',
			!monochrome && !contained && 'text-primary',
			!monochrome && contained && 'bg-primary text-gray-50',
			monochrome && contained && 'bg-gray-400 text-gray-50',
			!hasTooltip && 'filter hover:brightness-90',
			!isDarkTheme && isHighContrast && contained && 'dark:text-gray-100',
			className,
		),
		href,
		target: undefinedIfFalsy(external, '_blank'),
		'aria-describedby': undefinedIfFalsy(hasTooltip, tooltipId.current),
		ref: composeRefs(hoverRef, focusRef),
	};

	const inner = (
		<>
			{children}

			{isString(label) && <span className="sr-only">{label}</span>}

			{hasTooltip && (
				<Tooltip id={tooltipId.current} visible={isHovering || isFocusing}>
					{tooltip}
				</Tooltip>
			)}

			{icon === 'arrow' && (
				<>
					<ArrowRightIcon className="w-5 h-5 ml-1 hidden group-hover:inline-block" />
					<ChevronIcon className="w-5 h-5 transform -rotate-90 ml-1 group-hover:hidden" />
				</>
			)}
		</>
	);

	return href ? <a {...props}>{inner}</a> : <button {...props}>{inner}</button>;
}

export default Button;
