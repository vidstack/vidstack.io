<script>
	import { elementTagName, isElementExperimental } from '$stores/element';
	import { isApiPath } from '$stores/path';

	import CodeInline from '$components/markdown/CodeInline.svelte';
	import ExperimentalWarning from '$components/markdown/ExperimentalWarning.svelte';

	import ComponentHeading from './_components/_ComponentHeading.svelte';
	import ComponentImport from './_components/_ComponentImport.svelte';
	import ComponentTabbedLinks from './_components/_ComponentTabbedLinks.svelte';
	import FrameworkSelect from './_components/_FrameworkSelect.svelte';
</script>

<ComponentHeading />
<FrameworkSelect />
<ComponentTabbedLinks />

{#if $isElementExperimental}
	<ExperimentalWarning />
{/if}

{#if !$isApiPath}
	<div>
		<h2>Import</h2>
		<p>
			You can import the <CodeInline code={`<${$elementTagName}>`} /> component like so:
		</p>
		<ComponentImport />
	</div>
{/if}

<slot />
