import clsx from 'clsx';

import Button from '$base/Button';
import Chip from '$base/Chip';
import { uppercaseFirstLetter } from '$utils/string';

export type ProductSnippetProps = {
	name: string;
	description?: string;
	action: string;
	releaseStage: 'soon' | 'alpha' | 'beta';
	className?: string;
	descriptionClassName?: string;
};

function ProductSnippet({
	name,
	description,
	action,
	className,
	descriptionClassName,
	releaseStage,
}: ProductSnippetProps) {
	return (
		<div className={clsx('flex flex-col w-full', className)}>
			<div className="flex flex-row">
				<span className="inline-block pr-4 font-semibold text-16">{name}</span>

				<Chip
					className={clsx(
						releaseStage === 'soon' && 'bg-soon',
						releaseStage === 'alpha' && 'bg-alpha',
						releaseStage === 'beta' && 'bg-beta',
					)}
				>
					{releaseStage === 'soon'
						? 'Coming Soon'
						: uppercaseFirstLetter(releaseStage)}
				</Chip>
			</div>

			{description && (
				<p className={clsx('text-16 mt-3.5 font-normal', descriptionClassName)}>
					{description}
				</p>
			)}

			<div className="mt-2">
				<Button icon="arrow" compact className="py-2">
					{action}
				</Button>
			</div>
		</div>
	);
}

export default ProductSnippet;
