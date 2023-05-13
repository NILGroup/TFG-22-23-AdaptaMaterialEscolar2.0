import React, { useReducer, useState } from "react";

import { Dropdown } from "flowbite-react";
import { HiChevronDown } from "react-icons/hi";
import { HiCog6Tooth } from "react-icons/hi2";

import { insertarEjercicioEditable } from "../../SlateEditor/utils/SlateUtilityFunctions";
import Spinner from "../../Spinner/Spinner";
import Modal from "../common/Modal";
import ModalButton from "../common/ModalButton";
import ModalCheckbox from "../common/ModalCheckbox";
import ModalOkButton from "../common/ModalOkButton";
import ModalRadioButton from "../common/ModalRadioButton";
import ModalTextPanel from "../common/ModalTextPanel";
import { ModalType } from "../ModalFactory";
import { PictogramGrid, TextPosition } from "./PictogramGrid";

// Valores por defecto del estado
const initialState = {
	originalText: null,
	searchedText: null,
	textPosition: TextPosition.above,
	isBlackWhite: false,
	pictos: null,
	isLoading: false,
};

// Tipos de accion para modificar el estado del componente
const ActionType = Object.freeze({
	resetState: Symbol("resetState"),
	updateOriginalText: Symbol("updateOriginalText"),
	updateSearchedText: Symbol("updateSearchedText"),
	updateTextPosition: Symbol("updateTextPosition"),
	updateIsBlackWhite: Symbol("updateIsBlackWhite"),
	updatePictos: Symbol("updatePictos"),
	changePictogram: Symbol("changePictogram"),
	disablePictogram: Symbol("disablePictogram"),
	updateIsLoading: Symbol("updateIsLoading"),
});

// Modificar el estado dependiendo de la accion ejecutada
const reducer = (state, action) => {
	switch (action.type) {
		case ActionType.resetState: {
			return { ...initialState };
		}
		case ActionType.updateState: {
			return { ...action.newValue, originalText: action.newValue.searchedText };
		}
		case ActionType.updateOriginalText: {
			const newText = action.newValue;

			if (newText.length > 0) return { ...state, originalText: newText };
			else return { ...state, originalText: null };
		}
		case ActionType.updateSearchedText: {
			const newText = action.newValue;

			if (newText.length > 0) return { ...state, searchedText: newText };
			else return { ...state, searchedText: null };
		}
		case ActionType.updateTextPosition: {
			const newTextPosition = action.newValue;

			return { ...state, textPosition: newTextPosition };
		}
		case ActionType.updateIsBlackWhite: {
			const newIsBlackWhite = Boolean(action.newValue);

			return { ...state, isBlackWhite: newIsBlackWhite };
		}
		case ActionType.updatePictos: {
			const newPictos = action.newValue;

			return { ...state, pictos: newPictos };
		}
		case ActionType.changePictogram: {
			const wordIndex = action.wordIndex;
			const pictoIndex = action.pictoIndex;

			if (!state.pictos || state.pictos.length <= 0) return { ...state };

			return {
				...state,
				pictos: state.pictos.map((word, index) =>
					index === wordIndex ? { ...word, currentPicto: pictoIndex } : { ...word }
				),
			};
		}
		case ActionType.disablePictogram: {
			const wordIndex = action.wordIndex;

			if (!state.pictos || state.pictos.length <= 0) return;

			return {
				...state,
				pictos: state.pictos.map((word, index) =>
					index === wordIndex ? { ...word, disabled: !word.disabled } : { ...word }
				),
			};
		}
		case ActionType.updateIsLoading: {
			const newIsLoading = Boolean(action.newValue);

			return { ...state, isLoading: newIsLoading };
		}
		default:
			throw new Error(`Undefined action: ${action}`);
	}
};

export default function Pictotranslator({ editor, isOpen, onClose, openModal }) {
	// Estados del modal
	const [state, dispatch] = useReducer(reducer, initialState);
	const [path, setPath] = useState(null);

	const { originalText, searchedText, textPosition, isBlackWhite, pictos, isLoading } = state;

	//#region Manejadores de eventos
	const handleOk = (e, pictos) => {
		e.preventDefault();

		const values = {
			textPosition,
			isBlackWhite,
			text: searchedText,
			words: pictos,
		};

		let exercise;

		if (!pictos) exercise = "";
		else {
			exercise = [
				{
					type: "pictotranslator",
					values,
					children: [{ text: "" }],
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
				type: "bloqueEditable",
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
		openModal(ModalType.pictotranslator);

		dispatch({ type: ActionType.updateState, newValue: { ...initialState, ...data } });
		setPath(path);
	};

	const pictotranslate = async (originalText) => {
		dispatch({ type: ActionType.updateIsLoading, newValue: true });

		try {
			const response = await fetch("/api/pictotranslator", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ originalText }),
			});

			const newPictos = await response.json();

			dispatch({ type: ActionType.updateSearchedText, newValue: originalText });
			dispatch({ type: ActionType.updatePictos, newValue: newPictos });
		} catch (error) {
			console.log(error);
		} finally {
			dispatch({ type: ActionType.updateIsLoading, newValue: false });
		}
	};
	//#endregion

	return (
		<Modal title="Pictotraductor" className="w-8/12" isOpen={isOpen} onClose={handleClose}>
			<form
				className="flex flex-col gap-5"
				onSubmit={(e) => {
					e.preventDefault();

					if (originalText === null) return;

					pictotranslate(originalText);
				}}
			>
				<ModalTextPanel
					label="Texto original"
					attributes={
						<Dropdown
							label={
								<div className="flex items-center">
									<HiCog6Tooth size={25} />
									<HiChevronDown size={18} />
								</div>
							}
							arrowIcon={false}
							dismissOnClick={false}
							size="sm"
							title="Opciones de Pictograma"
							class="rounded-md bg-button text-white enabled:hover:bg-button-dark disabled:bg-opacity-60"
						>
							<Dropdown.Item>
								<div className="flex flex-col">
									<h5 className="font-bold">Opciones de texto:</h5>
									<div className="mt-2 flex flex-col gap-1.5 pl-2">
										<ModalRadioButton
											label="Arriba"
											name="textPosition"
											id={`textPositionAbove`}
											value={TextPosition.above}
											checked={textPosition === TextPosition.above}
											onChange={(e) =>
												dispatch({
													type: ActionType.updateTextPosition,
													newValue: e.target.value,
												})
											}
										/>
										<ModalRadioButton
											label="Debajo"
											name="textPosition"
											id={`textPositionBelow`}
											value={TextPosition.below}
											checked={textPosition === TextPosition.below}
											onChange={(e) =>
												dispatch({
													type: ActionType.updateTextPosition,
													newValue: e.target.value,
												})
											}
										/>
										<ModalRadioButton
											label="Sin texto"
											name="textPosition"
											id={`textPositionNoText`}
											value={TextPosition.noText}
											checked={textPosition === TextPosition.noText}
											onChange={(e) =>
												dispatch({
													type: ActionType.updateTextPosition,
													newValue: e.target.value,
												})
											}
										/>
									</div>
								</div>
							</Dropdown.Item>
							<Dropdown.Divider />
							<Dropdown.Item>
								<div className="flex flex-col">
									<h5 className="font-bold">Opciones de color:</h5>
									<div className="mt-2 flex flex-col pl-2 lg:flex-row lg:justify-evenly">
										<ModalCheckbox
											label="Blanco y negro"
											name="pictoColor"
											id="pictoColor"
											checked={isBlackWhite}
											onChange={(e) => {
												dispatch({
													type: ActionType.updateIsBlackWhite,
													newValue: e.target.checked,
												});
											}}
										/>
									</div>
								</div>
							</Dropdown.Item>
						</Dropdown>
					}
					name="originalText"
					id="originalText"
					value={originalText ?? ""}
					onChange={(e) => dispatch({ type: ActionType.updateOriginalText, newValue: e.target.value })}
				/>
				<ModalButton
					type="submit"
					className="self-center py-2 px-4 text-modal-base-lg"
					disabled={originalText === null || originalText.trim().length === 0}
				>
					Traducir
				</ModalButton>
			</form>
			{(pictos || isLoading) && <hr className="mt-8" />}
			{isLoading ? (
				<Spinner />
			) : (
				pictos &&
				(pictos.some((word) => word.pictograms.length > 0) ? (
					<>
						<h4 className="mt-2 text-modal-heading">Pictogramas</h4>
						<PictogramGrid
							words={pictos}
							setPicto={(wordIndex, pictoIndex) =>
								dispatch({ type: ActionType.changePictogram, wordIndex, pictoIndex })
							}
							disablePicto={(wordIndex) => dispatch({ type: ActionType.disablePictogram, wordIndex })}
							textPosition={textPosition}
							isBlackWhite={isBlackWhite}
						/>
						<ModalOkButton
							className="my-2 self-center"
							onClick={(e) => handleOk(e, pictos)}
							disabled={pictos === initialState.pictos || pictos.every((word) => word.disabled)}
						/>
					</>
				) : (
					<>
						<h4 className="mt-4 self-center text-modal-heading">No se han encontrado pictogramas</h4>
					</>
				))
			)}
		</Modal>
	);
}
