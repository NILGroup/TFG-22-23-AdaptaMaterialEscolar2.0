import React from "react";

export default function ModalButton({ children, className, ...restProps }) {
	return (
		<button
			className={`${className} rounded-md bg-button text-white focus:ring-4 focus:ring-focus focus:ring-opacity-30 enabled:hover:bg-button-dark disabled:bg-opacity-60`}
			{...restProps}
		>
			{children}
		</button>
	);
}
