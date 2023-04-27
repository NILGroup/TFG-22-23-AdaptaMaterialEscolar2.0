import React, { useState } from "react";

import { AiOutlineClose } from "react-icons/ai";

export default function ModalAlertButton({
	icon,
	iconButtonClassName,
	defaultIsOpen = true,
	alertBoxClassName,
	placement = "center",
	listStyle = "list-inside list-disc",
	contentList,
}) {
	const [isOpen, setIsOpen] = useState(defaultIsOpen);

	//#region Manejadores de eventos
	const onOpen = () => setIsOpen(contentList && contentList.length > 0 ? !isOpen : false);

	const onClose = () => setIsOpen(false);

	//#endregion

	return (
		<div className="relative flex items-center">
			<button
				className={`${iconButtonClassName} disabled:text-grey-dark`}
				disabled={!contentList || contentList.length <= 0}
				onClick={(e) => {
					e.preventDefault();

					onOpen();
				}}
			>
				{icon}
			</button>
			{contentList && contentList.length > 0 && isOpen && (
				<div
					className={`${alertBoxClassName} absolute ${
						placement === "center" ? "left-4" : placement === "left" ? "left-[-5.5vw]" : "left-[5.5vw]"
					} top-0 grid w-[20vw] min-w-[5rem] max-w-xs translate-y-[2rem] translate-x-[-50%] grid-cols-[auto_auto] gap-4 rounded-md bg-opacity-95 px-2 py-4 text-start text-modal-alert-box shadow-md supports-[backdrop-filter]:bg-opacity-30 supports-[backdrop-filter]:backdrop-blur`}
				>
					<ul className={listStyle}>
						{contentList.map((alertBoxElement, index) => (
							<li key={`alertBoxElement-${index}`}>{alertBoxElement}</li>
						))}
					</ul>
					<button className="flex items-start" onClick={onClose}>
						<AiOutlineClose className="hover:text-button" />
					</button>
				</div>
			)}
		</div>
	);
}
