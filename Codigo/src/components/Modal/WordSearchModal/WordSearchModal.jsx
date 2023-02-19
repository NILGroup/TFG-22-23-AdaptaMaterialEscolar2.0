import React, { useEffect, useState } from "react";

import Modal from "../common/Modal";
import ModalButton from "../common/ModalButton";
import ModalNewWordInput from "../common/ModalNewWordInput";
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

import style from "../common/Modal.module.css";

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
	const DEFAULT_ERRORS = [];

	const [numRows, setNumRows] = useState(DEFAULT_NUM_ROWS);
	const [numCols, setNumCols] = useState(DEFAULT_NUM_ROWS);
	const [wordList, setWordList] = useState(DEFAULT_WORD_LIST);
	const [directions, setDirections] = useState(DEFAULT_DIRECTIONS);
	const [wordSearchGrid, setWordSearchGrid] = useState(
		DEFAULT_WORD_SEARCH_GRID
	);
	const [errors, setErrors] = useState(DEFAULT_ERRORS);

	useEffect(() => {
		const options = generateOptionsObject(numRows, numCols, directions);
		const wordSearch = createWordSearch(wordList, options);

		setErrors(
			checkErrors(
				wordList,
				wordSearch.object,
				numRows,
				numCols,
				directions
			)
		);
		setWordSearchGrid(wordSearch.grid);
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
		setErrors(DEFAULT_ERRORS);

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
			title={"Sopa de Letras"}
			className="w-6/12"
			isOpen={isOpen}
			onClose={closeModal}
		>
			<div className="flex flex-col">
				<div className="">
					<h4 className={style.modalHeading}>Tamaño</h4>
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
				</div>
				<div className="lg:grid lg:grid-cols-2 lg:gap-x-2">
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
								<div className="flex h-full flex-col items-center justify-center gap-y-2 text-[2rem] text-red-500">
									<p>Ha habido un error.</p>
									<TbMoodSad size={50} />
								</div>
							)}
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
				{errors && errors.length > 0 && (
					<div className="m-5 rounded-lg bg-red-500 p-3 text-white">
						<ul className="list-inside list-disc">
							{errors.map((error, index) => (
								<li key={`error-${index}`}>{error}</li>
							))}
						</ul>
					</div>
				)}
				<ModalButton
					className="mt-5 w-2/12 self-center py-2 text-[1.4rem]"
					onClick={() => handleOk(editor, wordSearchGrid)}
					disabled={errors && errors.length > 0}
				>
					Ok
				</ModalButton>
			</div>
		</Modal>
	);
}
