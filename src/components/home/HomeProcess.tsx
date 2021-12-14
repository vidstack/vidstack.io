import clsx from 'clsx';
import type { ReactNode } from 'react';

import { ReactComponent as CheckmarkIcon } from '$svg/checkmark.svg';
import { ReactComponent as AwsIcon } from '$svg/providers/aws.svg';
import { ReactComponent as CloudflareIcon } from '$svg/providers/cloudflare.svg';
import { ReactComponent as GoogleIcon } from '$svg/providers/google.svg';
import { ReactComponent as MuxIcon } from '$svg/providers/mux.svg';

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
		<div className="shadow-card flex items-center justify-center rounded-full h-11 w-11 text-lg font-medium dark:border-2 dark:border-gray-200">
			{no}
		</div>

		<h2 className="mt-8 text-3xl font-medium text-center">{title}</h2>

		<p className="text-lg max-w-sm 992:max-w-lg text-center mt-8 mb-12 992:mb-16 text-gray-300">
			Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
			tempor incididunt ut labore et dolore magna aliqua.
		</p>

		{children}
	</div>
);

function HomeProcess() {
	return (
		<section className="w-full relative px-4 mt-32">
			<div className="border-primary w-14 h-4 border-dashed border-t-2 transform rotate-90 mx-auto text-center" />

			<div className="mt-28">
				<h1 className="text-3xl font-medium text-center text-primary">
					What can you do with Vidstack?
				</h1>

				<Step no={1} title="Manage your videos" className="mt-28 992:mt-28">
					<div>...</div>
				</Step>

				<Step no={2} title="Connect your frontend" className="mt-28">
					<div>...</div>
				</Step>

				<Step no={3} title="Analyze video playback" className="mt-28">
					<div>...</div>
				</Step>
			</div>
		</section>
	);
}

export default HomeProcess;
