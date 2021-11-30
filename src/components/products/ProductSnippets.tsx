import clsx from 'clsx';

import ProductSnippet from './ProductSnippet';

const products = [
	{
		name: 'Hosting',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
	},
	{
		name: 'Player',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
	},
	{
		name: 'Streaming',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
	},
	{
		name: 'Analytics',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
	},
];

export type ProductSnippetsProps = {
	className?: string;
	descriptionClassName?: string;
};

function ProductSnippets({
	className,
	descriptionClassName,
}: ProductSnippetsProps) {
	return (
		<div className={clsx('w-full grid', className)}>
			{products.map(({ name, description }) => (
				<ProductSnippet
					key={name}
					name={name}
					description={description}
					action="Get Notified"
					releaseStage="soon"
					descriptionClassName={descriptionClassName}
				/>
			))}
		</div>
	);
}

export default ProductSnippets;
