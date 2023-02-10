import React from "react";

import style from "./Modal.module.css";

export default function ModalPreview({ children }) {
	return (
		<div className={style.modalPreview}>
			<div className={style.modalPreviewHeader}>
				<h4 className={style.modalHeading}>Vista previa</h4>
			</div>
			<div className={style.modalPreviewBody}>{children}</div>
		</div>
	);
}
