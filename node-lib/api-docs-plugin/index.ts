import LRUCache from 'lru-cache';
import { readFileSync } from 'fs';
import { resolve, dirname, basename } from 'path';
import { createMarkdownParser } from '../markdown-plugin';

import type { Plugin } from 'vite';
import type { ComponentMeta, EventMeta, MethodMeta, PropMeta } from '@celement/cli';

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

function uppercaseFirstLetter(str: string) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

function lowercaseFirstLetter(str: string) {
	return str.charAt(0).toLowerCase() + str.slice(1);
}

function kebabToCamelCase(str) {
	return uppercaseFirstLetter(str.replace(/-./g, (x) => ' ' + x[1].toUpperCase()));
}

export function camelToKebabCase(str: string) {
	return lowercaseFirstLetter(str.replace(/[A-Z]/g, (x) => '-' + x[0].toLowerCase()));
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
			attr: camelToKebabCase(prop.name) !== prop.attribute ? prop.attribute : undefined,
			name: prop.name,
			description: prop.documentation,
			readonly: prop.readonly,
			type: prop.typeInfo.original,
			link: findLink(prop)
		}));
}

function extractMethods(component: ComponentMeta) {
	return component.methods
		.filter((method) => !method.internal && !/^(add|remove)EventListener/.test(method.name))
		.map((method) => ({
			name: method.name,
			static: method.static,
			description: method.documentation,
			type: method.typeInfo.signatureText,
			link: findLink(method)
		}));
}
function extractEvents(component: ComponentMeta) {
	return component.events
		.filter((event) => !event.internal)
		.map((event) => ({
			name: event.name,
			description: event.documentation,
			type: event.typeInfo.original,
			link: findLink(event),
			detail: getEventDetail(event)
		}));
}

function getEventDetail(event: EventMeta) {
	return event.typeInfo.resolved?.match(/<(.*?)>/)?.[1];
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

function findLink(prop: PropMeta | MethodMeta | EventMeta) {
	return (
		// Prioritize MDN links.
		prop.docTags.find((tag) => tag.name === 'link' && /(mozilla|mdn)/.test(tag.text ?? ''))?.text ??
		prop.docTags.find((tag) => tag.name === 'link')?.text
	);
}
