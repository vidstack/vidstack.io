import clsx from 'clsx';

import ProductSnippets from '$components/products/ProductSnippets';

function HomeProductSuite() {
	return (
		<section className="flex justify-center items-center w-full relative mt-6">
			<div className="absolute w-full h-full z-0 overflow-hidden">
				<div className="bg-gray-50 w-full h-full transform origin-bottom-right -skew-y-6 z-0"></div>
			</div>

			<div className="border-[#f99fbd] w-36 h-4 border-dashed border-t-2 absolute right-0 top-20 z-10 transform rotate-[16deg]" />

			<div
				className={clsx(
					'flex flex-col justify-center items-center px-4 576:px-8 pb-20 z-10 mt-8 768:mt-0',
					'pt-[var(--section-angle-padding-top)]',
				)}
			>
				<h1 className="text-primary text-24 font-semibold text-center">
					Vidstack Product Suite
				</h1>
				<p className="mt-6 text-center max-w-lg">
					Focus on making amazing products and leave video to us. We want to
					change the way you integrate video on the web.
				</p>
				<div className="mt-12">
					<ProductSnippets
						className="gap-10 grid-cols-1 768:grid-cols-2 992:gap-x-24"
						descriptionClassName="576:max-w-md 992:max-w-sm"
					/>
				</div>
			</div>
		</section>
	);
}

export default HomeProductSuite;
