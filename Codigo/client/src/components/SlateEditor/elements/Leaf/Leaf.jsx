import React from "react";

export default function Leaf({ leaf, attributes, children }) {
	if (leaf.bold) {
		children = <strong>{children}</strong>;
	}

	if (leaf.italic) {
		children = <em>{children}</em>;
	}

	if (leaf.underline) {
		children = <u>{children}</u>;
	}

	if (leaf.strikethrough) {
		children = <s>{children}</s>;
	}

	// if (leaf.superscript) {
	// 	children = <sup>{children}</sup>;
	// }

	// if (leaf.subscript) {
	// 	children = <sub>{children}</sub>;
	// }

	if (leaf.color) {
		children = <span style={{ color: leaf.color }}>{children}</span>;
	}

	if (leaf.bgColor) {
		children = <span style={{ backgroundColor: leaf.bgColor }}>{children}</span>;
	}

	if (leaf.fontSize) {
		children = <span style={{ fontSize: `${leaf.fontSize}px` }}>{children}</span>;
	}

	if (leaf.fontFamily) {
		children = <span className={leaf.fontFamily}>{children}</span>;
	}

	return <span {...attributes}>{children}</span>;
}
