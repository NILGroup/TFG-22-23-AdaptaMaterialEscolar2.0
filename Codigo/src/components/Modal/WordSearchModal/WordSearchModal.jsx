import React, { useState } from "react";

import Modal from "../common/Modal";
import ModalNewWordInput from "../common/ModalNewWordInput";
import ModalButton from "../common/ModalOkButton";
import ModalPreview from "../common/ModalPreview";
import ModalWordList from "../common/ModalWordList";
import WordSearchGrid from "./WordSearchGrid";

import { TbMoodSad } from "react-icons/tb";

import {
	checkErrors,
	createWordSearch,
	generateOptionsObject,
} from "./WordSearchUtils";

import { Transforms } from "slate";
import ModalCheckbox from "../common/ModalCheckbox";

export default function WordSearchModal({ editor, isOpen, onClose }) {
	// Valores por defecto del estado
	const DEFAULT_NUM_ROWS = 1;
	const DEFAULT_NUM_COLS = 1;
	const DEFAULT_WORD_LIST = [];
	const DEFAULT_DIRECTIONS = {
		horizontal: true,
		vertical: false,
		diagonal: false,
		backwards: false,
	};

	// Estado del componente
	const [numRows, setNumRows] = useState(DEFAULT_NUM_ROWS);
	const [numCols, setNumCols] = useState(DEFAULT_NUM_ROWS);
	const [wordList, setWordList] = useState(DEFAULT_WORD_LIST);
	const [directions, setDirections] = useState(DEFAULT_DIRECTIONS);

	// Datos que se pueden generar con el estado (se calculan cada vez que se renderiza la vista)
	const options = generateOptionsObject(numRows, numCols, directions);
	const wordSearch = createWordSearch(wordList, options);

	const errors = checkErrors(
		wordList,
		wordSearch.object,
		numRows,
		numCols,
		directions
	);

	const wordSearchGrid = wordSearch.grid;

	// Metodos auxiliares
	const addWordToList = (word) => {
		const wordToAdd = word.replace(/\s/g, "");

		if (!wordList) setWordList([wordToAdd]);
		else
			setWordList((previousWordList) => [...previousWordList, wordToAdd]);
	};

	const deleteWord = (index) => {
		if (!wordList)
			throw new Error("Cannot delete word, word list does not exist!");

		if (index < 0 || index >= wordList.length)
			throw new Error("Cannot delete word, index out of range!");

		setWordList((previousWordList) =>
			previousWordList.filter((word, wordIndex) => wordIndex !== index)
		);
	};

	const editWord = (newValue, index) => {
		if (!wordList)
			throw new Error("Cannot update word, word list does not exist!");

		if (index < 0 || index >= wordList.length)
			throw new Error("Cannot update word, index out of range!");

		setWordList((previousWordList) =>
			previousWordList.map((word, wordIndex) =>
				wordIndex === index ? String(newValue) : word
			)
		);
	};

	const setDirection = (direction, value) => {
		let newDirections = { ...directions };

		switch (direction) {
			case "horizontal":
				newDirections.horizontal = value;
				break;
			case "vertical":
				newDirections.vertical = value;
				break;
			case "diagonal":
				newDirections.diagonal = value;
				break;
			case "backwards":
				newDirections.backwards = value;
				break;
			default:
				throw new Error("Undefined direction!");
		}

		setDirections(newDirections);
	};

	const closeModal = () => {
		setNumRows(DEFAULT_NUM_ROWS);
		setNumCols(DEFAULT_NUM_COLS);
		setWordList(DEFAULT_WORD_LIST);
		setDirections(DEFAULT_DIRECTIONS);

		onClose();
	};

	const parseDirection = (direction) => {
		switch (direction) {
			case "horizontal":
				return "horizontal";
			case "vertical":
				return "vertical";
			case "diagonal":
				return "diagonal";
			case "backwards":
				return "al revés";
			default:
				throw new Error("Undefined direction!");
		}
	};

	const generateExerciseStatement = () => {
		const enabledDirections = Object.keys(directions)
			.filter((key) => directions[key] === true)
			.map((key) => parseDirection(key));

		const directionsStatement = `, ${
			wordList.length === 1 ? "escrita" : "escritas"
		} de manera ${enabledDirections.reduce(
			(result, current, index, array) =>
				result +
				(index > 0 ? (index === array.length - 1 ? " y " : ", ") : "") +
				current,
			""
		)}`;

		const statement = `Encuentra ${
			wordList.length === 1
				? "la palabra"
				: `las ${wordList.length} palabras`
		}${directionsStatement}: `;

		return statement;
	};

	const handleOk = (editor, wordSearchGrid) => {
		const text = {
			text: generateExerciseStatement(),
		};
		const wordSearch = {
			type: "wordSearch",
			wordSearchGrid,
			children: [text],
		};

		Transforms.insertNodes(editor, wordSearch);

		closeModal();
	};

	return (
		<Modal
			title="Sopa de Letras"
			className="w-7/12"
			isOpen={isOpen}
			onClose={closeModal}
		>
			<div className="flex flex-col">
				<h4 className="text-[2rem]">Tamaño</h4>
				<div className="grid grid-cols-2 items-end gap-4 p-4">
					<label htmlFor="numRows">Número de filas</label>
					<input
						type="number"
						id="numRows"
						className="w-12 rounded-md border-2 border-gray-300 bg-gray-50 pl-2"
						name="numRows"
						min="1"
						value={numRows}
						onChange={(e) => setNumRows(e.target.value)}
					/>
					<label htmlFor="numCols">Número de columnas</label>
					<input
						type="number"
						id="numCols"
						className="w-12 rounded-md border-2 border-gray-300 bg-gray-50 pl-2"
						name="numCols"
						min="1"
						value={numCols}
						onChange={(e) => setNumCols(e.target.value)}
					/>
				</div>
				<div className="lg:grid lg:grid-cols-2 lg:gap-2">
					<div className="">
						<ModalNewWordInput
							title="Palabras"
							onSubmit={(newWord) => {
								addWordToList(newWord);
							}}
						/>

						<ModalWordList
							wordList={wordList}
							onEdit={(newValue, index) =>
								editWord(newValue, index)
							}
							onDelete={(index) => deleteWord(index)}
						/>
					</div>
					<div className="">
						<ModalPreview>
							{!errors || errors.length <= 0 ? (
								<>
									<p>{generateExerciseStatement()}</p>
									<WordSearchGrid
										wordSearchGrid={wordSearchGrid}
									/>
								</>
							) : (
								<div className="flex h-full flex-col items-center justify-center gap-2 text-red-500">
									<p className="text-[2rem]">
										Ha habido un error.
									</p>
									<TbMoodSad className="flex-shrink-0 text-[3.5rem]" />
								</div>
							)}
						</ModalPreview>
						<div className="my-6 md:flex md:flex-wrap md:items-center md:justify-between md:gap-2">
							<ModalCheckbox
								label="Horizontal"
								name="horizontal"
								id="horizontal"
								onChange={(e) => {
									setDirection(
										"horizontal",
										e.target.checked
									);
								}}
								defaultChecked
							/>
							<ModalCheckbox
								label="Vertical"
								name="vertical"
								id="vertical"
								onChange={(e) => {
									setDirection("vertical", e.target.checked);
								}}
							/>
							<ModalCheckbox
								label="Diagonal"
								name="diagonal"
								id="diagonal"
								onChange={(e) => {
									setDirection("diagonal", e.target.checked);
								}}
							/>
							<ModalCheckbox
								label="Al revés"
								name="backwards"
								id="backwards"
								onChange={(e) => {
									setDirection("backwards", e.target.checked);
								}}
							/>
						</div>
					</div>
				</div>
				{errors && errors.length > 0 && (
					<div className="w-full rounded-lg bg-red-500 bg-opacity-30 p-3 text-[1.2rem] text-red-900">
						<ul className="list-inside list-disc">
							{errors.map((error, index) => (
								<li key={`error-${index}`}>{error}</li>
							))}
						</ul>
					</div>
				)}
				<ModalButton
					className="mt-5 self-center"
					onClick={() => handleOk(editor, wordSearchGrid)}
					disabled={errors && errors.length > 0}
				/>
			</div>
		</Modal>
	);
}
