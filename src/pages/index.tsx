import type { NextPage } from 'next';
import Head from 'next/head';

import CommunitySection from '$components/home/CommunitySection';
import HeroSection from '$components/home/HeroSection';
import OpenSourceSection from '$components/home/OpenSourceSection';
import ProcessSection from '$components/home/ProcessSection';
import Navbar from '$components/navbar/Navbar';

const HomePage: NextPage = () => {
	return (
		<>
			<Head>
				<title>Vidstack</title>
				<meta name="description" content="Video for frontend developers." />
				<meta
					key="twitter:title"
					name="twitter:title"
					content="Vidstack - video for frontend developers."
				/>
				<meta
					key="og:title"
					property="og:title"
					content="Vidstack - video for frontend developers."
				/>
			</Head>

			<Navbar />

			<main className="flex flex-col min-w-full items-center 768:items-start z-0 pt-16">
				<HeroSection />
				<ProcessSection />
				<OpenSourceSection />
				<CommunitySection />
			</main>

			<footer className="text-center w-full text-base font-medium pb-16 text-subtitle">
				© Vidstack {new Date().getFullYear()}
			</footer>
		</>
	);
};

export default HomePage;
