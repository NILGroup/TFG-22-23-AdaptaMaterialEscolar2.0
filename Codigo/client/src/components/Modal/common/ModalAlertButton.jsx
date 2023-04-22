import React, { useState } from "react";

import { AiOutlineClose } from "react-icons/ai";

// TODO: Buscar manera de que no se corte la alerta si sale del modal

export default function ModalAlertButton({
	icon,
	iconButtonClassName,
	alertBoxClassName,
	listStyle = "list-inside list-disc",
	contentList,
}) {
	const [isOpen, setIsOpen] = useState(true);

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
					className={`${alertBoxClassName} absolute top-0 left-4 mx-2 grid w-[20vw] min-w-[10rem] translate-y-[2rem] translate-x-[-50%] grid-cols-[auto_auto] gap-4 rounded-md bg-opacity-30 px-2 py-4 text-start text-modal-alert-box shadow-md backdrop-blur-lg`}
				>
					<ul className={listStyle}>
						{contentList.map((alertBoxElement, index) => (
							<li key={`alertBoxElement-${index}`}>{alertBoxElement}</li>
						))}
					</ul>
					<button className="flex items-start" onClick={onClose}>
						<AiOutlineClose size={25} className="hover:text-button" />
					</button>
				</div>
			)}
		</div>
	);
}
