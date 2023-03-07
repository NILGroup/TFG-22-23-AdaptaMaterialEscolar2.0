import React from "react";

import { toggleBoldMark } from "../../utils/SlateFunction";

import ToolbarGroupButton from "./ToolbarGroupButton";

import { AiOutlineBold } from "react-icons/ai";
import { TableSelector } from "./TableSelector";


export default function ToolbarFormatGroup({ editor, openModal }) {
	return (
		<>
			<ToolbarGroupButton onClick={() => toggleBoldMark(editor)}>
				<AiOutlineBold />
			</ToolbarGroupButton>
			<TableSelector editor={editor}/>
		</>
	);
}
