import clsx from 'clsx';

import Button from '$base/Button';
import { ReactComponent as DiscordIcon } from '$svg/socials/discord.svg';
import { ReactComponent as GitHubIcon } from '$svg/socials/github.svg';
import { ReactComponent as TwitterIcon } from '$svg/socials/twitter.svg';

export type SocialsProps = {
	className?: string;
	anchorClassName?: string;
	iconClassName?: string;
	showTooltips?: boolean;
	hideDiscord?: boolean;
	customMessages?: {
		discord?: string;
		twitter?: string;
		github?: string;
	};
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
	iconClassName,
	hideDiscord,
	showTooltips = false,
	customMessages = {},
}: SocialsProps) {
	return (
		<>
			<div className={className}>
				{socialLinks.map(
					({ href, label, Icon, tooltip }) =>
						(tooltip !== 'Discord' || !hideDiscord) && (
							<Button
								key={href}
								className={clsx('items-center', anchorClassName)}
								href={href}
								label={label}
								external
								monochrome
								compact
								tooltip={showTooltips ? tooltip : undefined}
								onClick={() =>
									plausible('Socials', { props: { Channel: tooltip } })
								}
							>
								<Icon className={clsx('h-full', iconClassName)} />
								{!showTooltips && (
									<span className="inline-block font-medium ml-2">
										{customMessages[tooltip.toLowerCase() as 'github'] ??
											tooltip}
									</span>
								)}
							</Button>
						),
				)}
			</div>
		</>
	);
}

export default Socials;
