import { Editor } from "slate";

export const sizeMap = {
	xs: { text: "Muy Pequeño", value: "text-xs" },
	sm: { text: "Pequeño", value: "text-sm" },
	base: { text: "Normal", value: "text-base" },
	lg: { text: "Grande", value: "text-lg" },
	xl: { text: "Muy Grande", value: "text-xl" },
};

export const activeMark = (editor, format) => {
	const defaultMarkData = {
		color: "black",
		bgColor: "black",
		fontSize: sizeMap.base.value,
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
