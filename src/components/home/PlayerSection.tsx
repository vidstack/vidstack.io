import Button from '$base/Button';
import CodeSnippet from '$components/code/CodeSnippet';
import { ReactComponent as NextjsIcon } from '$svg/frameworks/nextjs.svg';
import { ReactComponent as ReactIcon } from '$svg/frameworks/react.svg';
import { ReactComponent as SvelteIcon } from '$svg/frameworks/svelte.svg';
import { ReactComponent as TailwindIcon } from '$svg/frameworks/tailwind.svg';
import { ReactComponent as VueIcon } from '$svg/frameworks/vue.svg';

import { highlightedCode as playerCodeSnippet } from './code-snippets/player-snippet.html?highlight';

const frameworks = [
	{ name: 'Vue', href: 'https://vuejs.org', Icon: VueIcon },
	{ name: 'React', href: 'https://reactjs.org', Icon: ReactIcon },
	{ name: 'Svelte', href: 'https://svelte.dev', Icon: SvelteIcon },
	{ name: 'Nextjs', href: 'https://nextjs.org', Icon: NextjsIcon },
	{ name: 'Tailwind', href: 'https://tailwindcss.com', Icon: TailwindIcon },
];

function PlayerSection() {
	return (
		<section className="flex justify-center items-center w-full relative mt-28 992:mt-12">
			<div className="absolute w-full h-full z-0 overflow-hidden">
				<div className="bg-gray-50 w-full h-full transform origin-top-right -skew-y-6 z-0"></div>
			</div>

			<div className="border-gray-300 w-36 h-4 border-dashed border-t-2 absolute right-0 top-10 z-10 transform rotate-[16deg]" />

			<div className="z-10 pt-[var(--section-angle-padding-top)] px-4 flex flex-col justify-center items-center w-full pb-16 992:pb-32">
				<h1 className="text-4xl font-bold text-center mt-12">
					Vidstack Player
				</h1>

				<p className="text-lg text-subtitle text-center mt-10 max-w-lg mb-16">
					Build and design your video player only using HTML and CSS. Our
					headless web components let you finally craft the perfect media
					experience, without being tangled up 12-feet deep in JS.
				</p>

				<CodeSnippet
					tabs={['player.html']}
					snippets={[playerCodeSnippet]}
					badges={['Tailwind Example']}
				/>

				<div className="mt-12 992:mt-0">
					<p className="text-400 text-sm tracking-widest leading-7 text-center 992:mt-16 font-medium dark:font-normal">
						NO MATTER YOUR STACK - VIDSTACK PLAYER WILL WORK.
					</p>

					<div className="flex flex-row flex-wrap space-x-12 justify-center mt-10 w-full">
						{frameworks.map(({ name, href, Icon }) => (
							<Button
								href={href}
								label={name}
								external
								monochrome
								compact
								key={name}
							>
								<Icon className="w-16 h-16 first:mb-8 576:first:mb-0" />
							</Button>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}

export default PlayerSection;
