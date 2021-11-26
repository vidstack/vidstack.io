import clsx from 'clsx';
import Link from 'next/link';

import Anchor from '$base/Anchor';
import { ReactComponent as HamburgerIcon } from '$svg/hamburger.svg';
import { ReactComponent as GitHubIcon } from '$svg/socials/github.svg';
import { ReactComponent as TwitterIcon } from '$svg/socials/twitter.svg';
import { ReactComponent as LogoIcon } from '$svg/vidstack-logo.svg';

import styles from './Navbar.module.css';
import SettingsPopover from './SettingsPopover';

function Navbar() {
	return (
		<nav
			className={clsx('px-5 py-4 flex items-center', ...Object.values(styles))}
		>
			<Link href="/">
				<a className="flex items-center p-1 focusable">
					<LogoIcon className="w-32 h-7" />
					<span className="sr-only">Go to home page</span>
				</a>
			</Link>

			<div className="ml-6 text-16 font-medium hidden 992:block">
				{/* ... */}
			</div>

			<div className="flex-1"></div>

			<button className="992:hidden">
				<HamburgerIcon className="w-7 h-full transform-gpu hover:scale-105" />
			</button>

			<div className="hidden 992:flex">
				<Anchor
					className="transform-gpu hover:scale-105 px-2"
					href="https://twitter.com/vidstackhq?lang=en"
					label="Vidstack on Twitter"
					external
					tooltip="Twitter"
				>
					<TwitterIcon className="w-7 h-full" />
				</Anchor>

				<Anchor
					className="transform-gpu hover:scale-105 px-2"
					href="https://github.com/vidstack"
					label="Vidstack on GitHub"
					external
					tooltip="GitHub"
				>
					<GitHubIcon className="w-7 h-full" />
				</Anchor>

				<SettingsPopover />
			</div>
		</nav>
	);
}

export default Navbar;
