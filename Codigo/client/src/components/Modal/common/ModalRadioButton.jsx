import React from "react";

export default function ModalRadioButton({ label, id, radioClassName, labelClassName, ...restProps }) {
	return (
		<div className="flex items-center gap-6">
			<input
				type="radio"
				id={id}
				className={`h-4 w-4 min-w-[1rem] cursor-pointer appearance-none rounded-full border-2 border-button bg-white transition duration-300 checked:bg-button focus-visible:ring-4 focus-visible:ring-focus focus-visible:ring-opacity-25 ${radioClassName}`}
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
