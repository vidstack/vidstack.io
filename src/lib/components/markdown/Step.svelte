<script>
	import clsx from 'clsx';
	import { getStepsContext } from '../markdown/Steps.svelte';

	const { steps, register } = getStepsContext();

	const index = register();
</script>

<li
	class={clsx(
		'step relative pl-10 1200:grid grid-cols-5 gap-16 before:content-[counter(step)] before:absolute',
		'before:left-0 before:flex before:items-center before:justify-center before:w-[calc(1.375rem+1px)]',
		'before:h-[calc(1.375rem+1px)] before:text-[0.7rem] before:font-bold before:text-white dark:before:text-black',
		'before:rounded-md before:shadow-md before:bg before:bg-gray-inverse before:border before:border-gray-soft',
		index !== $steps &&
			'pb-8 after:absolute after:top-[calc(1.875rem+1px)] after:bottom-0 after:left-[0.6875rem] after:w-px after:bg-gray-200 dark:after:bg-gray-500'
	)}
	style="counter-increment: step;"
>
	<div class="col-span-2 mb-6 1200:mb-2">
		<span class="mb-2 text-gray-soft">
			<slot name="title" />
		</span>

		<div class="text-sm">
			<slot name="description" />
		</div>
	</div>

	<div class="col-span-3">
		<slot />
	</div>
</li>
