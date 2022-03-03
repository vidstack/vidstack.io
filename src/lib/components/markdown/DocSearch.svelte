<script>
	import '$styles/docsearch.css';

	// @ts-expect-error - no types.
	import docsearch from '@docsearch/js';

	import clsx from 'clsx';
	import { onMount } from 'svelte';
	import DocSearchSkeleton from './DocSearchSkeleton.svelte';

	let container;
	let mounted = false;

	onMount(() => {
		docsearch({
			container,
			placeholder: 'Search documentation',
			appId: 'JV3QY1UI79',
			indexName: 'vidstack',
			apiKey: '02e4cd4273f4f6762d8f8d71a32d53d6'
			// Testing
			// appId: 'R2IYF7ETH7',
			// apiKey: '599cec31baffa4868cae4e79f180729b',
			// indexName: 'docsearch'
		});

		mounted = true;
		return () => {
			mounted = false;
		};
	});
</script>

<svelte:head>
	<link rel="preconnect" href="https://JV3QY1UI79-dsn.algolia.net" crossorigin="" />
</svelte:head>

<div class="contents" bind:this={container} />

<div class={clsx(mounted ? 'hidden' : 'contents')}>
	<DocSearchSkeleton />
</div>
