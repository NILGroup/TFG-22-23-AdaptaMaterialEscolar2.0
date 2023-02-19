import React from "react";

export default function ModalButton({ children, className, ...restProps }) {
	return (
		<button
			className={`${className} rounded-md bg-sky-500 text-white enabled:hover:bg-sky-600 disabled:bg-opacity-60`}
			{...restProps}
		>
			{children}
		</button>
	);
}
