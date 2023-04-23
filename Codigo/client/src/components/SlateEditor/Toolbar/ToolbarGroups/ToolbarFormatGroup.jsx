import React, { useState } from "react";

import { activeMark, addMarkData, isMarkActive, sizeMap, toggleMark } from "../../utils/SlateUtilityFunctions";

import ToolbarGroupButton from "./ToolbarGroupButton";

import { AiOutlineBold, AiOutlineItalic, AiOutlineStrikethrough, AiOutlineUnderline } from "react-icons/ai";
import { TableSelector } from "./TableSelector";
import ToolbarGroupSelect from "./ToolbarGroupSelect";

const markTypes = [
	{ format: "bold", icon: <AiOutlineBold /> },
	{ format: "italic", icon: <AiOutlineItalic /> },
	{ format: "underline", icon: <AiOutlineUnderline /> },
	{ format: "strikethrough", icon: <AiOutlineStrikethrough /> },
];

export default function ToolbarFormatGroup({ editor, openModal }) {
	const changeMarkData = (e, format) => {
		e.preventDefault();

		const value = e.target.value;
		addMarkData(editor, { format, value });
	};

	return (
		<div className="flex items-center gap-4">
			{/* Opciones de estilo (Negrita, Cursiva...) */}
			<div className="flex gap-1">
				{markTypes.map((mark) => {
					return (
						<ToolbarGroupButton
							key={`markButton-${mark.format}`}
							checkActive={() => {
								return isMarkActive(editor, mark.format);
							}}
							onClick={(e) => {
								e.preventDefault();

								toggleMark(editor, mark.format);
							}}
						>
							{mark.icon}
						</ToolbarGroupButton>
					);
				})}
			</div>
			{/* Opciones de fuente */}
			<ToolbarGroupSelect
				options={Object.keys(sizeMap).map((key) => sizeMap[key])}
				defaultValue={"text-base"}
				checkValue={() => activeMark(editor, "fontSize")}
				onChange={(e) => changeMarkData(e, "fontSize")}
			/>
			{/* Tablas */}
			<TableSelector editor={editor} />
		</div>
	);
}
