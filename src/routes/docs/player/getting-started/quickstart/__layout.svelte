<script lang="ts">
	import clsx from 'clsx';

	import { goto } from '$app/navigation';
	import { navigating, page } from '$app/stores';
	import Chip from '$components/base/Chip.svelte';
	import Steps from '$components/markdown/Steps.svelte';

	import OptionStep from './_components/_OptionStep.svelte';
	import InstallNpm from './_components/_InstallNPM.md';
	import InstallCdn from './_components/_InstallCDN.md';
	import LibVanilla from './_components/_LibVanilla.md';
	import LibReact from './_components/_LibReact.md';
	import ProviderHls from './_components/_ProviderHls.md';
	import BrowserSupport from './_components/_BrowserSupport.md';
	import ImportAll from './_components/_ImportAll.md';
	import Admonition from '$components/markdown/Admonition.svelte';

	const basePath = '/docs/player/getting-started/quickstart';

	const installOptions = ['NPM', 'CDN'];
	const libOptions = ['Vanilla', 'React'];
	const providerOptions = ['Audio', 'Video', 'HLS'];

	let installMethod = getSelectionFromPath(installOptions) ?? 'NPM';
	let libType = getSelectionFromPath(libOptions) ?? 'Vanilla';
	let providerType = getSelectionFromPath(providerOptions) ?? 'Video';

	let isLibraryTypesDisabled = installMethod === 'CDN';

	$: if ($navigating?.to.pathname === basePath) {
		installMethod = 'NPM';
		libType = 'Vanilla';
		providerType = 'Video';
	}

	$: if (installMethod === 'CDN') {
		libType = 'Vanilla';
		isLibraryTypesDisabled = true;
	} else {
		isLibraryTypesDisabled = false;
	}

	function getSelectionFromPath(values: string[]) {
		for (const value of values) {
			if ($page.url.pathname.includes(`/${value.toLowerCase()}`)) {
				return value;
			}
		}
	}

	function onOptionsChange() {
		const isCDNInstallMethod = installMethod === 'CDN';
		const isVideoProvider = providerType === 'Video';
		const isReact = libType === 'React';
		const isDefault = isVideoProvider && !isReact;

		let installPath = isCDNInstallMethod ? '/cdn' : '';
		let libPath = isReact && !isCDNInstallMethod ? '/react' : '';
		let providerPath = !isCDNInstallMethod && isDefault ? '' : `/${providerType}`;
		let slug = `${basePath}${installPath}${libPath}${providerPath}`.toLowerCase();

		if ($page.url.pathname !== slug) {
			goto(slug, { noscroll: true });
		}
	}
</script>

<h1>Quickstart</h1>

<p>
	This section will get you up and running with the player. You'll find specific instructions below
	depending on the type of installation method (NPM/CDN), library (Vanilla/React), and provider
	(Audio/Video/HLS) you opt to use.
</p>

<BrowserSupport />

<h2 class="mb-8 flex flex-col 992:mb-6 992:flex-row 992:items-center">
	Player Installation
	<div class="mt-4 inline-flex space-x-1.5 text-white dark:text-black 992:ml-2 992:mt-0">
		<Chip class={clsx(installMethod === 'CDN' ? 'bg-lime-600 dark:bg-lime-300' : 'hidden')}>
			{installMethod}
		</Chip>
		<Chip class={clsx(libType === 'Vanilla' ? 'hidden' : 'bg-sky-600 dark:bg-sky-300')}>
			{libType}
		</Chip>
		<Chip class="bg-indigo-600 dark:bg-indigo-300">
			{providerType}
		</Chip>
	</div>
</h2>

<Steps>
	<OptionStep
		title="Select Installation Method"
		options={installOptions}
		bind:value={installMethod}
		on:change={onOptionsChange}
	>
		{#if installMethod === 'NPM'}
			<InstallNpm />
		{:else}
			<InstallCdn />
		{/if}
	</OptionStep>

	{#if !isLibraryTypesDisabled}
		<OptionStep
			title="Select JS Library"
			options={libOptions}
			bind:value={libType}
			on:change={onOptionsChange}
		>
			{#if libType === 'Vanilla'}
				<LibVanilla />
			{:else}
				<LibReact />
			{/if}
		</OptionStep>
	{/if}

	<OptionStep
		title="Select Media Provider"
		options={providerOptions}
		bind:value={providerType}
		on:change={onOptionsChange}
	>
		{#if providerType === 'Audio'}
			<p>
				Embed sound content into documents via the native <code>&lt;audio&gt;</code> element.
			</p>
		{:else if providerType === 'Video'}
			<p>
				Embed video content into documents via the native <code>&lt;video&gt;</code> element.
			</p>
		{:else if providerType === 'HLS'}
			<ProviderHls />
		{/if}
	</OptionStep>

	<slot />
</Steps>

<Admonition type="tip">
	You should remove the <code>controls</code> attribute if you're building a custom UI to avoid clashing
	with the native controls.
</Admonition>

<p>Congratulations, you're done! You should now see the media player rendered on your site.</p>

{#if libType !== 'React'}
	<h2>Importing Everything</h2>
	<ImportAll {installMethod} />
{/if}
