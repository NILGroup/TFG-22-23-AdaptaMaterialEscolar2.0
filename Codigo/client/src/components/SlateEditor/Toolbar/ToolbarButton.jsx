import React from "react";

import style from "./ToolbarButton.module.css";

export default function ToolbarButton({ text, onClick, toolbarGroup, activeGroup }) {
	return (
		<button
			className={`${style.toolbarButton} rounded-sm py-0.5 focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-opacity-30`}
			onClick={() => onClick(toolbarGroup)}
			data-isactive={activeGroup === toolbarGroup ? "" : undefined}
		>
			{text}
		</button>
	);
}
