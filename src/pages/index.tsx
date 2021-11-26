import type { NextPage } from 'next';
import Head from 'next/head';

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
		</>
	);
};

export default Home;
