import { Popover, Transition } from '@headlessui/react';
import clsx from 'clsx';
import { Fragment } from 'react';

import { useIsHovering } from '$hooks/useIsHovering';
import { ReactComponent as CogwheelIcon } from '$svg/cogwheel.svg';

import VisualOptions from './VisualOptions';

function SettingsMenu() {
	const [hoverRef, isHovering] = useIsHovering<HTMLDivElement>({ delay: 100 });

	return (
		<Popover className="relative">
			{({ open }) => (
				<>
					<div className="h-full px-2" ref={hoverRef}>
						<Popover.Button className="h-full inline-flex items-center justify-center">
							<CogwheelIcon
								className={clsx(
									'w-7 transform transition-transform',
									open || isHovering ? 'rotate-180' : 'rotate-0',
								)}
							/>
							<span className="sr-only">Open website settings</span>
						</Popover.Button>

						<Transition
							as={Fragment}
							show={open || isHovering}
							enter="transition duration-100 ease-out"
							enterFrom="transform scale-95 opacity-0"
							enterTo="transform scale-100 opacity-100"
							leave="transition duration-75 ease-out"
							leaveFrom="transform scale-100 opacity-100"
							leaveTo="transform scale-95 opacity-0"
						>
							<Popover.Panel
								static
								className="absolute right-0 w-64 mt-1 origin-top-right bg-surface rounded-md shadow-card focus:outline-none p-4 dark:border-2 border-highlight"
							>
								<section role="application" aria-label="Visual Options">
									<div className="text-14 font-medium text-gray-300 pt-1 pb-2">
										Visual Options
									</div>

									<VisualOptions />
								</section>
							</Popover.Panel>
						</Transition>
					</div>
				</>
			)}
		</Popover>
	);
}

export default SettingsMenu;
