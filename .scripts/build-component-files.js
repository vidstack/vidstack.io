import { existsSync, readFileSync, writeFileSync } from 'fs';
import { relative, resolve } from 'path';
import kleur from 'kleur';

const CWD = process.cwd();

const elementsPath = resolve(CWD, 'node_modules/@vidstack/player/elements.json');
const elements = getJson(elementsPath);

/** @type {import('@celement/cli').ComponentMeta[]} */
const components = elements.components;

const ROUTES_DIR = resolve(CWD, 'src/routes');
const PLAYER_DOCS_DIR = resolve(ROUTES_DIR, 'docs/player/elements');

const ignoredCategories = [/^players/];
const ignoredElements = [/vds-media-ui/, /vds-media-controller/];

console.log(kleur.cyan(`Scaffolding component documentation files.\n`));

let newFiles = false;

for (const component of components) {
	const category = component.source.dirPath.split('/')[0];

	const shouldIgnore =
		ignoredCategories.some((i) => i.test(category)) ||
		ignoredElements.some((i) => i.test(component.tagName));

	if (shouldIgnore) continue;

	const baseTagName = component.tagName.slice('vds-'.length);
	const name = kebabToTitleCase(baseTagName);

	const dirPath = resolve(PLAYER_DOCS_DIR, category, baseTagName);
	const indexFilePath = resolve(dirPath, 'index.md');
	const apiFilePath = resolve(dirPath, 'api.md');

	const exists = existsSync(apiFilePath);
	const routePath = relative(ROUTES_DIR, apiFilePath);

	if (!exists) {
		writeFileSync(
			indexFilePath,
			[
				`# ${name}`,
				'',
				'<ComponentTabbedLinks slug={__slug} />',
				'',
				'## Import',
				'',
				`<ComponentImport tagName="${component.tagName}" />`,
				'',
				'Coming Soon.',
				''
			].join('\n')
		);
		writeFileSync(
			apiFilePath,
			'<!-- Built on demand by the `api-docs-plugin`. See `ComponentApiTable.svelte` for styling. -->'
		);
		console.log(kleur.bold(`- routes/${routePath}`), exists ? '' : kleur.bold('(new)'));
		newFiles = true;
	}
}

if (!newFiles) {
	console.log(kleur.bold(" No new component's were found."));
}

function getJson(filePath) {
	return JSON.parse(readFileSync(filePath).toString());
}

function kebabToTitleCase(str) {
	return str.charAt(0).toUpperCase() + str.slice(1).replace(/-./g, (x) => ' ' + x[1].toUpperCase());
}

console.log('\n This only generates the component file templates.');
console.log('\n API is injected on demand by the Vite plugin: `api-docs-plugin`.');
console.log();
