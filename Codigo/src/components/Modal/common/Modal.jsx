import React from "react";

import ModalHeader from "./ModalHeader";

export default function Modal({ title, className, isOpen, onClose, children }) {
	if (!isOpen) return null;

	document.body.style.overflow = "hidden";

	const closeModal = () => {
		document.body.style.overflow = "auto";
		onClose();
	};

	return (
		<div className="relative z-10">
			{/* Modal Overlay */}
			<div className="fixed inset-0 bg-gray-800 bg-opacity-75 backdrop-blur-sm"></div>

			{/* Modal */}
			<div className="fixed inset-0 z-10 overflow-y-auto py-5">
				{/* Modal Container */}
				<div className="flex min-h-full items-center justify-center text-center">
					{/* Modal Dialog */}
					<div
						className={`${className} relative transform overflow-hidden rounded-md text-left shadow-xl`}
					>
						{/* Modal Header */}
						<ModalHeader title={title} onClose={closeModal} />

						{/* Modal Body */}
						<div className="bg-white px-5 py-6">{children}</div>
					</div>
				</div>
			</div>
		</div>
	);
}
