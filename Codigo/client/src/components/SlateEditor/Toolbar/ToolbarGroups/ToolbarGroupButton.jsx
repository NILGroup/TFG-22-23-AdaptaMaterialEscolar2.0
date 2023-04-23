import React, { useState } from "react";

export default function ToolbarGroupButton({
	className,
	defaultActive = false,
	children,
	checkActive,
	onClick,
	...restProps
}) {
	const [isActive, setIsActive] = useState(defaultActive);

	return (
		<button
			className={`${className} ${
				isActive ? "bg-opacity-40" : "bg-opacity-0"
			} flex items-center gap-1 rounded-sm bg-grey-dark py-1 px-2 hover:bg-opacity-70 focus:ring-2 focus:ring-focus focus:ring-opacity-30`}
			onClick={(e) => {
				onClick(e);

				if (checkActive) setIsActive(checkActive());
			}}
			{...restProps}
		>
			{children}
		</button>
	);
}
