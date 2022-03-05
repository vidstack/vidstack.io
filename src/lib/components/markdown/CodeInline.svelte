<script lang="ts">
	import { isComponentsPath, isReactPath } from '$stores/path';
	import { kebabToCamelCase, kebabToPascalCase } from '$utils/string';

	export let code: string;

	function jsxComponentName(code: string) {
		return code.replace(/<vds-(.*?)>/, (...x) => `<${kebabToPascalCase(x[1])}>`);
	}

	function jsxPropertyorEventName(code: string) {
		const isEvent = code.startsWith('vds-');
		return /[a-z]-[a-z]/.test(code)
			? isEvent
				? `on${kebabToPascalCase(code.replace('vds-', ''))}`
				: kebabToCamelCase(code)
			: code;
	}

	$: translatedCode =
		$isComponentsPath && $isReactPath ? jsxPropertyorEventName(jsxComponentName(code)) : code;
</script>

<code>
	{translatedCode}
</code>
