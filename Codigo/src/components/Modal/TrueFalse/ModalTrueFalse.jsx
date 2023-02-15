import React, { useEffect, useState } from "react";

import modalStyleVF from "./VFModal.module.css";

import { BiRectangle } from "react-icons/bi";
import { IoAddCircle } from "react-icons/io5";
import { Transforms } from "slate";

import Modal from "../common/Modal";
import ModalNewWordInput from "../common/ModalNewWordInput";
import ModalWordList from "../common/ModalWordList";

export default function ModalTrueFalse({ editor, isOpen, onClose }) {
	const [lista, setLista] = useState([]);
	const [modificado, setmodificado] = useState([]);
	const [aleatorio, setaleatorio] = useState([]);
	const [listaVistaP, setListaVistaP] = useState([]);

	// useEffect(() => {
	// 	if(!lista)
	// 		setListaVistaP([]);
	// 	else
	// 		setListaVistaP((previousList) => [...previousList, lista[lista.length - 1]]);

	// 	console.log(listaVistaP);
	// }, [lista]);

	const icon = "◻"; // TODO: Cambiar por un icono SVG ya que podria haber problemas de compatibilidad
	const inserjer = (editor, items, icon) => {
		const list = { type: "list", children: [] };
		const listItem = {
			type: "list-item",
			children: [
				{ text: "Responde Verdadero o Falso. Según corresponda." },
			],
		};
		list.children.push(listItem);
		items.forEach((item) => {
			const listItem = {
				type: "list-item",
				children: [{ text: icon }, { text: item }],
			};

			list.children.push(listItem);
		});
		Transforms.insertNodes(editor, list);
	};

	const submit = (newWord) => {
		setLista([...lista, newWord]);
		setListaVistaP([...listaVistaP, newWord]);

		setmodificado([...modificado, false]);
		setaleatorio([...aleatorio, Math.random()]);
	};

	const deleteWord = (index) => {
		if (!lista)
			throw new Error("Cannot update word, word list does not exist!");

		if (index < 0 || index >= lista.length)
			throw new Error("Cannot update word, index out of range!");

		setLista((previousWordList) => {
			const newList = previousWordList.filter(
				(word, wordIndex) => wordIndex !== index
			);

			setListaVistaP([...newList]);

			return newList;
		});
	};

	const editWord = (newValue, index) => {
		if (!lista)
			throw new Error("Cannot update word, word list does not exist!");

		if (index < 0 || index >= lista.length)
			throw new Error("Cannot update word, index out of range!");

		setLista((previousWordList) => {
			const newList = previousWordList.map((word, wordIndex) =>
				wordIndex === index ? String(newValue) : word
			);

			setListaVistaP([...newList]);

			return newList;
		});
	};

	return (
		<Modal
			className="w-6/12"
			title="Verdadero/Falso"
			isOpen={isOpen}
			onClose={onClose}
		>
			<div className={modalStyleVF.frase}>
				<ModalNewWordInput title="Frase" onSubmit={(newWord) => submit(newWord)} />
				<ModalWordList
					wordList={lista}
					onEdit={(newValue, index) => editWord(newValue, index)}
					onDelete={(index) => deleteWord(index)}
				/>

				<hr />
				<div className={modalStyleVF.vistaP}>
					<div className={modalStyleVF.vistaPCab}>
						<p>Vista Previa </p>
						<button
							className={modalStyleVF.btnReor}
							onClick={(event) => {
								event.preventDefault();

								setaleatorio(
									aleatorio.map((elem) => {
										return Math.random();
									})
								);

								let nuevaLista, listaOrdenada, listaFinal;
								nuevaLista = listaVistaP.map((lis, i) => ({
									lis,
									random: aleatorio[i],
								}));

								listaOrdenada = nuevaLista.sort(
									(a, b) => a.random - b.random
								);

								listaFinal = listaOrdenada.map(
									(item) => item.lis
								);

								setListaVistaP(listaFinal);
							}}
						>
							Reordenar
						</button>
					</div>
					<div className={modalStyleVF.ulD}>
						{lista.length > 0 && (
							<p className={modalStyleVF.enunciado}>
								Responde Verdadero o Falso. Según corresponda.
							</p>
						)}
						<ul className={modalStyleVF.uldina}>
							{listaVistaP.map((elem, i) => {
								return (
									<li
										key={`concepto-${i}`}
										className={modalStyleVF.liD}
									>
										<BiRectangle
											className={modalStyleVF.rect}
										/>
										<p>{elem}</p>
									</li>
								);
							})}
						</ul>
					</div>
				</div>
				<div className={modalStyleVF.botonDiv}>
					<button
						className={modalStyleVF.btnReor}
						onClick={(event) => {
							event.preventDefault();
							event.preventDefault();
							inserjer(editor, listaVistaP, icon);
							setLista([]);
							setListaVistaP([]);
							setaleatorio([]);
							setmodificado([]);
						}}
					>
						OK
					</button>
				</div>
			</div>
		</Modal>
	);
}
