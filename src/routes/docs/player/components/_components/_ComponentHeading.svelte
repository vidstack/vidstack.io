<script lang="ts">
	import { elementTagName } from '$stores/element';
	import { kebabToTitleCase } from '$utils/string';

	function format(name: string) {
		if (name === 'hls') return 'HLS';
		return name;
	}

	$: heading = `${format(kebabToTitleCase($elementTagName.replace('vds-', '')))}`;
</script>

<h1>
	{heading}
</h1>
