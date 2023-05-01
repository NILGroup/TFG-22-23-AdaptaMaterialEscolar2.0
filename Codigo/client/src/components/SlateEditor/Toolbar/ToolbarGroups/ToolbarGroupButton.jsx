import React from "react";

export default function ToolbarGroupButton({ className, children, isActive, ...restProps }) {
	return (
		<button
			className={`${className} ${
				isActive ? "bg-opacity-70" : "bg-opacity-0"
			} flex items-center gap-1 rounded-sm bg-grey-dark p-1.5 hover:bg-opacity-40 focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-opacity-30`}
			{...restProps}
		>
			{children}
		</button>
	);
}
