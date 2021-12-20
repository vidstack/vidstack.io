import clsx from 'clsx';
import {
	FC,
	MutableRefObject,
	SVGProps,
	useEffect,
	useRef,
	useState,
} from 'react';

import { useIntersectionObserver } from '$hooks/useIntersectionObserver';
import { ReactComponent as AwsIcon } from '$svg/providers/aws.svg';
import { ReactComponent as CloudflareIcon } from '$svg/providers/cloudflare.svg';
import { ReactComponent as GoogleIcon } from '$svg/providers/google.svg';
import { ReactComponent as MuxIcon } from '$svg/providers/mux.svg';
import { ReactComponent as VideoFileIcon } from '$svg/video-file.svg';
import { ReactComponent as VidstackSymbolIcon } from '$svg/vidstack-symbol.svg';

import styles from './AnalyzeStep.module.css';

const DashboardWireframe = ({ inView = false }) => {
	const [showVideoBlock, setShowVideoBlock] = useState(false);

	useEffect(() => {
		window.requestAnimationFrame(() => {
			setShowVideoBlock(true);
		});
	}, []);

	return (
		<div className="w-full rounded-md overflow-hidden flex flex-row h-56 max-w-xs shadow-card bg-surface dark:border-2 dark:border-gray-200">
			<div className="w-2/12 bg-gray-100">
				<VidstackSymbolIcon className="w-6 ml-2.5 mt-2" />
			</div>
			<div className="w-full grow-1 flex flex-col">
				<div className="w-full flex items-center justify-end p-3">
					<div className="w-10 h-1 rounded-full bg-gray-200"></div>
					<div className="w-10 h-1 rounded-full bg-gray-200 ml-2"></div>
				</div>
				<div className="flex items-center justify-center h-full">
					<div className="grid gap-4 grid-cols-3">
						{[...Array(6)].map((_, i) => (
							<div key={i}>
								<div className="w-16 h-12 bg-gray-200 rounded-sm" />
								<div className="w-10 h-1 rounded-full bg-gray-200 mt-2"></div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

const ProviderCard = ({
	Icon,
	className,
	iconClassName,
}: {
	Icon: FC<SVGProps<SVGSVGElement>>;
	className?: string;
	iconClassName?: string;
}) => (
	<div
		className={clsx(
			'shadow-card rounded-sm w-24 h-24 flex items-center justify-center border-2 border-gray-200 bg-surface',
			className,
		)}
	>
		<Icon className={clsx('w-14 h-14', iconClassName)} />
	</div>
);

const DashedLine = ({ className }: { className?: string }) => (
	<div className={clsx('absolute w-5/12 h-1/2 z-0 border-dashed', className)} />
);

function ManageStep() {
	const rootRef = useRef() as MutableRefObject<HTMLDivElement>;
	const isInView = useIntersectionObserver(rootRef, { threshold: 1 });

	return (
		<div className="w-full mx-auto max-w-xl mt-4 relative" ref={rootRef}>
			<div className="w-full flex z-20 relative">
				<ProviderCard Icon={GoogleIcon} />
				<div className="flex-1"></div>
				<ProviderCard Icon={AwsIcon} iconClassName="mt-2" />
			</div>

			<div className="my-12 w-full flex justify-center z-20 relative">
				<DashboardWireframe inView={isInView} />
			</div>

			<div className="w-full flex z-20 relative">
				<ProviderCard
					className={isInView ? styles.muxPulse : ''}
					Icon={MuxIcon}
				/>
				<div className="flex-1"></div>
				<ProviderCard
					className={isInView ? styles.cloudflarePulse : ''}
					Icon={CloudflareIcon}
				/>
			</div>

			<DashedLine className="top-10 left-0 border-t-2 border-r-2" />
			<DashedLine className="top-10 right-0 border-t-2 border-l-2" />
			<DashedLine className="bottom-10 left-0 border-b-2 border-r-2" />
			<DashedLine className="bottom-10 right-0 border-b-2 border-l-2" />

			<VideoFileIcon
				className={clsx(
					'w-8 h-8 absolute z-10 opacity-0 text-gray-300',
					isInView && styles.topLeftVideoFile,
				)}
			/>
			<VideoFileIcon
				className={clsx(
					'w-8 h-8 absolute z-10 opacity-0 text-gray-300',
					isInView && styles.bottomLeftVideoFile,
				)}
			/>
			<VideoFileIcon
				className={clsx(
					'w-8 h-8 absolute z-10 opacity-0 text-gray-300',
					isInView && styles.topRightVideoFile,
				)}
			/>
			<VideoFileIcon
				className={clsx(
					'w-8 h-8 absolute z-10 opacity-0 text-gray-300',
					isInView && styles.bottomRightVideoFile,
				)}
			/>
			<VideoFileIcon
				className={clsx(
					'w-8 h-8 absolute z-10 opacity-0 text-gray-300',
					isInView && styles.bottomLeftEncodedFile,
				)}
			/>
			<VideoFileIcon
				className={clsx(
					'w-8 h-8 absolute z-10 opacity-0 text-gray-300',
					isInView && styles.bottomRightEncodedFile,
				)}
			/>
		</div>
	);
}

export default ManageStep;
