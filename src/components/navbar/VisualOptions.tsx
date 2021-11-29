import Switch from '$base/Switch';
import { useDarkTheme } from '$hooks/useDarkTheme';
import { useHighContrast } from '$hooks/useHighContrast';

function VisualOptions() {
	const [isDarkTheme, setDarkTheme] = useDarkTheme();
	const [isHighContrast, setHighContrast] = useHighContrast();

	return (
		<>
			<div className="flex rounded-md items-center w-full py-3 text-16">
				<span className="flex-1 font-medium text-16">Dark Mode</span>
				<Switch
					label="Toggle dark mode"
					initialState={isDarkTheme}
					onChange={setDarkTheme}
				/>
			</div>

			<div className="flex rounded-md items-center w-full py-3 text-16">
				<span className="flex-1 font-medium text-16">High Contrast</span>
				<Switch
					label="Toggle high contrast"
					initialState={isHighContrast}
					onChange={setHighContrast}
				/>
			</div>
		</>
	);
}

export default VisualOptions;
