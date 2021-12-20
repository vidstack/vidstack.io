import clsx from 'clsx';
import { useMemo, useState } from 'react';

import { useLocalStorage } from '$hooks/useLocalStorage';

export type CodeSnippetProps = {
	defaultTab?: number;
	tabs?: string[];
	snippets: string[];
	noLineNumbers?: boolean;
	noFrame?: boolean;
	block?: boolean;
	badges?: string[];
};

function CodeSnippet({
	snippets,
	tabs,
	badges,
	defaultTab = 0,
	noLineNumbers = false,
	noFrame = false,
	block = false,
}: CodeSnippetProps) {
	const [currentTab, setCurrentTab] = useState(defaultTab);

	const currentCode = useMemo(
		() => snippets[currentTab],
		[currentTab, snippets],
	);

	const currentBadge = useMemo(
		() => badges?.[currentTab],
		[currentTab, badges],
	);

	const noOfLines = useMemo(
		() => (snippets[currentTab].match(/"line"/g) || []).length,
		[currentTab, snippets],
	);

	const [zoomedIn, setZoomedIn] = useLocalStorage('is-code-zoomed-in', false);

	return (
		<div
			className={clsx(
				'bg-[#292D3E] relative flex flex-col w-full overflow-hidden shadow-lg rounded-lg',
				block
					? 'w-full h-full'
					: 'max-w-2xl h-[31.625rem] max-h-[60vh] 576:max-h-[none] 992:h-[34.6875rem] 1200:h-[32rem]',
			)}
		>
			{!noFrame && (
				<div className="flex items-center w-full px-4 border-b-2 border-b-[#353845] h-12">
					<div className="w-3 h-3 rounded-full border-[#FB4F4D] border-2"></div>
					<div className="w-3 h-3 rounded-full border-[#F2AE47] border-2 ml-2"></div>
					<div className="w-3 h-3 rounded-full border-[#47F28B] opacity-80 border-2 ml-2"></div>
					<div className="flex-1"></div>
					<button
						className="text-[#d0d1d6] hover:text-gray-50 focus-visible:text-gray-50 dark:hover:text-gray-400 dark:focus-visible:text-gray-400 cursor-pointer"
						onClick={() => setZoomedIn(!zoomedIn)}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							aria-hidden="true"
							role="img"
							className="w-6 h-6"
							preserveAspectRatio="xMidYMid meet"
							viewBox="0 0 256 256"
						>
							{!zoomedIn && (
								<path
									d="M156 116a8 8 0 0 1-8 8h-24v24a8 8 0 0 1-16 0v-24H84a8 8 0 0 1 0-16h24V84a8 8 0 0 1 16 0v24h24a8 8 0 0 1 8 8zm73.651 113.654a8 8 0 0 1-11.314 0l-43.223-43.223a92.114 92.114 0 1 1 11.315-11.314l43.222 43.223a8 8 0 0 1 0 11.314zM116 191.996a76 76 0 1 0-76-76a76.086 76.086 0 0 0 76 76z"
									fill="currentColor"
								></path>
							)}

							{zoomedIn && (
								<path
									d="M156 116a8 8 0 0 1-8 8H84a8 8 0 0 1 0-16h64a8 8 0 0 1 8 8zm73.651 113.655a8 8 0 0 1-11.314 0l-43.223-43.223a92.114 92.114 0 1 1 11.315-11.314l43.222 43.223a8 8 0 0 1 0 11.314zM116 191.997a76 76 0 1 0-76-76a76.086 76.086 0 0 0 76 76z"
									fill="currentColor"
								></path>
							)}
						</svg>

						<span className="sr-only">
							{zoomedIn ? 'Shrink code size' : 'Enlarge code size'}
						</span>
					</button>
				</div>
			)}

			{tabs && (
				<div
					className={clsx(
						'w-full border-b-2 border-b-[#353845] flex items-center overflow-x-auto overflow-y-hidden font-medium no-scrollbar',
						zoomedIn ? 'h-14' : 'h-12',
					)}
					style={{ colorScheme: 'dark' }}
				>
					{tabs.map((tabTitle, i) => (
						<button
							key={tabTitle}
							className={clsx(
								'font-medium font-mono hover:text-gray-50 px-4 py-5 tracking-wide focus-visible:text-gray-50',
								zoomedIn ? 'text-sm 1200:text-base' : 'text-xs 1200:text-sm',
								currentTab === i
									? 'bg-[#2f3348] text-gray-50 dark:text-gray-400'
									: 'text-[#d0d1d6] dark:hover:text-gray-400 dark:focus-visible:text-gray-400',
							)}
							onClick={() => setCurrentTab(i)}
						>
							{tabTitle}
						</button>
					))}
				</div>
			)}

			<div
				className={clsx(
					'flex w-full flex-1 overflow-y-auto relative',
					currentBadge && 'pt-2',
				)}
			>
				{!noLineNumbers && (
					<div
						className={clsx(
							'hidden 576:block w-12 text-[#bcbcbc] font-mono pt-4 pr-4 text-right select-none min-h-full whitespace-pre-wrap',
							zoomedIn ? 'text-lg leading-7 pl-2' : 'text-sm leading-6',
						)}
					>
						{[...Array(noOfLines - 1)].map((_, i) => `${i + 1}\n`)}
					</div>
				)}

				<pre
					className={clsx(
						'flex-1 w-full p-4',
						zoomedIn ? 'text-lg leading-7' : 'text-sm leading-6',
					)}
					style={{ colorScheme: 'dark' }}
				>
					<code
						className="overflow-auto"
						dangerouslySetInnerHTML={{
							__html: currentCode ?? '',
						}}
					/>
				</pre>

				{currentBadge && (
					<div
						className={clsx(
							'bg-[#464b68] px-2 py-1 rounded-sm absolute top-3 right-3 text-gray-50 dark:text-gray-400 tracking-wider',
							zoomedIn ? 'text-sm' : 'text-xs',
						)}
					>
						{currentBadge}
					</div>
				)}
			</div>
		</div>
	);
}

export default CodeSnippet;
