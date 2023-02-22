import React, { useEffect, useState } from "react";
import { Transforms } from "slate";
import { BiRectangle } from "react-icons/bi";

import Modal from "../common/Modal";
import ModalButton from "../common/ModalButton";
import ModalNewWordInput from "../common/ModalNewWordInput";
import ModalOkButton from "../common/ModalOkButton";
import ModalPreview from "../common/ModalPreview";
import ModalWordList from "../common/ModalWordList";


export default function ModalTrueFalse({ editor, isOpen, onClose }) {
	const [lista, setLista] = useState([]);
	const [modificado, setmodificado] = useState([]);
	const [isListaModified, setIsListaModified] = useState(false);
	const [aleatorio, setaleatorio] = useState([]);
	const [listaVistaP, setListaVistaP] = useState([]);


	useEffect(() => {
		if (lista.length > 0 && !isListaModified)
			setListaVistaP((previousList) => [...previousList, lista[lista.length - 1]]);

		else if (lista.length <= 0) {
			setListaVistaP([]);

		}
		else{
			setIsListaModified(false)
		}

	}, [lista]);


	const okButton = (editor, items) => {
		onClose();
		const list = { type: "list", children: [] };
		const listItem = {
			type: "paragraph",
			children: [
				{ text: "Responde Verdadero o Falso. Según corresponda." },
			],
		};

		list.children.push(listItem);
		items.forEach((item) => {
			const listItem = {
				type: "list-item",
				texto: item,
				children: [{ text: "" }],
			};

			list.children.push(listItem);
		});

		Transforms.insertNodes(editor, list);
	};

	const submit = (newWord) => {
		setLista([...lista, newWord]);
		//setListaVistaP([...listaVistaP, newWord]);
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
			setIsListaModified(true)
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
			setIsListaModified(true)
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
			<div className="flex flex-col">
				<ModalNewWordInput
					title="Frase"
					onSubmit={(newWord) => submit(newWord)}
				/>
				<ModalWordList
					wordList={lista}
					onEdit={(newValue, index) => editWord(newValue, index)}
					onDelete={(index) => deleteWord(index)}
				/>

				<hr />


				<ModalPreview
					attributes={<ModalButton
						className="px-1"
						disabled={lista.length < 2}
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
					</ModalButton>}>
					<div>
						{lista.length > 0 && (
							<p>Responde Verdadero o Falso. Según corresponda.</p>
						)}
						<ul>
							{listaVistaP.map((elem, i) => {
								
								return (
									<li
										key={`concepto-${i}`}
										className="flex items-center"
									>
										<BiRectangle
											
										/>
										<p className="pl-1">{elem}</p>
									</li>
								);
							})}
						</ul>
					</div>
				</ModalPreview>


				<ModalOkButton 
					className="mt-2 self-center" 
					onClick={() => okButton(editor, listaVistaP)}
					disabled={lista.length == 0}/>
				
			</div>
		</Modal>
	);
}
