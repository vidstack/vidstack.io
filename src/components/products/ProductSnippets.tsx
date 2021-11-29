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

function ProductSnippets() {
	return (
		<div className="w-full grid grid-cols-1 576:grid-cols-2 gap-10">
			{products.map(({ name, description }) => (
				<ProductSnippet
					key={name}
					name={name}
					description={description}
					action="Get Notified"
					releaseStage="soon"
				/>
			))}
		</div>
	);
}

export default ProductSnippets;
