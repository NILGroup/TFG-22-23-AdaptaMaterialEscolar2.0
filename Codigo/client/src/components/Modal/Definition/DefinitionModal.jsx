import React, { useEffect, useState } from "react";

import imagenes from "../../../assets/imagenes";
import { insertarEjercicioEditable } from "../../SlateEditor/utils/SlateUtilityFunctions";
import Modal from "../common/Modal";
import ModalInputNumber from "../common/ModalInputNumber";
import ModalNewWordInput from "../common/ModalNewWordInput";
import ModalOkButton from "../common/ModalOkButton";
import ModalPreview from "../common/ModalPreview";
import ModalWordList from "../common/ModalWordList";
import { StaffButtonFactory, StaffType } from "../common/StaffButtonFactory";
import { ModalType } from "../ModalFactory";
import ModalAlertButton from "../common/ModalAlertButton";
import { AiOutlineInfoCircle } from "react-icons/ai";

const MIN_ROWS = 1;
const MAX_ROWS = 100;

export default function DefinitionModal({ editor, isOpen, onClose, openModal }) {
	const [concepts, setConcepts] = useState([]);
	const [isModify, setModify] = useState([]);
	const [numbers, setNumbers] = useState([]);
	const [selected, setSelected] = useState(0);
	const [value, setValue] = useState("");
	const [path, setPath] = useState(null);

	useEffect(() => {
		setNumbers(Array.from({ length: concepts.length }, (concept, i) => (i < numbers.length ? numbers[i] : 1)));
	}, [concepts]);

	const introduction = (n) => `Define ${n === 1 ? "el siguiente concepto" : `los siguientes ${n} conceptos`} :`;

	const handleNumFilasChange = (event) => {
		setNumbers((numbers) => {
			let newNumbers = [...numbers];
			newNumbers[selected] = event.target.value;
			return newNumbers;
		});
	};
	//Funciones para modificar los conceptos.
	const removeConcept = (index) => {
		setConcepts(concepts.filter((e, i) => i !== index));
		setModify(isModify.filter((e, i) => i !== index));
	};
	const reset = () => {
		setConcepts([]);
		setNumbers([1]);
		setValue("");
		setPath(null);
	};

	const renderLines = (index) => {
		let lines = [];
		if (numbers[selected] > MAX_ROWS) return;
		let renderOption = value === "" ? "doubleLine_2_5" : value;
		let space = () => /^doubleLine/.test(renderOption) && <div style={{ height: "5mm" }}></div>;
		if (renderOption === "square") {
			lines.push(
				<div
					className="border border-solid border-black"
					style={{ height: `${5 * numbers[selected]}mm` }}
				></div>
			);
		} else if (renderOption === "square_space") {
			lines.push(<div style={{ height: `${5 * numbers[index]}mm` }}></div>);
		} else {
			for (let i = 0; i < numbers[index]; i++) {
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
	const openModalUpdate = (path, data) => {
		openModal(ModalType.definition);
		setConcepts(data.concepts);
		setNumbers(data.numbers);
		setValue(data.value);
		setPath(path);
	};
	//Insertar datos en el editor
	const insertDatos = () => {
		const ejercicio = {
			type: "ejercicio",
			openModalUpdate,
			data: {
				concepts,
				numbers,
				value,
			},
			children: [],
		};

		const enunciado = {
			type: "enunciado",
			children: [{ text: introduction(concepts.length), bold: true }],
		};
		ejercicio.children.push(enunciado);
		//Salto de linea
		ejercicio.children.push({
			type: "paragraph",
			children: [{ text: "" }],
		});

		let renderOption = value === "" ? "doubleLine_2_5" : value;
		concepts.map((concept, i) => {
			ejercicio.children.push({
				type: "paragraph",
				children: [{ text: `${concept}:` }],
			});
			if (renderOption === "square" || renderOption === "square_space") {
				ejercicio.children.push({
					type: "staff",
					renderOption,
					numbers,
					children: [{ text: "" }],
				});
			} else {
				for (let j = 0; j < numbers[i]; j++) {
					ejercicio.children.push({
						type: "staff",
						renderOption,
						children: [{ text: "" }],
					});
				}
			}
		});
		ejercicio.children.push({
			type: "paragraph",
			children: [{ text: "" }],
		});
		insertarEjercicioEditable(editor, ejercicio, path);
		onClose();
		reset();
	};

	const isOkDisabled = concepts.length == 0 || numbers.every((number) => number < MIN_ROWS || number > MAX_ROWS);

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
				<div className="flex flex-col gap-1">
					<div className="flex justify-end mb-2 mr-1">
						{concepts.length > 0 && (
							<ModalAlertButton
								icon={<AiOutlineInfoCircle size={30} />}
								iconButtonClassName="text-alert-info-dark hover:text-alert-info"
								defaultIsOpen={false}
								listStyle="list-none"
								placement="left"
								alertBoxClassName="bg-alert-info text-alert-info-dark"
								contentList={["Seleccione un concepto, para indicar su numero de pautas"]}
						/>)}
					</div>
					<ModalWordList
						wordList={concepts}
						onEdit={(newValue, index) => setConcepts(concepts.map((c, i) => (i === index ? newValue : c)))}
						onDelete={(index) => removeConcept(index)}
						setSelected={(i) => {
							setSelected(i);
						}}
						selected = {selected}
					/>
				</div>

				<div className="self-start justify-self-start p-4">
					<ModalInputNumber
						id="num_filas"
						label="Número de filas:"
						name="num_filas"
						value={numbers[selected]}
						onChange={handleNumFilasChange}
						min={MIN_ROWS}
						max={MAX_ROWS}
					/>
				</div>
			</div>
			<hr className="my-6" />
			<ModalPreview
			 	previewHeight="h-60 max-h-60"
			>
				{concepts.length > 0 && (
					<p className="font-bold" key="title-0">
						{introduction(concepts.length)}
					</p>
				)}
				{concepts.map((concept, i) => {
					return (
						<div key={`concepts_preview_${i}`} className="m-0">
							<p>{concept}:</p>
							{renderLines(i)}
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
