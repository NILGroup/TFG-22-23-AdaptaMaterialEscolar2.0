import React, { useState } from "react";
import { IoMdSquare } from "react-icons/io";

import "../ColorLegend/estilo.css";
import Modal from "../common/Modal";
import ModalInputText from "../common/ModalInputText";
import ModalNewWordInput from "../common/ModalNewWordInput";
import ModalOkButton from "../common/ModalOkButton";
import ModalPreview from "../common/ModalPreview";
import ModalWordListLegend from "./ModalWordListLegend";
import { insertarEjercicioEditable } from "../../SlateEditor/utils/SlateUtilityFunctions";
import { ModalType } from "../ModalFactory";

export default function ModalColorLegend({ editor, isOpen, onClose, openModal }) {
	const [conceptos, setConceptos] = useState([]);
	const [colores, setColores] = useState([]);
	const [color, setColor] = useState("#000000");
	const [titulo, setTitulo] = useState("");
	const [path, setPath] = useState(null);

	const changeColor = (event) => {
		setColor(event.target.value);
	};
	const changeTitle = (event) => {
		setTitulo(event.target.value);
	};
	const submit = (newWord) => {
		setConceptos([...conceptos, newWord]);
		setColores([...colores, color]);
		setColor("#000000");
		setPath(null);
	};
	const openModalUpdate = (path, data) =>{
		openModal(ModalType.colorLegend)
		setConceptos(data.conceptos);
		setColores(data.colores);
		setTitulo(data.titulo);
		setPath(path);
	}
	const okButton = (editor, conceptos, colores) => {
		const list = {
			type: "bloqueEditable", 
			data : {
				conceptos, 
				colores,
				titulo
			},
			openModalUpdate,
			children: [] 
		};
		const listItem = {
			type: "paragraph",
			children: [{ text: titulo }],
		};

		list.children.push(listItem);
		conceptos.forEach((item, i) => {
			const listItem = {
				type: "paragraph",
				children: [
					{
						type: "icon",
						icon: <IoMdSquare size={25} style={{ color: colores[i] }} />,
						children: [{ text: "" }],
					},
					{ text: item },
				],
			};

			list.children.push(listItem);
		});
		list.children.push({
			type: "paragraph",
			children: [{ text: "" }],
		});

		insertarEjercicioEditable(editor, list, path)
		closeModal();
	};

	const closeModal = () => {
		setConceptos([]);
		setColores([]);
		setColor(null);
		setTitulo("");
		setPath(null);
		onClose();
	};

	const editWord = (newValue, newColor, index) => {
		if (!conceptos) throw new Error("Cannot update word, word list does not exist!");

		if (index < 0 || index >= conceptos.length) throw new Error("Cannot update word, index out of range!");

		setConceptos((previousWordList) => {
			const newList = previousWordList.map((word, wordIndex) => (wordIndex === index ? String(newValue) : word));
			return newList;
		});
		console.log(newValue, newColor);
		setColores((previousWordList) => {
			const newList = previousWordList.map((color, colorIndex) =>
				colorIndex === index ? String(newColor) : color
			);
			return newList;
		});
	};

	const deleteWord = (index) => {
		if (!conceptos) throw new Error("Cannot update word, word list does not exist!");

		if (index < 0 || index >= conceptos.length) throw new Error("Cannot update word, index out of range!");

		const concetosNew = conceptos.filter((elem, i) => {
			return i !== index;
		});
		const ColoresNew = colores.filter((elem, i) => {
			return i !== index;
		});
		setConceptos(concetosNew);
		setColores(ColoresNew);
	};

	return (
		<Modal className="w-6/12" title="Leyenda de Colores" isOpen={isOpen} onClose={closeModal}>
			<div className="flex flex-col">
				<div>
					<ModalInputText id="Titulo" label="Título" required onInput={changeTitle} value={titulo}/>
				</div>

				<div className="mt-5">
					<ModalNewWordInput
						title="Color&nbsp;&nbsp; Conceptos"
						attributes={
							<input
								className="inputColor"
								id="color"
								type="color"
								value={color}
								onChange={changeColor}
							/>
						}
						onSubmit={(newWord) => submit(newWord)}
					/>
				</div>

				<ModalWordListLegend
					wordList={conceptos}
					colorList={colores}
					onEdit={(newValue, newColor, index) => editWord(newValue, newColor, index)}
					onDelete={(index) => deleteWord(index)}
				/>
				<ModalPreview>
					<div>
						<p>{titulo}</p>

						{conceptos.map((elem, i) => {
							return (
								<div key={`concepts_preview_${i}`} className="mt-3 flex items-center">
									<IoMdSquare size={25} style={{ color: colores[i] }} />
									<p className="pl-1">{elem}</p>
								</div>
							);
						})}
					</div>
				</ModalPreview>

				<ModalOkButton
					className="mt-2 self-center"
					onClick={() => okButton(editor, conceptos, colores)}
					disabled={conceptos.length == 0 || titulo.length == 0}
				/>
			</div>
		</Modal>
	);
}
