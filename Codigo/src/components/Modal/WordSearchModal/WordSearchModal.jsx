import React, { useReducer, useState } from "react";

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

// Valores por defecto del estado
const initialState = {
	numRows: 1,
	numCols: 1,
	wordList: [],
	directions: {
		horizontal: true,
		vertical: false,
		diagonal: false,
		backwards: false,
	},
};

// Tipos de accion para modificar el estado del componente
const ActionType = Object.freeze({
	resetState: Symbol("resetstate"),
	updateNumRows: Symbol("updatenumrows"),
	updateNumCols: Symbol("updatenumcols"),
	addWordToWordList: Symbol("addwordtowordlist"),
	editWordOfWordList: Symbol("editwordofwordlist"),
	deleteWordFromWordList: Symbol("deletewordfromwordlist"),
	updateDirections: Symbol("updatedirections"),
});

// Modificar el estado dependiendo de la accion ejecutada
const reducer = (state, action) => {
	switch (action.type) {
		case ActionType.resetState: {
			return { ...initialState };
		}
		case ActionType.updateNumRows: {
			const nextNumRows = action.nextValue;

			if (nextNumRows < 1) return { ...state };

			return { ...state, numRows: nextNumRows };
		}
		case ActionType.updateNumCols: {
			const nextNumCols = action.nextValue;

			if (nextNumCols < 1) return { ...state };

			return { ...state, numCols: nextNumCols };
		}
		case ActionType.addWordToWordList: {
			const wordToAdd = action.newWord.replace(/\s/g, "");

			return { ...state, wordList: [...state.wordList, wordToAdd] };
		}
		case ActionType.editWordOfWordList: {
			const index = action.index;
			const newValue = action.newValue.replace(/\s/g, "");

			if (!state.wordList || state.wordList.length <= 0)
				throw new Error(
					"Cannot update word, word list does not exist or is empty!"
				);

			if (index < 0 || index >= state.wordList.length)
				throw new Error(
					`Cannot update word, index out of range: ${index} - Wordlist's length: ${state.wordList.length}`
				);

			return {
				...state,
				wordList: state.wordList.map((word, wordIndex) =>
					wordIndex === index ? String(newValue) : word
				),
			};
		}
		case ActionType.deleteWordFromWordList: {
			const index = action.index;

			if (!state.wordList || state.wordList.length <= 0)
				throw new Error(
					"Cannot delete word, word list does not exist or is empty!"
				);

			if (index < 0 || index >= state.wordList.length)
				throw new Error(
					`Cannot delete word, index out of range: ${index} - Wordlist's length: ${state.wordList.length}`
				);

			return {
				...state,
				wordList: state.wordList.filter(
					(word, wordIndex) => wordIndex !== index
				),
			};
		}
		//TODO: Mejorar la forma en la que se gestionan las direcciones
		case ActionType.updateDirections: {
			switch (action.direction) {
				case "horizontal":
					return {
						...state,
						directions: {
							...state.directions,
							horizontal: action.newValue,
						},
					};
				case "vertical":
					return {
						...state,
						directions: {
							...state.directions,
							vertical: action.newValue,
						},
					};
				case "diagonal":
					return {
						...state,
						directions: {
							...state.directions,
							diagonal: action.newValue,
						},
					};
				case "backwards":
					return {
						...state,
						directions: {
							...state.directions,
							backwards: action.newValue,
						},
					};
				default:
					throw new Error(`Undefined direction: ${action.direction}`);
			}
		}
		default:
			throw new Error(`Undefined action: ${action}`);
	}
};

export default function WordSearchModal({ editor, isOpen, onClose }) {
	// Estado del componente
	const [state, dispatch] = useReducer(reducer, initialState);

	// Datos que se pueden generar con el estado (se calculan cada vez que se renderiza la vista)
	const options = generateOptionsObject(
		state.numRows,
		state.numCols,
		state.directions
	);
	const { object: wordSearch, grid: wordSearchGrid } = createWordSearch(
		state.wordList,
		options
	);

	const errors = checkErrors(
		state.wordList,
		wordSearch,
		state.numRows,
		state.numCols,
		state.directions
	);

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
		const { wordList, directions } = state;

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

	const closeModal = () => {
		dispatch({ type: ActionType.resetState });

		onClose();
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
						value={state.numRows}
						onChange={(e) =>
							dispatch({
								type: ActionType.updateNumRows,
								nextValue: e.target.value,
							})
						}
					/>
					<label htmlFor="numCols">Número de columnas</label>
					<input
						type="number"
						id="numCols"
						className="w-12 rounded-md border-2 border-gray-300 bg-gray-50 pl-2"
						name="numCols"
						min="1"
						value={state.numCols}
						onChange={(e) =>
							dispatch({
								type: ActionType.updateNumCols,
								nextValue: e.target.value,
							})
						}
					/>
				</div>
				<div className="lg:grid lg:grid-cols-2 lg:gap-2">
					<div className="">
						<ModalNewWordInput
							title="Palabras"
							onSubmit={(newWord) =>
								dispatch({
									type: ActionType.addWordToWordList,
									newWord,
								})
							}
						/>

						<ModalWordList
							wordList={state.wordList}
							onEdit={(newValue, index) =>
								dispatch({
									type: ActionType.editWordOfWordList,
									index,
									newValue,
								})
							}
							onDelete={(index) =>
								dispatch({
									type: ActionType.deleteWordFromWordList,
									index,
								})
							}
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
									dispatch({
										type: ActionType.updateDirections,
										direction: "horizontal",
										newValue: e.target.checked,
									});
								}}
								defaultChecked
							/>
							<ModalCheckbox
								label="Vertical"
								name="vertical"
								id="vertical"
								onChange={(e) => {
									dispatch({
										type: ActionType.updateDirections,
										direction: "vertical",
										newValue: e.target.checked,
									});
								}}
							/>
							<ModalCheckbox
								label="Diagonal"
								name="diagonal"
								id="diagonal"
								onChange={(e) => {
									dispatch({
										type: ActionType.updateDirections,
										direction: "diagonal",
										newValue: e.target.checked,
									});
								}}
							/>
							<ModalCheckbox
								label="Al revés"
								name="backwards"
								id="backwards"
								onChange={(e) => {
									dispatch({
										type: ActionType.updateDirections,
										direction: "backwards",
										newValue: e.target.checked,
									});
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
