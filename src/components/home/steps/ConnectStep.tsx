import CodeSnippet from '$components/code/CodeSnippet';
import { ReactComponent as NextjsIcon } from '$svg/frameworks/nextjs.svg';
import { ReactComponent as ReactIcon } from '$svg/frameworks/react.svg';
import { ReactComponent as SvelteIcon } from '$svg/frameworks/svelte.svg';
import { ReactComponent as TailwindIcon } from '$svg/frameworks/tailwind.svg';
import { ReactComponent as VueIcon } from '$svg/frameworks/vue.svg';

import { highlightedCode as apiCodeSnippet } from './code-snippets/api-snippet.graphql?highlight';
import { highlightedCode as playerCodeSnippet } from './code-snippets/player-snippet.html?highlight';
import { highlightedCode as sdkCodeSnippet } from './code-snippets/sdk-snippet.js?highlight';
import { highlightedCode as uploaderCodeSnippet } from './code-snippets/uploader-snippet.html?highlight';

function ConnectStep() {
	return (
		<div className="flex flex-col w-full items-center">
			<CodeSnippet
				defaultTab={1}
				tabs={['uploader.html', 'player.html', 'api.gql', 'sdk.js']}
				snippets={[
					uploaderCodeSnippet,
					playerCodeSnippet,
					apiCodeSnippet,
					sdkCodeSnippet,
				]}
			/>

			<div>
				<p className="text-400 text-sm tracking-widest text-center mt-12 992:mt-16 font-medium dark:font-normal">
					NO MATTER YOUR STACK - VIDSTACK PLAYER WILL WORK.
				</p>

				<div className="flex flex-row flex-wrap space-x-4 992:space-x-10 justify-center mt-10 w-full">
					<VueIcon className="w-16 h-16 mb-4 576:mb-0" />
					<ReactIcon className="w-16 h-16" />
					<SvelteIcon className="w-16 h-16" />
					<NextjsIcon className="w-16 h-16" />
					<TailwindIcon className="w-16 h-16" />
				</div>
			</div>
		</div>
	);
}

export default ConnectStep;
