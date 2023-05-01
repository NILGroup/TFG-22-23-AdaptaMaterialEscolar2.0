import React, { useState } from "react";

import Modal from "../common/Modal";
import ModalInputNumber from "../common/ModalInputNumber";
import ModalOkButton from "../common/ModalOkButton";
import ModalPreview from "../common/ModalPreview";
import { StaffButtonFactory, StaffType } from "../common/StaffButtonFactory";
import imagenes from "../../../assets/imagenes";
import { insertarEjercicioEditable } from "../../SlateEditor/utils/SlateUtilityFunctions";
import { ModalType } from "../ModalFactory";

const MIN_ROWS = 1;
const MAX_ROWS = 100;

export default function DesarrolloModal({ editor, isOpen, onClose, openModal }) {
	const [textareaValue, setTextareaValue] = useState("");
	const [numFilas, setNumFilas] = useState(1);
	const [value, setValue] = useState("");
	const [path, setPath] = useState(null);

	const handleEnunciadoChange = (event) => {
		setTextareaValue(event.target.value);
	};

	const handleNumFilasChange = (event) => {
		setNumFilas(event.target.value);
	};

	const handleClose = () => {
		resetValues();
		onClose();
	};

	const resetValues = () => {
		setTextareaValue("");
		setNumFilas(1);
		setValue("");
		setPath(null);
	};

	const renderLines = () => {
		if (textareaValue == "") {
			return;
		}
		if (numFilas > MAX_ROWS) {
			return;
		}

		let lines = [];
		let renderOption = value === "" ? "doubleLine_2_5" : value;
		let space = () => /^doubleLine/.test(renderOption) && <div style={{ height: '5mm' }}></div>;

		if(renderOption === 'square'){
			lines.push(
				<div className='border border-black border-solid' style={{ height: `${5 * numFilas}mm` }}>
				</div>
			);
		}
		else if(renderOption === 'square_space'){
			lines.push(
				<div style={{ height: `${5 * numFilas}mm` }}>
				</div>
			);	
		}
		else{
			for (let i = 0; i < numFilas; i++) {
				lines.push(
					<div key={`pauta_${i}`}>
						<img src={imagenes[renderOption]} />
						{space()}
					</div>
				);
			}
		}
		return lines;
	};
	const openModalUpdate = (path, data) =>{
		openModal(ModalType.desarrollo)
		setTextareaValue(data.textareaValue);
		setNumFilas(data.numFilas);
		setValue(data.value);
		setPath(path);
	}
	const insertInEditor = (editor) => {
		const ejercicio = { 
			type: "ejercicio",
			openModalUpdate,
			data: {
				textareaValue,
				numFilas,
				value
			},
			children: [] 
		};
		const enunciado = {
			type: "enunciado",
			children: [{ text: textareaValue, bold: true }],
		};
		ejercicio.children.push(enunciado);

		//Salto de linea
		ejercicio.children.push({
			type: "paragraph",
			children: [{ text: "" }],
		});

		let renderOption = value === "" ? "doubleLine_2_5" : value;

		if(renderOption === 'square' || renderOption === 'square_space'){
			ejercicio.children.push({
				type: "staff",
				renderOption,
				number:numFilas,
				children: [{ text: "" }],
			});
		}
		else {
			for (let j = 0; j < numFilas; j++) {
				ejercicio.children.push({
					type: "staff",
					renderOption,
					children: [{ text: "" }],
				});
			}
		}

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

	const isOkDisaled = textareaValue.length == 0 || numFilas < MIN_ROWS || numFilas > MAX_ROWS;

	return (
		<Modal title="Ejercicio de desarrollo" className="w-6/12" isOpen={isOpen} onClose={handleClose}>
			<div className="">
				<div>
					<div className="">
						<h3 className="text-xl">Enunciado:</h3>
						<textarea
							name="enunciado"
							id=""
							rows="5"
							value={textareaValue}
							onChange={handleEnunciadoChange}
							className="input-textarea w-full"
							required
						></textarea>
					</div>

					<div className="my-5 flex gap-6">
						<ModalInputNumber
							id="num_filas"
							label="Número de filas:"
							name="num_filas"
							value={numFilas}
							min={MIN_ROWS}
							max={MAX_ROWS}
							onChange={handleNumFilasChange}
						/>
					</div>

					<div className="">
						<h2 className="mr-5 inline-block text-xl">Tipo de pauta:</h2>

						<div className="flex flex-col p-4">
							<div className="flex flex-wrap gap-4">
								<StaffButtonFactory setValue={setValue} type={StaffType.grid} />
								<StaffButtonFactory setValue={setValue} type={StaffType.doubleLine} />
								<StaffButtonFactory setValue={setValue} type={StaffType.line} />
								<StaffButtonFactory setValue={setValue} type={StaffType.box} />
								<StaffButtonFactory setValue={setValue} type={StaffType.space} />
							</div>
						</div>
					</div>

					<hr className="my-6" />

					<ModalPreview>
						<p className="font-bold">{textareaValue}</p>
						<p className="h-4"> </p>
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
