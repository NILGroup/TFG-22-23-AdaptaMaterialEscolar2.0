import React from "react";

import { IoCloseSharp } from "react-icons/io5";

export default function ModalHeader({ title, onClose }) {
	return (
		<div className="flex items-center bg-primary px-2 text-modal-title text-white">
			<h3 className="mx-auto my-4 font-modal-title">{title}</h3>
			<button className="my-2 self-start hover:text-sky-500" onClick={onClose}>
				<IoCloseSharp size={35} />
			</button>
		</div>
	);
}
