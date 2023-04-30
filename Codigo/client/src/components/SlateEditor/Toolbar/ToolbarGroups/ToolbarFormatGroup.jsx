import React from "react";

import { activeMark, addMarkData, isBlockActive, isMarkActive, toggleBlock, toggleMark } from "../../utils/SlateUtilityFunctions";

import { TableSelector } from "./TableSelector";
import ToolbarColorPicker from "./ToolbarColorPicker";
import ToolbarGroupButton from "./ToolbarGroupButton";
import ToolbarGroupNumberInput from "./ToolbarGroupNumberInput";

import { AiOutlineBold, AiOutlineItalic, AiOutlineOrderedList, AiOutlineStrikethrough, AiOutlineUnderline, AiOutlineUnorderedList } from "react-icons/ai";

import { MdOutlineHorizontalRule } from "react-icons/md";
import ToolbarMarkButton from "./ToolbarMarkButton";
import ToolbarBlockButton from "./ToolbarBlockButton";

const markTypes = [
	{ format: "bold", icon: <AiOutlineBold /> },
	{ format: "italic", icon: <AiOutlineItalic /> },
	{ format: "underline", icon: <AiOutlineUnderline /> },
	{ format: "strikethrough", icon: <AiOutlineStrikethrough /> },
];
const blockTypes = [
	{ format: "numbered-list" , icon: <AiOutlineOrderedList /> },
	{ format: "bulleted-list", icon: <AiOutlineUnorderedList /> },
];
export default function ToolbarFormatGroup({ editor, openModal }) {
	const changeMarkData = (value, format) => addMarkData(editor, { format, value });

	return (
		<div className="flex items-center gap-4">
			{/* Opciones de estilo (Negrita, Cursiva...) */}
			<div className="flex gap-1">
				{markTypes.map((mark) => {
					return (
						<ToolbarMarkButton
							key={`markButton-${mark.format}`}
							format={mark.format}
						>
							{mark.icon}
						</ToolbarMarkButton>
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
					<div className="flex flex-col gap-0">
						<span className="text-[1.25rem] text-black">A</span>
						<span className="h-2 w-full -translate-y-[170%]">
							<MdOutlineHorizontalRule size={35} />
						</span>
					</div>
				}
				onColorChange={(color) => {
					addMarkData(editor, { format: "color", value: color });
				}}
			/>
			{/* Opciones de bloque */}
			<div className="flex gap-1">
				{blockTypes.map((block) => {
					return (
						<ToolbarBlockButton
							key={`blockButton-${block.format}`}
							format={block.format}
						>
							{block.icon}
						</ToolbarBlockButton>
					);
				})}
			</div>
			{/* Tablas */}
			<TableSelector editor={editor} />
		</div>
	);
}
