<script>
	import Translate from './Translate.svelte';

	export let short = false;
</script>

<Translate word={short ? 'attr' : 'attribute'} />
