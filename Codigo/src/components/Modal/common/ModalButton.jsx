import React from "react";

export default function ModalButton({
	className,
	children,
	onClick,
	disabled,
}) {
	const enabledClass = "rounded-md bg-sky-500 text-white hover:bg-sky-600";
	const disabledClass = "rounded-md bg-sky-500 text-white bg-opacity-50";

	return (
		<button
			className={`${className} ${
				!disabled ? enabledClass : disabledClass
			}`}
			onClick={() => onClick()}
			disabled={disabled}
		>
			{children}
		</button>
	);
}
