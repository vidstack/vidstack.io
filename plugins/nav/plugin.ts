import path from 'path';
import fs from 'fs';
import globby from 'fast-glob';
import matter from 'gray-matter';
import toml from 'toml';

import type { Plugin } from 'vite';

export const PLUGIN_NAME = '@vidstack/nav' as const;

const CWD = process.cwd();
const ROUTES_DIR = path.resolve(CWD, 'src/routes');

export type NavPluginOptions = {
	formatCategoryName?: (baseUrl: string, category: string) => string | null | undefined;
	sortCategories?(baseUrl: string, categories: string[]): string[];
};

export function navPlugin(options?: NavPluginOptions): Plugin {
	const VIRTUAL_ID = '~nav';
	const VIRTUAL_ID_PATH = `/${VIRTUAL_ID}`;

	const categorySorter = options.sortCategories ?? ((_, c) => c);

	const watching = new Map<string, string>();

	return {
		name: PLUGIN_NAME,
		enforce: 'pre' as const,
		config() {
			return {
				resolve: {
					alias: {
						[VIRTUAL_ID]: VIRTUAL_ID_PATH
					}
				}
			};
		},
		resolveId(id) {
			return id.startsWith(VIRTUAL_ID_PATH) ? id : null;
		},
		async load(id) {
			if (id.startsWith(VIRTUAL_ID_PATH)) {
				const paths = id.replace(/\/?~nav\/?/, '').replace(/\?.*/, '');
				const queryParams = new URL(`http://fake.com${id}`).searchParams;
				const baseUrl = queryParams.get('baseUrl') ?? '';
				const glob = `src/routes/${paths}`;

				const filePaths = globby.sync(glob, {
					absolute: true,
					cwd: CWD
				});

				const nav = {};

				for (const filePath of filePaths) {
					const source = (await fs.readFileSync(filePath)).toString();

					const { data: frontmatter } = matter(source, {
						engines: {
							toml: toml.parse.bind(toml)
						}
					});

					const title = frontmatter.title ?? '___Unknown___';
					const slug = '/' + path.relative(ROUTES_DIR, filePath).replace(/(\/index)?\..*?$/, '');
					const sidebar_position = frontmatter.sidebar_position ?? 0;
					const category = slug.replace(`${baseUrl}/`, '').split('/')[0] ?? '';

					if (!nav[category]) nav[category] = [];

					nav[category].push({ title, slug, position: sidebar_position });

					watching.set(filePath, id);
				}

				const categories = Object.keys(nav);

				const sortedNav = (categorySorter(baseUrl, categories) ?? categories).reduce(
					(acc, category) => {
						const sortedItems = nav[category]?.sort((a, b) => a.position - b.position) ?? [];

						sortedItems.forEach((item) => {
							delete item['position'];
						});

						const categoryName =
							options?.formatCategoryName?.(baseUrl, category) ?? kebabToTitleCase(category);

						return [...acc, { category: categoryName, items: sortedItems }];
					},
					[]
				);

				return `export default ${JSON.stringify(sortedNav, null, 2)};`;
			}

			return null;
		},
		handleHotUpdate({ file, server }) {
			if (watching.has(file)) {
				const id = watching.get(file);
				return [server.moduleGraph.getModuleById(id)];
			}
		}
	};
}

function uppercaseFirstLetter(str: string) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

function kebabToTitleCase(str: string) {
	return str
		.split('-')
		.filter((x) => x.length > 0)
		.map(uppercaseFirstLetter)
		.join(' ');
}
