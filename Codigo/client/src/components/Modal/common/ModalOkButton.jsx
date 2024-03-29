import React from "react";

export default function ModalOkButton({ className, ...restProps }) {
	return (
		<button
			type="submit"
			className={`${className} rounded-md bg-button py-2 px-10 text-modal-base-lg text-white focus-visible:ring-4 focus-visible:ring-focus focus-visible:ring-opacity-30 enabled:hover:bg-button-dark disabled:bg-opacity-60`}
			{...restProps}
		>
			Ok
		</button>
	);
}
