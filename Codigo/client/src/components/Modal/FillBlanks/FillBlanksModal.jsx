import React, { useReducer, useState } from "react";

import { GapType, getGapTypeInfo } from "./Gap";
import { ModalGapRadio } from "./ModalGapRadio";

import { AiOutlineInfoCircle } from "react-icons/ai";
import { insertarEjercicioEditable } from "../../SlateEditor/utils/SlateUtilityFunctions";
import Modal from "../common/Modal";
import ModalAlertButton from "../common/ModalAlertButton";
import ModalButton from "../common/ModalButton";
import ModalOkButton from "../common/ModalOkButton";
import ModalPanel from "../common/ModalPanel";
import ModalTextPanel from "../common/ModalTextPanel";
import { ModalType } from "../ModalFactory";

// Valores por defecto para el estado
const initialState = {
	isAddingGaps: false,
	originalText: "",
	words: null,
	gaps: null,
	gapType: GapType.Medium,
};

// Tipos de accion para modificar el estado del componente
const ActionType = Object.freeze({
	resetState: Symbol("resetState"),
	updateState: Symbol("updateState"),
	toggleIsAddingGaps: Symbol("isAddingGaps"),
	updateOriginalText: Symbol("updateOriginalText"),
	toggleGap: Symbol("toggleGap"),
	updateGapType: Symbol("updateGapType"),
});

const reducer = (state, action) => {
	switch (action.type) {
		case ActionType.resetState: {
			return { ...initialState };
		}
		case ActionType.updateState: {
			return { ...action.newValue };
		}
		case ActionType.toggleIsAddingGaps: {
			return { ...state, isAddingGaps: !state.isAddingGaps };
		}
		case ActionType.updateOriginalText: {
			const text = action.newValue;

			if (!action.newValue) return { ...state, originalText: text, words: null, gaps: null };

			const newWords = text.split(/([\n\r\s\t?¿!¡,.;:'"])/g);
			const newGaps = Array.from({ length: newWords.length }, () => false);

			return { ...state, originalText: text, words: newWords, gaps: newGaps };
		}
		case ActionType.toggleGap: {
			const index = action.index;

			if (index < 0 || index >= state.words.length) return { ...state };

			const newGaps = Array.from(state.gaps, (v, i) => (i === index ? !v : v));

			return { ...state, gaps: newGaps };
		}
		case ActionType.updateGapType: {
			return { ...state, gapType: action.newValue };
		}
	}
};

export default function FillBlanksModal({ editor, isOpen, onClose, openModal }) {
	// Estado del componente
	const [state, dispatch] = useReducer(reducer, initialState);
	const [path, setPath] = useState(null);

	const { isAddingGaps, originalText, words, gaps, gapType } = state;

	//#region Manejadores de eventos
	const openModalUpdate = (path, data) => {
		openModal(ModalType.fillBlanks);

		dispatch({
			type: ActionType.updateState,
			newValue: {
				...initialState,
				...data,
			},
		});

		setPath(path);
	};

	const handleTextAreaInput = (e) => {
		dispatch({ type: ActionType.updateOriginalText, newValue: e.target.value });
	};

	const handleFormSubmit = (e) => {
		e.preventDefault();

		let exercise;

		if (!words) exercise = "";
		else {
			exercise = [
				{
					type: "enunciado",
					children: [
						{
							text: "Resuelve el siguiente ejercicio completando los huecos con las palabras adecuadas:",
							bold: true,
						},
					],
				},
				{
					type: "paragraph",
					children: [
						{
							text: `${words
								.map((word, index) => (gaps[index] ? "_".repeat(getGapTypeInfo(gapType).length) : word))
								.join("")}`,
						},
					],
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
					originalText: originalText,
					gapType: gapType,
					gaps: gaps,
					words: words,
				},
				children: exercise,
			},
			path
		);

		handleClose();
	};

	const handleWordClick = (index) => {
		dispatch({ type: ActionType.toggleGap, index });
	};

	const handleChangeModeButton = (e) => {
		e.preventDefault();

		dispatch({ type: ActionType.toggleIsAddingGaps });
	};

	const handleModalGapRadioChange = (gapType) => {
		dispatch({ type: ActionType.updateGapType, newValue: gapType });
	};

	const handleClose = () => {
		dispatch({ type: ActionType.resetState });
		setPath(null);

		onClose();
	};
	//#endregion

	return (
		<Modal title="Completar Huecos" className="w-6/12" isOpen={isOpen} onClose={handleClose}>
			<form className="flex flex-col" onSubmit={handleFormSubmit}>
				<div className="flex flex-col items-start gap-4">
					{isAddingGaps ? (
						<ModalPanel
							label="Texto"
							panelClassName="flex flex-wrap"
							attributes={
								<ModalAlertButton
									icon={<AiOutlineInfoCircle size={30} />}
									iconButtonClassName="text-alert-info-dark hover:text-alert-info"
									defaultIsOpen={false}
									listStyle="list-none"
									placement="left"
									alertBoxClassName="bg-alert-info text-alert-info-dark"
									contentList={[
										"Haz clic izquierdo sobre las palabras para convertirlas en huecos, y viceversa.",
									]}
								/>
							}
						>
							{words.map((word, index) => {
								if (!word) return null;

								if (word === " ") return <React.Fragment key={`nbsp-${index}`}>&nbsp;</React.Fragment>;

								if (word === "\n") return <br key={`linebreak-${index}`} />;

								if (word === "\t") return <React.Fragment key={`tab-${index}`}>&emsp;</React.Fragment>;

								if (/^[.,/#!$%^&*;:{}=\-_`~()´?¿!¡'"]$/.test(word))
									return <span key={`punctuationSign-${index}`}>{word}</span>;

								return (
									<span
										key={`word-${index}`}
										className="cursor-pointer hover:font-bold hover:text-primary"
										onClick={() => handleWordClick(index)}
									>
										{gaps[index] ? "_".repeat(getGapTypeInfo(gapType).length) : word}
									</span>
								);
							})}
						</ModalPanel>
					) : (
						<ModalTextPanel
							label="Texto"
							name="originalText"
							id="originalText"
							value={originalText}
							onChange={handleTextAreaInput}
						/>
					)}
					<ModalButton
						className="self-end py-2 px-3"
						onClick={handleChangeModeButton}
						disabled={words === null}
					>
						{!isAddingGaps ? "Añadir huecos" : "Editar texto"}
					</ModalButton>
				</div>
				<div>
					<h4 className="text-modal-heading font-normal">Tamaño de los huecos:</h4>
					<div className="mt-2 w-full px-4">
						{Object.keys(GapType).map((key, i) => (
							<ModalGapRadio
								key={`gap-${key}${i}`}
								gapType={GapType[key]}
								checked={gapType === GapType[key]}
								onChange={handleModalGapRadioChange}
							/>
						))}
					</div>
				</div>
				<ModalOkButton className="mt-5 self-center" disabled={words === null} />
			</form>
		</Modal>
	);
}
