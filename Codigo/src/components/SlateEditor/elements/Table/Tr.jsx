import React from "react";

export default function Tr({ attributes, children, element }) {
	return <tr {...attributes}>{children}</tr>;
}
