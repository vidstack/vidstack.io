import clsx from 'clsx';

import Button from '$base/Button';
import Chip from '$base/Chip';

const openSourceProjects = [
	{
		name: 'Elements',
		description:
			'Collection of headless web components that make integrating media on the web a breeze.',
		badge: 'Alpha',
		repoHref: 'https://github.com/vidstack/elements',
	},
	{
		name: 'Uploader',
		description:
			'A light and customizable media uploader component that integrates directly with Vidstack.',
		badge: 'Pre-alpha',
		repoHref: 'https://github.com/vidstack/uploader',
	},
	{
		name: 'SDK',
		description:
			'Our Node.js SDK for interacting with the Vidstack API and services to make video magic happen.',
		badge: 'Pre-alpha',
		repoHref: 'https://github.com/vidstack/node-sdk',
	},
	{
		name: 'Analytics',
		description:
			'Start collecting invaluable video performance and user-behaviour data with a few lines of code.',
		badge: 'Pre-alpha',
		repoHref: 'https://github.com/vidstack/analytics',
	},
];

function OpenSourceSection() {
	return (
		<section className="flex justify-center items-center w-full relative mt-20">
			<div className="absolute w-full h-full z-0 overflow-hidden">
				<div className="bg-gray-50 w-full h-full transform origin-bottom-left -skew-y-6 z-0"></div>
			</div>

			<div className="border-[#f99fbd] w-36 h-4 border-dashed border-t-2 absolute right-0 top-7 z-10 transform rotate-[16deg]" />

			<div className="flex flex-col justify-center items-center z-10 pb-[var(--section-angle-padding-top)] pt-28 px-4">
				<h1 className="text-4xl text-primary font-bold text-center">
					Open Source
				</h1>

				<p className="text-lg text-subtitle text-center mt-10 max-w-lg">
					We truly love open-source. You&apos;ll find most the work we do will
					be open to everyone, and can be found on{' '}
					<a
						href="https://github.com/vidstack"
						target="_blank"
						rel="noreferrer"
						className="text-primary font-medium"
					>
						GitHub
					</a>
					. Watch the releases of each repository to get notified when it&apos;s
					ready.
				</p>

				<div className="grid grid-cols-1 768:grid-cols-2 gap-12 mt-16 pb-10">
					{openSourceProjects.map((project) => (
						<div
							key={project.name}
							className="shadow-card flex flex-col relative z-10 bg-surface rounded-lg dark:border-2 dark:border-gray-200 p-4 pb-0 max-w-xs"
						>
							<div className="flex flex-row items-center">
								<h2 className="text-lg font-medium">{project.name}</h2>
								<Chip
									className={clsx(
										'ml-3 tracking-wide',
										project.badge === 'Alpha' && 'bg-beta',
										project.badge === 'Pre-alpha' && 'bg-soon',
									)}
								>
									{project.badge}
								</Chip>
							</div>
							<p className="mt-4 text-base text-subtitle leading-7">
								{project.description}
							</p>
							<div className="py-4 rounded-b-lg flex justify-end">
								<Button
									href={project.repoHref}
									icon="arrow"
									size="small"
									compact
									external
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										aria-hidden="true"
										role="img"
										width="24"
										height="24"
										className="ml-2"
										preserveAspectRatio="xMidYMid meet"
										viewBox="0 0 24 24"
									>
										<g strokeWidth="2" fill="none">
											<path
												d="M16 22.027v-2.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7a5.44 5.44 0 0 0-1.5-3.75a5.07 5.07 0 0 0-.09-3.77s-1.18-.35-3.91 1.48a13.38 13.38 0 0 0-7 0c-2.73-1.83-3.91-1.48-3.91-1.48A5.07 5.07 0 0 0 5 5.797a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7a3.37 3.37 0 0 0-.94 2.58v2.87"
												stroke="currentColor"
												strokeLinecap="round"
												strokeLinejoin="round"
											></path>
											<path
												d="M9 20.027c-3 .973-5.5 0-7-3"
												stroke="currentColor"
												strokeLinecap="round"
												strokeLinejoin="round"
											></path>
										</g>
									</svg>

									<span className="sr-only">
										Vidstack {project.name} GitHub Repo
									</span>
								</Button>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}

export default OpenSourceSection;
