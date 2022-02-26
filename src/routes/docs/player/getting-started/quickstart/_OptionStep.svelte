<script>
	import clsx from 'clsx';

	import ArrowDropDownIcon from '~icons/ri/arrow-drop-down-fill';

	import Step from '$components/markdown/Step.svelte';

	export let title;
	export let options;
	export let value;
	export let disabled = false;
</script>

<Step orientation="vertical">
	<h3 slot="title">{title}</h3>

	<svelte:fragment slot="description">
		<slot name="description" />
	</svelte:fragment>

	<div class="inline-block shadow-sm">
		<label
			class={clsx(
				'relative flex items-center px-4 py-1 border',
				disabled
					? 'text-gray-300 border-gray-200 dark:border-gray-500'
					: 'text-gray-inverse focus-within:ring-2 border-gray-200 dark:border-gray-400'
			)}
		>
			<span class="sr-only">{title}</span>
			{value}
			<ArrowDropDownIcon width="20" height="20" class="ml-1" />
			<select
				class="absolute inset-0 cursor-pointer appearance-none opacity-0"
				bind:value
				on:change
				{disabled}
			>
				{#each options as value (value)}
					<option {value}>{value}</option>
				{/each}
			</select>
		</label>
	</div>

	<slot />
</Step>
