import clsx from 'clsx';

import Chip from '$base/Chip';
import { ReactComponent as ArrowRightIcon } from '$svg/arrow-right.svg';
import { ReactComponent as ChevronIcon } from '$svg/chevron-down.svg';
import { uppercaseFirstLetter } from '$utils/string';

export type ProductSnippetProps = {
	name: string;
	description?: string;
	action: string;
	releaseStage: 'soon' | 'alpha' | 'beta';
	className?: string;
};

function ProductSnippet({
	name,
	description,
	action,
	className,
	releaseStage,
}: ProductSnippetProps) {
	return (
		<div className={clsx('flex flex-col w-full', className)}>
			<div className="flex flex-row">
				<span className="inline-block pr-4 font-semibold text-16">{name}</span>

				<Chip
					title={
						releaseStage === 'soon'
							? 'Coming Soon'
							: uppercaseFirstLetter(releaseStage)
					}
					className={clsx(
						releaseStage === 'soon' && 'bg-soon',
						releaseStage === 'alpha' && 'bg-alpha',
						releaseStage === 'beta' && 'bg-beta',
					)}
				/>
			</div>

			{description && (
				<p className="text-16 mt-3.5 font-normal">{description}</p>
			)}

			<div className="mt-2">
				<button className="text-16 font-medium text-primary py-2 flex items-center flex-row group filter hover:brightness-90">
					{action}
					<ArrowRightIcon className="w-5 h-5 ml-1.5 hidden group-hover:inline-block" />
					<ChevronIcon className="w-5 h-5 transform -rotate-90 ml-1.5 group-hover:hidden" />
				</button>
			</div>
		</div>
	);
}

export default ProductSnippet;
