import React, { useState } from "react";

import Modal from "../common/Modal";
import ModalInputNumber from "../common/ModalInputNumber";
import ModalNewWordInput from "../common/ModalNewWordInput";
import ModalOkButton from "../common/ModalOkButton";
import ModalPreview from "../common/ModalPreview";
import ModalWordList from "../common/ModalWordList";
import { StaffButtonFactory, StaffType } from "../common/StaffButtonFactory";
import imagenes from "../../../assets/imagenes";
import { insertarEjercicioEditable } from "../../SlateEditor/utils/SlateUtilityFunctions";
import { ModalType } from "../ModalFactory";

const MIN_ROWS = 1;
const MAX_ROWS = 100;

export default function DefinitionModal({ editor, isOpen, onClose, openModal }) {
	const [concepts, setConcepts] = useState([]);
	const [isModify, setModify] = useState([]);
	const [number, setNumber] = useState(1);
	const [value, setValue] = useState("");
	const [path, setPath] = useState(null);

	const introduction = (n) => `Define ${n === 1 ? "el siguiente concepto" : `los siguientes ${n} conceptos`} :`;

	const handleNumFilasChange = (event) => {
		setNumber(event.target.value);
	};
	//Funciones para modificar los conceptos.
	const removeConcept = (index) => {
		setConcepts(concepts.filter((e, i) => i !== index));
		setModify(isModify.filter((e, i) => i !== index));
	};
	const reset = () => {
		setConcepts([]);
		setNumber(1);
		setValue("");
		setPath(null)
	};

	const renderLines = () => {
		let lines = [];
		if (number > MAX_ROWS) return;
		let renderOption = value === "" ? "doubleLine_2_5" : value;
		let space = () => /^doubleLine/.test(renderOption) && <div style={{ height: '5mm' }}></div>;
		if(renderOption === 'square'){
			lines.push(
				<div className='border border-black border-solid' style={{ height: `${5 * number}mm` }}>
				</div>
			);
		}
		else if(renderOption === 'square_space'){
			lines.push(
				<div style={{ height: `${5 * number}mm` }}>
				</div>
			);	
		}
		else{
			for (let i = 0; i < number; i++) {
				lines.push(
					<div key={`pauta_${i}`}>
						<img src={imagenes[renderOption]} />
						{space()}
					</div>
				);
			}
		}
		return lines;
	};
	const openModalUpdate = (path, data) =>{
		openModal(ModalType.definition)
		setConcepts(data.concepts);
		setNumber(data.number);
		setValue(data.value);
		setPath(path);
	}
	//Insertar datos en el editor
	const insertDatos = () => {
		const ejercicio = { 
			type: "definition",
			openModalUpdate,
			data: {
				concepts,
				number,
				value
			},
			children: [],
		};

		const enunciado = {
			type: "paragraph",
			children: [{ text: introduction(concepts.length) }],
		};
		ejercicio.children.push(enunciado);
		//Salto de linea
		ejercicio.children.push({
			type: "paragraph",
			children: [{ text: "" }],
		});
			
		let renderOption = value === "" ? "doubleLine_2_5" : value;
		concepts.map((concept => {
			ejercicio.children.push({
				type: "paragraph",
				children: [{ text: `${concept}:` }],
			});
			if(renderOption === 'square' || renderOption === 'square_space'){
				ejercicio.children.push({
					type: "staff",
					renderOption,
					number,
					children: [{ text: "" }],
				});
			}else{
				for (let j = 0; j < number; j++) {
					ejercicio.children.push({
						type: "staff",
						renderOption,
						children: [{ text: "" }],
					});
				}
			}
		}))
		ejercicio.children.push({
			type: "paragraph",
			children: [{ text: "" }],
		});
		insertarEjercicioEditable(editor, ejercicio, path)
		onClose();
		reset();
	};

	const isOkDisabled = concepts.length == 0 || number < MIN_ROWS || number > MAX_ROWS;

	const handleClose = () => {
		reset();
		onClose();
	};
	return (
		<Modal title="Ejercicio de definiciones" className="w-6/12" isOpen={isOpen} onClose={handleClose}>
			<div className="grid grid-cols-2 grid-rows-[minmax(0,auto)_minmax(0,auto)]">
				<ModalNewWordInput title="Conceptos" onSubmit={(newWord) => setConcepts([...concepts, newWord])} />
				<div className="flex flex-col p-4">
					<h2 className="mr-5 inline-block text-xl">Tipo de pauta:</h2>
					<div className="flex flex-wrap gap-4 p-4">
						<StaffButtonFactory setValue={setValue} type={StaffType.grid} />
						<StaffButtonFactory setValue={setValue} type={StaffType.doubleLine} />
						<StaffButtonFactory setValue={setValue} type={StaffType.line} />
						<StaffButtonFactory setValue={setValue} type={StaffType.box} />
						<StaffButtonFactory setValue={setValue} type={StaffType.space} />
					</div>
				</div>

				<ModalWordList
					wordList={concepts}
					onEdit={(newValue, index) => setConcepts(concepts.map((c, i) => (i === index ? newValue : c)))}
					onDelete={(index) => removeConcept(index)}
				/>

				<div className="self-start justify-self-start p-4">
					<ModalInputNumber
						id="num_filas"
						label="Número de filas:"
						name="num_filas"
						value={value}
						onChange={handleNumFilasChange}
						min={MIN_ROWS}
						max={MAX_ROWS}
					/>
				</div>
			</div>
			<hr className="my-6" />
			<ModalPreview>
				{concepts.length > 0 && <p key="title-0">{introduction(concepts.length)}</p>}
				{concepts.map((concept, i) => {
					return (
						<div key={`concepts_preview_${i}`} className="m-0">
							<p>{concept}:</p>
							{renderLines()}
						</div>
					);
				})}
			</ModalPreview>
			<div className="flex justify-center">
				<ModalOkButton className="mt-2 self-center" onClick={insertDatos} disabled={isOkDisabled} />
			</div>
		</Modal>
	);
}
