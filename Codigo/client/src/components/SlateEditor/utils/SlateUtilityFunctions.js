import { Editor, Element as SlateElement, Transforms } from "slate";

const alignment = ["alignLeft", "alignRight", "alignCenter"];
const list_types = ["numbered-list", "bulleted-list"];

export const editorFontTypes = {
	arial: { text: "Arial", value: "font-editor-arial" },
	brushScript: { text: "Brush Script MT", value: "font-editor-brushScript" },
	calibri: { text: "Calibri", value: "font-editor-calibri" },
	cambria: { text: "Cambria", value: "font-editor-cambria" },
	centuryGothic: { text: "Century Gothic", value: "font-editor-centuryGothic" },
	consolas: { text: "Consolas", value: "font-editor-consolas" },
	copperplate: { text: "Copperplate", value: "font-editor-copperplate" },
	courierNew: { text: "Courier New", value: "font-editor-courierNew" },
	franklinGothic: { text: "Franklin Gothic", value: "font-editor-franklinGothic" },
	georgia: { text: "Georgia", value: "font-editor-georgia" },
	helvetica: { text: "Helvetica", value: "font-editor-helvetica" },
	impact: { text: "Impact", value: "font-editor-impact" },
	lucida: { text: "Lucida", value: "font-editor-lucida" },
	papyrus: { text: "Papyrus", value: "font-editor-papyrus" },
	tmr: { text: "Times New Roman", value: "font-editor-TMR" },
	trebuchet: { text: "Trebuchet MS", value: "font-editor-trebuchet" },
	verdana: { text: "Verdana", value: "font-editor-verdana" },
};

export const isBlockActive = (editor, format) => {
	const [match] = Editor.nodes(editor, {
		match: (n) => !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === format,
	});

	return match;
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

export const getActiveMarkValue = (editor, format) => {
	const defaultMarkData = {
		color: "black",
		bgColor: "transparent",
		fontSize: 16,
		fontFamily: editorFontTypes.calibri.value,
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

export const insertarEjercicioEditable = (editor, nodoEjercicio, path) => {
	if (path !== null) {
		Transforms.removeNodes(editor, { at: path });
		Transforms.insertNodes(editor, nodoEjercicio, { at: path });
	} else {
		Transforms.insertNodes(editor, nodoEjercicio);
		Transforms.liftNodes(editor, { type: "paragraph", children: [{ text: "" }] });
	}
};
