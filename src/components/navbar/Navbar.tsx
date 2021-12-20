import clsx from 'clsx';
import Link from 'next/link';

import { ReactComponent as LogoIcon } from '$svg/vidstack-logo.svg';

import NavPopover from './NavPopover';
import SettingsPopover from './SettingsPopover';
import Socials from './Socials';

function Navbar() {
	return (
		<nav
			className={clsx(
				'px-5 py-4 flex items-center bg-surface w-full 1200:max-w-7xl 1200:mx-auto 1200:py-5',
			)}
		>
			<LogoIcon className="w-32 h-7" />

			<div className="flex-1"></div>

			<NavPopover />

			<div className="hidden 992:flex 992:space-x-2">
				<Socials
					className="flex items-center space-x-4"
					iconClassName="w-7"
					showTooltips
					hideDiscord
				/>
				<SettingsPopover />
			</div>
		</nav>
	);
}

export default Navbar;
