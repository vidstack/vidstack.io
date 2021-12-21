import clsx from 'clsx';
import { HTMLInputTypeAttribute, useRef, useState } from 'react';

import { useIsFocusing } from '$hooks/useIsFocusing';

export type TextfieldProps = {
	name: string;
	label: string;
	type?: HTMLInputTypeAttribute;
	required?: boolean;
	className?: string;
};

function Textfield({
	name,
	label,
	type = 'text',
	className,
	required,
}: TextfieldProps) {
	const id = useRef(`textfield-${name}`);
	const [value, setValue] = useState('');
	const [focusRef, isFocusing] = useIsFocusing<HTMLInputElement>();

	return (
		<div
			className={clsx(
				'flex flex-row items-center relative min-w-full',
				className,
			)}
		>
			<input
				id={id.current}
				className="bg-surface border-0 border-b-2 border-gray-300 cursor-pointer focus:ring-surface focus:border-primary focus-visible:border-primary min-w-full text-gray-400"
				type={type}
				name={name}
				required={required}
				ref={focusRef}
				onInput={(e) => setValue((e.target as HTMLInputElement).value)}
			/>

			<label
				htmlFor={id.current}
				className={clsx(
					'absolute select-none pointer-events-none transition-all font-medium tracking-wider',
					isFocusing ? 'text-primary' : 'text-gray-300',
					isFocusing || value.length > 0
						? 'scale-75 -top-6 left-0'
						: 'top-2 left-3',
				)}
			>
				{label}
			</label>
		</div>
	);
}

export default Textfield;
