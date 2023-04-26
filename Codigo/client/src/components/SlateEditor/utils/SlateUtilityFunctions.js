import { Editor, Element as SlateElement, Transforms } from "slate";

const alignment = ["alignLeft", "alignRight", "alignCenter"];
const list_types = ["orderedList", "unorderedList"];

export const isBlockActive = (editor, format) => {
	const [match] = Editor.nodes(editor, {
		match: (n) => !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === format,
	});

	return !!match;
};

export const toggleBlock = (editor, format) => {
	const isActive = isBlockActive(editor, format);
	const isList = list_types.includes(format);
	const isIndent = alignment.includes(format);
	const isAligned = alignment.some((alignmentType) => isBlockActive(editor, alignmentType));

	if (isAligned && isIndent) {
		Transforms.unwrapNodes(editor, {
			match: (n) => alignment.includes(!Editor.isEditor(n) && SlateElement.isElement(n) && n.type),
			split: true,
		});
	}

	if (isIndent) {
		Transforms.wrapNodes(editor, {
			type: format,
			children: [],
		});
		return;
	}

	Transforms.unwrapNodes(editor, {
		match: (n) => list_types.includes(!Editor.isEditor(n) && SlateElement.isElement(n) && n.type),
		split: true,
	});

	Transforms.setNodes(editor, {
		type: isActive ? "paragraph" : isList ? "list-item" : format,
	});

	if (isList && !isActive) {
		Transforms.wrapNodes(editor, {
			type: format,
			children: [],
		});
	}
};

export const activeMark = (editor, format) => {
	const defaultMarkData = {
		color: "black",
		bgColor: "black",
		fontSize: 16,
		fontFamily: "sans",
	};
	const marks = Editor.marks(editor);
	const defaultValue = defaultMarkData[format];
	return marks?.[format] ?? defaultValue;
};

export const addMarkData = (editor, data) => {
	Editor.addMark(editor, data.format, data.value);
};

export const toggleMark = (editor, format) => {
	const isActive = isMarkActive(editor, format);

	if (isActive) {
		Editor.removeMark(editor, format);
	} else {
		Editor.addMark(editor, format, true);
	}
};

export const isMarkActive = (editor, format) => {
	const marks = Editor.marks(editor);

	return marks ? marks[format] === true : false;
};
