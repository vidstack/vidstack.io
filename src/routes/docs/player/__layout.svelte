<script lang="ts">
	import DocsLayout from '$components/layout/DocsLayout.svelte';
	import { toItems, type SidebarNav } from '$components/layout/sidebar/Sidebar.svelte';
	import { activeMarkdownCategory } from '$stores/markdownMeta';

	const baseUrl = '/docs/player/';
	const gettingStarted = (s) => `${baseUrl}getting-started/${s}`;
	const coreConcepts = (s) => `${baseUrl}core-concepts/${s}`;
	const providerElements = (s) => `${baseUrl}elements/providers/${s}`;
	const mediaElements = (s) => `${baseUrl}elements/media/${s}`;
	const uiElements = (s) => `${baseUrl}elements/ui/${s}`;

	const nav: SidebarNav = {
		'Getting Started': [
			['quickstart', { match: true }],
			'editor-setup',
			['react', { title: 'React Integration' }],
			['tailwind', { title: 'Tailwind Plugin' }],
			'foundation',
			'styling'
		].map(toItems(gettingStarted)),
		'Core Concepts': [
			'architecture',
			'lifecycle',
			'events',
			'skins',
			'autoplay',
			'fullscreen',
			'custom-elements'
		].map(toItems(coreConcepts)),
		Providers: ['audio', 'video', ['hls', { title: 'HLS' }]].map(toItems(providerElements, true)),
		Media: ['media-sync', 'media-visibility'].map(toItems(mediaElements, true)),
		UI: [
			'aspect-ratio',
			'poster',
			['gesture', { experimental: true }],
			'toggle-button',
			'play-button',
			'mute-button',
			'fullscreen-button',
			'slider',
			'slider-value-text',
			'slider-video',
			'time-slider',
			'volume-slider',
			'time'
		].map(toItems(uiElements, true))
	};
</script>

<DocsLayout {nav}>
	<div class="markdown prose z-10 dark:prose-invert">
		<p class="mb-3.5 text-[15px] font-semibold leading-6 text-brand">
			{$activeMarkdownCategory}
		</p>

		<slot />
	</div>
</DocsLayout>
