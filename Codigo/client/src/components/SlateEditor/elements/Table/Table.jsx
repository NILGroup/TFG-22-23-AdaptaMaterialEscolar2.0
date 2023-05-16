import React from "react";

import { AiOutlineInsertRowBelow } from "react-icons/ai";
import { IoMdTrash } from "react-icons/io";
import { Transforms } from "slate";
import { ReactEditor, useFocused, useSelected, useSlateStatic } from "slate-react";
import { createRow } from "../../utils/TableUtil";

export default function Table({ attributes, children, element }) {
	const editor = useSlateStatic();
	const path = ReactEditor.findPath(editor, element);
	const isSelected = useSelected();
	const isFocused = useFocused();

	return (
		<div className="relative pt-7">
			<span
				className={`absolute top-0 left-0 p-1 text-modal-base print:hidden 
			${isSelected && isFocused ? "inline cursor-pointer" : "hidden"} `}
			>
				<div className="flex gap-2">
					<span className="bg-gray-500 text-white hover:bg-gray-600">
						<IoMdTrash onClick={() => Transforms.removeNodes(editor, { at: path })} />
					</span>
				</div>
			</span>
			<table
				className={`border-collapse border border-slate-500 ${
					element.style !== undefined ? element.style : ""
				}`}
			>
				<tbody {...attributes}>{children}</tbody>
			</table>
		</div>
	);
}

function insertRow(element) {
	const cellText = new Array(element.children[0].children.length);
	return createRow(cellText);
}
