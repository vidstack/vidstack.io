import clsx from 'clsx';
import type { ReactNode } from 'react';

import { ariaBool } from '$utils/aria';

export type TooltipProps = {
	id: string;
	className?: string;
	visible?: boolean;
	children: ReactNode;
};

function Tooltip({ id, className, visible = false, children }: TooltipProps) {
	return (
		<div
			id={id}
			className={clsx(
				'transition-opacity absolute bottom-0 right-0 top-full mt-1 z-50',
				!visible && 'opacity-0 invisible',
				className,
			)}
			role="tooltip"
			aria-hidden={ariaBool(!visible)}
		>
			<span className="py-1.5 px-2 shadow-card flex items-center justify-center text-14 rounded-sm bg-surface dark:bg-gray-50">
				{children}
			</span>
		</div>
	);
}

export default Tooltip;
