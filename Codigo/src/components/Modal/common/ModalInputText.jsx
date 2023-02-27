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
				className={`w-full rounded-md border-2 border-grey-dark bg-grey-light px-2 py-1 focus:border-focus`}
				{...restProps}
			/>
		</>
	);
}
