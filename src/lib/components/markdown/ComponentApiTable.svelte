<script context="module" lang="ts">
	type ComponentApi = {
		properties: {
			name: string;
			description?: string;
			readonly: boolean;
			type: string;
		}[];
		methods: {
			name: string;
			static: boolean;
			description?: string;
			type: string;
		}[];
		events: {
			name: string;
			description?: string;
			type: string;
		}[];
		slots: {
			name: string;
			description?: string;
		}[];
		cssProps: {
			name: string;
			description?: string;
		}[];
		cssParts: {
			name: string;
			description?: string;
		}[];
	};
</script>

<script lang="ts">
	import clsx from 'clsx';
	import ArrowDropDownIcon from '~icons/ri/arrow-drop-down-fill';
	import { ariaBool } from '$utils/aria';
	import { camelToTitleCase } from '$utils/string';
	import { onMount } from 'svelte';

	export let api: ComponentApi;

	let _isOpen = {};
	let _showAll = {};
	let isAllOpen = {};

	const categories = Object.keys(api); // ['properties', 'methods', 'events', ...]
	const noTypes = new Set(['slots', 'cssProps', 'cssParts']);

	function filterHasDesc(category) {
		return category.filter((prop) => prop.description);
	}

	function propToKey(category: string, propName: string) {
		return `${category}--${propName.toLowerCase()}`;
	}

	onMount(() => {
		const hash = new URL(location.href).hash;
		const key = hash.slice(1);
		const category = key.split('--')[0];
		const heading = document.getElementById(category);
		const scroll = document.getElementById(`scroll-container-${category}`);
		const container = document.getElementById(`container-${key}`);

		if (container) {
			_isOpen[key] = true;
			container.scrollIntoView({ block: 'center' });
			scroll.scrollBy(0, container.getBoundingClientRect().height);
		}

		if (heading) {
			heading.scrollIntoView();
		}
	});
</script>

{#each categories as category (category)}
	{@const showAll = _showAll[category]}
	{@const hasTypes = !noTypes.has(category)}
	{@const hasReadonly = category === 'properties'}

	{#if filterHasDesc(api[category]).length > 0}
		<section>
			<h2 id={category}>
				<a class="header-anchor" href={`#${category}`} aria-hidden="true">#</a>
				{camelToTitleCase(category).replace('Css', 'CSS')}
			</h2>

			<div
				id={`scroll-container-${category}`}
				class={clsx(
					'flex flex-col border border-gray-divider relative',
					'overflow-auto scrollbar:!w-1.5 scrollbar:!h-1.5 scrollbar:bg-transparent',
					'scrollbar-track:!bg-gray-divider scrollbar-thumb:!rounded scrollbar-thumb:!bg-gray-300',
					'scrollbar-track:!rounded mt-[2em]',
					!showAll && 'max-h-[390px]'
				)}
			>
				{#each filterHasDesc(api[category]) as prop (prop)}
					{@const key = propToKey(category, prop.name)}
					{@const isOpen = _isOpen[key]}

					<div
						id={`container-${key}`}
						class="flex flex-col border-t border-gray-divider first:border-0"
					>
						<div
							class="not-prose relative w-full border-b border-gray-divider hover:bg-[#fafafa] dark:hover:bg-[#343434]"
						>
							<h3 class="text-sm font-medium text-gray-inverse">
								<button
									id={`accordion-btn-${key}`}
									class="h-full w-full py-2 px-2.5 text-left"
									aria-controls={`accordion-${key}`}
									aria-expanded={ariaBool(isOpen)}
									on:click={() => {
										_isOpen[key] = !_isOpen[key];
										location.hash = key;
									}}
								>
									<code>{prop.name}</code>

									{#if hasReadonly && prop.readonly}
										<span
											class="ml-1.5 rounded-md bg-gray-200 py-px px-2 font-mono text-xs dark:bg-gray-600"
										>
											readonly
										</span>
									{/if}
								</button>
							</h3>
							<ArrowDropDownIcon
								class={clsx(
									'absolute top-2 right-2 transform transition-transform duration-150',
									isOpen && 'rotate-180'
								)}
								width="20"
								height="20"
								role="none"
							/>
						</div>

						<div
							id={`accordion-${key}`}
							aria-labelledby={`accordion-btn-${key}`}
							class={clsx(!isOpen && 'hidden', 'p-4 pb-0 prose dark:prose-invert')}
						>
							{#if hasTypes}
								<div class="flex pt-2 font-mono text-sm">
									<span>
										Type:
										<code class="-ml-1 text-indigo-500 dark:text-indigo-300">{prop.type}</code>
									</span>
								</div>
							{/if}

							<div class={clsx('pb-3 text-sm', hasTypes && 'mt-6')}>
								{@html prop.description}
							</div>
						</div>
					</div>
				{/each}
			</div>

			{#if filterHasDesc(api[category]).length > 3}
				<div class="mt-4 flex items-center justify-end text-sm text-gray-soft">
					<button
						class="rounded-sm px-2.5 py-1 font-medium hover:text-gray-inverse"
						aria-checked={ariaBool(isAllOpen[category])}
						on:click={() => {
							isAllOpen[category] = !isAllOpen[category];

							for (const prop of api[category]) {
								const key = propToKey(category, prop.name);
								_isOpen[key] = isAllOpen[category];
							}
						}}
					>
						{!isAllOpen[category] ? 'Open All' : 'Close All'}
					</button>

					{#if isAllOpen[category] || filterHasDesc(api[category]).length > 10}
						<button
							class="rounded-sm px-2.5 py-1 font-medium hover:text-gray-inverse"
							aria-checked={ariaBool(showAll)}
							on:click={() => {
								_showAll[category] = !_showAll[category];
							}}
						>
							{showAll ? 'Show Less' : 'Show All'}
						</button>
					{/if}
				</div>
			{/if}
		</section>
	{/if}
{/each}
