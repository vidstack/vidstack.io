import LRUCache from 'lru-cache';
import { readFileSync } from 'fs';
import { resolve, dirname, basename } from 'path';
import { createMarkdownParser } from '../markdown-plugin';

import type { Plugin } from 'vite';
import type { ComponentMeta } from '@celement/cli';

export const PLUGIN_NAME = '@vidstack/api-docs' as const;

const cache = new LRUCache<string, string>({ max: 1024 });

const CWD = process.cwd();
const elementsPath = resolve(CWD, 'node_modules/@vidstack/player/elements.json');
const elements = getJson(elementsPath);

const components: ComponentMeta[] = elements.components;

function formatHeading(name: string) {
	if (name === 'Hls') return 'HLS';
	return null;
}

export const apiDocsPlugin = (): Plugin => {
	let parser;

	return {
		name: PLUGIN_NAME,
		enforce: 'pre',
		async configResolved() {
			parser = await createMarkdownParser();
		},
		transform(_, id) {
			if (id.endsWith('api.md')) {
				if (cache.has(id)) return cache.get(id);

				const baseTagName = basename(dirname(id));
				const tagName = `vds-${baseTagName}`;
				const name = kebabToCamelCase(baseTagName);
				const component = components.find((component) => component.tagName === tagName);

				if (component) {
					// TODO: fix this upstream in celement.
					for (const slot of component.slots) {
						if (slot.description.startsWith('-')) {
							slot.name = 'DEFAULT';
							slot.description = slot.description.slice('- '.length);
						}
					}

					Object.keys(component).forEach((key) => {
						if (Array.isArray(component[key])) {
							// @ts-expect-error - ignore
							for (const prop of component[key]) {
								['description', 'documentation'].forEach((d) => {
									if (prop[d]) {
										prop[d] = parser.render(prop[d]);
									}
								});
							}
						}
					});
				}

				const code = [
					'<script context="module">',
					"  import ComponentApiTable from '$components/markdown/ComponentApiTable.svelte';",
					`  const __api = ${component ? serializeApi(component) : '{}'};`,
					'</script>',
					'',
					`# ${formatHeading(name) ?? name} API`,
					'',
					'<ComponentTabbedLinks slug={__slug} api />',
					'',
					'<ComponentApiTable api={__api} />'
				].join('\n');

				cache.set(id, code);
				return code;
			}
		}
	};
};

function getJson(filePath) {
	return JSON.parse(readFileSync(filePath).toString());
}

function kebabToCamelCase(str) {
	return str.charAt(0).toUpperCase() + str.slice(1).replace(/-./g, (x) => ' ' + x[1].toUpperCase());
}

function serializeApi(component: ComponentMeta) {
	return JSON.stringify({
		properties: extractProps(component),
		methods: extractMethods(component),
		events: extractEvents(component),
		slots: extractSlots(component),
		cssProps: extractCssProps(component),
		cssParts: extractCssParts(component)
	});
}

function extractProps(component: ComponentMeta) {
	return component.props
		.filter((prop) => !prop.internal)
		.map((prop) => ({
			name: prop.name,
			description: prop.documentation,
			readonly: prop.readonly,
			type: prop.typeInfo.original
		}));
}

function extractMethods(component: ComponentMeta) {
	return component.methods
		.filter((method) => !method.internal && !/^(add|remove)EventListener/.test(method.name))
		.map((method) => ({
			name: method.name,
			static: method.static,
			description: method.documentation,
			type: method.typeInfo.signatureText
		}));
}
function extractEvents(component: ComponentMeta) {
	return component.events
		.filter((event) => !event.internal)
		.map((event) => ({
			name: event.name,
			description: event.documentation,
			type: event.typeInfo.original
		}));
}

function extractSlots(component: ComponentMeta) {
	return component.slots.map((slot) => ({
		name: slot.name,
		description: slot.description
	}));
}

function extractCssParts(component: ComponentMeta) {
	return component.cssParts.map((cssPart) => ({
		name: cssPart.name,
		description: cssPart.description
	}));
}

function extractCssProps(component: ComponentMeta) {
	return component.cssProps.map((cssProp) => ({
		name: cssProp.name,
		description: cssProp.description
	}));
}
