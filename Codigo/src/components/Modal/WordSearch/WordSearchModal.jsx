import React, { useReducer } from "react";

import Modal from "../common/Modal";
import ModalNewWordInput from "../common/ModalNewWordInput";
import ModalButton from "../common/ModalOkButton";
import ModalPreview from "../common/ModalPreview";
import ModalWordList from "../common/ModalWordList";
import WordSearchGrid from "./WordSearchGrid";

import { createWordSearch } from "./WordSearchUtils";

import { Transforms } from "slate";

import ModalCheckbox from "../common/ModalCheckbox";
import ModalInputNumber from "../common/ModalInputNumber";

// Valores Constantes
const DIRECTIONS = {
	horizontal: "horizontal",
	vertical: "vertical",
	diagonal: "diagonal",
	backwards: "al revés",
};

const MIN_DIMENSION = 1;
const MAX_DIMENSION = 30;

// Valores por defecto del estado
const initialState = {
	numRows: MIN_DIMENSION,
	numCols: MIN_DIMENSION,
	wordList: [],
	directions: Object.keys(DIRECTIONS).reduce((obj, key) => {
		return { ...obj, [key]: false };
	}, {}),
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

			return { ...state, numRows: nextNumRows };
		}
		case ActionType.updateNumCols: {
			const nextNumCols = action.nextValue;

			return { ...state, numCols: nextNumCols };
		}
		case ActionType.addWordToWordList: {
			if (!action.newWord) return { ...state };

			const wordToAdd = action.newWord.replace(/\s/g, "");

			return { ...state, wordList: [...state.wordList, wordToAdd] };
		}
		case ActionType.editWordOfWordList: {
			if (!action.newValue) return { ...state };

			const index = action.index;
			const newValue = action.newValue.replace(/\s/g, "");

			if (!state.wordList || state.wordList.length <= 0)
				throw new Error("Cannot update word, word list does not exist or is empty!");

			if (index < 0 || index >= state.wordList.length)
				throw new Error(
					`Cannot update word, index out of range: ${index} - Wordlist's length: ${state.wordList.length}`
				);

			return {
				...state,
				wordList: state.wordList.map((word, wordIndex) => (wordIndex === index ? String(newValue) : word)),
			};
		}
		case ActionType.deleteWordFromWordList: {
			const index = action.index;

			if (!state.wordList || state.wordList.length <= 0)
				throw new Error("Cannot delete word, word list does not exist or is empty!");

			if (index < 0 || index >= state.wordList.length)
				throw new Error(
					`Cannot delete word, index out of range: ${index} - Wordlist's length: ${state.wordList.length}`
				);

			return {
				...state,
				wordList: state.wordList.filter((word, wordIndex) => wordIndex !== index),
			};
		}
		case ActionType.updateDirections: {
			return {
				...state,
				directions: {
					...state.directions,
					[action.direction]: action.newValue,
				},
			};
		}
		default:
			throw new Error(`Undefined action: ${action}`);
	}
};

export default function WordSearchModal({ editor, isOpen, onClose }) {
	// Estado del componente
	const [state, dispatch] = useReducer(reducer, initialState);

	// Datos que se pueden generar con el estado (se calculan cada vez que se renderiza la vista)
	let grid = null;
	let warnings = null;
	let errors = null;

	if (state.wordList && state.wordList.length > 0)
		({ grid, warnings, errors } = createWordSearch(
			state.numRows,
			state.numCols,
			state.directions,
			state.wordList,
			MIN_DIMENSION,
			MAX_DIMENSION
		));

	//#region Funciones auxiliares
	const generateExerciseStatement = () => {
		const { wordList, directions } = state;

		const enabledDirections = Object.keys(directions)
			.filter((key) => directions[key] === true)
			.map((key) => DIRECTIONS[key]);

		const directionsStatement = `, ${
			wordList.length === 1 ? "escrita" : "escritas"
		} de manera ${enabledDirections.reduce(
			(result, current, index, array) =>
				result + (index > 0 ? (index === array.length - 1 ? " y " : ", ") : "") + current,
			""
		)}`;

		const statement = `Encuentra ${
			wordList.length === 1 ? "la palabra" : `las ${wordList.length} palabras`
		}${directionsStatement}: `;

		return statement;
	};
	//#endregion

	//#region Manejadores de eventos
	const handleOk = (editor, grid) => {
		const exerciseStatement = {
			type: "paragraph",
			children: [{ text: generateExerciseStatement() }],
		};

		const text = { text: "" };
		const wordSearch = {
			type: "table",
			grid,
			children: [text],
		};

		Transforms.insertNodes(editor, exerciseStatement);
		Transforms.insertNodes(editor, wordSearch);

		handleClose();
	};

	const handleClose = () => {
		dispatch({ type: ActionType.resetState });

		onClose();
	};
	//#endregion

	return (
		<Modal title="Sopa de Letras" className="w-7/12" isOpen={isOpen} onClose={handleClose}>
			<div className="flex flex-col">
				<h4 className="text-[2rem]">Tamaño</h4>
				<div className="grid grid-cols-2 items-end gap-4 p-4">
					<ModalInputNumber
						id="numRows"
						label="Número de filas"
						name="numRows"
						min={MIN_DIMENSION}
						max={MAX_DIMENSION}
						value={state.numRows}
						onChange={(e) =>
							dispatch({
								type: ActionType.updateNumRows,
								nextValue: e.target.value,
							})
						}
					/>
					<ModalInputNumber
						id="numCols"
						label="Número de columnas"
						name="numCols"
						min={MIN_DIMENSION}
						max={MAX_DIMENSION}
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
						<div className="mb-6">
							<h4 className="text-modal-heading">Posicionamiento</h4>
							<div className="md:flex md:flex-wrap md:items-center md:justify-between md:gap-2">
								{DIRECTIONS &&
									Object.keys(DIRECTIONS)
										.map((key) => {
											return {
												key: key,
												value: DIRECTIONS[key],
											};
										})
										.map(({ key, value }) => {
											const capitalizedValue = `${value.charAt(0).toUpperCase()}${value.slice(
												1
											)}`;

											return (
												<ModalCheckbox
													key={`positionCheckbox-${key}`}
													label={capitalizedValue}
													name={key}
													id={key}
													onChange={(e) => {
														dispatch({
															type: ActionType.updateDirections,
															direction: key,
															newValue: e.target.checked,
														});
													}}
												/>
											);
										})}
							</div>
						</div>
						<ModalPreview>
							{grid && (
								<>
									<p>{generateExerciseStatement()}</p>
									<WordSearchGrid wordSearchGrid={grid} />
								</>
							)}
						</ModalPreview>
					</div>
				</div>
				{errors && errors.length > 0 && (
					<div className="mt-4 w-full rounded-lg bg-alert-danger bg-opacity-20 p-3 text-[1.2rem] text-alert-danger-dark">
						<ul className="list-inside list-disc">
							{errors.map((error, index) => (
								<li key={`error-${index}`}>{error}</li>
							))}
						</ul>
					</div>
				)}
				{warnings && warnings.length > 0 && (
					<div className="mt-4 w-full rounded-lg bg-alert-warning bg-opacity-20 p-3 text-[1.2rem] text-alert-warning-dark">
						<ul className="list-inside list-disc">
							{warnings.map((warning, index) => (
								<li key={`warning-${index}`}>{warning}</li>
							))}
						</ul>
					</div>
				)}
				<ModalButton
					className="mt-5 self-center"
					onClick={() => handleOk(editor, grid)}
					disabled={errors && errors.length > 0}
				/>
			</div>
		</Modal>
	);
}
