import React from "react";

import style from "./Modal.module.css";

export default function ModalPreview({ children }) {
	return (
		<div className="w-full max-w-full">
			<div className="rounded-md rounded-b-none border-2 border-gray-300 bg-gray-200 px-4 py-2">
				<h4 className={style.modalHeading}>Vista previa</h4>
			</div>
			<div className="h-60 max-h-60 overflow-auto rounded-md rounded-t-none border-2 border-t-0 border-gray-300 bg-gray-100 px-4 py-2">
				{children}
			</div>
		</div>
	);
}
