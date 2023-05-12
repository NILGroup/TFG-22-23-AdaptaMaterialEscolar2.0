import React, { useReducer, useState } from "react";
import Spinner from "../../Spinner/Spinner";
import Modal from "../common/Modal";
import ModalButton from "../common/ModalButton";
import ModalOkButton from "../common/ModalOkButton";
import ModalPreview from "../common/ModalPreview";

import { Transforms } from "slate";
import { insertarEjercicioEditable } from "../../SlateEditor/utils/SlateUtilityFunctions";
import ModalTextPanel from "../common/ModalTextPanel";
import { ModalType } from "../ModalFactory";

// Valores constantes
const ERROR_SUMMARY = "No se ha podido resumir este texto. Puede que el texto sea demasiado breve o no tenga sentido.";
const MIN_WORDS_SIZE = 15;
const MIN_SUMMARY_PERCENTAGE = 0.75;

// Valores por defecto del estado
const initialState = {
	originalText: null,
	originalTextLength: null,
	summaryLength: null,
	summary: null,
	errors: null,
	isLoading: false,
};

// Tipos de accion para modificar el estado del componente
const ActionType = Object.freeze({
	resetState: Symbol("resetState"),
	updateState: Symbol("updateState"),
	updateOriginalText: Symbol("originalText"),
	updateSummaryLength: Symbol("updateSummaryLength"),
	updateSummary: Symbol("updateSummary"),
	updateIsLoading: Symbol("updateIsLoading"),
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
		case ActionType.updateOriginalText: {
			const originalText = action.newValue;
			const textLength = originalText
				.trim()
				.split(/(\s)/g)
				.filter((word) => /[\S]/.test(word)).length;

			const originalTextLength = textLength > 0 ? textLength : null;

			let summaryLength = state.summaryLength;

			if (textLength * MIN_SUMMARY_PERCENTAGE < MIN_WORDS_SIZE) summaryLength = null;
			else if (state.summaryLength === null) summaryLength = textLength;

			return { ...state, originalText, originalTextLength, summaryLength };
		}
		case ActionType.updateSummaryLength: {
			return { ...state, summaryLength: action.newValue };
		}
		case ActionType.updateSummary: {
			const newSummary = action.newValue;

			if (newSummary === "-1") return { ...state, summary: initialState.summary, errors: [ERROR_SUMMARY] };
			else return { ...state, summary: newSummary, errors: initialState.errors };
		}
		case ActionType.updateIsLoading: {
			return { ...state, isLoading: action.newValue };
		}
		default:
			throw new Error(`Undefined action: ${action}`);
	}
};

export default function SummaryModal({ editor, isOpen, onClose, openModal }) {
	// Estados del modal
	const [state, dispatch] = useReducer(reducer, initialState);
	const [path, setPath] = useState(null);

	const { originalText, originalTextLength, summaryLength, summary, errors, isLoading } = state;

	//#region Manejadores de eventos
	const handleOriginalTextChange = (e) => {
		dispatch({ type: ActionType.updateOriginalText, newValue: e.target.value });
	};

	const handleSummarySizeChange = (e) => {
		dispatch({ type: ActionType.updateSummaryLength, newValue: e.target.value });
	};

	const handleOk = (e, summary) => {
		e.preventDefault();

		let exercise;

		if (!summary) exercise = "";
		else {
			exercise = [
				{
					type: "paragraph",
					children: [{ text: summary }],
				},
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

	//#region Funciones auxiliares
	const openModalUpdate = (path, data) => {
		openModal(ModalType.summary);

		dispatch({ type: ActionType.updateState, newValue: { ...initialState, ...data } });
		setPath(path);
	};

	const summarize = async (originalText, summaryLength) => {
		dispatch({ type: ActionType.updateIsLoading, newValue: true });

		try {
			const response = await fetch("/api/summary", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ originalText, summaryLength }),
			});

			const newSummary = await response.json();

			dispatch({ type: ActionType.updateSummary, newValue: newSummary });
		} catch (error) {
			console.log(error);
		} finally {
			dispatch({ type: ActionType.updateIsLoading, newValue: false });
		}
	};
	//#endregion

	return (
		<Modal title="Generar Resumen" className="w-6/12" isOpen={isOpen} onClose={handleClose}>
			<form
				className="flex flex-col gap-5"
				onSubmit={(e) => {
					e.preventDefault();

					const originalText = e.target.originalText.value.trim();

					summarize(originalText, summaryLength ?? Math.min(MIN_WORDS_SIZE, originalTextLength));
				}}
			>
				<ModalTextPanel
					label="Texto original"
					attributes={
						summaryLength !== null ? (
							<div className="flex flex-col items-end gap-2">
								<p>
									<strong>Tamaño: </strong>
									{summaryLength} palabras
								</p>
								<input
									type="range"
									name="summarySize"
									id="summarySize"
									min={MIN_WORDS_SIZE}
									step="1"
									max={originalTextLength}
									value={summaryLength}
									onChange={handleSummarySizeChange}
								/>
							</div>
						) : null
					}
					name="originalText"
					id="originalText"
					value={originalText}
					onChange={handleOriginalTextChange}
				/>
				<ModalButton
					type="submit"
					className="self-center py-2 px-4 text-modal-base-lg"
					disabled={originalTextLength === null}
				>
					Resumir
				</ModalButton>

				<hr className="my-4" />
			</form>
			<ModalPreview label="Resumen" errors={errors}>
				{isLoading ? <Spinner /> : summary}
			</ModalPreview>
			<ModalOkButton
				className="my-2 self-center"
				onClick={(e) => handleOk(e, summary)}
				disabled={summary === initialState.summary}
			/>
		</Modal>
	);
}
