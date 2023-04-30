import React, { useEffect, useState } from "react";
import { BiRectangle } from "react-icons/bi";

import Modal from "../common/Modal";
import ModalButton from "../common/ModalButton";
import ModalNewWordInput from "../common/ModalNewWordInput";
import ModalOkButton from "../common/ModalOkButton";
import ModalPreview from "../common/ModalPreview";
import ModalWordList from "../common/ModalWordList";
import { ModalType } from "../ModalFactory";
import { insertarEjercicioEditable } from "../../SlateEditor/utils/SlateUtilityFunctions";

export default function ModalTrueFalse({ editor, isOpen, onClose, openModal }) {
	const [lista, setLista] = useState([]);
	const [modificado, setmodificado] = useState([]);
	const [listaVistaP, setListaVistaP] = useState([]);
	const [path, setPath] = useState(null);

	useEffect(() => {
		if (lista.length > 0) {
			let ni = lista.slice();
			setListaVistaP(ni);
		} else {
			setListaVistaP([]);
		}
	}, [lista]);
	const openModalUpdate = (path, data) =>{
		openModal(ModalType.TrueFalse);
		setLista(data.lista);
		setmodificado(data.modificado);
		setListaVistaP(data.listaVistaP);
		setPath(path);
	}
	
	const okButton = (editor, items) => {
		const list = { 
			type: "ejercicio",
			openModalUpdate,
			data:{
				lista,
				modificado,
				listaVistaP
			},
			children: [] 
		};
		const listItem = {
			type: "paragraph",
			children: [{ text: `Lea cada una de las siguientes afirmaciones y rodee con un círculo la letra 'V' si es verdadera o la letra 'F' si es falsa.` }],
		};

		list.children.push(listItem);
		items.forEach((item) => {
			const listItem = {
				type: "paragraph",
				children: [ { text: item },{ text: "  V/F" }],
			};

			list.children.push(listItem);
		});
		list.children.push({type: "paragraph",children: [{text:''}]});

		insertarEjercicioEditable(editor, list, path)
		closeModal();
	};
	const submit = (newWord) => {
		setLista([...lista, newWord]);
		setmodificado([...modificado, false]);
	};

	const deleteWord = (index) => {
		if (!lista) throw new Error("Cannot update word, word list does not exist!");

		if (index < 0 || index >= lista.length) throw new Error("Cannot update word, index out of range!");

		setLista((previousWordList) => {
			const newList = previousWordList.filter((word, wordIndex) => wordIndex !== index);

			setListaVistaP([...newList]);

			return newList;
		});
	};
	
	const editWord = (newValue, index) => {
		if (!lista) throw new Error("Cannot update word, word list does not exist!");

		if (index < 0 || index >= lista.length) throw new Error("Cannot update word, index out of range!");

		setLista((previousWordList) => {
			const newList = previousWordList.map((word, wordIndex) => (wordIndex === index ? String(newValue) : word));
			setListaVistaP([...newList]);

			return newList;
		});
	};

	const closeModal = () => {
		setListaVistaP([]);
		setLista([]);
		setmodificado([]);
		setPath(null);

		onClose();
	};

	return (
		<Modal className="w-6/12" title="Verdadero/Falso" isOpen={isOpen} onClose={closeModal}>
			<div className="flex flex-col">
				<ModalNewWordInput title="Frase" onSubmit={(newWord) => submit(newWord)} />
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
								let nuevaLista = listaVistaP.slice();

								for (var i = nuevaLista.length - 1; i > 0; i--) {
									var j = Math.floor(Math.random() * i);
									var tmp = nuevaLista[i];
									nuevaLista[i] = nuevaLista[j];
									nuevaLista[j] = tmp;
								}

								setListaVistaP(nuevaLista);
							}}
						>
							Reordenar
						</ModalButton>
					}
				>
					<div>
						{lista.length > 0 && <p>Lea cada una de las siguientes afirmaciones y rodee con un círculo la letra V si es verdadera o la letra F si es falsa.</p>}
						<ul>
							{listaVistaP.map((elem, i) => {
								return (
									<li key={`concepto-${i}`}>
										<div className="flex items-start">
											<p className="pl-1">{elem} <span>V/F</span></p>
										</div>
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
