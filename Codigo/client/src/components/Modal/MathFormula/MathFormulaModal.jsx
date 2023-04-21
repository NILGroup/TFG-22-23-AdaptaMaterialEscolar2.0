import React, { createRef, useState } from "react";

import { Transforms } from "slate";
import Modal from "../common/Modal";

import ModalOkButton from "../common/ModalOkButton";

import ModalPreview from "../common/ModalPreview";

export default function MathFormulaModal({ editor, isOpen, onClose }) {

	const [spaceKeyIsDown, setSpaceKeyIsDown] = useState(false);
	const [backKeyIsDown, setBackKeyIsDown] = useState(false);
	const [enterKeyIsDown, setEnterKeyIsDown] = useState(false);

	const [formulas, setFormulas] = useState([[""]]);

	const handleInputChange = (event, formula_i, element_i) => {

		let newValue = event.target.value;

		setFormulas(

			formulas.map((formula,j)=>{
				return formula.map((element, i)=>{

					return (j == formula_i && i == element_i) ? newValue : element;

				})
			})
		)

	};

	const handleClose = () => {
		resetValues();
		onClose();
	};

	const resetValues = () => {
		setFormulas([[""]]);
	};

	const handleKeyDown = (event, formula_i, element_i) => {
		if (event.keyCode === 32) {
			event.preventDefault();

			setSpaceKeyIsDown(true);

			if (!spaceKeyIsDown) {

				let newFormulas = [...formulas];

				newFormulas[formula_i].splice(element_i + 1, 0, "");

				setFormulas(newFormulas);

				setTimeout(() => {
					let input = document.getElementById(`input-math-${formula_i}-${element_i + 1}`);
					input.focus();
				}, 50);
			}
		}
		else if (event.keyCode === 8) {
			setBackKeyIsDown(true);

			if (event.target.value == "") {
				event.preventDefault();

				if (!backKeyIsDown) {

					let newFormulas = [...formulas];

					newFormulas[formula_i].splice(element_i, 1);

					if(newFormulas[formula_i].length == 0 && newFormulas.length == 1){
						newFormulas[formula_i] = [""];
					}
					else if(newFormulas[formula_i].length == 0 && newFormulas.length > 1){
						newFormulas.splice(formula_i, 1);
					}

					setFormulas(newFormulas);


					if (element_i > 0) {
						setTimeout(() => {
							let input = document.getElementById(`input-math-${formula_i}-${element_i - 1}`);
							input.focus();
						}, 100);
					}
				}
			}
		}
		else if (event.keyCode === 13) {

			event.preventDefault();
			
			setEnterKeyIsDown(true);

			if (!enterKeyIsDown) {

				let newFormulas = [...formulas];

				newFormulas.splice(formula_i + 1, 0, [""]);

				setFormulas(newFormulas);


				setTimeout(() => {
					let input = document.getElementById(`input-math-${formula_i+1}-${0}`);
					input.focus();
				}, 50);

			}

		}
	};

	const handleKeyUp = (event) => {
		if (event.keyCode === 32) {
			setSpaceKeyIsDown(false);
		}
		else if (event.keyCode === 8) {
			setBackKeyIsDown(false);
		}
		else if (event.keyCode === 13) {
			setEnterKeyIsDown(false);
		}
	};

	const getArrayOfFormulasAsStrings = () => {

		let ejercicioStrings = [];

		formulas.forEach((formula, j)=>{

			let formulaString = "";

			formula.forEach((elemento) => {
				if (elemento === "") {
					formulaString += "___";
				} else {
					formulaString += elemento;
				}

				formulaString += " ";
			});

			ejercicioStrings.push(formulaString);

		})

		return ejercicioStrings;

		
	};

	const insertInEditor = (editor) => {

		let ejercicioStrings = getArrayOfFormulasAsStrings();

		const ejercicio = {
			type: "paragraph",
			children: [],
		};

		let enunciado = {
			type: "paragraph",
			children: [{ text: "Completa las siguientes expresiones matemáticas:" }],
		};

		ejercicio.children.push(enunciado);

		ejercicioStrings.forEach((formulaString, i)=>{

			let formula = {
				type: "paragraph",
				children: [{ text: formulaString }],
			};

			ejercicio.children.push(formula);

		});

		Transforms.insertNodes(editor, ejercicio);

	};

	const submit = (e) => {
		e.preventDefault();

		insertInEditor(editor);

		handleClose();
	};

	const isOkDisaled = formulas.length == 1 && formulas[0].length == 1 && formulas[0][0] == "";

	return (
		<Modal title="Definir huecos de matemáticas" className="w-6/12" isOpen={isOpen} onClose={handleClose}>
			<div className="">
				<h3 className="text-modal-heading">Fórmula:</h3>

				<div className="mb-2 text-center">
					<span className="text-sky-400 text-sm">Presiona la tecla de espacio para crear un hueco y la tecla enter para crear una nueva fórmula</span>
				</div>


				{formulas.map((formula, j)=>{

					return (
						<div key={j} className="mb-3 rounded bg-gray-100 px-3 pt-3 pb-1">
							{formula.map((elemento, i) => {
								return (
									<input
										key={i}
										value={elemento}
										onChange={(e) => {
											handleInputChange(e, j, i);
										}}
										onKeyDown={(e) => {
											handleKeyDown(e, j, i);
										}}
										onKeyUp={(e) => {
											handleKeyUp(e);
										}}
										className="mr-2 mb-2 w-14 border-2 border-solid border-black p-2 text-center"
										id={`input-math-${j}-${i}`}
										autoComplete="off"
									/>
								);
							})}
						</div>
					)

				})}



				<hr className="my-6" />

				<ModalPreview>
					<p>Completa las siguientes expresiones matemáticas:</p>
					<div className="h-2"></div>

					{getArrayOfFormulasAsStrings().map((formulaString, i) => {
						return(
							<>
								<div key={i}>{formulaString}</div>
								<br />
							</>
						)
					})}
				</ModalPreview>

				<div className="flex justify-center">
					<ModalOkButton className="mt-2 self-center" onClick={submit} disabled={isOkDisaled} />
				</div>
			</div>
		</Modal>
	);
}
