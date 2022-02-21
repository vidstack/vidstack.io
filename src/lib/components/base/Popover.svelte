<script context="module">
	let idCount = 0;
</script>

<script lang="ts">
	import clsx from 'clsx';
	import Transition from 'svelte-class-transition';

	import CloseIcon from '~icons/ri/close-fill';

	import { ariaBool } from '$utils/aria';
	import { wasEnterKeyPressed } from '$utils/keyboard';
	import { dialogManager, type CloseDialogCallback } from '$actions/dialogManager';
	import { mediaQuery } from '$stores/mediaQuery';

	export let open = false;
	export let overlay = false;

	let popoverId = `popover-${(idCount += 1)}`;
	let popoverButtonId = `popover-button-${idCount}`;

	let closeDialog: CloseDialogCallback;

	const isLargeScreen = mediaQuery('(min-width: 992px)');

	function onOpenPopover() {
		open = true;
		hideMainScrollbar(true);
	}

	function onClosePopover() {
		open = false;
		hideMainScrollbar(false);
	}

	function hideMainScrollbar(hidden: boolean) {
		window.requestAnimationFrame(() => {
			document.documentElement.classList[hidden ? 'add' : 'remove']('overflow-hidden');
		});
	}

	$: if ($isLargeScreen) {
		closeDialog?.();
		hideMainScrollbar(false);
	}
</script>

<div class="inline-block text-left">
	<button
		id={popoverButtonId}
		type="button"
		class={clsx(
			'inline-flex w-full justify-center rounded-md px-4 py-2 text-sm font-medium ',
			open ? 'text-gray-strong' : 'text-gray-300 hover:text-gray-strong'
		)}
		aria-controls={popoverId}
		aria-expanded={ariaBool(open)}
		aria-haspopup="true"
		use:dialogManager={{
			onOpen: onOpenPopover,
			onClose: onClosePopover,
			close: (cb) => {
				closeDialog = cb;
			}
		}}
	>
		<slot name="button" />
	</button>

	{#if overlay}
		<div
			class={clsx(
				'fixed inset-0 bg-gray-600 bg-opacity-50 transition-opacity duration-75 pointer-events-auto z-40',
				open ? 'opacity-100 visible' : 'opacity-0 invisible'
			)}
		/>
	{/if}

	<Transition
		toggle={open}
		transitions="transition transform"
		inTransition="ease-out duration-150"
		inState="opacity-0 scale-95"
		onState="opacity-100 scale-100"
		outTransition="ease-out duration-100"
	>
		<div
			id={popoverId}
			class={clsx(
				'absolute top-0 right-0 w-full p-5 pt-4 origin-top-right z-50',
				!open && 'invisible'
			)}
			tabindex="-1"
			role="dialog"
		>
			<div
				class="flex min-h-[60px] flex-col overflow-hidden rounded-md border border-gray-200 bg-white shadow-md dark:border-gray-500 dark:bg-gray-600"
			>
				<div class="flex items-center">
					<div class="flex-1" />
					<button
						class={clsx('p-4 text-gray-300 hover:text-gray-strong', !open && 'pointer-events-none')}
						on:pointerdown={() => closeDialog()}
						on:keydown={(e) => wasEnterKeyPressed(e) && closeDialog(true)}
					>
						<CloseIcon width="24" height="24" />
						<span class="sr-only">Close popover</span>
					</button>
				</div>

				<div class="p-4 pt-0">
					<slot />
				</div>
			</div>
		</div>
	</Transition>
</div>
