import React, { useState } from "react";


import { Transforms } from "slate";
import guideLine from "./GuideLine.module.css";

import Modal from "../common/Modal";
import ModalNewWordInput from "../common/ModalNewWordInput";
import ModalWordList from "../common/ModalWordList";
import ModalPreview from "../common/ModalPreview";
import {StaffButtonFactory, StaffType} from "../common/StaffButtonFactory";



export default function DefinitionModal({ editor, isOpen, onClose }) {
	const [concepts, setConcepts] = useState([]);
	const [isModify, setModify] = useState([]);
	const [number, setNumber] = useState(1);
	const [value, setValue] = useState('');

	const introduction = (n) => `Define ${n === 1 ? 'el siguiente concepto' : `los siguientes ${n} conceptos`} :`;
	
	//Funciones para modificar los conceptos.
	const removeConcept = (index) => {
		setConcepts(concepts.filter((e, i) => i !== index));
		setModify(isModify.filter((e, i) => i !== index));
	};

	const renderLines = () => {
		let lines = [];
		let renderOption = value === '' ? 'doubleLine_2_5': value
		let space = () =>
			/^doubleLine/.test(renderOption) && (
				<div className={guideLine.space}></div>
			)

		for (let i = 0; i < number; i++) {
			lines.push(
				<div key={`pauta_${i}`}>
					<div className={guideLine[renderOption]}> </div>
					{space()}
				</div>
			);
		}
		return lines;
	};
	//Insertar datos en el editor
	const insertDatos = () => {
		onClose();
		const ejercicio = { type: "definition", children: [] };
		const numConcepts = concepts.length;
		const enunciado = {
			type: "paragraph",
			children: [{ text: introduction(numConcepts) }],
		};
		let renderOption = value === '' ? 'doubleLine_2_5': value
		ejercicio.children.push(enunciado);

		for (let i = 0; i < numConcepts; i++) {
			ejercicio.children.push({
				type: "paragraph",
				children: [{ text: `${concepts[i]}:` }],
			});
			for (let j = 0; j < number; j++) {
				ejercicio.children.push({
					type: "embeds",
					style: renderOption,
					children: [{ text: "" }],
				});
				ejercicio.children.push({
					type: "embeds",
					style: "space",
					children: [{ text: "" }],
				});
			}
		}
		ejercicio.children.push({
			type: "paragraph",
			children: [{ text: "" }],
		});
		setConcepts([]);
		setNumber(1);
		setValue("");
		Transforms.insertNodes(editor, ejercicio);
	};

	return (
		<Modal
			title="Ejercicio de definiciones"
			className="w-6/12"
			isOpen={isOpen}
			onClose={onClose}
		>
			<div className="grid grid-cols-2 grid-rows-[minmax(0,auto)_minmax(0,auto)]">
				<ModalNewWordInput
					title="Conceptos"
					onSubmit={(newWord) => setConcepts([...concepts, newWord])}
				/>
				  <div className="flex flex-col p-4">
						<label className="text-base">Tipo de pauta: </label>
						<div className="flex flex-wrap gap-4">
							<StaffButtonFactory setValue={setValue} type={StaffType.grid}/>
							<StaffButtonFactory setValue={setValue} type={StaffType.doubleLine}/>
							<StaffButtonFactory setValue={setValue} type={StaffType.line}/>
							<StaffButtonFactory setValue={setValue} type={StaffType.box}/>
							<StaffButtonFactory setValue={setValue} type={StaffType.space}/>
						</div>
					</div>

				<ModalWordList
					wordList={concepts}
					onEdit={(newValue, index) =>
						setConcepts(
							concepts.map((c, i) => (i === index ? newValue : c))
						)
					}
					onDelete={(index) => removeConcept(index)}
				/>

				<div className="self-start justify-self-center p-4">
					<label className="text-base">Número de filas:</label>
					<input
						className="w-3/12"
						type="number"
						value={number}
						min="1"
						onChange={(e) => setNumber(e.target.value)}
					/>
				</div>
			</div>

			<ModalPreview >
					{concepts.length > 0 && (<p key="title-0">{introduction(concepts.length)}</p>)}
					{concepts.map((concept, i) => {
							return (
								<div key={`concepts_preview_${i}`} className="m-0">
									<p>
										{concept}:
									</p>
									{renderLines()}
								</div>
							);
						})
					}
			</ModalPreview>	
					
			<div className="flex justify-center">
				<button className="mt-5 w-2/12 self-center rounded-md bg-sky-500 py-1 text-[1.2rem] text-white hover:bg-sky-600" onClick={insertDatos}>
					Ok
				</button>
			</div>
		</Modal>
	);
}
