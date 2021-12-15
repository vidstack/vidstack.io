import { Switch as HeadlessSwitch } from '@headlessui/react';
import clsx from 'clsx';
import { useState } from 'react';

import { ReactComponent as CheckmarkIcon } from '$svg/checkmark.svg';

export type SwitchProps = {
	label: string;
	initialState?: boolean;
	onChange?: (isOn: boolean) => void;
};

function Switch({ label, initialState = false, onChange }: SwitchProps) {
	const [isOn, setIsOn] = useState(initialState);

	function onSwitch(isSwitchedOn: boolean) {
		setIsOn(isSwitchedOn);
		onChange?.(isSwitchedOn);
	}

	return (
		<HeadlessSwitch
			checked={isOn}
			onChange={onSwitch}
			className={clsx(
				'relative inline-flex flex-shrink-0 w-12 h-5',
				'rounded-full cursor-pointer transition-colors ease-in-out duration-200',
			)}
			style={{
				backgroundColor: isOn
					? 'rgba(64, 191, 106, 0.4)'
					: 'rgba(172, 172, 172,  0.4)',
			}}
		>
			<span className="sr-only">{label}</span>
			<span
				aria-hidden="true"
				className={clsx(
					'pointer-events-none inline-block w-6 h-6 rounded-full -mt-0.5',
					'transform ring-0 transition ease-in-out duration-200 flex items-center justify-center',
					isOn ? 'translate-x-6 bg-success' : 'translate-x-0 bg-gray-300',
				)}
			>
				<CheckmarkIcon
					className={clsx(
						'h-3.5 opacity-0 transition-opacity ease-in-out duration-200 text-gray-100',
						isOn && 'opacity-100',
					)}
				/>
			</span>
		</HeadlessSwitch>
	);
}

export default Switch;
