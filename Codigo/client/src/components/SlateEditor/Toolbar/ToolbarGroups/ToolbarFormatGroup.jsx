import React, { useState } from "react";

import { activeMark, addMarkData, isMarkActive, sizeMap, toggleMark } from "../../utils/SlateUtilityFunctions";

import ToolbarGroupButton from "./ToolbarGroupButton";

import { AiOutlineBold, AiOutlineItalic, AiOutlineStrikethrough, AiOutlineUnderline } from "react-icons/ai";
import { TableSelector } from "./TableSelector";
import ToolbarGroupNumberInput from "./ToolbarGroupNumberInput";

const markTypes = [
	{ format: "bold", icon: <AiOutlineBold /> },
	{ format: "italic", icon: <AiOutlineItalic /> },
	{ format: "underline", icon: <AiOutlineUnderline /> },
	{ format: "strikethrough", icon: <AiOutlineStrikethrough /> },
];

export default function ToolbarFormatGroup({ editor, openModal }) {
	const changeMarkData = (value, format) => addMarkData(editor, { format, value });

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
			<ToolbarGroupNumberInput
				label="Tamaño de letra:"
				defaultValue={16}
				checkValue={() => activeMark(editor, "fontSize")}
				min="1"
				max="100"
				onChange={(e) => {
					e.preventDefault();

					changeMarkData(e.target.value, "fontSize");
				}}
			/>
			{/* Tablas */}
			<TableSelector editor={editor} />
		</div>
	);
}
