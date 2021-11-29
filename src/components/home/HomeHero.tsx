import Button from '$base/Button';
import Chip from '$base/Chip';
import { ReactComponent as PlyrIcon } from '$svg/partners/plyr.svg';
import { ReactComponent as RedditIcon } from '$svg/partners/reddit.svg';
import { ReactComponent as VimeIcon } from '$svg/partners/vime.svg';
import { ReactComponent as YCombinatorIcon } from '$svg/partners/ycombinator.svg';

function HomeHero() {
	return (
		<section className="w-full max-w-6xl mx-auto" aria-label="Hero">
			<div className="flex flex-col mt-14 992:mt-20 max-w-lg">
				<div className="flex flex-row items-center">
					<Chip className="bg-soon">Coming Soon</Chip>
					<Button icon="arrow" monochrome size="small">
						Vidstack Player
					</Button>
				</div>
				<div className="mt-8">
					<h1 className="text-primary text-24 font-semibold">
						<span className="576:hidden">Video for frontend devs.</span>
						<span className="hidden 576:block">
							Video for frontend developers.
						</span>
					</h1>
					<p className="mt-4">
						Vidstack enables developers to easily build their own video
						pipeline, design their player, and measure video engagement and
						performance - all in once place... without being a video engineer.
					</p>
				</div>
				<div className="flex flex-row mt-8">
					<Button contained icon="arrow">
						Early Access
					</Button>
				</div>
				<div className="mt-14 992:mt-16 flex flex-row space-x-7 576:space-x-10 items-center -ml-3">
					<RedditIcon className="h-16" />
					<YCombinatorIcon className="h-16" />
					<PlyrIcon className="h-16" />
					<VimeIcon className="h-16" />
				</div>
			</div>
		</section>
	);
}

export default HomeHero;
