import { Popover, Transition } from '@headlessui/react';
import clsx from 'clsx';
import { Fragment, useEffect } from 'react';

import Button from '$base/Button';
import ProductSnippets from '$components/products/ProductSnippets';
import { useMediaQuery } from '$hooks/useMediaQuery';
import { ReactComponent as CloseIcon } from '$svg/close.svg';
import { ReactComponent as HamburgerIcon } from '$svg/hamburger.svg';

import Socials from './Socials';
import VisualOptions from './VisualOptions';

function NavPopover() {
	const isLargeScreen = useMediaQuery('(min-width: 992px)');

	function hideMainScrollbar(hidden: boolean) {
		window.requestAnimationFrame(() => {
			document.documentElement.classList[hidden ? 'add' : 'remove'](
				'overflow-hidden',
			);
		});
	}

	useEffect(() => {
		if (isLargeScreen) {
			hideMainScrollbar(false);
		}
	}, [isLargeScreen]);

	return (
		<Popover>
			{({ open, close }) => (
				<>
					<Popover.Button
						className={clsx(
							'992:hidden -mr-4 px-5 -my-4 py-4 group align-top',
							open && 'opacity-0',
						)}
						onPointerDown={() => hideMainScrollbar(!open)}
					>
						<HamburgerIcon className="w-7 h-full" />
						<span className="sr-only">Open navigation menu</span>
					</Popover.Button>

					<Popover.Overlay
						className={clsx(
							open ? 'opacity-90 fixed inset-0' : 'opacity-0',
							'bg-gray-200 z-50 992:hidden',
						)}
					/>

					<Transition
						as={Fragment}
						enter="transition duration-150 ease-out"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="transition duration-100 ease-out"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<Popover.Panel className=" absolute top-0 right-0 w-full p-5 pt-4 origin-top-right focus:outline-none 992:hidden z-50 max-h-screen">
							<div
								className="bg-surface rounded-md shadow-card relative dark:border-2 border-highlight overflow-y-scroll"
								style={{ maxHeight: 'calc(100vh - 32px)' }}
							>
								<div className="w-full flex justify-end items-center text-gray-300 sticky top-0 bg-surface z-50">
									<button
										className="p-4"
										onClick={() => {
											close();
											hideMainScrollbar(false);
										}}
									>
										<CloseIcon className="w-6" />
										<span className="sr-only">Close navigation menu</span>
									</button>
								</div>

								<section className="pb-10 px-5 576:px-8 768:px-10">
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

								<div className="w-full h-[100px] bg-gray-100 flex items-center justify-center">
									<Button contained icon="arrow">
										Early Access
									</Button>
								</div>
							</div>
						</Popover.Panel>
					</Transition>
				</>
			)}
		</Popover>
	);
}

export default NavPopover;
