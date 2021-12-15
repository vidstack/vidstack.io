import clsx from 'clsx';
import { FC, SVGProps } from 'react';

import { ReactComponent as AwsIcon } from '$svg/providers/aws.svg';
import { ReactComponent as CloudflareIcon } from '$svg/providers/cloudflare.svg';
import { ReactComponent as GoogleIcon } from '$svg/providers/google.svg';
import { ReactComponent as MuxIcon } from '$svg/providers/mux.svg';
import { ReactComponent as VidstackSymbolIcon } from '$svg/vidstack-symbol.svg';

const DashboardWireframe = () => (
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

const ProviderCard = ({
	Icon,
	iconClassName,
}: {
	Icon: FC<SVGProps<SVGSVGElement>>;
	iconClassName?: string;
}) => (
	<div className="shadow-card rounded-sm w-24 h-24 flex items-center justify-center dark:border-2 dark:border-gray-200 bg-surface">
		<Icon className={clsx('w-14 h-14', iconClassName)} />
	</div>
);

const DashedLine = ({ className }: { className?: string }) => (
	<div
		className={clsx('absolute w-5/12  h-1/2 z-0 border-dashed', className)}
	/>
);

function ManageStep() {
	return (
		<div className="w-full mx-auto max-w-xl mt-4 relative">
			<div className="w-full flex z-20 relative">
				<ProviderCard Icon={GoogleIcon} />
				<div className="flex-1"></div>
				<ProviderCard Icon={AwsIcon} iconClassName="mt-2" />
			</div>

			<div className="my-12 w-full flex justify-center z-20 relative">
				<DashboardWireframe />
			</div>

			<div className="w-full flex z-20 relative">
				<ProviderCard Icon={MuxIcon} />
				<div className="flex-1"></div>
				<ProviderCard Icon={CloudflareIcon} />
			</div>

			<DashedLine className="top-10 left-0 border-t-2 border-r-2" />
			<DashedLine className="top-10 right-0 border-t-2 border-l-2" />
			<DashedLine className="bottom-10 left-0 border-b-2 border-r-2" />
			<DashedLine className="bottom-10 right-0 border-b-2 border-l-2" />
		</div>
	);
}

export default ManageStep;
