import clsx from 'clsx';
import type { FC, ReactNode, SVGProps } from 'react';

import { ReactComponent as CheckmarkIcon } from '$svg/checkmark.svg';
import { ReactComponent as AwsIcon } from '$svg/providers/aws.svg';
import { ReactComponent as CloudflareIcon } from '$svg/providers/cloudflare.svg';
import { ReactComponent as DigitalOceanIcon } from '$svg/providers/digital-ocean.svg';
import { ReactComponent as GoogleIcon } from '$svg/providers/google.svg';
import { ReactComponent as IterativelyIcon } from '$svg/providers/iteratively.svg';
import { ReactComponent as MixpanelIcon } from '$svg/providers/mixpanel.svg';
import { ReactComponent as MuxIcon } from '$svg/providers/mux.svg';
import { ReactComponent as SegmentIcon } from '$svg/providers/segment.svg';

const Step = ({
	no,
	title,
	className,
	children,
}: {
	no: number;
	title: string;
	className?: string;
	children?: ReactNode;
}) => (
	<div
		className={clsx(
			'flex flex-col items-center justify-center w-full',
			className,
		)}
	>
		<div className="shadow-card flex items-center justify-center rounded-full h-10 w-10 font-medium">
			{no}
		</div>

		<h2 className="mt-5">{title}</h2>

		<p className="text-16 max-w-sm 992:max-w-lg text-center mt-4 mb-12 992:mb-16">
			Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
			tempor incididunt ut labore et dolore magna aliqua.
		</p>

		{children}
	</div>
);

const DottedLines = () => (
	<svg
		width="162"
		height="65"
		viewBox="0 0 162 65"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		className="text-gray-200"
	>
		<line
			x1="81"
			y1="0.0058594"
			x2="81"
			y2="48.0059"
			stroke="currentColor"
			strokeDasharray="3 3"
		/>
		<line
			x1="1"
			y1="48.0059"
			x2="0.999999"
			y2="64.0059"
			stroke="currentColor"
			strokeDasharray="3 3"
		/>
		<line
			x1="81"
			y1="48.0059"
			x2="81"
			y2="64.0059"
			stroke="currentColor"
			strokeDasharray="3 3"
		/>
		<line
			x1="161"
			y1="48.0059"
			x2="161"
			y2="64.0059"
			stroke="currentColor"
			strokeDasharray="3 3"
		/>
		<line
			x1="0.5"
			y1="47.5059"
			x2="160.5"
			y2="47.5058"
			stroke="currentColor"
			strokeDasharray="3 3"
		/>
	</svg>
);

const ShortPipe = ({ className }: { className?: string }) => (
	<svg
		width="96"
		height="40"
		viewBox="0 0 96 40"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		className={clsx('text-primary', className)}
	>
		<rect
			y="3.99768"
			width="96"
			height="32"
			fill="currentColor"
			fillOpacity="0.7"
		/>
		<rect y="25.9978" width="96" height="10" fill="currentColor" />
		<rect
			x="44"
			width="8"
			height="40"
			rx="4"
			className="text-gray-400 dark:text-gray-50"
			fill="currentColor"
		/>
	</svg>
);

const LongPipe = ({ className }: { className: string }) => (
	<svg
		width="40"
		height="128"
		viewBox="0 0 40 128"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		className={clsx('text-primary', className)}
	>
		<rect
			x="36.002"
			width="128"
			height="32"
			transform="rotate(90 36.002 0)"
			fill="currentColor"
			fillOpacity="0.6"
		/>
		<rect
			x="14.002"
			width="128"
			height="10"
			transform="rotate(90 14.002 0)"
			fill="currentColor"
		/>
		<path
			d="M36 16C38.2091 16 40 17.7909 40 20C40 22.2091 38.2091 24 36 24L4 24C1.79086 24 0 22.2091 0 20C0 17.7909 1.79086 16 4 16L36 16Z"
			fill="currentColor"
			className="text-gray-400 dark:text-gray-50"
		/>
		<path
			d="M36 40C38.2091 40 40 41.7909 40 44C40 46.2091 38.2091 48 36 48L4 48C1.79086 48 0 46.2091 0 44C0 41.7909 1.79086 40 4 40L36 40Z"
			fill="currentColor"
			className="text-gray-400 dark:text-gray-50"
		/>
		<path
			d="M36 104C38.2091 104 40 105.791 40 108C40 110.209 38.2091 112 36 112H4C1.79086 112 0 110.209 0 108C0 105.791 1.79086 104 4 104H36Z"
			fill="currentColor"
			className="text-gray-400 dark:text-gray-50"
		/>
	</svg>
);

const Providers = ({
	icons,
	activeIconIndex,
	className,
}: {
	icons: FC<SVGProps<SVGSVGElement>>[];
	activeIconIndex: number;
	className?: string;
}) => (
	<div
		className={clsx(
			'flex flex-row pt-4 pb-6 items-center justify-center',
			className,
		)}
	>
		{icons.map((Provider, i) => (
			<div key={i} className="relative first:mr-8 last:ml-8">
				{activeIconIndex === i && (
					<CheckmarkIcon className="w-4 text-success absolute -top-2 -right-2" />
				)}

				<Provider className="w-12 h-12" />
			</div>
		))}
	</div>
);

const ProviderCard = ({
	title,
	PrimaryIcon,
	providerIcons,
	activeIconIndex,
}: {
	title: string;
	PrimaryIcon: FC<SVGProps<SVGSVGElement>>;
	providerIcons: FC<SVGProps<SVGSVGElement>>[];
	activeIconIndex: number;
}) => (
	<div className="flex flex-col justify-center z-10">
		<div className="flex flex-col w-72 h-80 992:w-52 992:h-48 shadow-card p-3 rounded-md items-center">
			<h3 className="text-16 font-medium text-gray-300 w-full">{title}</h3>

			<div className="flex flex-1 justify-center items-center">
				<PrimaryIcon className="w-16 h-16" />
			</div>

			<div className="ml-2.5 992:hidden">
				<DottedLines />
			</div>

			<Providers
				icons={providerIcons}
				activeIconIndex={activeIconIndex}
				className="992:hidden"
			/>
		</div>

		<div className="hidden 992:flex 992:flex-col 992:items-center mt-2 z-10">
			<DottedLines />
			<Providers icons={providerIcons} activeIconIndex={activeIconIndex} />
		</div>
	</div>
);

function HomeProcess() {
	return (
		<section className="w-full relative px-4">
			<div className="border-[#f99fbd] w-14 h-4 border-dashed border-t-2 mt-5 transform rotate-90 mx-auto text-center" />

			<div className="pt-20">
				<h1 className="text-24 font-medium text-center text-primary">
					What can you do with Vidstack?
				</h1>

				<Step no={1} title="Build" className="mt-14">
					<div className="flex flex-col items-center 992:flex-row">
						<ProviderCard
							title="Host Provider"
							PrimaryIcon={GoogleIcon}
							providerIcons={[GoogleIcon, DigitalOceanIcon, AwsIcon]}
							activeIconIndex={0}
						/>
						<LongPipe className="992:hidden" />
						<ShortPipe className="mb-36 z-0 hidden 992:block" />
						<ProviderCard
							title="Stream Provider"
							PrimaryIcon={MuxIcon}
							providerIcons={[CloudflareIcon, MuxIcon, AwsIcon]}
							activeIconIndex={1}
						/>
						<LongPipe className="992:hidden" />
						<ShortPipe className="mb-36 z-0 hidden 992:block" />
						<ProviderCard
							title="Analytics Provider"
							PrimaryIcon={SegmentIcon}
							providerIcons={[IterativelyIcon, MixpanelIcon, SegmentIcon]}
							activeIconIndex={2}
						/>
					</div>
				</Step>

				<Step no={2} title="Connect" className="mt-20">
					<div>...</div>
				</Step>

				<Step no={3} title="Measure" className="mt-20">
					<div>...</div>
				</Step>
			</div>
		</section>
	);
}

export default HomeProcess;
