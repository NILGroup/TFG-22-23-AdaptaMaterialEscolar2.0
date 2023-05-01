import React from "react";
import { useSlate } from "slate-react";
import { isBlockActive, toggleBlock } from "../../utils/SlateUtilityFunctions";

export default function ToolbarBlockButton({
	className,
	children,
    format,
	...restProps
}) {
	const editor = useSlate();

	return (
		<button
			className={`${className} ${
				isBlockActive(editor, format) ? "bg-opacity-70" : "bg-opacity-0"
			} flex items-center gap-1 rounded-sm bg-grey-dark p-1.5 hover:bg-opacity-40 focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-opacity-30`}
			onClick={() => {
                    toggleBlock(editor, format);
			}}
			{...restProps}
		>
			{children}
		</button>
	);
}
