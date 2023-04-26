import React, { useState } from "react";

import Modal from "../common/Modal";
import ModalCheckbox from "../common/ModalCheckbox";
import ModalInputNumber from "../common/ModalInputNumber";
import ModalOkButton from "../common/ModalOkButton";
import ModalPreview from "../common/ModalPreview";
import { ModalType } from "../ModalFactory";
import { insertarEjercicioEditable } from "../../SlateEditor/utils/SlateUtilityFunctions";

const MIN_ROWS = 1;
const MAX_ROWS = 100;

export default function DrawingModal({ editor, isOpen, onClose, openModal}) {
	const [textareaValue, setTextareaValue] = useState("");
	const [espacio, setEspacio] = useState(1);
	const [recuadrar, setRecuadrar] = useState(true);
	const [path, setPath] = useState(null);

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
		setPath(null);
	};

	const renderLines = () => {
		if (textareaValue == "") {
			return;
		}
		if (espacio > MAX_ROWS) {
			return;
		}

		return <div  className='border border-black border-solid my-1'  style={{ height: `${5 * espacio }mm` }}></div>;
	};
	const openModalUpdate = (path, data) =>{
		openModal(ModalType.drawing)
		setTextareaValue(data.textareaValue);
		setEspacio(data.espacio);
		setRecuadrar(data.recuadrar);
		setPath(path);
	}
	const insertInEditor = (editor) => {
		const ejercicio = { 
			type: "ejercicio", 
			openModalUpdate,
			data:{
				textareaValue,
				espacio,
				recuadrar
			},
			children: [] 
		};
		const enunciado = {
			type: "paragraph",
			children: [{ text: textareaValue }],
		};
		ejercicio.children.push(enunciado);
		
		ejercicio.children.push({
			type: "paragraph",
			children: [{ text: "" }],
		});
		let renderOption = recuadrar ? "square" : "square_space";

		ejercicio.children.push({
			type: "staff",
			renderOption,
			number:espacio,
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

		insertarEjercicioEditable(editor, ejercicio, path)
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
		<Modal title="Ejercicio de espacio para dibujar" className="w-6/12" isOpen={isOpen} onClose={handleClose}>
			<div className="">
				<div>
					<div className="">
						<h3 className="text-xl">Enunciado:</h3>
						<textarea
							name="enunciado"
							id=""
							rows="3"
							value={textareaValue}
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
							value={espacio}
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
