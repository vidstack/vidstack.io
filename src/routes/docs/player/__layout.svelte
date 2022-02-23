<script lang="ts">
	import DocsSidebar from '$components/layout/sidebar/DocsSidebar.svelte';
	import { activeMarkdownCategory } from '$stores/markdownMeta';
	import categories from '~nav/docs/**/*md?baseUrl=/docs/player';
</script>

<DocsSidebar {categories}>
	<div class="prose z-10 mx-auto w-full max-w-[768px] dark:prose-invert">
		<p class="mb-3.5 text-[15px] font-semibold leading-6 text-brand">
			{$activeMarkdownCategory}
		</p>

		<slot />
	</div>
</DocsSidebar>
