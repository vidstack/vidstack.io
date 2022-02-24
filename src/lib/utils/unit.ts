export function notEqual(valueA: unknown, valueB: unknown): boolean {
	// This ensures (valueB==NaN, valueA==NaN) always returns false.
	return valueB !== valueA && (valueB === valueB || valueA === valueA);
}

export function safeNotEqual(a, b) {
	return a != a ? b == b : a !== b || (a && typeof a === 'object') || typeof a === 'function';
}

export function equal(valueA: unknown, valueB: unknown): boolean {
	return !notEqual(valueA, valueB);
}

export function isNull(value: unknown): value is null {
	return value === null;
}

export function isUndefined(value: unknown): value is undefined {
	return typeof value === 'undefined';
}

export function isNil(value: unknown): value is null | undefined {
	return isNull(value) || isUndefined(value);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isObject(value: any): value is object {
	return value?.constructor === Object;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isNumber(value: any): value is number {
	return typeof value === 'number' && !Number.isNaN(value);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isString(value: any): value is string {
	return typeof value === 'string';
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isBoolean(value: any): value is boolean {
	return typeof value === 'boolean';
}

// eslint-disable-next-line @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any
export function isFunction(value: any): value is Function {
	return typeof value === 'function';
}

export function isArray(value: unknown): value is unknown[] {
	return Array.isArray(value);
}

export function createRegex(regex: string | RegExp) {
	return isString(regex) ? new RegExp(regex) : regex;
}
