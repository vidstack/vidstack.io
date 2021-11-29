import clsx from 'clsx';

import { useDarkTheme } from '$hooks/useDarkTheme';
import { useHighContrast } from '$hooks/useHighContrast';

export type ChipProps = {
	title: string;
	className?: string;
};

function Chip({ title, className }: ChipProps) {
	const [isDarkTheme] = useDarkTheme();
	const [isHighContrast] = useHighContrast();

	return (
		<div
			className={clsx(
				'px-2.5 py-1 dark:text-gray-100 text-12 font-semibold flex items-center justify-center rounded-full',
				!isDarkTheme && isHighContrast && 'text-gray-100',
				className,
			)}
		>
			{title}
		</div>
	);
}

export default Chip;
