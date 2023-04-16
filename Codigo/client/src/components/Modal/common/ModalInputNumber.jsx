import React from "react";

export default function ModalInputNumber({ id, label, ...restProps }) {
	return (
		<>
			{label && <label htmlFor={id}>{label}</label>}
			<input
				type="number"
				id={id}
				className="w-[4vw] min-w-[2.5rem] max-w-[3rem] rounded-md border-2 border-grey-dark bg-grey-light p-0 pl-1 focus:ring-4 focus:ring-focus focus:ring-opacity-25"
				{...restProps}
			/>
		</>
	);
}
