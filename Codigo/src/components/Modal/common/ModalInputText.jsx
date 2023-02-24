import React from "react";

export default function ModalInputText({ id, label, ...restProps }) {
	return (
		<>
			{label && (
				<label htmlFor={id} className={`text-modal-heading`}>
					{label}
				</label>
			)}
			<input
				type="text"
				id={id}
				className={`w-full rounded-md border-2 border-grey-dark bg-gray-100 px-2 py-1 focus:border-blue-300`}
				{...restProps}
			/>
		</>
	);
}
