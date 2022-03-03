<script lang="ts" context="module">
	import { isString } from '$utils/unit';
	import { kebabToTitleCase } from '$utils/string';

	export type SidebarItem = {
		title: string;
		slug: string;
		experimental?: boolean;
		match?: boolean;
	};

	export type SidebarNav = Record<string, SidebarItem[]>;

	export function isActiveSidebarItem({ match, slug }: SidebarItem, currentPath: string) {
		const isMatch =
			match &&
			(currentPath === slug || (currentPath.startsWith(slug) && currentPath[slug.length] === '/'));

		return match ? isMatch : currentPath === slug;
	}

	function buildItem(
		[slug, options]: [string, Omit<Partial<SidebarItem>, 'slug'>],
		slugFn: (path: string) => string
	): SidebarItem {
		return {
			...options,
			title: options.title ?? kebabToTitleCase(slug),
			slug: slugFn(slug)
		};
	}

	export function toItems(slugFn: (path: string) => string, matchAll = false) {
		return (s: any) => {
			const slug = isString(s) ? s : s[0];
			const options = isString(s) ? {} : s[1];
			options.match = options.match ?? matchAll;
			return buildItem([slug, options], slugFn);
		};
	}
</script>

<script lang="ts">
	import clsx from 'clsx';
	import { createEventDispatcher, onMount } from 'svelte';
	import { page } from '$app/stores';

	import ExperimentalIcon from '~icons/ri/test-tube-fill';
	import CloseIcon from '~icons/ri/close-fill';

	import { ariaBool } from '$utils/aria';
	import { wasEnterKeyPressed } from '$utils/keyboard';
	import { isLargeScreen } from '$stores/isLargeScreen';
	import Overlay from '$components/base/Overlay.svelte';
	import LazyDocSearch from '$components/markdown/LazyDocSearch.svelte';
	import { scrollIntoCenter } from '$utils/scroll';

	const dispatch = createEventDispatcher();

	let sidebar: HTMLElement;

	// Only valid on small screen (<992px).
	export let open = false;

	export let nav: SidebarNav = {};

	function scrollToActiveItem() {
		const allItems = Object.values(nav).flat();
		const activeItem = allItems.find((item) => isActiveSidebarItem(item, $page.url.pathname));
		if (!activeItem) return;
		const activeEl = sidebar.querySelector(`a[href="${activeItem.slug}"]`);
		if (activeEl) {
			scrollIntoCenter(sidebar, activeEl, { behaviour: 'smooth' });
		}
	}

	onMount(() => {
		scrollToActiveItem();
	});
</script>

<aside
	id="main-sidebar"
	class={clsx(
		'fixed inset-0 z-50 w-96 992:w-72 max-w-[85vw] overflow-y-auto bg-gray-50 dark:bg-gray-800',
		'border-r border-gray-divider',
		'transform transition-transform duration-200 ease-out -translate-x-full will-change-transform',
		open && 'translate-x-0',
		'992:top-[4.5rem] 992:pb-[5rem] 1200:top-20 1200:pb-24 992:left-0 992:w-[19.5rem] 992:h-full 992:translate-x-0 992:translate-y-px'
	)}
	role={!$isLargeScreen ? 'dialog' : null}
	aria-modal={ariaBool(!$isLargeScreen)}
	bind:this={sidebar}
>
	<div class="sticky top-0 left-0 flex items-center 992:hidden">
		<div class="flex-1" />
		<button
			class={clsx('p-4 text-gray-soft hover:text-gray-inverse', !open && 'pointer-events-none')}
			on:pointerdown={() => dispatch('close')}
			on:keydown={(e) => wasEnterKeyPressed(e) && dispatch('close', true)}
		>
			<CloseIcon width="24" height="24" />
			<span class="sr-only">Close sidebar</span>
		</button>
	</div>

	<nav class="p-6 pt-0 pl-8">
		<div class="pointer-events-none sticky top-0 -ml-0.5 hidden min-h-[80px] 992:block">
			<div class="h-6 bg-white dark:bg-gray-800" />
			<div class="pointer-events-auto relative bg-white dark:bg-gray-800">
				<LazyDocSearch />
			</div>
			<div class="h-8 bg-gradient-to-b from-white dark:from-gray-800" />
		</div>

		<ul>
			{#each Object.keys(nav) as category (category)}
				{@const items = nav[category]}
				<li class="mt-12 first:mt-0 992:mt-10">
					<h5 class="text-gray-strong mb-8 text-lg font-semibold 992:mb-3">{category}</h5>
					<ul class="space-y-3 border-l border-gray-divider">
						{#each items as item (item.title + item.slug)}
							<li class="first:mt-6">
								<a
									class={clsx(
										'border-l-2 -ml-px pl-4 py-2 992:py-1.5 flex items-center',
										isActiveSidebarItem(item, $page.url.pathname)
											? 'border-brand-200 dark:border-brand font-semibold text-brand'
											: 'border-transparent font-normal hover:border-gray-inverse text-gray-soft hover:text-gray-inverse'
									)}
									href={item.slug}
									sveltekit:prefetch
								>
									{item.title}
									{#if item.experimental}
										<ExperimentalIcon class="ml-1" width="24" height="24" />
									{/if}
								</a>
							</li>
						{/each}
					</ul>
				</li>
			{/each}
		</ul>
	</nav>
</aside>

<div class="z-40 992:hidden">
	<Overlay {open} />
</div>
