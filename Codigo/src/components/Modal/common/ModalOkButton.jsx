import React from "react";

export default function ModalOkButton({ className, ...restProps }) {
	return (
		<button
			type="submit"
			className={`${className} rounded-md bg-button py-2 px-10 text-modal-base-lg text-white enabled:hover:bg-button-dark disabled:bg-opacity-60`}
			{...restProps}
		>
			Ok
		</button>
	);
}
