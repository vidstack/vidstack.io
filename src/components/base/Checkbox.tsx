import clsx from 'clsx';
import { useRef } from 'react';

export type CheckboxProps = {
	name: string;
	label: string;
	value?: string;
	required?: boolean;
	className?: string;
};

function Checkbox({ name, label, value, className, required }: CheckboxProps) {
	const id = useRef(`checkbox-${name}`);

	return (
		<div className={clsx('flex flex-row items-center', className)}>
			<input
				id={id.current}
				className="text-primary w-6 h-6 bg-surface border-2 border-gray-300 rounded cursor-pointer focus:ring-surface focus:ring-offset-surface focus-visible:border-primary focus-visible:ring-primary"
				type="checkbox"
				value={value ?? 'checked'}
				name={name}
				required={required}
			/>

			<label
				htmlFor={id.current}
				className="select-none ml-4 mt-1 tracking-wide text-base"
			>
				{label}
			</label>
		</div>
	);
}

export default Checkbox;
