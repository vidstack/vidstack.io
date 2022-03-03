<script context="module">
	import { writable } from 'svelte/store';

	const LOCAL_STORAGE_KEY = 'vidstack::component-import-method';

	const initValue = () => {
		const savedValue = browser && localStorage[LOCAL_STORAGE_KEY];
		return savedValue ? savedValue : 'JS';
	};

	let value = writable(initValue());
</script>

<script lang="ts">
	import Select from '$components/base/Select.svelte';

	import {
		code as jsRawCode,
		hlCode as jsHlsCode
	} from './_snippets/import-component.js?highlight';
	import {
		code as cdnRawCode,
		hlCode as cdnHlCode
	} from './_snippets/import-component.html?highlight';
	import {
		code as reactRawCode,
		hlCode as reactHlCode
	} from './_snippets/import-component.jsx?highlight';
	import CodeFence from './CodeFence.svelte';

	import { browser } from '$app/env';
	import { kebabToPascalCase } from '$utils/string';

	export let tagName: string;
	export let options = ['JS', 'CDN', 'React'];

	let ext = 'js';

	function getCode(value) {
		switch (value) {
			case 'JS':
				ext = 'js';
				return [jsRawCode, jsHlsCode].map((s) => s.replace('{TAG_NAME}', tagName));
			case 'CDN':
				ext = 'html';
				return [cdnRawCode, cdnHlCode].map((s) => s.replace('{TAG_NAME}', tagName));
			case 'React':
				ext = 'jsx';
				return [reactRawCode, reactHlCode].map((s) =>
					s.replace('TagName', kebabToPascalCase(tagName.replace('vds-', '')))
				);
		}
	}

	$: if (browser) {
		localStorage[LOCAL_STORAGE_KEY] = $value;
	}

	$: [rawCode, code] = getCode($value);
</script>

<div class="my-8 flex flex-col">
	<div>
		<Select title="Import Method" {options} bind:value={$value} />
	</div>
	<div class="-mt-4 -mb-8">
		<CodeFence {ext} {code} {rawCode} showCopyCode />
	</div>
</div>
