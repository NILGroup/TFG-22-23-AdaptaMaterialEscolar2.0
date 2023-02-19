import React from "react";

import { IoCloseSharp } from "react-icons/io5";

export default function ModalHeader({ title, onClose }) {
	return (
		<div className="flex bg-primary p-3 text-modal-title text-white">
			<h3 className="mx-auto font-modal-title">{title}</h3>
			<button className="hover:text-sky-500" onClick={onClose}>
				<IoCloseSharp />
			</button>
		</div>
	);
}
