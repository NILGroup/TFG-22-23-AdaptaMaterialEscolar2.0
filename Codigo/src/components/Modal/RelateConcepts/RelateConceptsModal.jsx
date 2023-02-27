import React, { useEffect, useState } from "react";

import { Transforms } from "slate";
import { BiRectangle } from "react-icons/bi";
import Modal from "../common/Modal";
import ModalPreview from "../common/ModalPreview";
import ModalInputNumber from "../common/ModalInputNumber";
import ModalOkButton from "../common/ModalOkButton";
import ModalButton from "../common/ModalButton";
import {BsFillCircleFill} from "react-icons/bs"

function reordenador (list){
	let result = list.slice();
	for (var i = result.length-1; i > 0; i--) {
		var j = Math.floor(Math.random() * i);
		var tmp = result[i];
		result[i] = result[j];
		result[j] = tmp;
	}
	return result;
}

export default function RelateConceptsModal({ editor, isOpen, onClose })  {
	const [valores, setValores] = useState([]);
	const [valoresVp, setValoresVp] = useState([]);
	const [numFilas, setNumFilas] = useState(0);
	const [numColumnas, setNumColumnas] = useState(0);

	const handleNumFilasChange = (event) => {
		setNumFilas(event.target.value);
	};
	const handleNumColumnasChange = (event) => {
		setNumColumnas(event.target.value);
	};
	const enunciado = "Relaciona los siguientes conceptos mediante flechas:"
	useEffect(() => {
		let temp = [];
		for(let i = 0; i < numColumnas; i++){
			temp.push(Array(Number(numFilas)).fill(''))
			if(valores.length > i ){
				for(let j = 0; j < Math.min(valores[i].length, numFilas); j++){
					temp[i][j] = valores[i][j];
				}
			}
		}
		setValores(temp)
	},
	[numFilas, numColumnas]);

	useEffect(()=>{
		setValoresVp(valores)
	},[valores])

	const renderTable = ()=>{
		let result = [];
		for(let i = 0; i < valores.length; i++){
			let temp = valores[i].map((valor,j) => {
				return (
					<div key={`flechas_${j}`} className="p-1">
						<input className="w-24 p-2 text-center" value={valores[i][j]} onChange={(event)=>{
							let temp1 = valores.slice()
							temp1[i][j] = event.target.value
							setValores(temp1)
						}}/>
					</div>
				)
			});
			result.push(
				<div key={`flechas_${i}`} className="flex flex-col border border-black rounded divide-y divide-black">
					{temp}
				</div>
			)
		}
		return result;
	}
	const reset = ()=>{
		setValores([]);
		setNumColumnas(0);
		setNumFilas(0);
	}
	const renderVistaPrevia = ()=>{
		let result = [];
		for(let i = 0; i < valoresVp.length; i++){
			let temp = valoresVp[i].filter(valor => valor!== '').map((valor,j) => {
				return (
					<div key={`flechas_${j}`} className="p-1 flex items-center justify-center gap-3">
						{i !== 0 && <BsFillCircleFill size={8} color="black"/>} 
						{valor}
						{i !== valoresVp.length - 1 && <BsFillCircleFill size={8} color="black"/>} 
					</div>
				)
			});
			result.push(
				<div key={`flechas_${i}`} className="flex flex-col justify-center gap-4">
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
			onClose={() => {
				reset();
				onClose()
			}}
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
								min="0"
						/>
					</div>
					<div className="flex gap-4 px-8">
						<ModalInputNumber
							id="num_columnass"
							label="Número de columnas:"
							name="num_filas"
							value={numColumnas}
							onChange={handleNumColumnasChange}
							min="0"
							max="4"
						/>
					</div>
				</div>
				<div className="flex flex-col p-4 gap-3">
					<h4 className="text-modal-heading" htmlFor="newWord">
						Conceptos
					</h4>
					<div className="custom-scrollbar h-60 max-h-60 overflow-auto py-2">

						<div className='flex justify-around align-middle '>
							{renderTable()}
						</div>
					</div>

				</div>

				
			</div>
			<hr className="my-6" />
			<ModalPreview
			attributes={
						<ModalButton
							className="px-1"
							disabled={!valores.some(valor=> { return valor.filter(v => v !== '').length >= 2})}
							onClick={() => {
								let result = valoresVp.map(valor =>  Math.random() < 0.7 ? reordenador(valor): valor);
								setValoresVp(result)
							}}
						>
							Reordenar
						</ModalButton>
					}
			>
				{(numColumnas > 0 && numFilas > 0) && enunciado}
				<div className='flex justify-around align-middle'>
					{renderVistaPrevia()}
				</div>
			</ModalPreview>	
					
			<div className="flex justify-center">
				<ModalOkButton
					className="mt-5 self-center"
					onClick={() => insertDatos()}
					disabled={valores.length < 2}
				/>
			</div>
		</Modal>
	);
}
