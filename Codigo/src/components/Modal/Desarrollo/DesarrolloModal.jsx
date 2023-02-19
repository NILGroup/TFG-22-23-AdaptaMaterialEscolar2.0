import React, { useState } from "react";

import desarrolloModalStyle from "./DesarrolloModal.module.css";

import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { AiOutlineBorderlessTable } from "react-icons/ai";
import { BiRectangle } from "react-icons/bi";
import { HiOutlineMinus } from "react-icons/hi";
import { IoMdArrowDropdown } from "react-icons/io";
import { TfiLineDouble } from "react-icons/tfi";
import style from "./DefinitionModal.module.css";
import guideLine from "./GuideLine.module.css";

import Modal from "../common/Modal";

import { Transforms } from "slate";

import ModalPreview from "../common/ModalPreview";
import ModalButton from "../common/ModalButton";

const typeStaff = {
	grid: 0,
	doubleLine: 1,
	line: 2,
};

export default function DesarrolloModal({ editor, isOpen, onClose }) {
	const [option, setOption] = useState("doubleLine_2_5");
	//Boton de pauta:
	const [open, setOpen] = useState(Array(3).fill(false));

	const handleChange = (event) => {
		setOption(event.target.value);
	};

	const handleClose = (i) => {
		setOpen(open.map((e, j) => false));
	};

	const handleOpen = (i) => {
		setOpen(open.map((e, j) => i === j));
	};

	const [textareaValue, setTextareaValue] = useState("");
	const [numFilas, setNumFilas] = useState(1);
	const [tipoPauta, setTipoPauta] = useState("lineaNormal");

	const handleEnunciadoChange = (event) => {
		setTextareaValue(event.target.value);
	};

	const handleNumFilasChange = (event) => {
		setNumFilas(event.target.value);
	};

	const handleTipoPautaChange = (event) => {
		setTipoPauta(event.target.value);
	};

	/*const renderLines = (numFilas, tipoPauta) => {

        let lines = [];

        let clase = lineStyle.lineaNormal;

        if (tipoPauta === "lineaNormal") {
            clase = lineStyle.lineaNormal;
        }
        else if (tipoPauta === "lineaDoblePauta") {
            clase = lineStyle.lineaDoblePauta;
        }
        else {
            clase = lineStyle.lineaNormal;
        }

        for (let i = 0; i < numFilas; i++) {
            lines.push(<div className={clase} key={i}></div>)
        }

        return lines;
    }*/

	const renderLines = () => {
		let lines = [];
		let space = (num) =>
			/^doubleLine/.test(option) ? (
				<div className={guideLine.space} key={`space_${num}`}></div>
			) : (
				<></>
			);

		for (let i = 0; i < numFilas; i++) {
			lines.push(
				<>
					<div className={guideLine[option]} key={`pauta_${i}`}></div>
					{space(i)}
				</>
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

		for (let i = 0; i < numFilas; i++) {
			//ejercicio.children.push({ type: 'linea', tipoPauta: tipoPauta, children: [{ text: '' }] })
			ejercicio.children.push({
				type: "staff",
				style: option,
				children: [{ text: "" }],
			});
			ejercicio.children.push({
				type: "staff",
				style: "space",
				children: [{ text: "" }],
			});
		}

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
						<h2 className="text-xl inline-block mr-5">Número de filas:</h2>
						<input
							type="number"
							name="num_filas"
							onChange={handleNumFilasChange}
							className="w-12 rounded-md border-2 border-gray-300 bg-gray-50 pl-2"
						/>
					</div>

					<div className="">
						<h3 className="text-xl">Tipo de pauta</h3>

						{/* <select
							value={tipoPauta}
							onChange={handleTipoPautaChange}
						>
							<option value="lineaNormal">Normal</option>
							<option value="lineaDoblePauta">Doble pauta</option>
						</select> */}

						<div className={style.buttons}>
							<div className={style.staff}>
								<IconButton
									className={style.staffButton}
									onClick={() => handleOpen(typeStaff.grid)}
								>
									<AiOutlineBorderlessTable
										style={{
											width: "1rem",
											height: "1rem",
										}}
									/>
									<IoMdArrowDropdown
										style={{
											width: "0.8rem",
											height: "0.8rem",
										}}
									/>
								</IconButton>
								<FormControl>
									<Select
										className={style.select}
										id="demo-controlled-open-select"
										open={open[typeStaff.grid]}
										onClose={() =>
											handleClose(typeStaff.grid)
										}
										onOpen={() =>
											handleOpen(typeStaff.grid)
										}
										value={option}
										onChange={handleChange}
										disableUnderline
										variant="standard"
										inputProps={{
											IconComponent: () => null,
										}}
									>
										<MenuItem value="grid_5">5 mm</MenuItem>
										<MenuItem value="grid_6">6 mm</MenuItem>
										<MenuItem value="grid_8">8 mm</MenuItem>
									</Select>
								</FormControl>
							</div>

							<div className={style.staff}>
								<IconButton
									className={style.staffButton}
									onClick={() =>
										handleOpen(typeStaff.doubleLine)
									}
								>
									<TfiLineDouble
										style={{
											width: "1rem",
											height: "1rem",
										}}
									/>
									<IoMdArrowDropdown
										style={{
											width: "0.8rem",
											height: "0.8rem",
										}}
									/>
								</IconButton>
								<FormControl>
									<Select
										className={style.select}
										id="demo-controlled-open-select"
										open={open[typeStaff.doubleLine]}
										onClose={() =>
											handleClose(typeStaff.doubleLine)
										}
										onOpen={() =>
											handleOpen(typeStaff.doubleLine)
										}
										value={option}
										onChange={handleChange}
										disableUnderline
										variant="standard"
										inputProps={{
											IconComponent: () => null,
										}}
									>
										<MenuItem value="doubleLine_2_5">
											2,5 mm
										</MenuItem>
										<MenuItem value="doubleLine_3">
											3 mm
										</MenuItem>
										<MenuItem value="doubleLine_3_5">
											3,5 mm
										</MenuItem>
									</Select>
								</FormControl>
							</div>

							<div className={style.staff}>
								<IconButton
									className={style.staffButton}
									onClick={() => handleOpen(typeStaff.line)}
								>
									<HiOutlineMinus
										style={{
											width: "1rem",
											height: "1rem",
										}}
									/>
									<IoMdArrowDropdown
										style={{
											width: "0.8rem",
											height: "0.8rem",
										}}
									/>
								</IconButton>
								<FormControl>
									<Select
										className={style.select}
										id="demo-controlled-open-select"
										open={open[typeStaff.line]}
										onClose={() =>
											handleClose(typeStaff.line)
										}
										onOpen={() =>
											handleOpen(typeStaff.line)
										}
										value={option}
										onChange={handleChange}
										disableUnderline
										variant="standard"
										inputProps={{
											IconComponent: () => null,
										}}
									>
										<MenuItem value="line_2_5">
											2,5 mm
										</MenuItem>
										<MenuItem value="line_3">3 mm</MenuItem>
										<MenuItem value="line_3_5">
											3,5 mm
										</MenuItem>
									</Select>
								</FormControl>
							</div>

							<div className={style.staff}>
								<IconButton
									className={style.staffButton_small}
									onClick={() => setOption("square")}
								>
									<BiRectangle
										style={{
											width: "1rem",
											height: "1rem",
										}}
									/>
								</IconButton>
							</div>

							<div
								className={style.staff}
								onClick={() => setOption("square_space")}
							>
								<IconButton className={style.staffButton_small}>
									<BiRectangle
										style={{
											width: "1rem",
											height: "1rem",
											color: "transparent",
										}}
									/>
								</IconButton>
							</div>
						</div>
					</div>

					
					<hr className="my-6" />
					

					<ModalPreview>
						{textareaValue}
						{renderLines(numFilas, tipoPauta)}
					</ModalPreview>

					<div className="flex justify-center">
						<button type="submit" className="mt-5 w-2/12 self-center py-2 text-[1.4rem] rounded-md bg-sky-500 text-white hover:bg-sky-600">OK</button>
					</div>

				</form>
			</div>
		</Modal>
	);
}
