import React, { useState } from "react";

import { Transforms } from "slate";
import Modal from "../common/Modal";

export default function MathFormulaModal({ editor, isOpen, onClose }) {

	const [formula, setFormula] = useState([""]);

	const handleInputChange = (event, index) => {

		let newValue = event.target.value;

		setFormula(
			formula.map((element, i)=>{
				return i === index ? newValue : element;
			})
		)

	};

	const handleKeyDown = (event, index) => {
		if (event.keyCode === 32) {
			event.preventDefault();

			let newFormula = [...formula];

			newFormula.splice(index+1,0,"")

			setFormula(newFormula)
		}
		else if(event.keyCode === 8){

			if(event.target.value == ""){
				event.preventDefault();

				let newFormula = [...formula];

				newFormula.splice(index, 1);

				if(newFormula.length == 0){
					newFormula = [""];
				}

				setFormula(newFormula);
			}

		}
	};


	const insertInEditor = (editor) => {
		onClose();

		let ejercicioString = "";

		formula.forEach(elemento => {

			if(elemento === ""){
				ejercicioString += "___";
			}
			else{
				ejercicioString += elemento;
			}

			ejercicioString += " ";

		})

		const ejercicio = {
			type: "ejercicio",
			children: [{ text: ejercicioString }],
		};

		Transforms.insertNodes(editor, ejercicio);
	};


	const submit = (e) => {
		e.preventDefault();
		
		insertInEditor(editor);

		setFormula([""]);
	};


	return (
		<Modal
			title="Definir huecos de matemáticas"
			className="w-6/12"
			isOpen={isOpen}
			onClose={onClose}
		>
			<div className="">
				<form onSubmit={submit}>

					<h3 className="text-modal-heading">Fórmula:</h3>

					<div className="text-center mb-2">
						<span className="text-sky-400">Presiona la tecla de espacio para crear un hueco</span>
					</div>

					<div className="px-3 pt-3 pb-1 bg-gray-100 rounded">
						
						{
							formula.map((elemento, i) => {
								return (
									<input 
										key={i} 
										value={elemento} 
										onChange={e => {
											handleInputChange(e,i);
										}}
										onKeyDown={e => {
											handleKeyDown(e,i);
										}}
										className="w-14 p-2 mr-2 mb-2 border-solid border-2 border-black text-center" 
									/>
								);
							})
						}

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
