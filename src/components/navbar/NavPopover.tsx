import { Popover, Transition } from '@headlessui/react';
import clsx from 'clsx';
import { Fragment } from 'react';

import ProductSnippets from '$components/products/ProductSnippets';
import { ReactComponent as CloseIcon } from '$svg/close.svg';
import { ReactComponent as HamburgerIcon } from '$svg/hamburger.svg';

import Socials from './Socials';
import VisualOptions from './VisualOptions';

function NavPopover() {
	return (
		<Popover>
			{({ open, close }) => (
				<>
					<Popover.Button
						className={clsx(
							'992:hidden -mr-4 px-5 -my-4 py-4 group align-top focusable',
							open && 'opacity-0',
						)}
					>
						<HamburgerIcon className="w-7 h-full transform-gpu group-hover:scale-105" />
						<span className="sr-only">Open navigation menu</span>
					</Popover.Button>

					<Transition
						as={Fragment}
						enter="transition duration-150 ease-out"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="transition duration-100 ease-out"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<Popover.Panel className=" absolute top-0 right-0 w-full p-5 pt-4 origin-top-right focus:outline-none 992:hidden">
							<div className="bg-surface rounded-md shadow-card relative dark:border-2 border-highlight">
								<button
									className="absolute top-1 right-1 p-3 text-gray-300 focusable"
									onClick={() => close()}
								>
									<CloseIcon className="w-5" />
									<span className="sr-only">Close navigation menu</span>
								</button>

								<section className="py-10 px-5 576:px-8 768:px-10">
									<h1 className="text-16 font-medium text-gray-300 mb-6">
										Products
									</h1>

									<ProductSnippets />
								</section>

								<hr className="border-gray-200 w-full border-dashed" />

								<section className="py-10 px-5 576:px-8 768:px-10">
									<h1 className="text-16 font-medium text-gray-300 mb-6">
										Socials
									</h1>

									<Socials
										className="flex flex-col items-start 576:flex-row 576:items-center"
										anchorClassName="mb-8 last:mb-0 576:mb-0 576:ml-8 576:first:ml-0"
									/>
								</section>

								<hr className="border-gray-200 w-full border-dashed" />

								<section className="py-10 px-5 576:px-8 768:px-10">
									<h1 className="text-16 font-medium text-gray-300 mb-6">
										Visual Options
									</h1>

									<div className="max-w-[225px]">
										<VisualOptions />
									</div>
								</section>
							</div>
						</Popover.Panel>
					</Transition>
				</>
			)}
		</Popover>
	);
}

export default NavPopover;
