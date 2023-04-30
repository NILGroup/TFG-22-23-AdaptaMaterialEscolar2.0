import React, { useEffect, useState } from "react";
import { useSlate } from "slate-react";

export default function ToolbarGroupButton({
	className,
	defaultActive = false,
	children,
	checkActive,
	onClick,
	...restProps
}) {
	const [isActive, setIsActive] = useState(defaultActive);
	const editor = useSlate()

	return (
		<button
			className={`${className} ${
				isActive ? "bg-opacity-70" : "bg-opacity-0"
			} flex items-center gap-1 rounded-sm bg-grey-dark p-1.5 hover:bg-opacity-40 focus:ring-2 focus:ring-focus focus:ring-opacity-30`}
			onClick={(e) => {
				onClick(e);

				
			}}
			{...restProps}
		>
			{children}
		</button>
	);
}
