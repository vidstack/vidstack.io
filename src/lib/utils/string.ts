export function uppercaseFirstLetter(str: string) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Converts a kebab-case string to TitleCase.
 *
 * @example 'my-property' -> 'My Property'
 */
export function kebabToCamelCase(str: string) {
	return str.charAt(0).toUpperCase() + str.slice(1).replace(/-./g, (x) => ' ' + x[1].toUpperCase());
}
