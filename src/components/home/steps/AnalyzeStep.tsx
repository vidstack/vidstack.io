import CodeSnippet from '$components/code/CodeSnippet';
import { ReactComponent as FunctionIcon } from '$svg/outlets/function.svg';
import { ReactComponent as MixpanelIcon } from '$svg/outlets/mixpanel.svg';
import { ReactComponent as SegmentIcon } from '$svg/outlets/segment.svg';
import { ReactComponent as DashboardIcon } from '$svg/outlets/vidstack.svg';
import { ReactComponent as WebhookIcon } from '$svg/outlets/webhook.svg';

import { highlightedCode as eventCodeSnippet } from './code-snippets/analytics-event-snippet.js?highlight';

const outlets = [
	{ name: 'Dashboard', Icon: DashboardIcon },
	{ name: 'Webhooks', Icon: WebhookIcon },
	{ name: 'Functions', Icon: FunctionIcon },
	{ name: 'Segment', Icon: SegmentIcon },
	{ name: 'Mixpanel', Icon: MixpanelIcon },
];

function AnalyzeStep() {
	return (
		<div className="flex flex-col 992:flex-row items-center py-8 992:py-20 w-full max-w-6xl relative overflow-hidden p-2 justify-between">
			<div className="left-2 right-2 h-0.5 border-b-2 border-dashed z-0 hidden 992:inline-block absolute" />
			<div className="absolute top-8 bottom-8 left-[50%] border-l-2 border-dashed 992:hidden" />

			<div className="w-60 h-40 shadow-card flex items-center justify-center relative z-10 bg-surface rounded-lg"></div>

			<div className="min-w-[320px] h-56 mt-20 992:mt-0">
				<CodeSnippet
					snippets={[eventCodeSnippet]}
					noLineNumbers
					noFrame
					block
				/>
			</div>

			<div className="w-56 flex flex-col relative z-10 bg-surface py-6 shadow-card rounded-lg mt-20 992:mt-0">
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
