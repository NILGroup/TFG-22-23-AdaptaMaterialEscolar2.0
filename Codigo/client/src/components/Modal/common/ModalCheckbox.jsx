import React from "react";

export default function ModalCheckbox({ label, id, checkboxClassName, labelClassName, ...restProps }) {
	return (
		<div className="flex items-center gap-4 whitespace-nowrap">
			<input
				type="checkbox"
				id={id}
				className={`h-4 w-4 cursor-pointer rounded-sm border border-gray-300 bg-white transition duration-200 checked:border-button checked:bg-button focus-visible:ring-4 focus-visible:ring-opacity-25 focus-visible:ring-focus ${checkboxClassName}`}
				{...restProps}
			/>
			{label && (
				<label htmlFor={id} className={labelClassName}>
					{label}
				</label>
			)}
		</div>
	);
}
