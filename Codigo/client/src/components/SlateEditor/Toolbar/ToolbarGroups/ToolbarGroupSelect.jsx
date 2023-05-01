import React from "react";

export default function ToolbarGroupSelect({ className, options, ...restProps }) {
	return (
		<select
			className={`${className} cursor-pointer rounded-md border-2 border-grey-dark bg-transparent p-0 px-3 py-1 hover:border-focus hover:border-opacity-40 focus-visible:border-focus focus-visible:border-opacity-100 focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-opacity-30`}
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
