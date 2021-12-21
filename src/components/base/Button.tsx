import composeRefs from '@seznam/compose-react-refs';
import clsx from 'clsx';
import Link from 'next/link';
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
	className?: string;
	type?: 'button' | 'submit';
	external?: boolean;
	label?: string;
	children: ReactNode;
	icon?: 'arrow' | 'spinner';
	monochrome?: boolean;
	compact?: boolean;
	contained?: boolean;
	size?: 'small';
	tooltip?: string;
	tooltipPosition?: 'left' | 'center' | 'right';
};

function Button({
	href,
	type,
	className,
	tooltip,
	tooltipPosition = 'right',
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
		type,
		className: clsx(
			'font-medium flex items-center flex-row group relative',
			size === 'small' ? 'text-base' : 'text-lg',
			!compact && 'pl-6 pr-5 py-3',
			contained && 'rounded-full justify-center',
			!monochrome && !contained && 'text-primary',
			!monochrome && contained && 'bg-primary text-gray-50',
			monochrome && contained && 'bg-gray-400 text-gray-50',
			!hasTooltip && 'filter hover:brightness-90',
			!isDarkTheme && isHighContrast && contained && 'dark:text-gray-100',
			className,
		),
		target: undefinedIfFalsy(external, '_blank'),
		'aria-describedby': undefinedIfFalsy(hasTooltip, tooltipId.current),
		ref: composeRefs(hoverRef, focusRef),
	};

	const inner = (
		<>
			{children}

			{isString(label) && <span className="sr-only">{label}</span>}

			{hasTooltip && (
				<Tooltip
					id={tooltipId.current}
					visible={isHovering || isFocusing}
					position={tooltipPosition}
				>
					{tooltip}
				</Tooltip>
			)}

			{icon === 'spinner' && (
				<svg
					aria-hidden="true"
					className="animate-spin w-6 h-6 ml-2"
					fill="none"
					viewBox="0 0 24 24"
				>
					<circle
						className="opacity-25"
						cx="12"
						cy="12"
						r="10"
						stroke="currentColor"
						strokeWidth="3.5"
					></circle>
					<path
						className="opacity-75"
						fill="currentColor"
						d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
					></path>
				</svg>
			)}

			{icon === 'arrow' && (
				<>
					<ArrowRightIcon className="w-5 h-5 ml-1 hidden group-hover:inline-block group-focus-visible:inline-block" />
					<ChevronIcon className="w-5 h-5 transform -rotate-90 ml-1 group-hover:hidden group-focus-visible:hidden" />
				</>
			)}
		</>
	);

	return href ? (
		external ? (
			<a href={href} {...props}>
				{inner}
			</a>
		) : (
			<Link href={href}>
				<a {...props}>{inner}</a>
			</Link>
		)
	) : (
		<button {...props}>{inner}</button>
	);
}

export default Button;
