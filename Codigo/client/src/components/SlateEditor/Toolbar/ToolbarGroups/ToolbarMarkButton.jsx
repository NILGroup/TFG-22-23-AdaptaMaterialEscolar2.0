import React from "react";
import { useSlate } from "slate-react";
import { isMarkActive, toggleMark } from "../../utils/SlateUtilityFunctions";

export default function ToolbarMarkButton({
	className,
	children,
    format,
	...restProps
}) {
	const editor = useSlate();

	return (
		<button
			className={`${className} ${
				isMarkActive(editor, format) ? "bg-opacity-70" : "bg-opacity-0"
			} flex items-center gap-1 rounded-sm bg-grey-dark p-1.5 hover:bg-opacity-40 focus:ring-2 focus:ring-focus focus:ring-opacity-30`}
			onClick={() => {
                    toggleMark(editor, format);
			}}
			{...restProps}
		>
			{children}
		</button>
	);
}
