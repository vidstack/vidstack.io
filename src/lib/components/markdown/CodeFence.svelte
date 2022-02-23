<script lang="ts">
	import clsx from 'clsx';

	export let lang: string | null = null;
	export let ext: string | null = null;
	export let code: string | null = null;
	export let linesCount: number = (code?.match(/"line"/g) || []).length;
	export let showLineNumbers = false;
	export let highlightLines: [number, number][] = [];

	const isHighlightLine = (lineNumber: number): boolean =>
		highlightLines.some(([start, end]) => lineNumber >= start && lineNumber <= end);

	// `linesCount-1` since last line is always empty (prettier)
	$: lines = [...Array(linesCount - 1).keys()].map((n) => n + 1);
	$: highlightedLines = lines.filter(isHighlightLine);
</script>

<div
	class={clsx(
		'code-fence overflow-y-auto relative max-h-[60vh] 576:max-h-[32rem] my-8 rounded-md shadow-lg',
		lang && `lang-${lang}`,
		ext && `ext-${ext}`,
		showLineNumbers && 'pl-10'
	)}
>
	<div class="code">
		{#if code}
			{@html code}
		{:else}
			<slot />
		{/if}
	</div>

	{#if showLineNumbers}
		<pre class="absolute top-0 left-0 m-0 flex min-h-full flex-col text-sm leading-[28px]">
			<div
				class="hidden flex-none select-none text-right text-slate-600 992:block"
				aria-hidden="true">{lines.join('\n')}</div>
		</pre>
	{/if}

	{#each highlightedLines as lineNumber}
		<div
			class="absolute top-1.5 left-0 w-full bg-slate-400/10 font-mono text-transparent"
			style={`transform: translateY(${(lineNumber - 1) * 100}%);`}
			aria-hidden="true"
		>
			x
		</div>
	{/each}
</div>
