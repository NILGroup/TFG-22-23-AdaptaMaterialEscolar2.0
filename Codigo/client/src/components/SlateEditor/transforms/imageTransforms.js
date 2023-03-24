import { Transforms } from "slate";

export const insertImage = (editor, url, alt) => {
	const text = { text: "" };
	const image = { type: "image", url, alt, children: [text] };
	Transforms.insertNodes(editor, image);
};

export const updateImage = (editor, url, alt) => {
	Transforms.setNodes(editor, { url, alt });
};

export const removeImage = (editor) => {
	Transforms.removeNodes(editor, { match: (n) => n.type === "image" });
};
