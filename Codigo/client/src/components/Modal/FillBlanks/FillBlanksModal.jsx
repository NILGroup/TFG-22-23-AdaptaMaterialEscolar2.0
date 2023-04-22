import React, { useReducer } from "react";

import { GapType, getGapTypeInfo } from "./Gap";
import { ModalGapRadio } from "./ModalGapRadio";

import { AiOutlineInfoCircle } from "react-icons/ai";
import { Transforms } from "slate";
import Modal from "../common/Modal";
import ModalAlertButton from "../common/ModalAlertButton";
import ModalButton from "../common/ModalButton";
import ModalOkButton from "../common/ModalOkButton";
import ModalPanel from "../common/ModalPanel";
import ModalTextPanel from "../common/ModalTextPanel";

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
	resetState: Symbol("resetstate"),
	toggleIsAddingGaps: Symbol("isaddinggaps"),
	updateText: Symbol("originalText"),
	toggleGap: Symbol("togglegap"),
	updateGapType: Symbol("updategaptype"),
});

const reducer = (state, action) => {
	switch (action.type) {
		case ActionType.resetState: {
			return { ...initialState };
		}
		case ActionType.toggleIsAddingGaps: {
			return { ...state, isAddingGaps: !state.isAddingGaps };
		}
		case ActionType.updateOriginalText: {
			const text = action.newValue;

			if (!action.newValue) return { ...state, originalText: text, words: null, gaps: null };

			const newWords = text.split(/([^\w\d])/g);
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

export default function FillBlanksModal({ editor, isOpen, onClose }) {
	// Estado del componente
	const [state, dispatch] = useReducer(reducer, initialState);

	//#region Manejadores de eventos
	const handleTextAreaInput = (e) => {
		dispatch({ type: ActionType.updateTextm, newValue: e.target.value });
	};

	const handleFormSubmit = (e) => {
		e.preventDefault();

		let exercise;
		if (!state.words) exercise = "";
		else
			exercise = `Resuelve el siguiente ejercicio completando los huecos con las palabras adecuadas:\n${state.words
				.map((word, index) => (state.gaps[index] ? "_".repeat(getGapTypeInfo(state.gapType).length) : word))
				.join("")}`;

		Transforms.insertNodes(editor, {
			type: "paragraph",
			children: [{ text: exercise }],
		});

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

		onClose();
	};
	//#endregion

	return (
		<Modal title="Completar Huecos" className="w-6/12" isOpen={isOpen} onClose={handleClose}>
			<form className="flex flex-col" onSubmit={handleFormSubmit}>
				<div className="flex flex-col items-start gap-4">
					{state.isAddingGaps ? (
						<ModalPanel
							label="Texto"
							panelClassName="break-words"
							attributes={
								<ModalAlertButton
									icon={<AiOutlineInfoCircle size={30} />}
									iconButtonClassName="text-alert-info-dark hover:text-alert-info"
									listStyle="list-none"
									alertBoxClassName="bg-alert-info text-alert-info-dark"
									contentList={["Haz clic izquierdo sobre las palabras para convertirlas en huecos"]}
								/>
							}
						>
							{state.words.map((word, index) => {
								if (!word) return null;

								if (word === " ") return <React.Fragment key={`nbsp-${index}`}>&nbsp;</React.Fragment>;

								if (word === "\n") return <br key={`linebreak-${index}`} />;

								if (/([^\s\w\d])/g.test(word))
									return <React.Fragment key={`punctuationSign-${index}`}>{word}</React.Fragment>;

								return (
									<span
										key={`word-${index}`}
										className="cursor-pointer hover:font-bold hover:text-primary"
										onClick={() => handleWordClick(index)}
									>
										{state.gaps[index] ? "_".repeat(getGapTypeInfo(state.gapType).length) : word}
									</span>
								);
							})}
						</ModalPanel>
					) : (
						<ModalTextPanel
							label="Texto"
							name="originalText"
							id="originalText"
							value={state.originalText}
							onChange={handleTextAreaInput}
						/>
					)}
					<ModalButton
						className="self-end py-2 px-3"
						onClick={handleChangeModeButton}
						disabled={state.words === null}
					>
						{!state.isAddingGaps ? "Añadir huecos" : "Editar texto"}
					</ModalButton>
				</div>
				<div>
					<h4 className="text-modal-heading font-normal">Tamaño de los huecos:</h4>
					<div className="mt-2 w-full px-4">
						{Object.keys(GapType).map((key, i) => (
							<ModalGapRadio
								key={`gap-${key}${i}`}
								gapType={GapType[key]}
								defaultChecked={initialState.gapType === GapType[key]}
								onChange={handleModalGapRadioChange}
							/>
						))}
					</div>
				</div>
				<ModalOkButton className="mt-5 self-center" disabled={state.words === null} />
			</form>
		</Modal>
	);
}
