import React from "react";

export default function Table({ attributes, children, element }) {
	return (
		<table className="w-[100%] border-collapse border border-slate-500">
			<tbody {...attributes}>{children}</tbody>
		</table>
	);
}
