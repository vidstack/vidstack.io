<script>
	import Navbar from '$components/layout/navbar/Navbar.svelte';
	import HeroSection from '$components/page/home/HeroSection.svelte';
	import OpenSourceSection from '$components/page/home/OpenSourceSection.svelte';
	import Footer from '$components/layout/Footer.svelte';
	import HowSection from '$components/page/home/HowSection.svelte';
</script>

<svelte:head>
	<title>Vidstack</title>
	<meta name="description" content="Video for frontend developers." />
	<meta name="og:title" content="Vidstack - video for frontend developers." />
	<meta name="twitter:title" content="Vidstack - video for frontend developers." />
</svelte:head>

<Navbar />

<main class="z-0 flex min-w-full flex-col items-center pt-16 768:items-start">
	<HeroSection />
	<HowSection />
	<OpenSourceSection />
</main>

<Footer />
