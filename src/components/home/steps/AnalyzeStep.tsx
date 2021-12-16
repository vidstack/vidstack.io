import clsx from 'clsx';
import Image from 'next/image';

import CodeSnippet from '$components/code/CodeSnippet';
import { ReactComponent as FunctionIcon } from '$svg/outlets/function.svg';
import { ReactComponent as MixpanelIcon } from '$svg/outlets/mixpanel.svg';
import { ReactComponent as SegmentIcon } from '$svg/outlets/segment.svg';
import { ReactComponent as DashboardIcon } from '$svg/outlets/vidstack.svg';
import { ReactComponent as WebhookIcon } from '$svg/outlets/webhook.svg';
import { ReactComponent as VideoCaptionsIcon } from '$svg/video/captions.svg';
import { ReactComponent as VideoFullscreenIcon } from '$svg/video/fullscreen.svg';
import { ReactComponent as VideoPauseIcon } from '$svg/video/pause.svg';
import { ReactComponent as VideoSettingsIcon } from '$svg/video/settings.svg';
import { ReactComponent as VideoVolumeIcon } from '$svg/video/volume.svg';

import styles from './AnalyzeStep.module.css';
import { highlightedCode as eventCodeSnippet } from './code-snippets/analytics-event-snippet.js?highlight';

const outlets = [
	{ name: 'Dashboard', Icon: DashboardIcon },
	{ name: 'Webhooks', Icon: WebhookIcon },
	{ name: 'Functions', Icon: FunctionIcon },
	{ name: 'Segment', Icon: SegmentIcon },
	{ name: 'Mixpanel', Icon: MixpanelIcon },
];

const Player = () => (
	<div className="w-60 h-40 shadow-card flex flex-col relative z-10 bg-surface rounded-md dark:border-2 dark:border-gray-200 overflow-hidden">
		{/* canvas */}
		<div className="flex-1 w-full relative overflow-hidden">
			<div className="-mt-5">
				<Image
					src="/media/nyan-cat-rainbow.gif"
					width="240px"
					height="160px"
					alt="Nyan cat"
				/>
			</div>
		</div>
		{/* controls */}
		<div className="flex flex-col">
			<div className="h-2 bg-gray-100 w-full relative">
				{/* thumb */}
				<div
					className={clsx(
						'w-3.5 h-3.5 rounded-full bg-primary absolute -top-[3px] -left-1',
						styles.thumb,
					)}
				></div>
				{/* fill */}
				<div
					className={clsx(
						'h-2 bg-primary absolute -top-0 left-0 w-0',
						styles.trackFill,
					)}
				></div>
				{/* buffered */}
				<div className={clsx('h-2 bg-gray-200', styles.bufferedFill)}></div>
			</div>
			<div className="p-2 flex flex-row text-gray-400">
				<VideoPauseIcon className="w-5" />
				<VideoVolumeIcon className="w-5 ml-2" />
				<div className="flex-1"></div>
				<VideoCaptionsIcon className="w-5 ml-2" />
				<VideoSettingsIcon className="w-5 ml-2" />
				<VideoFullscreenIcon className="w-5 ml-2" />
			</div>
		</div>
	</div>
);

function AnalyzeStep() {
	return (
		<div className="flex flex-col 992:flex-row items-center py-8 992:py-24 w-full max-w-6xl relative overflow-hidden p-2 justify-between">
			<div className="left-2 right-2 h-0.5 border-b-2 border-dashed z-0 hidden 992:inline-block absolute" />
			<div className="absolute top-8 bottom-8 left-[50%] border-l-2 border-dashed 992:hidden" />

			<Player />

			<div className="min-w-[320px] h-56 mt-20 992:mt-0">
				<CodeSnippet
					snippets={[eventCodeSnippet]}
					noLineNumbers
					noFrame
					block
				/>
			</div>

			<div className="w-56 flex flex-col relative z-10 bg-surface py-6 shadow-card rounded-lg mt-20 992:mt-0 dark:border-2 dark:border-gray-200">
				{outlets.map(({ name, Icon }) => (
					<div
						key={name}
						className="flex flex-row items-center pl-10 mt-4 first:mt-0"
					>
						<Icon className="w-8 h-8 mr-2" />
						<span>{name}</span>
					</div>
				))}
			</div>
		</div>
	);
}

export default AnalyzeStep;
