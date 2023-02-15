import React from "react";

import style from "../common/Modal.module.css";

import { Transforms } from "slate";

export default function ModalPictogramList({ editor, pictograms, callback }) {
	const insertPictogram = (editor, url) => {
		const text = { text: "" };
		const pictogram = { type: "image", url, children: [text] };

		//TODO: Seleccionar editor
		Transforms.insertNodes(editor, pictogram);
	};

	if (pictograms === null) return null;

	if (pictograms.length <= 0)
		return (
			<h4 className={style.modalWarning}>
				No se han encontrado imágenes.
			</h4>
		);

	return (
		<div className={style.modalPictogramList}>
			{pictograms.map((pictogram, index) => (
				<button
					key={`pictogram-${index}`}
					onClick={(event) => {
						event.preventDefault();
						insertPictogram(editor, pictogram);

						if (callback) callback();
					}}
					className={style.modalPictogram}
				>
					<img
						src={pictogram}
						alt={`Pictogram ${index}`}
						className={style.modalImage}
					/>
				</button>
			))}
		</div>
	);
}
