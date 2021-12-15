import { useEffect, useState } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
	const [storedValue, setStoredValue] = useState<T>(initialValue);

	useEffect(() => {
		try {
			const item = window.localStorage.getItem(`vidstack::${key}`);
			setStoredValue(item ? JSON.parse(item) : initialValue);
		} catch (err) {
			// console.log(err);
		}
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
		} catch (err) {
			// console.log(err);
		}
	};

	return [storedValue, setValue] as const;
}
