<script lang="ts">
	import clsx from 'clsx';

	import { goto } from '$app/navigation';
	import { navigating, page } from '$app/stores';
	import Chip from '$components/base/Chip.svelte';
	import Steps from '$components/markdown/Steps.svelte';
	import Step from './_Step.svelte';
	import BrowserSupport from './_BrowserSupport.svelte';

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
	<Step
		title="Select Installation Method"
		options={installOptions}
		bind:value={installMethod}
		on:change={onOptionsChange}
	>
		{#if installMethod === 'NPM'}
			<p>
				Locally installing the package is best when you're integrating the library with build tools
				such as Webpack, Rollup, Vite, or Parcel. If possible, we recommend this option over using a
				CDN because:
			</p>

			<ul class="not-prose ml-4 flex list-disc flex-col space-y-2">
				<li>
					It provides the greatest control over the library. If you're looking to build your own
					player elements or modify certain library functionality, then this is the path of least
					resistance.
				</li>
				<li>
					It provides the optimal development experience working with the library because your IDE
					can provide you with type/value validation and documentation. We also ship a helpful
					integration for VSCode so you can get autocomplete suggestions for our custom elements
					when writing HTML.
				</li>
				<li>
					It leads to less duplication of code as dependencies of this library (e.g, Lit) will be
					bundled only once. If you're using a CDN, any dependencies that are used both in your
					application and the player library will be loaded twice.
				</li>
				<li>
					Reduces the final bundle size as your bundler can perform tree-shaking through static
					analysis to eliminate dead-code (i.e., unused imports). We've marked side-effect files in
					the library to improve this process further.
				</li>
				<li>
					Reduces the number of HTTP requests and round-trips required to load the player.
					Ultimately, speeding up the time it takes for the player to load because your bundler can
					optimize the loading and evaluating time of JavaScript by grouping code into chunks.
				</li>
				<li>
					You can take advantage of dynamic imports to determine when the browser loads the player
					code. You don't want the loading of player-related code to block your users from
					interacting with your application.
				</li>
			</ul>
		{:else}
			<p>
				Using a CDN like <a href="https://jsdelivr.com" target="_blank">JSDelivr</a> is the simplest
				and fastest way to get started using the player library, but as with all things in software,
				it comes with tradeoffs. So you can best decide what install method is best for you, we'll quickly
				look at some good reasons to use a CDN. Refer to the NPM option to find good counter reasons
				using the select menu above.
			</p>

			<ul class="not-prose ml-4 flex list-disc flex-col space-y-2">
				<li>
					It's simple. There's no build step or anything to install. Add a few script tags, and
					you're ready to start creating a player, making this an ideal option for development,
					playground, and low-code environments (e.g., WordPress and Shopify).
				</li>
				<li>
					If you aren't importing from the library or building any custom elements, there may be no
					point in checking it into Git. It's one less dependency to track, version control, and
					load in your Git repository. Refer to the NPM install option to find good reasons why you
					should still bundle it locally (if possible).
				</li>
				<li>
					You'll get much faster load times because JSDelivr uses a
					<a href="https://www.jsdelivr.com/network/infographic" target="_blank">
						multi-CDN architecture
					</a>
					and has more than 750 points of presence (PoPs). All other users of our library who are also
					using the CDN will pull the code closer to all PoPs while keeping the cache warm every time
					they make a request.
				</li>
				<li>
					It'll reduce the load and stress on your servers. If you're already at your server limit
					computationally or financially, it may be best to delegate some resources to an externally
					managed CDN.
				</li>
			</ul>
		{/if}
	</Step>

	{#if !isLibraryTypesDisabled}
		<Step
			title="Select Library"
			options={libOptions}
			bind:value={libType}
			on:change={onOptionsChange}
		>
			{#if libType === 'Vanilla'}
				<p>
					Select the <code>Vanilla</code> option if you're writing plain HTML or using a JS library
					such as Angular, Preact, Svelte, or Vue. Native web components have
					<a href="https://custom-elements-everywhere.com" target="_blank">excellent support</a>
					in these libraries.
				</p>
			{:else}
				<p>
					We ship a separate package for React due to it's lack of support for custom elements. This
					will most likely be changing in the
					<a href="https://github.com/facebook/react/issues/11347" target="_blank">
						upcoming React 18 release
					</a>
					🤞 Either way, this may provide you a better development experience since React components
					will feel more natural to use and interact with in your environment.
				</p>
			{/if}
		</Step>
	{/if}

	<Step
		title="Select Provider"
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
			<p>
				Embed video content into documents via the native <code>&lt;video&gt;</code> element. This
				provider also enables streaming video using the HTTP Live Streaming (HLS) protocol.
				<a href="https://caniuse.com/?search=hls" target="_blank">HLS isn't widely supported </a>
				yet, but we use the popular
				<a href="https://github.com/video-dev/hls.js/" target="_blank">hls.js</a>
				library to ensure it works anywhere
				<a href="https://caniuse.com/mediasource" target="_blank">
					Media Source Extensions (MSE) are supported
				</a>
				, which accounts for ~96.42% of users tracked on caniuse.
			</p>
		{/if}
	</Step>

	<slot />
</Steps>
