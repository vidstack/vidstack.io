<script lang="ts">
	import DocsLayout from '$components/layout/DocsLayout.svelte';
	import { toItems } from '$components/layout/sidebar/Sidebar.svelte';
	import { EXPERIMENTAL_TAG_NAMES } from '$stores/element';
	import { activeMarkdownCategory } from '$stores/markdown';
	import { isReactPath } from '$stores/path';
	import { isString } from '$utils/unit';

	const baseUrl = '/docs/player/';
	const ext = () => ($isReactPath ? '/react' : '');
	const slug = (path: string) => `${baseUrl}${path}`;
	const componentsSlug = (path: string) => `${baseUrl}${path}${ext()}`;
	const gettingStarted = (s) => slug(`getting-started/${s}`);
	const coreConcepts = (s) => slug(`core-concepts/${s}`);
	const providers = (s) => componentsSlug(`components/providers/${s}`);
	const media = (s) => componentsSlug(`components/media/${s}`);
	const ui = (s) => componentsSlug(`components/ui/${s}`);

	const markAsExperimental = (s) => {
		const name = isString(s) ? s : s[0];
		if (!EXPERIMENTAL_TAG_NAMES.has(`vds-${name}`)) return s;
		const options = isString(s) ? {} : s[1];
		options.experimental = true;
		return [name, options];
	};

	function buildNav(_) {
		return {
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
			Providers: ['audio', 'video', ['hls', { title: 'HLS' }]]
				.map(markAsExperimental)
				.map(toItems(providers, true)),
			Media: ['media-sync', 'media-visibility'].map(markAsExperimental).map(toItems(media, true)),
			UI: [
				'aspect-ratio',
				'poster',
				'gesture',
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
			]
				.map(markAsExperimental)
				.map(toItems(ui, true))
		};
	}

	$: nav = buildNav($isReactPath);
</script>

<DocsLayout {nav}>
	<div class="markdown prose z-10 dark:prose-invert">
		<p class="mb-3.5 text-[15px] font-semibold leading-6 text-brand">
			{$activeMarkdownCategory}
		</p>

		<slot />
	</div>
</DocsLayout>
