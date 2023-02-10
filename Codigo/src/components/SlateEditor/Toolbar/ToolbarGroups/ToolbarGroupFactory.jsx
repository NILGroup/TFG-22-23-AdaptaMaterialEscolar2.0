import React from "react";

import ToolbarFormatGroup from "./ToolbarFormatGroup";
import ToolbarExercisesGroup from "./ToolbarExercisesGroup";
import ToolbarTextGroup from "./ToolbarTextGroup";

export const ToolbarGroup = Object.freeze({
	file: Symbol("file"),
	format: Symbol("format"),
	exercises: Symbol("exercises"),
	text: Symbol("text"),
});

export function ToolbarGroupFactory({ type, editor, openModal }) {
	switch (type) {
		case ToolbarGroup.format:
			return <ToolbarFormatGroup editor={editor} openModal={openModal} />;
		case ToolbarGroup.exercises:
			return (
				<ToolbarExercisesGroup editor={editor} openModal={openModal} />
			);
		case ToolbarGroup.text:
			return <ToolbarTextGroup editor={editor} openModal={openModal} />;
		default:
			return null;
	}
}
