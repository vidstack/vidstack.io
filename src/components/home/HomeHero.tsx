import Button from '$base/Button';
import Chip from '$base/Chip';

function HomeHero() {
	return (
		<section
			className="w-full max-w-6xl mx-auto px-4 576:px-8 992:px-14"
			aria-label="Hero"
		>
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
						We want to give developers the tools they need to easily integrate
						video onto the web - all in one place... without being a video
						engineer.
					</p>
				</div>
				<div className="flex flex-row mt-8">
					<Button contained icon="arrow">
						Early Access
					</Button>
				</div>
			</div>
		</section>
	);
}

export default HomeHero;
