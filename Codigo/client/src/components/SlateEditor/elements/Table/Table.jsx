import React from "react";

export default function Table({ attributes, children, element }) {
	return (
		<table
			className={`border-collapse border border-slate-500 ${element.style !== undefined ? element.style : ""}`}
		>
			<tbody {...attributes}>{children}</tbody>
		</table>
	);
}
