export const withRelateConcepts = (editor) => {
	const { isVoid } = editor;

	editor.isVoid = (element) => (element.type === "relateConcepts" ? true : isVoid(element));

	return editor;
};
