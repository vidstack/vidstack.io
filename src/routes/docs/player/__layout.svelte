<script lang="ts">
	import DocsSidebar from '$components/layout/sidebar/DocsSidebar.svelte';
	import type { SidebarNav } from '$components/layout/sidebar/Sidebar.svelte';
	import { activeMarkdownCategory } from '$stores/markdownMeta';

	const baseUrl = '/docs/player/';
	const s: Record<string, (slug: string) => string> = {
		gettingStarted: (s) => `${baseUrl}getting-started/${s}`,
		coreConcepts: (s) => `${baseUrl}core-concepts/${s}`,
		providers: (s) => `${baseUrl}providers/${s}`,
		ui: (s) => `${baseUrl}ui/${s}`
	};

	const nav: SidebarNav = {
		'Getting Started': [
			{ title: 'Quickstart', slug: s.gettingStarted('quickstart'), match: true },
			{ title: 'Editor Setup', slug: s.gettingStarted('editor-setup') }
		],
		'Core Concepts': [
			{ title: 'Architecture', slug: s.coreConcepts('architecture') },
			{ title: 'Lifecycle', slug: s.coreConcepts('lifecycle') },
			{ title: 'Events', slug: s.coreConcepts('events') },
			{ title: 'Styling', slug: s.coreConcepts('styling') },
			{ title: 'Skins', slug: s.coreConcepts('skins') },
			{ title: 'Autoplay', slug: s.coreConcepts('autoplay') },
			{ title: 'Fullscreen', slug: s.coreConcepts('fullscreen') },
			{ title: 'Custom Elements', slug: s.coreConcepts('custom-elements') }
		],
		Providers: [
			{ title: 'Audio', slug: s.providers('audio') },
			{ title: 'Video', slug: s.providers('video') },
			{ title: 'HLS', slug: s.providers('hls') }
		],
		UI: [
			{ title: 'Aspect Ratio', slug: s.ui('aspect-ratio') },
			{ title: 'Poster', slug: s.ui('poster') },
			{ title: 'Gesture', slug: s.ui('gesture') },
			{ title: 'Toggle Button', slug: s.ui('toggle-button') },
			{ title: 'Play Button', slug: s.ui('play-button') },
			{ title: 'Mute Button', slug: s.ui('mute-button') },
			{ title: 'Fullscreen Button', slug: s.ui('fullscreen-button') },
			{ title: 'Slider', slug: s.ui('slider') },
			{ title: 'Time Slider', slug: s.ui('time-slider') },
			{ title: 'Volume Slider', slug: s.ui('volume-slider') },
			{ title: 'Time', slug: s.ui('time') }
		]
	};
</script>

<DocsSidebar {nav}>
	<div class="prose z-10 mx-auto w-full max-w-[768px] pb-[50vh] dark:prose-invert">
		<p class="mb-3.5 text-[15px] font-semibold leading-6 text-brand">
			{$activeMarkdownCategory}
		</p>

		<slot />
	</div>
</DocsSidebar>
