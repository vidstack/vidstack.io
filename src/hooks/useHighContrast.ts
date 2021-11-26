import { useContext } from 'react';

import { ContrastLevelContext } from '$context/ContrastLevelContext';

export function useHighContrast() {
	const { contrastLevel, setContrastLevel } = useContext(ContrastLevelContext);
	return [
		contrastLevel === 'high',
		(highContrast: boolean) => {
			setContrastLevel(highContrast ? 'high' : 'low');
		},
	] as const;
}
