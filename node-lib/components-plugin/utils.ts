import { basename, dirname } from 'path';

export function uppercaseFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function lowercaseFirstLetter(str: string) {
  return str.charAt(0).toLowerCase() + str.slice(1);
}

export function kebabToTitleCase(str) {
  return uppercaseFirstLetter(str.replace(/-./g, (x) => ' ' + x[1].toUpperCase()));
}

export function kebabToPascalCase(str: string) {
  return kebabToTitleCase(str).replace(/\s/g, '');
}

export function camelToKebabCase(str: string) {
  return lowercaseFirstLetter(str.replace(/[A-Z]/g, (x) => '-' + x[0].toLowerCase()));
}

function formatTitle(name: string) {
  if (name === 'Hls') return 'HLS';
  if (name === 'Youtube') return 'YouTube';
  return name;
}

export function getComponentNameFromId(filePath: string) {
  const baseTagName = basename(dirname(filePath.replace(/\/react/, '')));
  const tagName = `vds-${baseTagName}`;
  const name = kebabToTitleCase(baseTagName);
  return {
    baseTagName,
    tagName,
    name,
    title: formatTitle(name),
  };
}
