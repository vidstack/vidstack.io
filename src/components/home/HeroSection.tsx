import Button from '$base/Button';

function HeroSection() {
	return (
		<section className="w-full max-w-6xl mx-auto px-4 576:px-8 992:px-14 1200:pt-8 1200:pb-16">
			<div className="flex flex-col 992:mt-12">
				<div className="flex flex-col items-center justify-center">
					<h1 className="font-bold text-5xl 992:text-6xl tracking-tight text-center max-w-3xl leading-[3.5rem] 992:leading-[4.5rem]">
						<span className="576:hidden">Video tools for frontend devs.</span>
						<span className="hidden 576:block">
							Video tools for frontend developers.
						</span>
					</h1>
					<p className="mt-12 text-center max-w-[600px] mx-auto text-lg 576:text-xl tracking-wide text-subtitle">
						Vidstack is a video framework built with high-quality web components
						such as&nbsp;
						<code className="text-primary">vds-video-player</code>,&nbsp;
						<code className="text-primary">vds-uploader</code>, and&nbsp;
						<code className="text-primary">vds-analytics</code>,&nbsp;that make
						integrating video into modern web apps easier.
					</p>
				</div>

				<div className="flex flex-row justify-center mt-16">
					<Button
						external
						contained
						icon="arrow"
						href="https://github.com/vidstack"
					>
						Follow us on GitHub
					</Button>
				</div>
			</div>
		</section>
	);
}

export default HeroSection;
