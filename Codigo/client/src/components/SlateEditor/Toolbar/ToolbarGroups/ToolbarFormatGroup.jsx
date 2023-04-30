import React from "react";

import { activeMark, addMarkData } from "../../utils/SlateUtilityFunctions";

import { TableSelector } from "./TableSelector";
import ToolbarColorPicker from "./ToolbarColorPicker";
import ToolbarGroupButton from "./ToolbarGroupButton";
import ToolbarGroupNumberInput from "./ToolbarGroupNumberInput";

import { AiOutlineBold, AiOutlineItalic, AiOutlineOrderedList, AiOutlineStrikethrough, AiOutlineUnderline, AiOutlineUnorderedList } from "react-icons/ai";
import { IoMdColorFill } from "react-icons/io";
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
		<div className="flex items-center gap-2">
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
					<div className="flex flex-col items-center gap-0">
						<IoMdColorFill className="translate-y-[75%] text-[1.20rem] text-black" />
						<MdOutlineHorizontalRule className="h-10 w-full" />
					</div>
				}
				onColorChange={(color) => {
					addMarkData(editor, { format: "bgColor", value: color });
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
