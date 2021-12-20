import Image from 'next/image';

import Button from '$base/Button';

function HeroSection() {
	return (
		<section className="w-full max-w-6xl mx-auto px-4 576:px-8 992:px-14 1200:pt-8 1200:pb-16">
			<div className="flex flex-col mt-4 992:mt-20">
				<div className="mt-0">
					<h1 className="text-primary font-bold text-4xl 992:text-6xl tracking-tight text-center">
						<span className="576:hidden">Video for frontend devs.</span>
						<span className="hidden 576:block">
							Video for frontend developers.
						</span>
					</h1>
					<p className="mt-10 text-center max-w-2xl mx-auto text-lg 576:text-xl tracking-wide text-subtitle">
						Vidstack is the optimal video workflow for frontend developers.
						Manage your videos, connect your frontend, and analyze video
						playback - all in one place.
					</p>
				</div>
				<div className="flex flex-row justify-center mt-12">
					<Button contained icon="arrow">
						Early Access
					</Button>
				</div>
			</div>
		</section>
	);
}

export default HeroSection;
