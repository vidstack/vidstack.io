<script lang="ts">
	import VanillaIcon from '~icons/ri/cake-3-fill';
	import ReactIcon from '~icons/ri/reactjs-fill';

	import Select from '$components/base/Select.svelte';
	import { jsFramework, type JsFrameworkType } from '$stores/jsFramework';
	import { isApiPath, isReactPath } from '$stores/path';
	import { goto } from '$app/navigation';

	$: value = $isReactPath ? 'React' : 'Vanilla JS';

	function onChange() {
		$jsFramework = value.replace(' JS', '').toLowerCase() as JsFrameworkType;

		const url = new URL(location.href);
		const path = url.pathname;

		if ($jsFramework === 'react') {
			goto($isApiPath ? `${path.replace(/\/api\/?/, '')}/react/api` : `${path}/react`);
		} else {
			goto(path.replace(/\/react/, ''));
		}
	}
</script>

<Select title="Current JS Library" bind:value on:change={onChange}>
	<div slot="before-title" class="mr-1 h-6 w-6" aria-hidden="true">
		{#if $isReactPath}
			<ReactIcon />
		{:else}
			<VanillaIcon />
		{/if}
	</div>

	<option>Vanilla JS</option>
	<option>React</option>
</Select>
