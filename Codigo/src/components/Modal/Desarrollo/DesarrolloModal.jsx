import React, { useState } from "react";

import desarrolloModalStyle from "./DesarrolloModal.module.css";

import guideLine from "./GuideLine.module.css";
import Modal from "../common/Modal";
import { Transforms } from "slate";
import ModalPreview from "../common/ModalPreview";
import {StaffButtonFactory, StaffType} from "../common/StaffButtonFactory";



export default function DesarrolloModal({ editor, isOpen, onClose }) {

	const [textareaValue, setTextareaValue] = useState("");
	const [numFilas, setNumFilas] = useState(1);
	const [value, setValue] = useState('');

	const handleEnunciadoChange = (event) => {
		setTextareaValue(event.target.value);
	};

	const handleNumFilasChange = (event) => {
		setNumFilas(event.target.value);
	};

	const renderLines = () => {
		let lines = [];
		let renderOption = value === '' ? 'doubleLine_2_5': value
		let space = () =>
			/^doubleLine/.test(renderOption) && (
				<div className={guideLine.space}></div>
			)

		for (let i = 0; i < numFilas; i++) {
			lines.push(
				<div key={`pauta_${i}`}>
					<div className={guideLine[renderOption]}> </div>
					{space()}
				</div>
			);
		}
		return lines;
	};

	const insertInEditor = (editor) => {
		onClose();

		const ejercicio = { type: "desarrollo", children: [] };
		const enunciado = {
			type: "enunciado",
			children: [{ text: textareaValue }],
		};
		ejercicio.children.push(enunciado);

		let renderOption = value === '' ? 'doubleLine_2_5': value;


		for (let j = 0; j < numFilas; j++) {
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

		ejercicio.children.push({
			type: "paragraph",
			children: [{ text: "" }],
		});

		setValue("");

		Transforms.insertNodes(editor, ejercicio);
	};

	const submit = (e) => {
		e.preventDefault();
		insertInEditor(editor);

		setTextareaValue("");
		setNumFilas(1);
		e.target.enunciado.value = "";
		e.target.num_filas.value = 1;
	};

	return (
		<Modal
			title="Ejercicio de desarrollo"
			className="w-6/12"
			isOpen={isOpen}
			onClose={onClose}
		>
			<div className="">
				<form onSubmit={submit}>
					<div className="">
						<h3 className="text-xl">Enunciado:</h3>
						<textarea
							name="enunciado"
							id=""
							rows="5"
							onChange={handleEnunciadoChange}
							className="w-full rounded bg-textarea p-3"
						></textarea>
					</div>

					<div className="my-5">
						<h2 className="mr-5 inline-block text-xl">
							Número de filas:
						</h2>
						<input
							type="number"
							name="num_filas"
							onChange={handleNumFilasChange}
							className="w-12 rounded-md border-2 border-gray-300 bg-gray-50 pl-2"
						/>
					</div>

					<div className="">
						<h2 className="mr-5 inline-block text-xl">
							Tipo de pauta:
						</h2>

						<div className="flex flex-col p-4">
							<div className="flex flex-wrap gap-4">
								<StaffButtonFactory setValue={setValue} type={StaffType.grid}/>
								<StaffButtonFactory setValue={setValue} type={StaffType.doubleLine}/>
								<StaffButtonFactory setValue={setValue} type={StaffType.line}/>
								<StaffButtonFactory setValue={setValue} type={StaffType.box}/>
								<StaffButtonFactory setValue={setValue} type={StaffType.space}/>
							</div>
						</div>
					</div>

					<hr className="my-6" />

					<ModalPreview>
						{textareaValue}
						{renderLines()}
					</ModalPreview>

					<div className="flex justify-center">
						<button
							type="submit"
							className="mt-5 w-2/12 self-center rounded-md bg-sky-500 py-2 text-[1.4rem] text-white hover:bg-sky-600"
						>
							OK
						</button>
					</div>
				</form>
			</div>
		</Modal>
	);
}
