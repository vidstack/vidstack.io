import clsx from 'clsx';
import type { ReactNode } from 'react';

import Button from '$base/Button';

import AnalyzeStep from './steps/AnalyzeStep';
import ConnectStep from './steps/ConnectStep';
import ManageStep from './steps/ManageStep';

const Step = ({
	no,
	title,
	description,
	className,
	children,
}: {
	no: number;
	title: string;
	description: string;
	className?: string;
	children?: ReactNode;
}) => (
	<div
		className={clsx(
			'flex flex-col items-center justify-center w-full',
			className,
		)}
	>
		<div className="shadow-card flex items-center justify-center rounded-full h-11 w-11 text-lg font-semibold dark:border-2 dark:border-gray-200 pt-0.5">
			{no}
		</div>

		<h2 className="mt-8 text-3xl font-medium text-center">{title}</h2>

		<p className="text-lg max-w-sm 992:max-w-lg text-center mt-8 text-subtitle">
			{description}
		</p>

		<Button icon="arrow" size="small" className="mt-6 mb-12 992:mb-16">
			Early Access
		</Button>

		{children}
	</div>
);

function ProcessSection() {
	return (
		<section className="w-full relative mt-32">
			<div className="border-primary w-14 h-4 border-dashed border-t-2 transform rotate-90 mx-auto text-center" />

			<div className="mt-28">
				<h1 className="text-3xl font-medium text-center text-primary px-4">
					What can you do with Vidstack?
				</h1>

				<Step
					no={1}
					title="Manage your videos"
					description="We integrate with a variety of hosting and streaming providers so you can store, and organize your videos in one place. Create workspaces, prepare videos for streaming, and more, all in our beautiful dashboard."
					className="mt-28 px-4"
				>
					<ManageStep />
				</Step>

				<Step
					no={2}
					title="Connect your frontend"
					description="Build and design your video player only using HTML and CSS. Our headless web components let you finally craft the perfect media experience, without being tangled up 12-feet deep in JS."
					className="mt-28 bg-gray-50 py-20 992:py-28 px-4"
				>
					<ConnectStep />
				</Step>

				<Step
					no={3}
					title="Analyze video playback"
					description="It's never been easier to gather critical video performance and user behaviour data. Store and view the data in our dashboard, or forward it to any of our analytics outlets."
					className="mt-28 px-4"
				>
					<AnalyzeStep />
				</Step>
			</div>
		</section>
	);
}

export default ProcessSection;
