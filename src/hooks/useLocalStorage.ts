import { useEffect, useState } from 'react';

function getStorageValue(key: string) {
	try {
		const item = window.localStorage.getItem(`vidstack::${key}`);
		return item ? JSON.parse(item) : null;
	} catch (err) {
		// console.log(err);
		return null;
	}
}

// Used to keep different hooks in-sync.
const hooks = new Map<string, Set<() => void>>();

export function useLocalStorage<T>(key: string, initialValue: T) {
	const [storedValue, setStoredValue] = useState<T>(initialValue);

	useEffect(() => {
		const currKey = key;

		function onChange() {
			setStoredValue(getStorageValue(currKey) ?? initialValue);
		}

		hooks.set(currKey, (hooks.get(key) ?? new Set()).add(onChange));
		return () => {
			hooks.get(currKey)?.delete(onChange);
		};
	}, [key, initialValue]);

	useEffect(() => {
		setStoredValue(getStorageValue(key) ?? initialValue);
	}, [key, initialValue]);

	const setValue = (value: T | ((val: T) => T)) => {
		try {
			const valueToStore =
				value instanceof Function ? value(storedValue) : value;
			setStoredValue(valueToStore);
			window.localStorage.setItem(
				`vidstack::${key}`,
				JSON.stringify(valueToStore),
			);
			hooks.get(key)?.forEach((fn) => fn());
		} catch (err) {
			// console.log(err);
		}
	};

	return [storedValue, setValue] as const;
}
