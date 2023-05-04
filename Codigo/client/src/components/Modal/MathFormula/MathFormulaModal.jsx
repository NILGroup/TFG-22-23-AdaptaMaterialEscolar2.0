import React, { useState } from "react";

import Modal from "../common/Modal";

import ModalOkButton from "../common/ModalOkButton";

import ModalPreview from "../common/ModalPreview";
import { ModalType } from "../ModalFactory";
import { insertarEjercicioEditable } from "../../SlateEditor/utils/SlateUtilityFunctions";
import ModalButton from "../common/ModalButton";

import { AiOutlinePlus } from "react-icons/ai";
import { IoMdTrash } from "react-icons/io";

export default function MathFormulaModal({ editor, isOpen, onClose, openModal }) {

	const [spaceKeyIsDown, setSpaceKeyIsDown] = useState(false);
	const [backKeyIsDown, setBackKeyIsDown] = useState(false);
	const [enterKeyIsDown, setEnterKeyIsDown] = useState(false);

	const [formulas, setFormulas] = useState([[""]]);
	const [path, setPath] = useState(null);

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
		setPath(null);
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

					let seEliminoLaFila = false;

					if(newFormulas[formula_i].length == 0 && newFormulas.length == 1){
						newFormulas[formula_i] = [""];
					}
					else if(newFormulas[formula_i].length == 0 && newFormulas.length > 1){
						newFormulas.splice(formula_i, 1);
						seEliminoLaFila = true;
					}

					setFormulas(newFormulas);

					if(seEliminoLaFila){
						setTimeout(() => {
							let input = document.getElementById(`input-math-${formula_i-1}-${0}`);
							input.focus();
						}, 50);
					}
					else if (element_i > 0) {
						setTimeout(() => {
							let input = document.getElementById(`input-math-${formula_i}-${element_i - 1}`);
							input.focus();
						}, 50);
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

		formulas.forEach((formula)=>{

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

	const openModalUpdate = (path, data) =>{
		openModal(ModalType.mathFormula)
		setSpaceKeyIsDown(data.spaceKeyIsDown);
		setBackKeyIsDown(data.backKeyIsDown);
		setEnterKeyIsDown(data.enterKeyIsDown);
		setFormulas(data.formulas)
		setPath(path);
	}

	const insertInEditor = (editor) => {

		let ejercicioStrings = getArrayOfFormulasAsStrings();

		const ejercicio = {
			type: "ejercicio",	
			openModalUpdate,
			data:{
				formulas,
			},
			children: [],
		};

		let enunciado = {
			type: "enunciado",
			children: [{ text: "Completa las siguientes expresiones matemáticas:", bold:true }],
		};

		ejercicio.children.push(enunciado);

		ejercicioStrings.forEach((formulaString,i)=>{

			let formula = {
				type: "paragraph",
				children: [{ text: "    " + (i+1) + ")  " + formulaString }],
			};

			ejercicio.children.push(formula);

		});

		ejercicio.children.push({
			type: "paragraph",
			children: [{ text: "" }],
		});

		insertarEjercicioEditable(editor, ejercicio, path);
	};

	const submit = (e) => {
		e.preventDefault();

		insertInEditor(editor);

		handleClose();
	};

	const handleAddFormulaButton = ()=>{
		
		let newFormulas = [...formulas];

		newFormulas.push([""]);

		setFormulas(newFormulas);

	}

	const eliminarFormula = (formula_i) => {
		let newFormulas = [...formulas];
		newFormulas.splice(formula_i, 1);
		setFormulas(newFormulas);
	}

	const isOkDisaled = formulas.length == 1 && formulas[0].length == 1 && formulas[0][0] == "";

	return (
		<Modal title="Definir huecos de matemáticas" className="w-6/12" isOpen={isOpen} onClose={handleClose}>
			<div className="">

				<div className="flex justify-between">
					<h3 className="text-modal-heading">Fórmula:</h3>
				
					{/* <button
						className="flex h-[4vw] max-h-[2.5rem] min-h-[2rem] w-[4vw] min-w-[2rem] max-w-[2.5rem] items-center justify-center rounded-full bg-button p-2 text-white hover:bg-button-dark"
						onClick={handleAddFormulaButton}
					>
						<AiOutlinePlus size={45} />
					</button> */}
				</div>

				

				<div className="mb-2 mt-4 text-center">
					<span className="text-sky-400 text-sm">Presiona la tecla de espacio para crear un hueco y la tecla enter para crear una nueva fórmula</span>
				</div>

				{formulas.map((formula, j)=>{

					return (<>
						<div key={j} className="flex items-center mb-3">

							<div key={j} className="grow rounded bg-gray-100 px-3 pt-3 pb-1">
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

							<button
								className="shrink-0 ml-2 rounded-full bg-button p-2 text-modal-base text-white hover:bg-button-dark"
								onClick={() => {
									eliminarFormula(j);
								}}
							>
								<IoMdTrash />
							</button>

						</div>

					</>
					)

				})}


				<div className="flex justify-center">

					<button
						className="flex h-[4vw] max-h-[2.5rem] min-h-[2rem] w-[4vw] min-w-[2rem] max-w-[2.5rem] items-center justify-center rounded-full bg-button p-2 text-white hover:bg-button-dark"
						onClick={handleAddFormulaButton}
					>
						<AiOutlinePlus size={45} />
					</button>

				</div>


				<hr className="my-6" />

				<ModalPreview>
					<p  className="font-bold">Completa las siguientes expresiones matemáticas:</p>
					<div className="h-2"></div>

					{getArrayOfFormulasAsStrings().map((formulaString, i) => {
						return(
							<>
								<div key={i}>&nbsp;&nbsp; {i+1}) {formulaString}</div>
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
