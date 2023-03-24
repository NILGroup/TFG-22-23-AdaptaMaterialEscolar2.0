export const withEmbeds = (editor) => {
	const { isVoid } = editor;

	editor.isVoid = (element) => (element.type === "embeds" ? true : isVoid(element));

	return editor;
};
