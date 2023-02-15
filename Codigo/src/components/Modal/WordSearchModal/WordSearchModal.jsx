import React, { useEffect, useState } from "react";

import { AiOutlinePlus } from "react-icons/ai";

import Modal from "../common/Modal";
import ModalPreview from "../common/ModalPreview";
import WordSearchGrid from "./WordSearchGrid";

import { createWordSearch, generateOptionsObject } from "./WordSearchUtils";

import { Transforms } from "slate";

import style from "../common/Modal.module.css";
import ModalNewWordInput from "../common/ModalNewWordInput";
import ModalWordList from "../common/ModalWordList";

export default function WordSearchModal({ editor, isOpen, onClose }) {
	const DEFAULT_NUM_ROWS = 1;
	const DEFAULT_NUM_COLS = 1;
	const DEFAULT_WORD_LIST = [];
	const DEFAULT_DIRECTIONS = {
		horizontal: true,
		vertical: false,
		diagonal: false,
		backwards: false,
	};
	const DEFAULT_WORD_SEARCH_GRID = null;

	const [numRows, setNumRows] = useState(DEFAULT_NUM_ROWS);
	const [numCols, setNumCols] = useState(DEFAULT_NUM_ROWS);
	const [wordList, setWordList] = useState(DEFAULT_WORD_LIST);
	const [directions, setDirections] = useState(DEFAULT_DIRECTIONS);
	const [wordSearchGrid, setWordSearchGrid] = useState(
		DEFAULT_WORD_SEARCH_GRID
	);

	useEffect(() => {
		const options = generateOptionsObject(numRows, numCols, directions);
		const wordSearch = createWordSearch(wordList, options);

		setWordSearchGrid(wordSearch);
	}, [numRows, numCols, wordList, directions]);

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
		setWordSearchGrid(DEFAULT_WORD_SEARCH_GRID);

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
		// TODO: Temporal --> Borrar cuando se manejen los errores de la sopa de letras
		if (!wordList?.length > 0) return "";

		const enabledDirections = Object.keys(directions)
			.filter((key) => directions[key] === true)
			.map((key) => parseDirection(key));

		// TODO: Temporal --> Borrar cuando se manejen los errores de la sopa de letras
		if (!enabledDirections?.length > 0) return "";

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
			title={"Sopa de Letras"}
			className="w-6/12"
			isOpen={isOpen}
			onClose={closeModal}
		>
			<div className="flex flex-col">
				<div className="flex flex-col">
					<h4 className={style.modalHeading}>Tamaño</h4>
					<div className="grid grid-cols-2 gap-y-4 p-4">
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
				</div>
				<div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-x-2">
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
							<p>{generateExerciseStatement()}</p>
							<WordSearchGrid wordSearchGrid={wordSearchGrid} />
						</ModalPreview>
						<div className="my-2 flex flex-wrap items-center justify-evenly gap-x-2 p-2">
							<div className="flex items-center gap-x-1 whitespace-nowrap">
								<input
									type="checkbox"
									name="horizontal"
									id="horizontal"
									onChange={(e) => {
										setDirection(
											"horizontal",
											e.target.checked
										);
									}}
									defaultChecked={true}
								/>
								<label htmlFor="horizontal">Horizontal</label>
							</div>
							<div className="flex items-center gap-x-1 whitespace-nowrap">
								<input
									type="checkbox"
									name="vertical"
									id="vertical"
									onChange={(e) => {
										setDirection(
											"vertical",
											e.target.checked
										);
									}}
								/>
								<label htmlFor="vertical">Vertical</label>
							</div>
							<div className="flex items-center gap-x-1 whitespace-nowrap">
								<input
									type="checkbox"
									name="diagonal"
									id="diagonal"
									onChange={(e) => {
										setDirection(
											"diagonal",
											e.target.checked
										);
									}}
								/>
								<label htmlFor="diagonal">Diagonal</label>
							</div>
							<div className="flex items-center gap-x-1 whitespace-nowrap">
								<input
									type="checkbox"
									name="backwards"
									id="backwards"
									onChange={(e) => {
										setDirection(
											"backwards",
											e.target.checked
										);
									}}
								/>
								<label htmlFor="backwards">Al revés</label>
							</div>
						</div>
					</div>
				</div>
				<button
					className="mt-5 w-2/12 self-center rounded-md bg-sky-500 py-2 text-[1.4rem] text-white hover:bg-sky-600"
					onClick={() => handleOk(editor, wordSearchGrid)}
				>
					Ok
				</button>
			</div>
		</Modal>
	);
}
