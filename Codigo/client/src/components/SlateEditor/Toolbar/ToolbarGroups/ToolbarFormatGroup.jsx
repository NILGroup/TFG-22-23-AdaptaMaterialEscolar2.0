import React from "react";

import { useSlate } from "slate-react";

import { TableSelector } from "./TableSelector";
import ToolbarBlockButton from "./ToolbarBlockButton";
import ToolbarColorPicker from "./ToolbarColorPicker";
import ToolbarGroupButton from "./ToolbarGroupButton";
import ToolbarGroupNumberInput from "./ToolbarGroupNumberInput";
import ToolbarGroupSelect from "./ToolbarGroupSelect";

import {
	AiOutlineAlignCenter,
	AiOutlineAlignLeft,
	AiOutlineAlignRight,
	AiOutlineBold,
	AiOutlineItalic,
	AiOutlineOrderedList,
	AiOutlineStrikethrough,
	AiOutlineUnderline,
	AiOutlineUnorderedList,
} from "react-icons/ai";
import { IoMdColorFill } from "react-icons/io";
import { MdOutlineHorizontalRule } from "react-icons/md";

import {
	addMarkData,
	editorFontTypes,
	getActiveMarkValue,
	isMarkActive,
	toggleMark,
} from "../../utils/SlateUtilityFunctions";
import { BsJustify } from "react-icons/bs";

const markTypes = [
	{ format: "bold", icon: <AiOutlineBold /> },
	{ format: "italic", icon: <AiOutlineItalic /> },
	{ format: "underline", icon: <AiOutlineUnderline /> },
	{ format: "strikethrough", icon: <AiOutlineStrikethrough /> },
];

const blockTypes = [
	{ format: "numbered-list", icon: <AiOutlineOrderedList /> },
	{ format: "bulleted-list", icon: <AiOutlineUnorderedList /> },
];
const alignmentTypes = [
	{format:"left", icon: <AiOutlineAlignLeft/>}, 
	{format:"right", icon: <AiOutlineAlignRight />},
	{format:"center", icon: <AiOutlineAlignCenter/>},
	{format:"justify", icon: <BsJustify/>}

];


export default function ToolbarFormatGroup({ editor, openModal }) {
	const reactEditor = useSlate();
	const changeMarkData = (value, format) => addMarkData(editor, { format, value });

	return (
		<div className="flex items-center gap-2">
			{/* Opciones de estilo (Negrita, Cursiva...) */}
			<div className="flex gap-1">
				{markTypes.map((mark) => {
					return (
						<ToolbarGroupButton
							key={`markButton-${mark.format}`}
							isActive={isMarkActive(reactEditor, mark.format)}
							onClick={(e) => {
								e.preventDefault();

								toggleMark(reactEditor, mark.format);
							}}
						>
							{mark.icon}
						</ToolbarGroupButton>
					);
				})}
			</div>
			{/* Opciones de fuente */}
			<div className="flex gap-0.5">
				<ToolbarGroupSelect
					className="w-52 rounded-r-none"
					options={Object.values(editorFontTypes)}
					value={getActiveMarkValue(reactEditor, "fontFamily")}
					onChange={(e) => {
						e.preventDefault();

						changeMarkData(e.target.value, "fontFamily");
					}}
				/>
				<ToolbarGroupNumberInput
					min="1"
					max="100"
					className="rounded-l-none border-2 border-grey-dark bg-grey-light py-1"
					value={getActiveMarkValue(reactEditor, "fontSize")}
					onChange={(e) => {
						e.preventDefault();

						changeMarkData(e.target.value, "fontSize");
					}}
				/>
			</div>
			<ToolbarColorPicker
				label={
					<div className="flex flex-col gap-0">
						<span className="text-[1.25rem] text-black">A</span>
						<span className="h-2 w-full -translate-y-[170%]">
							<MdOutlineHorizontalRule size={35} />
						</span>
					</div>
				}
				value={getActiveMarkValue(reactEditor, "color")}
				onColorChange={(color) => {
					addMarkData(editor, { format: "color", value: color });
				}}
			/>
			<ToolbarColorPicker
				label={
					<div className="flex flex-col items-center gap-0">
						<IoMdColorFill className="text-[1.15rem] text-black" />
						<span className="h-2 w-full -translate-y-[170%]">
							<MdOutlineHorizontalRule size={35} />
						</span>
					</div>
				}
				transparentColorEnabled
				value={getActiveMarkValue(reactEditor, "bgColor")}
				onColorChange={(color) => {
					addMarkData(editor, { format: "bgColor", value: color });
				}}
			/>
			{/* Opciones de bloque */}
			<div className="flex gap-1">
				{blockTypes.map((block) => {
					return (
						<ToolbarBlockButton key={`blockButton-${block.format}`} format={block.format}>
							{block.icon}
						</ToolbarBlockButton>
					);
				})}
			</div>
			<div className="flex gap-1">
				{alignmentTypes.map((block) => {
					return (
						<ToolbarBlockButton key={`blockButton-${block.format}`} format={block.format}>
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
