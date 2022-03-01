<script lang="ts">
	import DocsLayout from '$components/layout/DocsLayout.svelte';
	import type { SidebarNav } from '$components/layout/sidebar/Sidebar.svelte';
	import { activeMarkdownCategory } from '$stores/markdownMeta';

	const baseUrl = '/docs/player/';
	const start = (s) => `${baseUrl}getting-started/${s}`;
	const core = (s) => `${baseUrl}core-concepts/${s}`;
	const providers = (s) => `${baseUrl}providers/${s}`;
	const ui = (s) => `${baseUrl}ui/${s}`;

	const item = (title, slug, options = {}) => ({ title, slug, ...options });

	const nav: SidebarNav = {
		'Getting Started': [
			item('Quickstart', start('quickstart'), { match: true }),
			item('Editor Setup', start('editor-setup')),
			item('React Integration', start('react')),
			item('Tailwind Plugin', start('tailwind')),
			item('Foundation', start('foundation')),
			item('Styling', start('styling'))
		],
		'Core Concepts': [
			item('Architecture', core('architecture')),
			item('Lifecycle', core('lifecycle')),
			item('Events', core('events')),
			item('Skins', core('skins')),
			item('Autoplay', core('autoplay')),
			item('Fullscreen', core('fullscreen')),
			item('Custom Elements', core('custom-elements'))
		],
		Providers: [
			item('Audio', providers('audio')),
			item('Video', providers('video')),
			item('HLS', providers('hls'))
		],
		UI: [
			item('Aspect Ratio', ui('aspect-ratio')),
			item('Poster', ui('poster')),
			item('Gesture', ui('gesture')),
			item('Toggle Button', ui('toggle-button')),
			item('Play Button', ui('play-button')),
			item('Mute Button', ui('mute-button')),
			item('Fullscreen Button', ui('fullscreen-button')),
			item('Slider', ui('slider')),
			item('Time Slider', ui('time-slider')),
			item('Volume Slider', ui('volume-slider')),
			item('Time', ui('time'))
		]
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
