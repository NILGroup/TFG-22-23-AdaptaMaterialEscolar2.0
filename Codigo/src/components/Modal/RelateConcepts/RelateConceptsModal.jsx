import React, { useEffect, useState } from "react";

import { Transforms } from "slate";
import { BiRectangle } from "react-icons/bi";
import Modal from "../common/Modal";
import ModalPreview from "../common/ModalPreview";
import ModalInputNumber from "../common/ModalInputNumber";

export default function RelateConceptsModal({ editor, isOpen, onClose })  {
	const [valores, setValores] = useState([]);
	const [numFilas, setNumFilas] = useState(1);
	const [numColumnas, setNumColumnas] = useState(1);

	const handleNumFilasChange = (event) => {
		setNumFilas(event.target.value);
	};
	const handleNumColumnasChange = (event) => {
		setNumColumnas(event.target.value);
	};

	useEffect(() => {
		let temp = [];
		for(let i = 0; i < numFilas; i++){
			temp.push(Array(Number(numColumnas)).fill(''))
			for(let j = 0; j < numColumnas; j++){
				console.log("gola")
			}
		}
		setValores(temp)
		console.log(temp)
	},
	[numFilas, numColumnas]);
	const renderTable = ()=>{
		let result = [];
		for(let i = 0; i < valores.length; i++){
			let temp = valores[i].map((valor,j) => {
				return (
					<div key={`flechas_${j}`} className="p-5">
						<input className="w-14"/>
					</div>
				)
			});
			result.push(
				<div key={`flechas_${i}`} className="border border-black rounded divide-y divide-black">
					{temp}
				</div>
			)
		}
		return result;
	}
	const insertDatos= ()=>{
		const result = {	type: "paragraph",
		children: [
			{ text: "Hola" },
			{type:"icon", icon:<BiRectangle/>, children: [{text:""}]},
			{ text: "Los gatos caminan" },
		],}
		Transforms.insertNodes(editor, result);
		onClose()
	}
    return (
		<Modal
			title="Relacionar conceptos"
			className="w-6/12"
			isOpen={isOpen}
			onClose={onClose}
		>
			<div>
				<div className="flex flex-col p-4 gap-3">
					<h4 className="text-modal-heading" htmlFor="newWord">
						Tamaño
					</h4>
					<div className="flex gap-4 px-8">
						<ModalInputNumber
								id="num_filas"
								label="Número de filas:"
								name="num_filas"
								value={numFilas}
								onChange={handleNumFilasChange}
								min="1"
						/>
					</div>
					<div className="flex gap-4 px-8">
						<ModalInputNumber
							id="num_columnass"
							label="Número de columnas:"
							name="num_filas"
							value={numColumnas}
							onChange={handleNumColumnasChange}
							min="1"
							max="4"
						/>
					</div>
				</div>
				<div className="flex flex-col p-4 gap-3">
					<h4 className="text-modal-heading" htmlFor="newWord">
						Conceptos
					</h4>
					<div className='flex justify-around align-middle'>
						{renderTable()}
					</div>

				</div>

				
			</div>
			<hr className="my-6" />
			<ModalPreview />	
					
			<div className="flex justify-center">
				<button className="mt-5 w-2/12 self-center rounded-md bg-sky-500 py-1 text-[1.2rem] text-white hover:bg-sky-600" onClick={insertDatos}>
					Ok
				</button>
			</div>
		</Modal>
	);
}
