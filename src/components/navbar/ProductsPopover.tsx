import { Popover, Transition } from '@headlessui/react';
import { Fragment } from 'react';

import ProductSnippets from '$components/products/ProductSnippets';
import { useIsHovering } from '$hooks/useIsHovering';

function ProductsPopover() {
	const [hoverRef, isHovering] = useIsHovering<HTMLDivElement>({ delay: 150 });

	return (
		<Popover className="relative">
			{({ open }) => (
				<>
					<div ref={hoverRef}>
						<Popover.Button className="h-full inline-flex items-center justify-center px-2 mt-1 font-medium">
							Products
						</Popover.Button>

						<Transition
							as={Fragment}
							show={open || isHovering}
							enter="transition duration-150 ease-out"
							enterFrom="opacity-0"
							enterTo="opacity-100"
							leave="transition duration-100 ease-out"
							leaveFrom="opacity-100"
							leaveTo="opacity-0"
						>
							<Popover.Panel
								static
								className="absolute -left-4 mt-2 w-[680px] 1200:w-[800px] origin-top-right bg-surface rounded-md shadow-card focus:outline-none p-8 dark:border-2 border-highlight"
							>
								<ProductSnippets />
							</Popover.Panel>
						</Transition>
					</div>
				</>
			)}
		</Popover>
	);
}

export default ProductsPopover;
