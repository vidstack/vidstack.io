import type { NextPage } from 'next';
import Head from 'next/head';

import Button from '$base/Button';
import HeroSection from '$components/home/HeroSection';
import OpenSourceSection from '$components/home/OpenSourceSection';
import PlayerSection from '$components/home/PlayerSection';
import Navbar from '$components/navbar/Navbar';
import Socials from '$components/navbar/Socials';

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

			{/* Announcement bar. */}
			<p className="w-full bg-[#ffebf2] px-2 hidden items-center justify-center">
				<Button external monochrome href="https://github.com/vidstack/player">
					<div className="w-full text-center font-normal text-base">
						<span className="text-gray-400 dark:text-gray-100 break-words">
							We&apos;re on Discord!
						</span>
						<span className="text-primary ml-1 underline">Join Server</span>
					</div>
				</Button>
			</p>

			<Navbar />

			<main className="flex flex-col min-w-full items-center 768:items-start z-0 pt-16">
				<HeroSection />
				<PlayerSection />
				<OpenSourceSection />
			</main>

			<footer className="text-center w-full text-base font-medium pb-16 mt-12 flex flex-col items-center justify-center">
				<Socials
					className="flex flex-row mt-12 space-x-8"
					iconClassName="w-8"
					showTooltips
				/>

				<span className="mt-12 text-subtitle ">
					© Vidstack {new Date().getFullYear()}
				</span>
			</footer>
		</>
	);
};

export default HomePage;
