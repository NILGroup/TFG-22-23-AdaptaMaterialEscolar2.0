import React, { forwardRef } from "react";

const ModalInputNumber = forwardRef(({ id, label, ...restProps }, ref) => {
	return (
		<>
			{label && <label htmlFor={id}>{label}</label>}
			<input
				type="number"
				id={id}
				className="w-16 rounded-md border-2 border-grey-dark bg-grey-light pl-2"
				ref={ref}
				{...restProps}
			/>
		</>
	);
});

ModalInputNumber.displayName = "ModalInputNumber";

export default ModalInputNumber;
