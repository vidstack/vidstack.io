<script lang="ts">
	import { isUndefined } from '$utils/unit';

	import clsx from 'clsx';

	let __as: 'button' | 'a' = 'button';
	export { __as as as };

	let __class = '';
	export { __class as class };

	export let showArrowOnHover = false;

	$: buttonClass = clsx(
		'group transform-gpu rounded-md bg-brand bg-gray-900 px-8 py-3 text-lg font-medium text-white',
		'transition-transform hover:scale-105 hover:bg-gray-500 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-200',
		'shadow-md hover:shadow-xl',
		__class
	);

	$: contentClass = showArrowOnHover
		? 'inline-block translate-x-2 transform transition-transform duration-100 group-hover:translate-x-0'
		: 'inline-block';

	$: arrowClass = showArrowOnHover
		? 'opacity-0 transition-opacity duration-100 group-hover:visible group-hover:opacity-100'
		: 'hidden';
</script>

{#if __as === 'button' && isUndefined($$restProps['href'])}
	<button class={buttonClass} {...$$restProps}>
		<span class={contentClass}><slot /></span>
		<span class={arrowClass}>-></span>
	</button>
{:else}
	<!-- svelte-ignore a11y-missing-attribute -->
	<a class={buttonClass} {...$$restProps}>
		<span class={contentClass}><slot /></span>
		<span class={arrowClass}>-></span>
	</a>
{/if}
