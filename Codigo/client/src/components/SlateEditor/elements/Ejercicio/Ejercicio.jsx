import React from "react";

import { HiOutlinePencil } from "react-icons/hi";
import { IoMdTrash } from "react-icons/io";
import { Transforms } from "slate";
import { ReactEditor, useFocused, useSelected, useSlateStatic } from "slate-react";

export default function Ejercicio({ attributes, children, element }) {
	const isSelected = useSelected();
	const isFocused = useFocused();
	const editor = useSlateStatic();
	const path = ReactEditor.findPath(editor, element);

	return (
		<li
			{...attributes}
			className={`relative list-decimal print:list-decimal border-2 pt-5 marker:font-bold ${
				isSelected && isFocused ? "border-[#B4D5FF]" : "border-transparent"
			}`}
		>
			<span
				className={`absolute top-0 left-0 text-modal-base print:hidden
						${isSelected && isFocused ? "inline cursor-pointer" : "hidden"} `}
			>
				<div className="flex gap-1">
					<span className="bg-button p-1 text-modal-base text-white hover:bg-button-dark">
						<HiOutlinePencil onClick={() => element.openModalUpdate(path, element.data)} />
					</span>
					<span className="bg-button p-1 text-modal-base text-white hover:bg-button-dark">
						<IoMdTrash onClick={() => Transforms.removeNodes(editor, { at: path })} />
					</span>
				</div>
			</span>
			{children}
		</li>
	);
}
