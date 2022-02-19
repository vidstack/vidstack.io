<script lang="ts">
	export let lang: string | null = null;
	export let ext: string | null = null;
	export let lines: number | null = null;
	export let lineNumbers = false;
	export let highlightLines: [number, number][] = [];

	function k(...args: any[]) {}

	$: k(lang, ext, lines, lineNumbers, highlightLines);

	/**
	 * Check if a line number is in ranges.
	 */
	// export const isHighlightLine = (lineNumber: number, ranges: HighlightLinesRange[]): boolean =>
	// 	ranges.some(([start, end]) => lineNumber >= start && lineNumber <= end);
</script>

<slot />
