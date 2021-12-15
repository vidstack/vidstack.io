import clsx from 'clsx';
import { ReactNode } from 'react';

import { useDarkTheme } from '$hooks/useDarkTheme';
import { useHighContrast } from '$hooks/useHighContrast';

export type ChipProps = {
	className?: string;
	children: ReactNode;
};

function Chip({ children, className }: ChipProps) {
	const [isDarkTheme] = useDarkTheme();
	const [isHighContrast] = useHighContrast();

	return (
		<div
			className={clsx(
				'px-2.5 py-1 dark:text-gray-100 text-sm font-medium flex items-center justify-center rounded-full h-6',
				!isDarkTheme && isHighContrast && 'text-gray-100',
				className,
			)}
		>
			{children}
		</div>
	);
}

export default Chip;
