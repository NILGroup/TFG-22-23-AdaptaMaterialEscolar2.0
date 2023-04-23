import React, { useState } from "react";

export default function ToolbarGroupSelect({ className, options, defaultValue, checkValue, onChange, ...restProps }) {
	const [value, setValue] = useState(defaultValue);

	return (
		<select
			className={`${className} cursor-pointer rounded-md border-2 border-grey-dark bg-transparent p-0 px-3 py-1 hover:border-focus hover:border-opacity-40 focus:border-focus focus:border-opacity-100 focus:ring-2 focus:ring-focus focus:ring-opacity-30`}
			onChange={(e) => {
				onChange(e);

				if (checkValue) setValue(checkValue());
			}}
			value={value}
			{...restProps}
		>
			{options.map((option, index) => (
				<option key={`selectOption-${index}`} value={option.value}>
					{option.text}
				</option>
			))}
		</select>
	);
}
