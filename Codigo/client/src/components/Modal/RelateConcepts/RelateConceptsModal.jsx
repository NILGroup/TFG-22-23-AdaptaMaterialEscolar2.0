import React, { useEffect, useState } from "react";

import { insertarEjercicioEditable } from "../../SlateEditor/utils/SlateUtilityFunctions";
import Modal from "../common/Modal";
import ModalButton from "../common/ModalButton";
import ModalInputNumber from "../common/ModalInputNumber";
import ModalOkButton from "../common/ModalOkButton";
import ModalPreview from "../common/ModalPreview";
import { ModalType } from "../ModalFactory";
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

export default function RelateConceptsModal({ editor, isOpen, onClose, openModal }) {
	const [valores, setValores] = useState([]);
	const [valoresVp, setValoresVp] = useState([]);
	const [numFilas, setNumFilas] = useState(0);
	const [numColumnas, setNumColumnas] = useState(0);
	const [path, setPath] = useState(null);

	// Funciones para actualizar
	const handleNumFilasChange = (event) => {
		setNumFilas(event.target.value);
	};
	const handleNumColumnasChange = (event) => {
		setNumColumnas(event.target.value);
	};

	// Comprobador de los datos
	const isCorrect = () => {
		return numFilas <= MAX_ROWS && numColumnas <= MAX_COLS && numFilas > MIN_COLS && numColumnas > MIN_ROWS;
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
		setValoresVp(isCorrect() ? valores.filter((valor) => valor.filter((e) => e != "").length > 0) : []);
	}, [valores]);

	// Función para resetear los valores dados
	const reset = () => {
		// Resteamos los estados
		setValores([]);
		setNumColumnas(0);
		setNumFilas(0);
		setPath(null);
	};

	const openModalUpdate = (path, data) => {
		openModal(ModalType.relateConcepts);

		setValores(data.valores);
		setNumColumnas(data.numColumnas);
		setNumFilas(data.numFilas);
		setPath(path);
	};
	// Esta función ademas de insertar actualiza dependiendo de la procedencia
	const insertDatos = () => {
		// Si data tiene valores actualizamos los datos del nodo que ha invocado el modal
		const ejercicio = {
			type: "ejercicio",
			openModalUpdate,
			data: {
				valores: valores,
				numColumnas: numColumnas,
				numFilas: numFilas,
			},
			children: [],
		};
		const enunciado = {
			type: "enunciado",
			children: [{ text: STATEMENT, bold: true }],
		};
		ejercicio.children.push(enunciado);

		const conceptos = {
			type: "relateConcepts",
			values: valoresVp,
			icon: <span className="text-[10px]">⚫</span>,
			children: [{ text: " " }],
		};

		ejercicio.children.push(conceptos);
		ejercicio.children.push({ type: "paragraph", children: [{ text: "" }] });

		insertarEjercicioEditable(editor, ejercicio, path);
		// Resteamos los estados
		reset();
		// Cerramos el modal
		onClose();
	};
	return (
		<Modal
			title="Relacionar conceptos"
			className="w-9/12"
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
				previewHeight="h-60 max-h-60"
				attributes={
					<ModalButton
						className="p-2"
						disabled={
							valores.filter((valor) => {
								return valor.filter((v) => v !== "").length >= 2;
							}).length < 2
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
				{valores.filter((valor) => {
					return valor.filter((v) => v !== "").length >= 1;
				}).length >= 2 && <p className="font-bold">{STATEMENT}</p>}
				{valores.filter((valor) => {
					return valor.filter((v) => v !== "").length >= 1;
				}).length >= 2 && (
					<RelateConceptsView values={valoresVp} icon={<span className="text-[10px]">⚫</span>} />
				)}
			</ModalPreview>

			<div className="flex justify-center">
				<ModalOkButton
					className="mt-5 self-center"
					onClick={() => insertDatos()}
					disabled={
						valores.filter((valor) => {
							return valor.filter((v) => v !== "").length >= 2;
						}).length < 2
					}
				/>
			</div>
		</Modal>
	);
}
