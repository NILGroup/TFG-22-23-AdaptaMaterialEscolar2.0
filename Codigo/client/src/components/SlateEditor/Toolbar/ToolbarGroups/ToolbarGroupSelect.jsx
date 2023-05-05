import React from "react";

export default function ToolbarGroupSelect({ className, options, ...restProps }) {
	console.log(options);

	return (
		<select
			className={`${className} cursor-pointer rounded-md border-2 border-grey-dark bg-transparent p-0 px-3 py-1 hover:border-focus hover:border-opacity-40 focus-visible:border-focus focus-visible:border-opacity-100 focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-opacity-30`}
			{...restProps}
		>
			{options.map((option, optionIndex) => {
				const optionArray = Object.values(option.value);

				if (optionArray.length > 0) {
					return (
						<optgroup key={`optionGroup-${optionIndex}`} className="font-main" label={option.label}>
							<hr />
							{optionArray.map((suboption, index) => (
								<option
									className={suboption.style}
									key={`selectOption-${index}`}
									value={suboption.value}
								>
									{suboption.text}
								</option>
							))}
						</optgroup>
					);
				} else {
					return (
						<option className={option.style} key={`selectOption-${optionIndex}`} value={option.value}>
							{option.text}
						</option>
					);
				}
			})}
		</select>
	);
}
