import React from "react";

export default function Leaf({ leaf, attributes, children }) {
	let content = children;

	if (leaf.bold) {
		content = <strong>{content}</strong>;
	}

	if (leaf.italic) {
		content = <em>{content}</em>;
	}

	if (leaf.underline) {
		content = <u>{content}</u>;
	}

	if (leaf.strikethrough) {
		content = <s>{content}</s>;
	}

	return <span {...attributes}>{content}</span>;
}
