import React, { useReducer, useState } from "react";

import Modal from "../common/Modal";
import ModalNewWordInput from "../common/ModalNewWordInput";
import ModalButton from "../common/ModalOkButton";
import ModalPreview from "../common/ModalPreview";
import ModalWordList from "../common/ModalWordList";
import WordSearchGrid from "./WordSearchGrid";

import { createWordSearch } from "./WordSearchUtils";

import ModalCheckbox from "../common/ModalCheckbox";
import ModalInputNumber from "../common/ModalInputNumber";

import { insertarEjercicioEditable } from "../../SlateEditor/utils/SlateUtilityFunctions";
import { TableUtil } from "../../SlateEditor/utils/TableUtil";
import { ModalType } from "../ModalFactory";

// Valores Constantes
const DIRECTIONS = {
	horizontal: "horizontal",
	vertical: "vertical",
	diagonal: "diagonal",
};

const MIN_DIMENSION = 1;
const MAX_DIMENSION = 15;

// Valores por defecto del estado
const initialState = {
	numRows: MIN_DIMENSION,
	numCols: MIN_DIMENSION,
	wordList: [],
	directions: Object.keys(DIRECTIONS).reduce((obj, key) => {
		return { ...obj, [key]: true };
	}, {}),
	showWords: true,
	showDirections: true,
	backwards: false,
	backwardsProbability: 1.0,
};

// Tipos de accion para modificar el estado del componente
const ActionType = Object.freeze({
	resetState: Symbol("resetState"),
	updateState: Symbol("updateState"),
	updateNumRows: Symbol("updateNumRows"),
	updateNumCols: Symbol("updateNumCols"),
	addWordToWordList: Symbol("addWordToWordList"),
	editWordOfWordList: Symbol("editWordOfWordList"),
	deleteWordFromWordList: Symbol("deleteWordFromWordList"),
	updateDirections: Symbol("updateDirections"),
	updateBackwards: Symbol("updateBackwards"),
	updateBackwardsProbability: Symbol("updateBackwardsProbability"),
	updateShowWords: Symbol("updateShowWords"),
	updateShowDirections: Symbol("updateShowDirections"),
});

// Modificar el estado dependiendo de la accion ejecutada
const reducer = (state, action) => {
	switch (action.type) {
		case ActionType.resetState: {
			return { ...initialState };
		}
		case ActionType.updateState: {
			return { ...action.newValue };
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
					[action.direction]: Boolean(action.newValue),
				},
			};
		}
		case ActionType.updateBackwards: {
			return {
				...state,
				backwards: Boolean(action.newValue),
			};
		}
		case ActionType.updateBackwardsProbability: {
			const backwardsProbability = Number(action.newValue);

			if (isNaN(backwardsProbability) || backwardsProbability < 0.0 || backwardsProbability > 1.0)
				throw new Error("Invalid backwards probability!");

			return {
				...state,
				backwardsProbability,
			};
		}
		case ActionType.updateShowWords: {
			return {
				...state,
				showWords: Boolean(action.newValue),
			};
		}
		case ActionType.updateShowDirections: {
			return {
				...state,
				showDirections: Boolean(action.newValue),
			};
		}
		default:
			throw new Error(`Undefined action: ${action}`);
	}
};

export default function WordSearchModal({ editor, isOpen, onClose, openModal }) {
	// Estado del componente
	const [state, dispatch] = useReducer(reducer, initialState);
	const [path, setPath] = useState(null);

	const { numRows, numCols, wordList, directions, showWords, showDirections, backwards, backwardsProbability } =
		state;

	// Datos que se pueden generar con el estado (se calculan cada vez que se renderiza la vista)
	let grid = null;
	let addedWords = null;
	let warnings = null;
	let errors = null;

	if (wordList && wordList.length > 0)
		({ grid, addedWords, warnings, errors } = createWordSearch(
			numRows,
			numCols,
			directions,
			backwards ? backwardsProbability : 0.0,
			wordList,
			MIN_DIMENSION,
			MAX_DIMENSION
		));

	//#region Funciones auxiliares
	const openModalUpdate = (path, data) => {
		openModal(ModalType.wordSearch);

		dispatch({ type: ActionType.updateState, newValue: { ...initialState, ...data } });
		setPath(path);
	};

	const generateExerciseStatement = (addedWords) => {
		const { directions, showWords, showDirections } = state;

		const enabledDirections = Object.keys(directions)
			.filter((key) => directions[key] === true)
			.map((key) => DIRECTIONS[key]);

		const directionsStatement = `Ten en cuenta que ${
			addedWords.length === 1 ? "puede estar escondida" : "pueden estar escondidas"
		} en ${enabledDirections.reduce(
			(result, current, index, array) =>
				result + (index > 0 ? (index === array.length - 1 ? " y " : ", ") : "") + current,
			""
		)}. ${
			backwards
				? `También ${addedWords.length === 1 ? "puede estar escrita" : "pueden estar escritas"} al revés.`
				: ""
		}`;

		let statement = "";

		if (showWords)
			statement = `Encuentra ${
				addedWords.length === 1 ? "la siguiente palabra" : "las siguientes palabras"
			} en la sopa de letras: ${addedWords.sort().join(", ")}. ${showDirections ? directionsStatement : ""}`;
		else
			statement = `Encuentra ${addedWords.length === 1 ? "la palabra" : `las ${addedWords.length} palabras`}. ${
				showDirections ? directionsStatement : ""
			}`;

		return statement;
	};
	//#endregion

	//#region Manejadores de eventos
	const handleOk = (editor, grid, addedWords) => {
		const table = new TableUtil(editor);

		let exercise;

		if (!grid) exercise = "";
		else {
			exercise = [
				{
					type: "paragraph",
					children: [{ text: generateExerciseStatement(addedWords) }],
				},
				table.createTableNodeByArray(grid, "table-auto !m-auto text-center !mt-2"),
				{
					type: "paragraph",
					children: [{ text: "" }],
				},
			];
		}

		insertarEjercicioEditable(
			editor,
			{
				type: "ejercicio",
				openModalUpdate,
				data: {
					...state,
				},
				children: exercise,
			},
			path
		);

		handleClose();
	};

	const handleClose = () => {
		dispatch({ type: ActionType.resetState });
		setPath(null);

		onClose();
	};
	//#endregion

	return (
		<Modal title="Sopa de Letras" className="w-7/12" isOpen={isOpen} onClose={handleClose}>
			<div className="flex flex-col gap-8 xl:grid xl:grid-cols-[2fr_3fr] xl:gap-12">
				<div className="flex flex-col gap-5">
					<div>
						<h4 className="mb-2 text-modal-heading">Tamaño</h4>
						<div className="grid grid-cols-2 items-end gap-4 pl-4">
							<ModalInputNumber
								id="numRows"
								label="Número de filas"
								name="numRows"
								min={MIN_DIMENSION}
								max={MAX_DIMENSION}
								value={numRows}
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
								value={numCols}
								onChange={(e) =>
									dispatch({
										type: ActionType.updateNumCols,
										nextValue: e.target.value,
									})
								}
							/>
						</div>
					</div>
					<div>
						<h4 className="mb-2 text-modal-heading">Posicionamiento</h4>
						<div className="pl-4 xl:flex xl:items-center xl:gap-6">
							{DIRECTIONS &&
								Object.keys(DIRECTIONS)
									.map((key) => {
										return {
											key: key,
											value: DIRECTIONS[key],
										};
									})
									.map(({ key, value }) => {
										const capitalizedValue = `${value.charAt(0).toUpperCase()}${value.slice(1)}`;

										return (
											<ModalCheckbox
												key={`positionCheckbox-${key}`}
												label={capitalizedValue}
												name={key}
												id={key}
												defaultChecked={initialState.directions[key]}
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
						<div className="flex flex-col gap-1 pl-4">
							<ModalCheckbox
								label="Al revés"
								name="backwards"
								id="backwards"
								defaultChecked={initialState.backwards}
								onChange={(e) => {
									dispatch({
										type: ActionType.updateBackwards,
										newValue: e.target.checked,
									});
								}}
							/>
							<div className="pl-8">
								<label className={`${backwards ? "" : "opacity-50"}`} htmlFor="backwardsProbability">
									Probabilidad de aparecer al revés
								</label>
								<div className="flex gap-2">
									<input
										type="range"
										name="backwardsProbability"
										id="backwardsProbability"
										className="w-2/4"
										min="0"
										max="1"
										step="0.05"
										value={backwardsProbability}
										disabled={!backwards}
										onChange={(e) =>
											dispatch({
												type: ActionType.updateBackwardsProbability,
												newValue: e.target.value,
											})
										}
									/>
									<p className={`${backwards ? "" : "opacity-50"}`}>{backwardsProbability}</p>
								</div>
							</div>
						</div>
					</div>
					<div>
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
							className="mt-4 px-4"
							wordList={wordList}
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
					<div>
						<h4 className="mb-2 text-modal-heading">Enunciado</h4>
						<div className="pl-4">
							<ModalCheckbox
								label="Mostrar las palabras a buscar."
								name="showWords"
								id="showWords"
								defaultChecked={initialState.showWords}
								onChange={(e) => {
									dispatch({
										type: ActionType.updateShowWords,
										newValue: e.target.checked,
									});
								}}
							/>
						</div>
						<div className="pl-4">
							<ModalCheckbox
								label="Mostrar direcciones."
								name="showDirections"
								id="showDirections"
								defaultChecked={initialState.showDirections}
								onChange={(e) => {
									dispatch({
										type: ActionType.updateShowDirections,
										newValue: e.target.checked,
									});
								}}
							/>
						</div>
					</div>
				</div>
				<ModalPreview showAlerts warnings={warnings} errors={errors} previewHeight="h-[40rem] max-h-[40rem]">
					{grid && (
						<div className="flex flex-col gap-2">
							<p>{generateExerciseStatement(addedWords)}</p>
							<WordSearchGrid className="self-center" wordSearchGrid={grid} />
						</div>
					)}
				</ModalPreview>
			</div>
			<ModalButton
				className="mt-8 self-center"
				onClick={() => handleOk(editor, grid, addedWords)}
				disabled={grid === null}
			/>
		</Modal>
	);
}
