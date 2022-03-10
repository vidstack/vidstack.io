import { readFileSync } from 'fs';
import { resolve } from 'path';

import type { Plugin } from 'vite';
import type { ComponentMeta } from '@celement/cli';

import { apiDocsPlugin } from './apiDocsPlugin';
import { headingsPlugin } from './headingsPlugin';

export const PLUGIN_NAME = '@vidstack/api-docs' as const;

const CWD = process.cwd();
const elementsPath = resolve(CWD, 'node_modules/@vidstack/player/elements.json');
const elements = getJson(elementsPath);

const components: ComponentMeta[] = elements.components;

export const componentsPlugin = (): Plugin[] => [
  apiDocsPlugin(components),
  headingsPlugin(components),
];

function getJson(filePath) {
  return JSON.parse(readFileSync(filePath).toString());
}
