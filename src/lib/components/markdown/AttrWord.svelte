<script>
	import { uppercaseFirstLetter } from '$utils/string';
	import Translate from './Translate.svelte';

	export let short = false;
	export let title = false;

	$: word = short ? 'attr' : 'attribute';
</script>

<Translate word={title ? uppercaseFirstLetter(word) : word} />
