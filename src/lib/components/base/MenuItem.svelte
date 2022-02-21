<script lang="ts">
	import { wasEnterKeyPressed } from '$utils/keyboard';

	import clsx from 'clsx';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let selected = false;

	function onSelect(event: KeyboardEvent) {
		if (wasEnterKeyPressed(event)) {
			event.stopPropagation();
			dispatch('select');
		}
	}
</script>

<li
	class={clsx(
		'flex items-center px-4 py-2 text-sm hover:cursor-pointer transition-colors duraiton-100',
		selected ? 'text-brand' : 'text-gray-300 hover:text-gray-strong focus-visible:text-gray-strong'
	)}
	role="menuitem"
	tabindex="-1"
	on:keydown={onSelect}
	on:pointerdown={() => dispatch('select')}
>
	{#if $$slots.icon}
		<div class="mr-3 h-5 w-5">
			<slot name="icon" />
		</div>
	{/if}

	<slot />
</li>
