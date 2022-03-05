import { existsSync, readFileSync, writeFileSync } from 'fs';
import { ensureDirSync } from 'fs-extra';
import { relative, resolve } from 'path';
import kleur from 'kleur';

const CWD = process.cwd();

const elementsPath = resolve(CWD, 'node_modules/@vidstack/player/elements.json');
const elements = getJson(elementsPath);

/** @type {import('@celement/cli').ComponentMeta[]} */
const components = elements.components;

const ROUTES_DIR = resolve(CWD, 'src/routes');
const PLAYER_DOCS_DIR = resolve(ROUTES_DIR, 'docs/player/components');

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

	const dirPath = resolve(PLAYER_DOCS_DIR, category, baseTagName);
	const reactDirPath = resolve(dirPath, 'react');

	const indexFilePath = resolve(dirPath, 'index.md');
	const apiFilePath = resolve(dirPath, 'api.md');
	const layoutFilePath = resolve(dirPath, '_Layout.md');
	const reactFilePath = resolve(reactDirPath, 'index.md');
	const reactApiFilePath = resolve(reactDirPath, 'api.md');

	const exists = existsSync(dirPath);
	const routePath = relative(ROUTES_DIR, apiFilePath);

	const apiComment =
		'<!-- Built on demand by the `api-docs-plugin`. See `ComponentApiTable.svelte` for styling. -->\n';

	const indexContent = [
		'<script>',
		"import Layout from './_Layout.md'",
		'</script>',
		'',
		'<Layout>',
		'  <!-- ... -->',
		'</Layout>',
		''
	].join('\n');

	if (!exists) {
		ensureDirSync(dirPath);
		ensureDirSync(reactDirPath);
		writeFileSync(layoutFilePath, ['## Usage', '', 'Coming Soon.', ''].join('\n'));
		writeFileSync(indexFilePath, indexContent);
		writeFileSync(reactFilePath, indexContent.replace('./_Layout', '../_Layout'));
		writeFileSync(apiFilePath, apiComment);
		writeFileSync(reactApiFilePath, apiComment);
		console.log(kleur.bold(`- routes/${routePath}`));
		newFiles = true;
	}
}

if (!newFiles) {
	console.log(kleur.bold(" No new component's were found."));
}

function getJson(filePath) {
	return JSON.parse(readFileSync(filePath).toString());
}

console.log('\n Note: This only generates the component file templates.');
console.log();
