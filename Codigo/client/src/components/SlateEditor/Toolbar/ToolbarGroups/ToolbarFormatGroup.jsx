import React from "react";

import {
	toggleBoldMark,
	toggleItalicMark,
	toggleStrikethroughMark,
	toggleUnderlineMark,
} from "../../utils/SlateFunction";

import ToolbarGroupButton from "./ToolbarGroupButton";

import { AiOutlineBold, AiOutlineItalic, AiOutlineStrikethrough, AiOutlineUnderline } from "react-icons/ai";
import { TableSelector } from "./TableSelector";

export default function ToolbarFormatGroup({ editor, openModal }) {
	return (
		<>
			<ToolbarGroupButton onClick={() => toggleBoldMark(editor)}>
				<AiOutlineBold />
			</ToolbarGroupButton>
			<ToolbarGroupButton onClick={() => toggleItalicMark(editor)}>
				<AiOutlineItalic />
			</ToolbarGroupButton>
			<ToolbarGroupButton onClick={() => toggleUnderlineMark(editor)}>
				<AiOutlineUnderline />
			</ToolbarGroupButton>
			<ToolbarGroupButton onClick={() => toggleStrikethroughMark(editor)}>
				<AiOutlineStrikethrough />
			</ToolbarGroupButton>
			<TableSelector editor={editor} />
		</>
	);
}
