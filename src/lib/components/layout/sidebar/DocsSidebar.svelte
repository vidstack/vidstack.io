<script lang="ts">
	import MenuUnfoldIcon from '~icons/ri/menu-unfold-fill';
	import RightArrowIcon from '~icons/ri/arrow-right-s-line';

	import StickyNavbar from '../navbar/StickyNavbar.svelte';
	import Sidebar, { type SidebarCategories } from '../sidebar/Sidebar.svelte';

	import { ariaBool } from '$utils/aria';
	import { type CloseDialogCallback, dialogManager } from '$actions/dialogManager';
	import { page } from '$app/stores';
	import { activeMarkdownCategory } from '$stores/markdownMeta';
	import { hideDocumentScrollbar } from '$utils/scroll';

	let isSidebarOpen = false;
	let closeSidebar: CloseDialogCallback;

	export let categories: SidebarCategories = [];

	$: activeItem = categories
		.map(({ items }) => items)
		.flat()
		.find((item) => $page.url.pathname === item.slug);

	$: activeCategory = categories.find(({ items }) => items.includes(activeItem))?.category;

	$: $activeMarkdownCategory = activeCategory ?? '';
</script>

<StickyNavbar>
	<svelte:fragment slot="left">
		<slot name="navbar-left" />
	</svelte:fragment>

	<div
		class="mt-4 flex w-full items-center border-t border-gray-200 pt-4 dark:border-gray-500 992:hidden"
		slot="bottom"
	>
		<button
			id="main-sidebar-button"
			type="button"
			class="text-gray-soft -ml-3 inline-flex justify-center rounded-md px-4 py-2 text-sm font-medium hover:text-gray-inverse"
			aria-controls="main-sidebar"
			aria-expanded={ariaBool(isSidebarOpen)}
			aria-haspopup="true"
			use:dialogManager={{
				closeOnSelectSelectors: ['a'],
				onOpen: () => {
					isSidebarOpen = true;
					hideDocumentScrollbar(true);
				},
				onClose: () => {
					isSidebarOpen = false;
					hideDocumentScrollbar(false);
				},
				close: (cb) => {
					closeSidebar = cb;
				}
			}}
		>
			<span class="sr-only">Open main sidebar</span>
			<MenuUnfoldIcon width="28" height="28" />
		</button>

		<ol class="text-md text-gray-soft mt-px ml-1 flex items-center whitespace-nowrap leading-6">
			<li class="flex items-center">
				{activeCategory}
				<RightArrowIcon class="mx-1" width="16" height="16" />
			</li>
			<li class="truncate font-semibold text-slate-900 dark:text-slate-200">
				{activeItem.title}
			</li>
		</ol>
	</div>
</StickyNavbar>

<main class="max-w-8xl z-20 mx-auto">
	<Sidebar open={isSidebarOpen} on:close={(e) => closeSidebar(e.detail)} {categories} />

	<div class="px-4 576:px-6 768:px-8 992:pl-[21rem]">
		<div class="relative mx-auto mt-[13rem] max-w-3xl 992:mt-32 1200:max-w-none">
			<slot />
		</div>
	</div>
</main>
