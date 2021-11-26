import { Popover, Transition } from '@headlessui/react';
import composeRefs from '@seznam/compose-react-refs';
import clsx from 'clsx';
import { Fragment } from 'react';

import Switch from '$base/Switch';
import Tooltip from '$base/Tooltip';
import { useDarkTheme } from '$hooks/useDarkTheme';
import { useHighContrast } from '$hooks/useHighContrast';
import { useIsFocusing } from '$hooks/useIsFocusing';
import { useIsHovering } from '$hooks/useIsHovering';
import { ReactComponent as CogwheelIcon } from '$svg/cogwheel.svg';

function SettingsMenu() {
	const tooltipId = 'settings-popover-tooltip';
	const [hoverRef, isHovering] = useIsHovering<HTMLButtonElement>();
	const [focusRef, isFocusing] = useIsFocusing<HTMLButtonElement>();
	const [isDarkTheme, setDarkTheme] = useDarkTheme();
	const [isHighContrast, setHighContrast] = useHighContrast();

	return (
		<Popover className="relative">
			{({ open }) => (
				<>
					<Popover.Button
						className="h-full inline-flex items-center justify-center transform-gpu hover:scale-105 focusable px-2"
						ref={composeRefs(hoverRef, focusRef)}
						aria-describedby={tooltipId}
					>
						<CogwheelIcon
							className={clsx(
								'w-7 transform transition-transform',
								open ? 'rotate-180' : 'rotate-0',
							)}
						/>
						<span className="sr-only">Open website settings</span>
						<Tooltip
							id={tooltipId}
							visible={(isHovering || isFocusing) && !open}
						>
							Settings
						</Tooltip>
					</Popover.Button>

					<Transition
						as={Fragment}
						enter="transition duration-100 ease-out"
						enterFrom="transform scale-95 opacity-0"
						enterTo="transform scale-100 opacity-100"
						leave="transition duration-75 ease-out"
						leaveFrom="transform scale-100 opacity-100"
						leaveTo="transform scale-95 opacity-0"
					>
						<Popover.Panel
							className="
					absolute right-0 w-64 mt-2 origin-top-right bg-surface rounded-md shadow-card
					focus:outline-none p-4
					"
						>
							<section role="application" aria-label="Visual Options">
								<div className="text-14 font-medium text-gray-300 pt-1 pb-2">
									Visual Options
								</div>

								<div className="flex rounded-md items-center w-full px-2 py-3 text-16">
									<span className="flex-1">Dark Mode</span>
									<Switch
										label="Toggle dark mode"
										initialState={isDarkTheme}
										onChange={setDarkTheme}
									/>
								</div>

								<div className="flex rounded-md items-center w-full px-2 py-3 text-16">
									<span className="flex-1">High Contrast</span>
									<Switch
										label="Toggle high contrast"
										initialState={isHighContrast}
										onChange={setHighContrast}
									/>
								</div>
							</section>
						</Popover.Panel>
					</Transition>
				</>
			)}
		</Popover>
	);
}

export default SettingsMenu;
