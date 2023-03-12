import React from "react";

export default function RelateConcepts({ attributes, children, element }) {
	console.log(element);
	return (
		<div {...attributes}>
			<div className="flex justify-around align-middle">{element.children}</div>
			{children}
		</div>
	);
}
