import React from "react";

export default function ModalButton({ children, className, ...restProps }) {
	return (
		<button
			className={`${className} rounded-md bg-button text-white focus-visible:ring-4 focus-visible:ring-focus focus-visible:ring-opacity-30 enabled:hover:bg-button-dark disabled:bg-opacity-60`}
			{...restProps}
		>
			{children}
		</button>
	);
}
