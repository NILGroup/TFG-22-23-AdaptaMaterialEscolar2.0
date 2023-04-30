import React from "react";

import { activeMark, addMarkData, isMarkActive, toggleMark } from "../../utils/SlateUtilityFunctions";

import { TableSelector } from "./TableSelector";
import ToolbarColorPicker from "./ToolbarColorPicker";
import ToolbarGroupButton from "./ToolbarGroupButton";
import ToolbarGroupNumberInput from "./ToolbarGroupNumberInput";

import { AiOutlineBold, AiOutlineItalic, AiOutlineStrikethrough, AiOutlineUnderline } from "react-icons/ai";
import { IoMdColorFill } from "react-icons/io";
import { MdOutlineHorizontalRule } from "react-icons/md";

const markTypes = [
	{ format: "bold", icon: <AiOutlineBold /> },
	{ format: "italic", icon: <AiOutlineItalic /> },
	{ format: "underline", icon: <AiOutlineUnderline /> },
	{ format: "strikethrough", icon: <AiOutlineStrikethrough /> },
];

export default function ToolbarFormatGroup({ editor, openModal }) {
	const changeMarkData = (value, format) => addMarkData(editor, { format, value });

	return (
		<div className="flex items-center gap-2">
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
			<ToolbarColorPicker
				label={
					<div className="flex flex-col items-center gap-0">
						<span className="translate-y-[100%] text-[1.25rem] text-black">A</span>
						<MdOutlineHorizontalRule className="h-10 w-full" />
					</div>
				}
				onColorChange={(color) => {
					addMarkData(editor, { format: "color", value: color });
				}}
			/>
			<ToolbarColorPicker
				label={
					<div className="flex flex-col items-center gap-0">
						<IoMdColorFill className="translate-y-[75%] text-[1.20rem] text-black" />
						<MdOutlineHorizontalRule className="h-10 w-full" />
					</div>
				}
				onColorChange={(color) => {
					addMarkData(editor, { format: "bgColor", value: color });
				}}
			/>
			{/* Tablas */}
			<TableSelector editor={editor} />
		</div>
	);
}
