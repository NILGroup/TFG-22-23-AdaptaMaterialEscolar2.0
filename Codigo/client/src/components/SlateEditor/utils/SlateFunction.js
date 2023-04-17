import { Editor, Text, Transforms } from "slate";

function isBoldMarkActive(editor) {
	const [match] = Editor.nodes(editor, {
		match: (n) => n.bold === true,
		universal: true,
	});

	return match;
}

function isItalicMarkActive(editor) {
	const [match] = Editor.nodes(editor, {
		match: (n) => n.italic === true,
		universal: true,
	});

	return match;
}

function isUnderlineMarkActive(editor) {
	const [match] = Editor.nodes(editor, {
		match: (n) => n.underline === true,
		universal: true,
	});

	return match;
}

function isStrikethroughMarkActive(editor) {
	const [match] = Editor.nodes(editor, {
		match: (n) => n.strikethrough === true,
		universal: true,
	});

	return match;
}

export function toggleBoldMark(editor) {
	const isActive = isBoldMarkActive(editor);
	Transforms.setNodes(editor, { bold: isActive ? null : true }, { match: (n) => Text.isText(n), split: true });
}

export function toggleItalicMark(editor) {
	const isActive = isItalicMarkActive(editor);
	Transforms.setNodes(editor, { italic: isActive ? null : true }, { match: (n) => Text.isText(n), split: true });
}

export function toggleUnderlineMark(editor) {
	const isActive = isUnderlineMarkActive(editor);
	Transforms.setNodes(editor, { underline: isActive ? null : true }, { match: (n) => Text.isText(n), split: true });
}

export function toggleStrikethroughMark(editor) {
	const isActive = isStrikethroughMarkActive(editor);
	Transforms.setNodes(
		editor,
		{ strikethrough: isActive ? null : true },
		{ match: (n) => Text.isText(n), split: true }
	);
}
