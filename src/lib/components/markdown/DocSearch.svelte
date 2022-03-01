<script>
	import '$styles/docsearch.css';

	// @ts-expect-error - no types.
	import docsearch from '@docsearch/js';

	import { onMount } from 'svelte';

	let container;

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
	});
</script>

<svelte:head>
	<link rel="preconnect" href="https://JV3QY1UI79-dsn.algolia.net" crossorigin="" />
</svelte:head>

<div bind:this={container} />
