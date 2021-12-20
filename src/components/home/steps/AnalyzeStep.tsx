import clsx from 'clsx';
import { MutableRefObject, useEffect, useRef, useState } from 'react';

import CodeSnippet from '$components/code/CodeSnippet';
import { useIntersectionObserver } from '$hooks/useIntersectionObserver';
import { ReactComponent as FunctionIcon } from '$svg/outlets/function.svg';
import { ReactComponent as MixpanelIcon } from '$svg/outlets/mixpanel.svg';
import { ReactComponent as SegmentIcon } from '$svg/outlets/segment.svg';
import { ReactComponent as DashboardIcon } from '$svg/outlets/vidstack.svg';
import { ReactComponent as WebhookIcon } from '$svg/outlets/webhook.svg';
import { ReactComponent as VideoCaptionsIcon } from '$svg/video/captions.svg';
import { ReactComponent as VideoFullscreenIcon } from '$svg/video/fullscreen.svg';
import { ReactComponent as VideoPauseIcon } from '$svg/video/pause.svg';
import { ReactComponent as VideoPlayIcon } from '$svg/video/play.svg';
import { ReactComponent as VideoSettingsIcon } from '$svg/video/settings.svg';
import { ReactComponent as VideoVolumeIcon } from '$svg/video/volume.svg';
import { listen } from '$utils/events';
import { wait } from '$utils/timing';

import { highlightedCode as eventCodeSnippet } from './code-snippets/analytics-event-snippet.js?highlight';

const outlets = [
	{ name: 'Dashboard', Icon: DashboardIcon },
	{ name: 'Webhook', Icon: WebhookIcon },
	{ name: 'Function', Icon: FunctionIcon },
	{ name: 'Segment', Icon: SegmentIcon },
	{ name: 'Mixpanel', Icon: MixpanelIcon },
];

const createEventCodeSnippet = (
	event: string,
	{
		currentTime = 0,
		buffered = 0,
		paused = true,
		timeToFirstFrame = 0,
		bufferingCount = 0,
		bufferingDuration = 0,
		timeToInteractive = 0,
	} = {},
) =>
	eventCodeSnippet
		.replace('initializing', event)
		.replace('false', `${paused}`)
		.replace('1000', `${currentTime}`)
		.replace('1000', `${buffered}`)
		.replace('1000', `${bufferingCount}`)
		.replace('1000', `${bufferingDuration}`)
		.replace('1000', `${timeToFirstFrame}`)
		.replace('1000', `${timeToInteractive}`);

const Player = ({
	setEventCodeSnippet,
}: {
	setEventCodeSnippet: (snippet: string) => void;
}) => {
	const videoRef = useRef() as MutableRefObject<HTMLVideoElement>;
	const isInView = useIntersectionObserver(videoRef);
	const hasStartedAnimation = useRef(false);
	const startTimerId = useRef(-1);
	const startedLoadingAt = useRef(0);
	const [isVideoHidden, setIsVideoHidden] = useState(true);
	const disposal = useRef<(() => void)[]>([]);
	const [isBuffering, setIsBuffering] = useState(false);
	const [isMediaReady, setIsMediaReady] = useState(false);
	const [playedPercent, setPlayedPercent] = useState(0);
	const [bufferedPercent, setBufferedPercent] = useState(0);
	const [userPaused, setUserPaused] = useState(true);

	useEffect(() => {
		function handleCanPlay() {
			setIsMediaReady(true);
		}

		setIsBuffering(true);

		if (videoRef.current.readyState >= 3) {
			handleCanPlay();
		} else {
			disposal.current.push(listen(videoRef.current, 'canplay', handleCanPlay));
		}

		return () => {
			// eslint-disable-next-line react-hooks/exhaustive-deps
			disposal.current.forEach((dispose) => dispose());
		};
	}, []);

	useEffect(() => {
		if (isInView) {
			startedLoadingAt.current = Date.now();
		}
	}, [isInView]);

	useEffect(() => {
		if (!isMediaReady || hasStartedAnimation.current) {
			return;
		}

		async function rollAnimation() {
			if (hasStartedAnimation.current) return;
			hasStartedAnimation.current = true;

			const startDuration = Date.now() - startedLoadingAt.current;

			const eventState = {
				paused: true,
				currentTime: 0,
				buffered: 0,
				bufferingCount: 1,
				bufferingDuration: startDuration,
				timeToFirstFrame: 0,
				timeToInteractive: startDuration,
			};

			setIsBuffering(false);
			setIsVideoHidden(false);
			setEventCodeSnippet(createEventCodeSnippet('media_ready', eventState));

			await wait(1500);

			const playRequestedAt = Date.now();

			setUserPaused(false);
			eventState.paused = false;
			setEventCodeSnippet(
				createEventCodeSnippet('user_play_request', eventState),
			);

			setIsBuffering(true);
			eventState.bufferingCount += 1;

			await wait(1000);

			const updateBuffered = () => {
				const video = videoRef.current;
				const bufferedAmount = video.buffered.end(0);
				const bufferedPercent = Math.min(
					(bufferedAmount / video.duration) * 100,
					100,
				);
				eventState.buffered = Math.round(bufferedAmount * 1000);
				setBufferedPercent(bufferedPercent);
			};

			try {
				videoRef.current!.play();

				let hasPlaybackStarted = false;
				disposal.current.push(
					listen(videoRef.current, 'playing', () => {
						setIsBuffering(false);

						if (!hasPlaybackStarted) {
							const timeToFirstFrame = Date.now() - playRequestedAt;
							eventState.timeToFirstFrame = timeToFirstFrame;
							eventState.bufferingDuration += timeToFirstFrame;
							updateBuffered();
							setEventCodeSnippet(
								createEventCodeSnippet('playback_start', eventState),
							);
							hasPlaybackStarted = true;
						}
					}),
				);

				disposal.current.push(
					listen(videoRef.current, 'timeupdate', () => {
						const video = videoRef.current;

						eventState.currentTime = Math.round(video.currentTime * 1000);

						const playedPercent = Math.min(
							(video.currentTime / video.duration) * 100,
							100,
						);

						setPlayedPercent(playedPercent);

						const threshold = Math.round(playedPercent);
						if (threshold % 10 === 0) {
							setEventCodeSnippet(
								createEventCodeSnippet(
									`watch_${threshold}_percent`,
									eventState,
								),
							);
						}
					}),
				);

				disposal.current.push(
					listen(videoRef.current, 'progress', () => updateBuffered()),
				);

				disposal.current.push(
					listen(videoRef.current, 'ended', async () => {
						eventState.paused = true;
						setUserPaused(true);
						await wait(1500);
						setEventCodeSnippet(
							createEventCodeSnippet('media_ended', eventState),
						);
					}),
				);
			} catch (e) {
				setUserPaused(true);
				setIsBuffering(false);
				eventState.paused = true;
				setEventCodeSnippet(
					createEventCodeSnippet('playback_failed', eventState),
				);
			}
		}

		window.clearTimeout(startTimerId.current);
		// @ts-expect-error - .
		startTimerId.current = setTimeout(() => {
			if (isInView) {
				rollAnimation();
			}
		}, 2000);
	}, [isMediaReady, isInView, setEventCodeSnippet]);

	return (
		<div className="w-[280px] shadow-card flex flex-col relative z-10 bg-surface rounded-md dark:border-2 dark:border-gray-200 overflow-hidden">
			{/* canvas */}
			<div className="flex-1 w-full relative overflow-hidden z-10 bg-[#000]">
				<video
					preload="auto"
					src="/media/agent-327-snippet.mp4"
					muted
					width="280"
					height="157.5"
					className="relative z-10"
					playsInline
					controlsList="noremoteplayback"
					ref={videoRef}
				/>

				<div
					className={clsx(
						'absolute inset-0 z-20 bg-[#000] transition-opacity',
						isVideoHidden ? 'opacity-100' : 'opacity-0',
					)}
				></div>

				<div
					className={clsx(
						'absolute inset-0 z-20 flex justify-center items-center transition-opacity',
						isBuffering ? 'opacity-100' : 'opacity-0',
					)}
				>
					<svg
						aria-hidden="true"
						className="animate-spin w-10 h-10 text-gray-50 dark:text-gray-400"
						fill="none"
						viewBox="0 0 24 24"
					>
						<circle
							className="opacity-25"
							cx="12"
							cy="12"
							r="10"
							stroke="currentColor"
							strokeWidth="3.5"
						></circle>
						<path
							className="opacity-75"
							fill="currentColor"
							d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
						></path>
					</svg>
				</div>
			</div>

			{/* controls */}
			<div className="flex flex-col relative z-20">
				{/* scrubber */}
				<div className="h-2 bg-gray-200 dark:bg-gray-100 w-full relative">
					{/* thumb */}
					<div
						className={clsx(
							'w-3.5 h-3.5 rounded-full bg-primary absolute -top-[3px] -right-[1px]',
						)}
						style={{
							left: `${playedPercent}%`,
						}}
					></div>
					{/* fill */}
					<div
						className={clsx('h-2 bg-primary absolute -top-0 left-0 w-0')}
						style={{ width: `calc(${playedPercent}% + 2px)` }}
					></div>
					{/* buffered */}
					<div
						className={clsx('h-2 bg-[#a5a5a5] dark:bg-gray-200')}
						style={{ width: `${bufferedPercent}%` }}
					></div>
				</div>

				<div className="p-2 flex flex-row text-gray-400">
					<div className="relative w-5 h-5">
						<VideoPlayIcon
							className={clsx(
								'absolute top-0 left-0',
								userPaused ? 'opacity-100' : 'opacity-0',
							)}
						/>
						<VideoPauseIcon
							className={clsx(
								'absolute top-0 left-0',
								userPaused ? 'opacity-0' : 'opacity-100',
							)}
						/>
					</div>
					<VideoVolumeIcon className="w-[21px] h-[21px] ml-2" />
					<div className="flex-1"></div>
					<VideoCaptionsIcon className="w-5 h-5 ml-2" />
					<VideoSettingsIcon className="w-5 h-5 ml-2.5" />
					<VideoFullscreenIcon className="w-5 h-5 ml-2" />
				</div>
			</div>
		</div>
	);
};

function AnalyzeStep() {
	const [currentEventCodeSnippet, setEventCodeSnippet] = useState(
		createEventCodeSnippet('initializing'),
	);

	return (
		<div className="flex flex-col 992:flex-row items-center py-8 992:py-24 w-full max-w-6xl relative overflow-hidden p-2 justify-between">
			<div className="left-2 right-2 h-0.5 border-b-2 border-dashed z-0 hidden 992:inline-block absolute" />
			<div className="absolute top-8 bottom-8 left-[50%] border-l-2 border-dashed 992:hidden" />

			<Player setEventCodeSnippet={setEventCodeSnippet} />

			<div className="min-w-[320px] h-90 mt-20 992:mt-0 relative pt-2">
				<CodeSnippet
					snippets={[currentEventCodeSnippet]}
					noLineNumbers
					noFrame
					block
				/>
				<div className="bg-[#464b68] text-xs px-2 py-1 rounded-sm absolute top-4 right-2 text-gray-50 dark:text-gray-400 tracking-wider">
					Example
				</div>
			</div>

			<div className="w-56 flex flex-col relative z-10 bg-surface py-6 shadow-card rounded-lg mt-20 992:mt-0 dark:border-2 dark:border-gray-200 992:ml-4">
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
