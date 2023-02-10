import React from "react";

import style from "./Modal.module.css";

import ModalHeader from "./ModalHeader";

export default function Modal({ title, isOpen, onClose, children }) {
	if (!isOpen) return null;

	return (
		<div className={style.modalOverlay}>
			<div className={style.modalContainer}>
				<ModalHeader title={title} onClose={onClose} />
				<div className={style.modalBody}>{children}</div>
			</div>
		</div>
	);
}
