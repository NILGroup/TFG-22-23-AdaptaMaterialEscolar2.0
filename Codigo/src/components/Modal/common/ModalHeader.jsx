import React from "react";

import { IoCloseSharp } from "react-icons/io5";

export default function ModalHeader({ title, onClose }) {
	return (
		<div className="flex bg-red-300 p-3 text-4xl text-white">
			<h3 className="mx-auto">{title}</h3>
			<button className="hover:text-sky-500" onClick={onClose}>
				<IoCloseSharp />
			</button>
		</div>
	);
}
