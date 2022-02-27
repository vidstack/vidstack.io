<script lang="ts">
	import { isUndefined } from '$utils/unit';

	import clsx from 'clsx';

	export let type: 'flat' | 'raised' = 'flat';
	export let arrow: 'left' | 'right' | null = null;

	let __as: 'button' | 'a' = 'button';
	export { __as as as };

	let __class = '';
	export { __class as class };

	$: buttonClass = clsx(
		'group transform-gpu rounded-md text-lg font-medium transition-transform hover:scale-105',
		type === 'raised' &&
			'bg-gray-900 hover:bg-gray-500 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-200 text-whit shadow-md hover:shadow-xl px-8 py-3 ',
		__class
	);

	$: contentClass = clsx(
		'inline-block transform transition-transform duration-100 group-hover:translate-x-0',
		arrow === 'left' && '-translate-x-3 ',
		arrow === 'right' && 'translate-x-2'
	);

	$: arrowClass = clsx(
		arrow &&
			'opacity-0 transition-opacity duration-100 group-hover:visible group-hover:opacity-100',
		!arrow ? 'hidden' : 'inline-block'
	);
</script>

{#if __as === 'button' && isUndefined($$restProps['href'])}
	<button class={buttonClass} {...$$restProps}>
		{#if arrow === 'left'}
			<span class={arrowClass}>&lt;-</span>
		{/if}
		<span class={contentClass}><slot /></span>
		{#if arrow === 'right'}
			<span class={arrowClass}>-></span>
		{/if}
	</button>
{:else}
	<!-- svelte-ignore a11y-missing-attribute -->
	<a class={buttonClass} {...$$restProps}>
		{#if arrow === 'left'}
			<span class={arrowClass}>&lt;-</span>
		{/if}
		<span class={contentClass}><slot /></span>
		{#if arrow === 'right'}
			<span class={arrowClass}>-></span>
		{/if}
	</a>
{/if}
