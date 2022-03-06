<script lang="ts">
	import { elementTagName } from '$stores/element';
	import { isReactPath } from '$stores/path';
	import { activeMarkdownCategory } from '$stores/markdown';

	export let hash: string | null = null;

	$: categorySegment = $activeMarkdownCategory.toLowerCase();
	$: base = `/docs/player/components/${categorySegment}`;
	$: componentSegment = $elementTagName.replace('vds-', '');
	$: frameworkSegment = $isReactPath ? '/react' : '';
	$: apiUrl = `${base}/${componentSegment}${frameworkSegment}/api${hash ? `#${hash}` : ''}`;
</script>

<a href={apiUrl}><slot /></a>
