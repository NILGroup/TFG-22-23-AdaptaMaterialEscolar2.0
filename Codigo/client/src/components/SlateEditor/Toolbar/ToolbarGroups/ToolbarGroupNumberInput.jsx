import React, { useState } from "react";

export default function ToolbarGroupNumberInput({
	className,
	label,
	defaultValue,
	checkValue,
	onChange,
	id,
	...restProps
}) {
	const [value, setValue] = useState(defaultValue);

	return (
		<div className="flex items-center gap-2">
			<label htmlFor={id}>{label}</label>
			<input
				type="number"
				id={id}
				className="w-[4vw] min-w-[2.5rem] max-w-[3.5rem] rounded-md p-0 pl-1 focus:ring-4 focus:ring-focus focus:ring-opacity-25"
				onChange={(e) => {
					onChange(e);

					if (checkValue) setValue(checkValue());
				}}
				value={value}
				{...restProps}
			/>
		</div>
	);
}
