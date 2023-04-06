import React, { useState } from "react";

import { Transforms } from "slate";
import Modal from "../common/Modal";
import ModalInputNumber from "../common/ModalInputNumber";
import ModalOkButton from "../common/ModalOkButton";
import ModalPreview from "../common/ModalPreview";
import guideLine from "./GuideLine.module.css";
import ModalCheckbox from "../common/ModalCheckbox";

const MIN_ROWS = 1;
const MAX_ROWS = 100;

export default function DrawingModal({ editor, isOpen, onClose }) {
	const [textareaValue, setTextareaValue] = useState("");
	const [espacio, setEspacio] = useState(1);
	const [recuadrar, setRecuadrar] = useState(true);

	const handleEnunciadoChange = (event) => {
		setTextareaValue(event.target.value);
	};

	const handleEspacioChange = (event) => {
		setEspacio(event.target.value);
	};

	const handleRecuadrarChange = (event) => {
		setRecuadrar(event.target.checked);
	};

	const handleClose = () => {
		resetValues();
		onClose();
	};

	const resetValues = () => {
		setTextareaValue("");
		setEspacio(1);
		setRecuadrar(true);
	};

	const renderLines = () => {
		if (textareaValue == "") {
			return;
		}
		if (espacio > MAX_ROWS) {
			return;
		}

		return(
			<div className={recuadrar? guideLine.recuadrar : ""} style={{"height": espacio+"cm"}}>

			</div>
		)

	};

	const insertInEditor = (editor) => {
		const ejercicio = { type: "desarrollo", children: [] };
		const enunciado = {
			type: "paragraph",
			children: [{ text: textareaValue }],
		};
		ejercicio.children.push(enunciado);

		let renderOption = recuadrar ? "recuadrar" : "";

		ejercicio.children.push({
			type: "drawingSpace",
			style: renderOption,
			height: espacio+"cm",
			children: [{ text: "" }],
		});
		ejercicio.children.push({
			type: "embeds",
			style: "space",
			children: [{ text: "" }],
		});

		ejercicio.children.push({
			type: "paragraph",
			children: [{ text: "" }],
		});

		Transforms.insertNodes(editor, ejercicio);
	};

	const submit = (e) => {
		e.preventDefault();

		if (textareaValue.trim() == "") {
			return;
		}

		insertInEditor(editor);

		handleClose();
	};

	const isOkDisaled = textareaValue.length == 0 || espacio < MIN_ROWS || espacio > MAX_ROWS;

	return (
		<Modal title="Ejercicio de desarrollo" className="w-6/12" isOpen={isOpen} onClose={handleClose}>
			<div className="">
				<div>
					<div className="">
						<h3 className="text-xl">Enunciado:</h3>
						<textarea
							name="enunciado"
							id=""
							rows="3"
							onChange={handleEnunciadoChange}
							className="input-textarea w-full"
							required
						></textarea>
					</div>

					<div className="my-5 flex gap-6">
						<ModalInputNumber
							id="num_filas"
							label="Espacio:"
							name="num_filas"
							min={MIN_ROWS}
							max={MAX_ROWS}
							onChange={handleEspacioChange}
						/>
					</div>

					<div className="my-5">

						<ModalCheckbox
							label={"Recuadrar"}
							name={"recuadrar"}
							id={"recuadrar"}
							defaultChecked={recuadrar}
							onChange={handleRecuadrarChange}
						/>
					</div>

					<hr className="my-6" />

					<ModalPreview>
						{textareaValue}
						{renderLines()}
					</ModalPreview>

					<div className="flex justify-center">
						<ModalOkButton className="mt-2 self-center" onClick={submit} disabled={isOkDisaled} />
					</div>
				</div>
			</div>
		</Modal>
	);
}
