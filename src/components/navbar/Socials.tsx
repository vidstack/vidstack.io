import clsx from 'clsx';

import Anchor from '$base/Anchor';
import { ReactComponent as DiscordIcon } from '$svg/socials/discord.svg';
import { ReactComponent as GitHubIcon } from '$svg/socials/github.svg';
import { ReactComponent as TwitterIcon } from '$svg/socials/twitter.svg';

export type SocialsProps = {
	className?: string;
	anchorClassName?: string;
	showTooltips?: boolean;
	hideDiscord?: boolean;
};

const socialLinks = [
	{
		href: 'https://twitter.com/vidstackhq?lang=en',
		label: 'Vidstack on Twitter',
		tooltip: 'Twitter',
		Icon: TwitterIcon,
	},
	{
		href: 'https://discord.gg/DmrmRqCRZS',
		label: 'Vidstack on Discord',
		tooltip: 'Discord',
		Icon: DiscordIcon,
	},
	{
		href: 'https://github.com/vidstack',
		label: 'Vidstack on GitHub',
		tooltip: 'GitHub',
		Icon: GitHubIcon,
	},
];

function Socials({
	className,
	anchorClassName,
	showTooltips,
	hideDiscord,
}: SocialsProps) {
	return (
		<>
			<div className={className}>
				{socialLinks.map(
					(social) =>
						(social.tooltip !== 'Discord' || !hideDiscord) && (
							<Anchor
								key={social.href}
								className={clsx(
									'transform-gpu hover:scale-105 mx-2 items-center',
									anchorClassName,
								)}
								href={social.href}
								label={social.label}
								external
								tooltip={showTooltips ? social.tooltip : undefined}
							>
								<social.Icon className="w-7 h-full" />
								{!showTooltips && (
									<span className="inline-block font-medium ml-2">
										{social.tooltip}
									</span>
								)}
							</Anchor>
						),
				)}
			</div>
		</>
	);
}

export default Socials;
