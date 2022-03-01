<script>
	import '$styles/docsearch.css';

	// @ts-expect-error - no types.
	import docsearch from '@docsearch/js';
	import clsx from 'clsx';

	import { onMount } from 'svelte';

	let container;
	let mounted = false;

	onMount(() => {
		docsearch({
			container,
			placeholder: 'Search documentation',
			appId: 'JV3QY1UI79',
			indexName: 'player',
			apiKey: '02e4cd4273f4f6762d8f8d71a32d53d6'
			// Testing
			// appId: 'R2IYF7ETH7',
			// apiKey: '599cec31baffa4868cae4e79f180729b',
			// indexName: 'docsearch'
		});

		mounted = true;
	});
</script>

<svelte:head>
	<link rel="preconnect" href="https://JV3QY1UI79-dsn.algolia.net" crossorigin="" />
</svelte:head>

<div bind:this={container} />

<!-- For SSR to prevent sidebar jumping on initial render. -->
<div
	class={clsx(
		mounted ? 'hidden' : 'flex',
		'w-full items-center rounded-sm py-2.5 px-3 shadow-sm dark:bg-[#2d2d2d] text-[15px]',
		'border border-gray-divider'
	)}
>
	<span class="flex-1">Search</span>
	<span class="flex space-x-0.5 font-semibold">
		<span>⌘</span>
		<span>K</span>
	</span>
</div>
