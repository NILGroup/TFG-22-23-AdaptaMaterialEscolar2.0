import React, { useEffect, useState } from "react";

import { Transforms } from "slate";
import { BiRectangle } from "react-icons/bi";
import Modal from "../common/Modal";
import ModalPreview from "../common/ModalPreview";
import ModalInputNumber from "../common/ModalInputNumber";
import ModalOkButton from "../common/ModalOkButton";
import ModalButton from "../common/ModalButton";
import {BsFillCircleFill} from "react-icons/bs"
import RelateConceptsView from "./RelateConceptsView";
import RelateConceptsTable from "./RelateConceptsTable";


const MIN_ROWS = 1;
const MAX_ROWS = 20;

const MIN_COLS = 1;
const MAX_COLS = 20;


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
	const isCorrect = ()=>{
		return numFilas <= MAX_ROWS && numColumnas <= MAX_COLS 
		&& numFilas > MIN_COLS && numColumnas > MIN_ROWS ;
	}
	const enunciado = "Relaciona los siguientes conceptos mediante flechas:"
	useEffect(() => {
		if(isCorrect()){
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
		}else{
			setValores([])
		}
	},
	[numFilas, numColumnas]);

	useEffect(()=>{
		setValoresVp(isCorrect() ? valores : [])
	},[valores])

	
	const reset = ()=>{
		setValores([]);
		setNumColumnas(0);
		setNumFilas(0);
	}
	const insertDatos= ()=>{
		const result = {	
			type: "relateConcepts",
			icon: <BsFillCircleFill size={8} color="black"/>,
			concepts: valoresVp,
			children: [
				{ text: "" },
				{type:"icon", icon: <BsFillCircleFill size={8} color="black"/>, children:[{text:""}]}
			]
		}
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
								min={MIN_ROWS}
								max={MAX_ROWS}
						/>
					</div>
					<div className="flex gap-4 px-8">
						<ModalInputNumber
							id="num_columnass"
							label="Número de columnas:"
							name="num_filas"
							value={numColumnas}
							onChange={handleNumColumnasChange}
							min={MIN_COLS}
							max={MAX_COLS}
						/>
					</div>
				</div>

				<RelateConceptsTable title={"Conceptos"} values={valores} setValores={setValores}/>

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
				{isCorrect() && enunciado}
				<RelateConceptsView 
					values={valoresVp}
					icon = {<BsFillCircleFill size={8} color="black"/>}
				/>
			</ModalPreview>	
					
			<div className="flex justify-center">
				<ModalOkButton
					className="mt-5 self-center"
					onClick={() => insertDatos()}
					disabled={!valores.some(valor=> { return valor.filter(v => v !== '').length >= 2})}
				/>
			</div>
		</Modal>
	);
}
