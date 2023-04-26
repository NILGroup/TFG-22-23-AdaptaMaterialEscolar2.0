import React from "react";

import { HiOutlinePencil } from "react-icons/hi";
import { ReactEditor, useFocused, useSelected, useSlateStatic } from "slate-react";

export default function Definition({ attributes, children, element }) {
	const isSelected = useSelected();
	const isFocused = useFocused();
	const editor = useSlateStatic()
	const path = ReactEditor.findPath(editor, element)
	return (
			<div {...attributes} className={`relative pt-5 border-2 ${isSelected && isFocused ? 'border-[#B4D5FF]': 'border-transparent'}`}>
					<span
						className={`absolute top-0 left-0 bg-button p-1 text-modal-base text-white hover:bg-button-dark
				${isSelected && isFocused ? "inline" : "hidden"} `}
						onClick={() => element.openModalUpdate(path, element.data)}
					>
						<HiOutlinePencil />
					</span>	
				{children}	
			</div>);
}
