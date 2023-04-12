import React, { createRef, useState } from "react";

import { Transforms } from "slate";
import Modal from "../common/Modal";

import ModalOkButton from "../common/ModalOkButton";

import ModalPreview from "../common/ModalPreview";

export default function MathFormulaModal({ editor, isOpen, onClose }) {
	const [formula, setFormula] = useState([""]);
	const [spaceKeyIsDown, setSpaceKeyIsDown] = useState(false);
	const [backKeyIsDown, setBackKeyIsDown] = useState(false);

	const handleInputChange = (event, index) => {
		let newValue = event.target.value;

		setFormula(
			formula.map((element, i) => {
				return i === index ? newValue : element;
			})
		);
	};

	const handleClose = () => {
		resetValues();
		onClose();
	};

	const resetValues = () => {
		setFormula([""]);
	};

	const handleKeyDown = (event, index) => {
		if (event.keyCode === 32) {
			event.preventDefault();

			setSpaceKeyIsDown(true);

			if (!spaceKeyIsDown) {
				let newFormula = [...formula];

				newFormula.splice(index + 1, 0, "");

				setFormula(newFormula);

				/*let nextInput = document.getElementById(`math-input-${index+1}`);
				nextInput.focus();*/

				setFormula(newFormula);

				setTimeout(() => {
					let input = document.getElementById(`input-math-${index + 1}`);
					input.focus();
				}, 50);
			}
		} else if (event.keyCode === 8) {
			setBackKeyIsDown(true);

			if (event.target.value == "") {
				if (!backKeyIsDown) {
					let newFormula = [...formula];

					newFormula.splice(index, 1);

					if (newFormula.length == 0) {
						newFormula = [""];
					}

					setFormula(newFormula);

					if (index > 0) {
						setTimeout(() => {
							let input = document.getElementById(`input-math-${index - 1}`);
							input.focus();
						}, 50);
					}
				}
			}
		}
	};

	const handleKeyUp = (event, index) => {
		if (event.keyCode === 32) {
			setSpaceKeyIsDown(false);
		} else if (event.keyCode === 8) {
			setBackKeyIsDown(false);
		}
	};

	const renderFormula = () => {
		let ejercicioString = "";

		formula.forEach((elemento) => {
			if (elemento === "") {
				ejercicioString += "___";
			} else {
				ejercicioString += elemento;
			}

			ejercicioString += " ";
		});

		return ejercicioString;
	};

	const insertInEditor = (editor) => {
		let ejercicioString = renderFormula();

		const ejercicio = {
			type: "ejercicio",
			children: [{ text: ejercicioString }],
		};

		Transforms.insertNodes(editor, ejercicio);
	};

	const submit = (e) => {
		e.preventDefault();

		if (formula.length == 1 && formula[0] == "") {
			return;
		}

		insertInEditor(editor);

		handleClose();
	};

	const isOkDisaled = formula.length == 1 && formula[0] == "";

	return (
		<Modal title="Definir huecos de matemáticas" className="w-6/12" isOpen={isOpen} onClose={handleClose}>
			<div className="">
				<h3 className="text-modal-heading">Fórmula:</h3>

				<div className="mb-2 text-center">
					<span className="text-sky-400">Presiona la tecla de espacio para crear un hueco</span>
				</div>

				<div className="mb-3 rounded bg-gray-100 px-3 pt-3 pb-1">
					{formula.map((elemento, i) => {
						return (
							<input
								key={i}
								value={elemento}
								onChange={(e) => {
									handleInputChange(e, i);
								}}
								onKeyDown={(e) => {
									handleKeyDown(e, i);
								}}
								onKeyUp={(e) => {
									handleKeyUp(e, i);
								}}
								className="mr-2 mb-2 w-14 border-2 border-solid border-black p-2 text-center"
								id={`input-math-${i}`}
								autoComplete="off"
							/>
						);
					})}
				</div>

				<hr className="my-6" />

				<ModalPreview>{renderFormula()}</ModalPreview>

				<div className="flex justify-center">
					<ModalOkButton className="mt-2 self-center" onClick={submit} disabled={isOkDisaled} />
				</div>
			</div>
		</Modal>
	);
}
