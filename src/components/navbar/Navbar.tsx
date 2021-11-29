import clsx from 'clsx';
import Link from 'next/link';

import { ReactComponent as LogoIcon } from '$svg/vidstack-logo.svg';

import styles from './Navbar.module.css';
import NavPopover from './NavPopover';
import ProductsPopover from './ProductsPopover';
import SettingsPopover from './SettingsPopover';
import Socials from './Socials';

function Navbar() {
	return (
		<nav
			className={clsx(
				'px-5 py-4 flex items-center dark:border-b-2 border-highlight',
				...Object.values(styles),
			)}
		>
			<Link href="/">
				<a className="flex items-center p-1 focusable">
					<LogoIcon className="w-32 h-7" />
					<span className="sr-only">Go to home page</span>
				</a>
			</Link>

			<div className="ml-20 text-16 font-medium hidden 992:block">
				<ProductsPopover />
			</div>

			<div className="flex-1"></div>

			<NavPopover />

			<div className="hidden 992:flex">
				<Socials className="flex items-center" showTooltips hideDiscord />
				<SettingsPopover />
			</div>
		</nav>
	);
}

export default Navbar;
