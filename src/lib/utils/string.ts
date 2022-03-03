export function uppercaseFirstLetter(str: string) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

export function kebabToTitleCase(str: string) {
	return str.charAt(0).toUpperCase() + str.slice(1).replace(/-./g, (x) => ' ' + x[1].toUpperCase());
}

export function kebabToPascalCase(str: string) {
	return kebabToTitleCase(str).replace(/\s/g, '');
}

export function camelToTitleCase(str: string) {
	return str.charAt(0).toUpperCase() + str.slice(1).replace(/([A-Z])/g, ' $1');
}
