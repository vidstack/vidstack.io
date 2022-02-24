<script lang="ts">
	import '$styles/markdown.css';

	import { page } from '$app/stores';
	import socialCardLarge from '$img/brand/social-card-large.jpg';
	import { activeMarkdownCategory, markdownMeta } from '$stores/markdownMeta';

	$: categoryPrefix = $activeMarkdownCategory ? `${$activeMarkdownCategory}: ` : '';
</script>

<svelte:head>
	<title>{categoryPrefix}{$markdownMeta?.title ?? ''} | Vidstack</title>
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content="@vidstackjs" />
	<meta name="twitter:description" content={$markdownMeta?.description ?? ''} />
	<meta name="twitter:image" content={`https://vidstack.io${socialCardLarge}`} />
	<meta name="twitter:creator" content="@vidstackjs" />
	<meta property="og:url" content={`https://vidstack.io${$page.url.pathname}`} />
	<meta property="og:type" content="article" />
	<meta property="og:description" content={$markdownMeta?.description ?? ''} />
	<meta property="og:image" content={`https://vidstack.io${socialCardLarge}`} />
</svelte:head>

<slot />
