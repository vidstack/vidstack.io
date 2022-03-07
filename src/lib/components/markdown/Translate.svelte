<script lang="ts">
	import { isReactPath } from '$stores/path';

	export let word: string;

	function translate(_, __) {
		switch (word) {
			case 'attr':
				return $isReactPath ? 'prop' : 'attr';
			case 'attribute':
				return $isReactPath ? 'property' : 'attribute';
			default:
				return word;
		}
	}

	$: translation = translate(word, $isReactPath);
</script>

{translation}
