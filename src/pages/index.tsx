import type { NextPage } from 'next';
import Head from 'next/head';

import HomeHero from '$components/home/HomeHero';
import Navbar from '$components/navbar/Navbar';

const Home: NextPage = () => {
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

			<main className="flex flex-col min-w-full px-4 items-center 768:items-start 768:px-8 992:px-14">
				<HomeHero />
			</main>
		</>
	);
};

export default Home;
