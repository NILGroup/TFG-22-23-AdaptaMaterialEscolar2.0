import React, { useEffect, useState } from "react";

import { BsFillCircleFill } from "react-icons/bs";
import { Transforms } from "slate";
import Modal from "../common/Modal";
import ModalButton from "../common/ModalButton";
import ModalInputNumber from "../common/ModalInputNumber";
import ModalOkButton from "../common/ModalOkButton";
import ModalPreview from "../common/ModalPreview";
import RelateConceptsTable from "./RelateConceptsTable";
import RelateConceptsView from "./RelateConceptsView";

// CONSTANTES
const MIN_ROWS = 1;
const MAX_ROWS = 20;
const MIN_COLS = 1;
const MAX_COLS = 20;
const STATEMENT = "Relaciona los siguientes conceptos mediante flechas:";

function reordenador(list) {
	let result = list.slice();
	for (var i = result.length - 1; i > 0; i--) {
		var j = Math.floor(Math.random() * i);
		var tmp = result[i];
		result[i] = result[j];
		result[j] = tmp;
	}
	return result;
}

export default function RelateConceptsModal({ editor, isOpen, onClose, data}) {
	const [valores, setValores] = useState([]);
	const [valoresVp, setValoresVp] = useState([]);
	const [numFilas, setNumFilas] = useState(0);
	const [numColumnas, setNumColumnas] = useState(0);

	// Comprobamos la recepción de datos, el else es necesario porque los componentes ya estan montados en el DOM
	useEffect(() => {
		if(data !== undefined){
			setValores(copiarArreglo(data.values));
			setNumFilas(data.values[0].length);
			setNumColumnas(data.values.length);
		}
		else{
			reset();
		}
	}, [isOpen]);

	// Funciones para actualizar 
	const handleNumFilasChange = (event) => {
		setNumFilas(event.target.value);
	};
	const handleNumColumnasChange = (event) => {
		setNumColumnas(event.target.value);
	};

	// Comprobador de los datos
	const isCorrect = () => {
		return numFilas <= MAX_ROWS && numColumnas <= MAX_COLS 
		&& numFilas > MIN_COLS 
		&& numColumnas > MIN_ROWS
		;
	};

	// Actualizamos el array al formato adecuado
	useEffect(() => {
		if (isCorrect()) {
			let temp = [];
			for (let i = 0; i < numColumnas; i++) {
				temp.push(Array(Number(numFilas)).fill(""));
				if (valores.length > i) {
					for (let j = 0; j < Math.min(valores[i].length, numFilas); j++) {
						temp[i][j] = valores[i][j];
					}
				}
			}
			setValores(temp);
		} else {
			setValores([]);
		}
	}, [numFilas, numColumnas]);
	
	// Sincronizamos el array input con el array a mostrar
	useEffect(() => {
		setValoresVp(isCorrect() ? valores.filter(valor => valor.filter(e => e != '').length > 0) : []);
	}, [valores]);

	// Función para resetear los valores dados
	const reset = () => {
		// Resteamos los estados
		setValores([]);
		setNumColumnas(0);
		setNumFilas(0);
		
		//  Vaciamos el parametro data para evitar posibles errores
		data = undefined;
	};

	// Esta función ademas de insertar actualiza dependiendo de la procedencia
	const insertDatos = () => {
		// Si data tiene valores actualizamos los datos del nodo que ha invocado el modal
		if(data !== undefined){ // 
			// setNodes permite actrualizar los atributos de un
			Transforms.setNodes(editor, {values: valoresVp});
		}else{ // En caso contrario insertamos un nuevo nod
			const enunciado = {
				type: "paragraph",
				children: [{ text: STATEMENT}],
			};
			Transforms.insertNodes(editor, enunciado);
			const ejercicio = { 
				type: "relateConcepts", 
				values: valoresVp,
				icon:<BsFillCircleFill size={8} color="black" />,
				children: [{text:" "}] ,
			};
			Transforms.insertNodes(editor, ejercicio);
			Transforms.insertNodes(editor, {
				type: "paragraph",
				children: [{ text: ""}],
			});
		}
		// Resteamos los estados
		reset();
		// Cerramos el modal
		onClose();
	};
	return (
		<Modal
			title="Relacionar conceptos"
			className="w-6/12"
			isOpen={isOpen}
			onClose={() => {
				reset();
				onClose();
			}}
		>
			<div>
				<div className="flex flex-col gap-3 p-4">
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

				<RelateConceptsTable title={"Conceptos"} values={valores} setValores={setValores} />
			</div>
			<hr className="my-6" />
			<ModalPreview
				attributes={
					<ModalButton
						className="px-1"
						disabled={
							!valores.some((valor) => {
								return valor.filter((v) => v !== "").length >= 2;
							})
						}
						onClick={() => {
							let result = valoresVp.map((valor) => (Math.random() < 0.7 ? reordenador(valor) : valor));
							setValoresVp(result);
						}}
					>
						Reordenar
					</ModalButton>
				}
			>
				{valores.filter((valor) => {return valor.filter((v) => v !== "").length >= 1;}).length >= 2 && STATEMENT}
				{valores.filter((valor) => {return valor.filter((v) => v !== "").length >= 1;}).length >= 2 &&
				<RelateConceptsView values={valoresVp} icon={<BsFillCircleFill size={8} color="black" />} />}
			</ModalPreview>

			<div className="flex justify-center">
				<ModalOkButton
					className="mt-5 self-center"
					onClick={() => insertDatos()}
					disabled={
						!valores.some((valor) => {
							return valor.filter((v) => v !== "").length >= 2;
						})
					}
				/>
			</div>
		</Modal>
	);
}

// Función para crear una copia profunda de un arreglo bidimensional
function copiarArreglo(arreglo) {
	return arreglo.map(function(elemento) {
	  return Array.isArray(elemento) ? copiarArreglo(elemento) : elemento;
	});
  }