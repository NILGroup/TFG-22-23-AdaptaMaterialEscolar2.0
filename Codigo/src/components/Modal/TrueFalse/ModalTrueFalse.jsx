import React, { useEffect, useState } from "react";
import { BiRectangle } from "react-icons/bi";
import { Transforms } from "slate";

import Modal from "../common/Modal";
import ModalButton from "../common/ModalButton";
import ModalNewWordInput from "../common/ModalNewWordInput";
import ModalOkButton from "../common/ModalOkButton";
import ModalPreview from "../common/ModalPreview";
import ModalWordList from "../common/ModalWordList";

export default function ModalTrueFalse({ editor, isOpen, onClose }) {
	const [lista, setLista] = useState([]);
	const [modificado, setmodificado] = useState([]);
	const [listaVistaP, setListaVistaP] = useState([]);

	useEffect(() => {
		if (lista.length > 0){
			let ni = lista.slice();
			setListaVistaP(ni);
		}
			
		else{
			setListaVistaP([]);
		}
	}, [lista]);

	
	const okButton = (editor, items) => {
		
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
				type: "paragraph",
				children: [{type:"icon", icon:<BiRectangle/>, children: [{text:""}]},{ text: item }],
			};

			list.children.push(listItem);
		});

		Transforms.insertNodes(editor, list);
		closeModal();
	};

	const submit = (newWord) => {
		setLista([...lista, newWord]);
		setmodificado([...modificado, false]);
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

	const closeModal = () => {
		setListaVistaP([]);
		setLista([]);
		setmodificado([]);
		onClose();
	};
	

	return (
		<Modal
			className="w-6/12"
			title="Verdadero/Falso"
			isOpen={isOpen}
			onClose={closeModal}
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
					attributes={
						<ModalButton
							className="px-1"
							disabled={lista.length < 2}
							onClick={() => {
								
								let nuevaLista =listaVistaP.slice();
									
									for (var i = nuevaLista.length-1; i > 0; i--) {
										var j = Math.floor(Math.random() * i);
										var tmp = nuevaLista[i];
										nuevaLista[i] = nuevaLista[j];
										nuevaLista[j] = tmp;
									}
									
								setListaVistaP(nuevaLista)
							}}
						>
							Reordenar
						</ModalButton>
					}
				>
					<div>
						{lista.length > 0 && (
							<p>
								Responde Verdadero o Falso. Según corresponda.
							</p>
						)}
						<ul>
							{listaVistaP.map((elem, i) => {	
								return (
									<li
										key={`concepto-${i}`}
										className="flex items-center"
									>									
										<BiRectangle />
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
					disabled={lista.length == 0}
				/>
			</div>
		</Modal>
	);
}
