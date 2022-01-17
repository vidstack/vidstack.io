import type { NextPage } from 'next';
import Head from 'next/head';

import Button from '$base/Button';
import Navbar from '$components/navbar/Navbar';

const NotFoundPage: NextPage = () => {
	return (
		<>
			<Head>
				<title>404 | Vidstack</title>
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

			<main className="flex flex-col min-w-full items-center z-0 pt-16 px-4">
				<svg
					viewBox="0 0 438 243"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					aria-hidden="true"
					role="img"
					className="768:mt-10 dark:text-gray-100 w-full max-w-sm"
				>
					<path
						d="M373.532 73.7656L324.078 142.29L402.946 173.159V73.7656H373.532Z"
						fill="url(#paint0_linear_1494_9234)"
					/>
					<path
						d="M323.588 145.385L300.298 177.573L300.297 197.113H372.688L402.675 176.009L323.588 145.385Z"
						fill="url(#paint1_linear_1494_9234)"
					/>
					<path
						d="M382.071 233.629L382.07 194.129L401.967 180.344L429.68 180.345V196.758H401.967V233.629H382.071Z"
						fill="url(#paint2_linear_1494_9234)"
					/>
					<path
						d="M321.238 142.779L405.465 175.218M405.789 175.471L370.348 200"
						stroke="currentColor"
						strokeWidth="7"
					/>
					<path
						d="M378.678 237.029V199.931L297.652 199.706V176.324L372.826 70.6523H405.011V177.448H432.92V199.931H405.011V237.029H378.678Z"
						stroke="currentColor"
						strokeWidth="10"
					/>
					<path
						d="M224.531 111.141V11.5047C256.44 -0.11624 291.201 25.4711 294.464 55.4414C297.977 87.7171 282.231 115.483 271.512 129.808L224.531 111.141Z"
						fill="url(#paint3_linear_1494_9234)"
					/>
					<path
						d="M222.589 10.9512V112.013L167.994 139.529C152.941 118.028 156.711 84.295 173.297 55.2431C181.058 41.6497 200.677 16.1103 222.589 10.9512Z"
						fill="url(#paint4_linear_1494_9234)"
					/>
					<path
						d="M223.538 113.578L169.184 142.09C179.865 154.14 198.789 166.368 220.947 163.188C244.14 159.86 260.677 144.051 269.325 131.697L223.538 113.578Z"
						fill="url(#paint5_linear_1494_9234)"
					/>
					<path
						d="M166.27 142.162L223.5 112.233L273.953 131.578M223.489 8.25977V112.114"
						stroke="currentColor"
						strokeWidth="7"
					/>
					<path
						d="M185.407 157.944C176.433 152.763 169.565 146.27 164.802 138.465C160.166 130.733 157.444 122.167 156.635 112.769C155.826 103.37 156.702 93.68 159.263 83.6989C161.896 73.5914 166.022 63.6716 171.641 53.9395C177.26 44.2074 183.751 35.7372 191.115 28.5291C198.551 21.1946 206.542 15.5279 215.086 11.5291C223.63 7.53035 232.409 5.60534 241.423 5.7541C250.564 5.97582 259.621 8.67719 268.595 13.8582C277.569 19.0392 284.373 25.4958 289.009 33.2281C293.772 41.0333 296.557 49.6352 297.366 59.0339C298.175 68.4326 297.263 78.1857 294.629 88.2932C292.069 98.2743 287.979 108.131 282.36 117.863C276.741 127.595 270.214 136.128 262.777 143.463C255.414 150.671 247.46 156.275 238.916 160.273C230.372 164.272 221.529 166.161 212.389 165.939C203.374 165.79 194.38 163.125 185.407 157.944Z"
						stroke="currentColor"
						strokeWidth="10"
					/>
					<path
						d="M110.064 165.957L50.6875 196.766H89.0393V233.7H110.064V196.766H138.131V179.777H110.064V165.957Z"
						fill="url(#paint6_linear_1494_9234)"
					/>
					<path
						d="M48.0781 193.79V121.834L82.099 73.8027L109.132 73.8033V162.783L48.0781 193.79Z"
						fill="url(#paint7_linear_1494_9234)"
					/>
					<path
						d="M44.0954 196.765L44.0953 126.756L8.05469 178.875L8.05476 196.765H44.0954Z"
						fill="url(#paint8_linear_1494_9234)"
					/>
					<path
						d="M45.875 197.604L112.874 163.123M45.9219 199.956L45.9219 118.443"
						stroke="currentColor"
						strokeWidth="7"
					/>
					<path
						d="M86.1034 237.031V199.933L5.07812 199.708V176.326L80.2516 70.6543H112.437V177.45H140.345V199.933H112.437V237.031H86.1034Z"
						stroke="currentColor"
						strokeWidth="10"
					/>
					<defs>
						<linearGradient
							id="paint0_linear_1494_9234"
							x1="314.181"
							y1="143.232"
							x2="371.572"
							y2="87.2644"
							gradientUnits="userSpaceOnUse"
						>
							<stop stopColor="#FF5500" />
							<stop offset="1" stopColor="#FF6E26" />
						</linearGradient>
						<linearGradient
							id="paint1_linear_1494_9234"
							x1="294.125"
							y1="192.666"
							x2="375.187"
							y2="129.751"
							gradientUnits="userSpaceOnUse"
						>
							<stop stopColor="#E51919" />
							<stop offset="1" stopColor="#E93C3C" />
						</linearGradient>
						<linearGradient
							id="paint2_linear_1494_9234"
							x1="433.161"
							y1="219.505"
							x2="382.154"
							y2="191.999"
							gradientUnits="userSpaceOnUse"
						>
							<stop stopColor="#F53D7A" />
							<stop offset="1" stopColor="#F75A8E" />
						</linearGradient>
						<linearGradient
							id="paint3_linear_1494_9234"
							x1="215.693"
							y1="93.3253"
							x2="281.898"
							y2="46.0276"
							gradientUnits="userSpaceOnUse"
						>
							<stop stopColor="#FF5500" />
							<stop offset="1" stopColor="#FF6E26" />
						</linearGradient>
						<linearGradient
							id="paint4_linear_1494_9234"
							x1="227.273"
							y1="105.448"
							x2="146.04"
							y2="81.0239"
							gradientUnits="userSpaceOnUse"
						>
							<stop stopColor="#F53D7A" />
							<stop offset="1" stopColor="#F75A8E" />
						</linearGradient>
						<linearGradient
							id="paint5_linear_1494_9234"
							x1="163.147"
							y1="159.389"
							x2="241.871"
							y2="97.7055"
							gradientUnits="userSpaceOnUse"
						>
							<stop stopColor="#E51919" />
							<stop offset="1" stopColor="#E93C3C" />
						</linearGradient>
						<linearGradient
							id="paint6_linear_1494_9234"
							x1="45.4162"
							y1="227.875"
							x2="133.73"
							y2="183.17"
							gradientUnits="userSpaceOnUse"
						>
							<stop stopColor="#E51919" />
							<stop offset="1" stopColor="#E93C3C" />
						</linearGradient>
						<linearGradient
							id="paint7_linear_1494_9234"
							x1="113.596"
							y1="161.985"
							x2="36.441"
							y2="138.289"
							gradientUnits="userSpaceOnUse"
						>
							<stop stopColor="#F53D7A" />
							<stop offset="1" stopColor="#F75A8E" />
						</linearGradient>
						<linearGradient
							id="paint8_linear_1494_9234"
							x1="3.53208"
							y1="175.685"
							x2="40.0728"
							y2="152.566"
							gradientUnits="userSpaceOnUse"
						>
							<stop stopColor="#FF5500" />
							<stop offset="1" stopColor="#FF6E26" />
						</linearGradient>
					</defs>
				</svg>

				<h1 className="font-bold text-5xl 576:text-6xl tracking-tight mt-16 768:mt-20 text-center">
					Oops, wrong way!
				</h1>

				<Button
					icon="arrow"
					href="/"
					contained
					className="w-52 mt-16 768:mt-20"
				>
					Go Home
				</Button>
			</main>
		</>
	);
};

export default NotFoundPage;
