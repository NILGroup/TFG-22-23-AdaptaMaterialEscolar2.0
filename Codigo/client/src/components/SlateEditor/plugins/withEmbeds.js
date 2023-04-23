const embedTypes = ["embeds", "icon", "image", "relateConcepts", "pictotranslator", "staff"];

export const withEmbeds = (editor) => {
	const { isVoid } = editor;

	editor.isVoid = (element) => (embedTypes.includes(element.type) ? true : isVoid(element));

	return editor;
};
