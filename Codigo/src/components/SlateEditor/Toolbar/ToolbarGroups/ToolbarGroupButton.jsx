import React from "react";

export default function ToolbarGroupButton({ children, onClick }) {
	return (
		<button
			className="flex items-center gap-1 border-0 bg-transparent py-1 px-2 hover:rounded-sm hover:bg-grey-dark hover:bg-opacity-50 hover:font-bold"
			onClick={() => onClick()}
		>
			{children}
		</button>
	);
}
