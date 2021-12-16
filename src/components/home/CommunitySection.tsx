import Socials from '$components/navbar/Socials';

function CommunitySection() {
	return (
		<section className="flex justify-center items-center w-full relative">
			<div className="flex flex-col justify-center items-center z-10 pb-[var(--section-angle-padding-top)] pt-28 px-4">
				<h1 className="text-4xl text-primary font-bold text-center">
					Join our community
				</h1>

				<p className="text-lg text-subtitle text-center mt-10 max-w-lg">
					Our goal is to make video accessible to all frontend developers. We’d
					love to hear how you’re tackling video and how we can make a
					difference in your life. Join our community and share your
					experiences!
				</p>

				<Socials
					className="flex flex-row mt-12 space-x-8"
					iconClassName="w-9"
					showTooltips
				/>
			</div>
		</section>
	);
}

export default CommunitySection;
