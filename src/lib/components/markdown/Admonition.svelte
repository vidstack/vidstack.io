<script lang="ts">
	import clsx from 'clsx';
	import NoteIcon from '~icons/ri/pencil-fill';
	import InfoIcon from '~icons/ri/information-fill';
	import TipIcon from '~icons/ri/lightbulb-flash-fill';
	import WarningIcon from '~icons/ri/error-warning-fill';
	import DangerIcon from '~icons/ri/skull-2-fill';

	export let type: 'note' | 'info' | 'tip' | 'warning' | 'danger';
	export let title: string | null = null;

	const icons = {
		note: NoteIcon,
		info: InfoIcon,
		tip: TipIcon,
		warning: WarningIcon,
		danger: DangerIcon
	};

	$: heading = title ?? type.toUpperCase();
</script>

<div
	class={clsx(
		'admonition my-4 border-2 border-gray-100 border-l-8 px-2 py-4 rounded-md max-w-lg',
		type === 'note' && 'border-l-pink-400',
		type === 'info' && 'border-l-blue-400',
		type === 'tip' && 'border-l-green-400',
		type === 'warning' && 'border-l-yellow-400',
		type === 'danger' && 'border-l-red-400'
	)}
>
	<div class="flex h-full items-center font-bold">
		<svelte:component this={icons[type]} class="mr-1.5 text-xl" />
		<span class="flex items-center">
			{heading}
		</span>
	</div>

	<slot />
</div>
