import imageExtensions from "image-extensions";
import isUrl from "is-url";

import { insertImage } from "../transforms/imageTransforms";

const isImageUrl = (url) => {
	if (!url) return false;
	if (!isUrl(url)) return false;
	const ext = new URL(url).pathname.split(".").pop();
	return ext !== undefined ? imageExtensions.includes(ext) : false;
};

export const withImages = (editor) => {
	const { insertData, isVoid } = editor;

	editor.isVoid = (element) => {
		return element.type === "image" ? true : isVoid(element);
	};

	editor.insertData = (data) => {
		const text = data.getData("text/plain");
		const { files } = data;

		if (files && files.length > 0) {
			for (let i = 0; i < files.length; i++) {
				const file = files[i];
				const reader = new FileReader();
				const [mime] = file.type.split("/");

				if (mime === "image") {
					reader.addEventListener("load", () => {
						const url = String(reader.result);
						insertImage(editor, url);
					});

					reader.readAsDataURL(file);
				}
			}
		} else if (isImageUrl(text)) {
			insertImage(editor, text);
		} else {
			insertData(data);
		}
	};

	return editor;
};
