const inlineTypes = ["icon", "image"];

export const withInline = (editor) => {
	const { isInline } = editor;

	// Entendera que es un elemento en linea y permitira escribir al lado
	editor.isInline = (element) => (inlineTypes.some((type) => type === element.type) ? true : isInline(element));

	return editor;
};