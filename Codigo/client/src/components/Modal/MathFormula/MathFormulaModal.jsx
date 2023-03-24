import React, { createRef, useState } from "react";

import { Transforms } from "slate";
import Modal from "../common/Modal";

export default function MathFormulaModal({ editor, isOpen, onClose }) {
	const [formula, setFormula] = useState([""]);

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
		} else if (event.keyCode === 8) {
			if (event.target.value == "") {
				event.preventDefault();

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
	};

	const insertInEditor = (editor) => {
		let ejercicioString = "";

		formula.forEach((elemento) => {
			if (elemento === "") {
				ejercicioString += "___";
			} else {
				ejercicioString += elemento;
			}

			ejercicioString += " ";
		});

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

	return (
		<Modal title="Definir huecos de matemáticas" className="w-6/12" isOpen={isOpen} onClose={handleClose}>
			<div className="">
				<form onSubmit={submit}>
					<h3 className="text-modal-heading">Fórmula:</h3>

					<div className="mb-2 text-center">
						<span className="text-sky-400">Presiona la tecla de espacio para crear un hueco</span>
					</div>

					<div className="rounded bg-gray-100 px-3 pt-3 pb-1">
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
									className="mr-2 mb-2 w-14 border-2 border-solid border-black p-2 text-center"
									id={`input-math-${i}`}
									autoComplete="off"
								/>
							);
						})}
					</div>

					<div className="flex justify-center">
						<button
							type="submit"
							className="mt-5 w-2/12 self-center rounded-md bg-sky-500 py-2 text-[1.4rem] text-white hover:bg-sky-600"
						>
							OK
						</button>
					</div>
				</form>
			</div>
		</Modal>
	);
}
