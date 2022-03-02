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

	export let api: ComponentApi;

	let _isOpen = {};
	let _showAll = {};
	let isAllOpen = {};

	const noTypes = new Set(['slots', 'cssProps', 'cssParts']);

	function filterHasDesc(parts) {
		return parts.filter((prop) => prop.description);
	}
</script>

{#each Object.keys(api) as part (part)}
	{@const showAll = _showAll[part]}
	{@const hasTypes = !noTypes.has(part)}
	{@const hasReadonly = part === 'properties'}

	{#if filterHasDesc(api[part]).length > 0}
		<section>
			<h2>{camelToTitleCase(part).replace('Css', 'CSS')}</h2>

			<div
				class={clsx(
					'flex flex-col border border-gray-divider',
					'overflow-auto scrollbar:!w-1.5 scrollbar:!h-1.5 scrollbar:bg-transparent',
					'scrollbar-track:!bg-gray-divider scrollbar-thumb:!rounded scrollbar-thumb:!bg-gray-300',
					'scrollbar-track:!rounded mt-[2em]',
					!showAll && 'max-h-[390px]'
				)}
			>
				{#each filterHasDesc(api[part]) as prop (prop)}
					{@const key = part + '-' + prop.name}
					{@const isOpen = _isOpen[key]}

					<div class="flex flex-col border-t border-gray-divider first:border-0">
						<div
							class="not-prose relative w-full border-b border-gray-divider hover:bg-[#fafafa] dark:hover:bg-[#343434]"
						>
							<h3 class="text-sm font-medium text-gray-inverse">
								<button
									id={`accordion-btn-${key}`}
									class="h-full w-full py-2 px-2.5 text-left "
									aria-controls={`accordion-${key}`}
									aria-expanded={ariaBool(isOpen)}
									on:click={() => {
										_isOpen[key] = !_isOpen[key];
									}}
								>
									<code>{prop.name}</code>
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
								<div class="flex space-x-4 pt-2 font-mono text-sm">
									<span>
										Type:
										<code class="-ml-1 text-indigo-500 dark:text-indigo-300">{prop.type}</code>
									</span>

									{#if hasReadonly}
										<span>
											Readonly:
											<code class="-ml-1 text-indigo-500 dark:text-indigo-300">
												{prop.readonly ? 'true' : 'false'}
											</code>
										</span>
									{/if}
								</div>
							{/if}

							<div class={clsx('pb-3 text-sm', hasTypes && 'mt-6')}>
								{@html prop.description}
							</div>
						</div>
					</div>
				{/each}
			</div>

			{#if filterHasDesc(api[part]).length > 3}
				<div class="mt-4 flex items-center justify-end text-sm text-gray-soft">
					<button
						class="rounded-sm px-2.5 py-1 font-medium hover:text-gray-inverse"
						aria-checked={ariaBool(isAllOpen[part])}
						on:click={() => {
							isAllOpen[part] = !isAllOpen[part];

							for (const prop of api[part]) {
								const key = part + '-' + prop.name;
								_isOpen[key] = isAllOpen[part];
							}
						}}
					>
						{!isAllOpen[part] ? 'Open All' : 'Close All'}
					</button>

					{#if isAllOpen[part] || filterHasDesc(api[part]).length > 10}
						<button
							class="rounded-sm px-2.5 py-1 font-medium hover:text-gray-inverse"
							aria-checked={ariaBool(showAll)}
							on:click={() => {
								_showAll[part] = !_showAll[part];
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
