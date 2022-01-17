import clsx from 'clsx';

import Button from '$base/Button';
import Chip from '$base/Chip';

const openSourceProjects = [
	{
		name: 'Player',
		description:
			'Headless web components that make integrating media on the web a breeze.',
		badge: 'Alpha',
		repoHref: 'https://github.com/vidstack/player',
	},
	{
		name: 'Uploader',
		description:
			'Customizable video uploader with multiple provider integrations out of the box.',
		badge: 'Pre-alpha',
		repoHref: 'https://github.com/vidstack/uploader',
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
		<section className="flex flex-col justify-center items-center mt-24 992:mt-32 px-4 w-full">
			<h1 className="text-4xl font-bold text-center">Open Source</h1>

			<p className="text-lg text-subtitle text-center mt-10 max-w-lg">
				You can find our work on&nbsp;
				<a
					href="https://github.com/vidstack"
					target="_blank"
					rel="noreferrer"
					className="text-primary font-medium"
				>
					GitHub
				</a>
				. Watch the releases of each repository to be up to date with the
				latest.
			</p>

			<div className="grid grid-cols-1 1200:grid-cols-3 gap-12 mt-16 pb-10">
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
		</section>
	);
}

export default OpenSourceSection;
