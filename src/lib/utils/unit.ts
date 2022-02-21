/**
 * Whether two values are NOT equal.
 *
 * @param valueA
 * @param valueB
 */
export function notEqual(valueA: unknown, valueB: unknown): boolean {
	// This ensures (valueB==NaN, valueA==NaN) always returns false.
	return valueB !== valueA && (valueB === valueB || valueA === valueA);
}

/**
 * Whether two values are NOT equal excluding objects and functions.
 *
 * @param valueA
 * @param valueB
 */
export function safeNotEqual(a, b) {
	return a != a ? b == b : a !== b || (a && typeof a === 'object') || typeof a === 'function';
}

/**
 * Whether two values are equal.
 *
 * @param valueA
 * @param valueB
 */
export function equal(valueA: unknown, valueB: unknown): boolean {
	return !notEqual(valueA, valueB);
}

/**
 * Checks if the given `value` is `null`.
 *
 * @param value The value to check.
 */
export function isNull(value: unknown): value is null {
	return value === null;
}

/**
 * Checks if the given `value` is `undefined`.
 *
 * @param value - The value to check.
 */
export function isUndefined(value: unknown): value is undefined {
	return typeof value === 'undefined';
}

/**
 * Checks if given `value` is `null` or `undefined`.
 *
 * @param value - The value to check.
 */
export function isNil(value: unknown): value is null | undefined {
	return isNull(value) || isUndefined(value);
}

/**
 * Checks if the given `value` is classified as a `Object`.
 *
 * @param value - The value to check.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isObject(value: any): value is object {
	return value?.constructor === Object;
}

/**
 * Checks if the given `value` is classified as a `Number` object.
 *
 * @param value - The value to check.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isNumber(value: any): value is number {
	return typeof value === 'number' && !Number.isNaN(value);
}

/**
 * Checks if the given `value` is classified as a `String` object.
 *
 * @param value - The value to check.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isString(value: any): value is string {
	return typeof value === 'string';
}

/**
 * Checks if `value` is classified as a `Boolean` object.
 *
 * @param value - The value to check.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isBoolean(value: any): value is boolean {
	return typeof value === 'boolean';
}

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @param value - The value to check.
 */
// eslint-disable-next-line @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any
export function isFunction(value: any): value is Function {
	return typeof value === 'function';
}

/**
 * Checks if the given `value` is classified as an `Array` object.
 *
 * @param value - The value to check.
 */
export function isArray(value: unknown): value is unknown[] {
	return Array.isArray(value);
}
