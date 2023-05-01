import React from "react";

import { useSlate } from "slate-react";

import { addMarkData, isMarkActive } from "../../utils/SlateUtilityFunctions";

export default function ToolbarGroupNumberInput({ className, format, ...restProps }) {
	const editor = useSlate();

	return (
		<input
			type="number"
			className={`${className} ${
				isMarkActive(editor, format) ? "bg-opacity-70" : "bg-opacity-0"
			} w-[4vw] min-w-[2.5rem] max-w-[3.5rem] rounded-md p-0 pl-1 focus-visible:ring-4 focus-visible:ring-focus focus-visible:ring-opacity-25`}
			onChange={(e) => {
				addMarkData(editor, { format, value: e.target.value });
			}}
			{...restProps}
		/>
	);
}
