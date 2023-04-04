import React, { useState } from "react";

import Spinner from "../../Spinner/Spinner";
import Modal from "../common/Modal";
import ModalButton from "../common/ModalButton";
import ModalOkButton from "../common/ModalOkButton";
import ModalRadioButton from "../common/ModalRadioButton";
import { PictogramGrid, TextPosition } from "./PictogramGrid";

import { Transforms } from "slate";

export default function Pictotranslator({ editor, isOpen, onClose }) {
	// Valores iniciales del estado
	const DEFAULT_HAS_ORIGINAL_TEXT = false;
	const DEFAULT_PICTOS = null;
	const DEFAULT_TEXT_POSITION = TextPosition.above;
	const DEFAULT_IS_LOADING = false;

	// Estados del modal
	const [hasOriginalText, setHasOriginalText] = useState(DEFAULT_HAS_ORIGINAL_TEXT);
	const [textPosition, setTextPosition] = useState(DEFAULT_TEXT_POSITION);
	const [pictos, setPictos] = useState(DEFAULT_PICTOS);
	const [isLoading, setIsLoading] = useState(DEFAULT_IS_LOADING);

	//#region Manejadores de eventos
	const handleOriginalTextChange = (e) => {
		const newText = e.target.value.trim();

		if (newText.length > 0) setHasOriginalText(true);
		else setHasOriginalText(false);
	};

	const handleClose = () => {
		setHasOriginalText(DEFAULT_HAS_ORIGINAL_TEXT);
		setPictos(DEFAULT_PICTOS);
		setIsLoading(DEFAULT_IS_LOADING);

		onClose();
	};

	const handleOk = (e, pictos) => {
		e.preventDefault();

		pictos.forEach((picto) => {
			const text = { text: "" };
			const pictogram = { type: "image", url: picto.pictograms[picto.currentPicto], children: [text] };

			if (!picto.disabled) Transforms.insertNodes(editor, pictogram);
		});

		handleClose();
	};
	//#endregion

	//#region Funciones auxiliares
	const pictoTranslate = async (originalText) => {
		setIsLoading(true);

		try {
			const response = await fetch("/pictotranslator", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ originalText }),
			});

			const newPictos = await response.json();

			setPictos(newPictos);
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};

	const setWordPicto = (wordIndex, pictoIndex) => {
		if (!pictos || pictos.length <= 0) return;

		pictos[wordIndex].currentPicto = pictoIndex;
	};

	const disablePicto = (wordIndex) => {
		if (!pictos || pictos.length <= 0) return;

		pictos[wordIndex].disabled = !pictos[wordIndex].disabled;
	};
	//#endregion

	return (
		<Modal title="Pictotraductor" className="w-6/12" isOpen={isOpen} onClose={handleClose}>
			<form
				className="flex flex-col gap-5"
				onSubmit={(e) => {
					e.preventDefault();

					const originalText = e.target.originalText.value;

					pictoTranslate(originalText);
				}}
			>
				<div className="w-full max-w-full">
					<div className="flex items-center justify-between rounded-md rounded-b-none border-2 border-b-0 border-grey-dark bg-grey px-4 py-2">
						<h4 className="text-modal-heading">Texto original</h4>
					</div>
					<textarea
						name="originalText"
						id="originalText"
						className="input-textarea h-40 w-full rounded-t-none"
						onChange={handleOriginalTextChange}
					/>
				</div>
				<ModalButton
					type="submit"
					className="self-center py-2 px-4 text-modal-base-lg"
					disabled={!hasOriginalText}
				>
					Pictotraducir
				</ModalButton>
			</form>
			{(pictos || isLoading) && <hr className="mt-8" />}
			{isLoading ? (
				<Spinner />
			) : (
				pictos && (
					<>
						<h4 className="mt-2 text-modal-heading">Opciones de texto</h4>
						<div className="flex flex-col lg:flex-row lg:justify-evenly">
							<ModalRadioButton
								label="Arriba"
								name="textPosition"
								id={`textPositionAbove`}
								value={TextPosition.above}
								defaultChecked={textPosition === TextPosition.above}
								onChange={(e) => setTextPosition(e.target.value)}
							/>
							<ModalRadioButton
								label="Debajo"
								name="textPosition"
								id={`textPositionBelow`}
								value={TextPosition.below}
								defaultChecked={textPosition === TextPosition.below}
								onChange={(e) => setTextPosition(e.target.value)}
							/>
							<ModalRadioButton
								label="Sin texto"
								name="textPosition"
								id={`textPositionNoText`}
								value={TextPosition.noText}
								defaultChecked={textPosition === TextPosition.noText}
								onChange={(e) => setTextPosition(e.target.value)}
							/>
						</div>
						<h4 className="mt-2 text-modal-heading">Pictogramas</h4>
						<PictogramGrid
							words={pictos}
							setPicto={setWordPicto}
							disablePicto={disablePicto}
							textPosition={textPosition}
						/>
						<ModalOkButton
							className="my-2 self-center"
							onClick={(e) => handleOk(e, pictos)}
							disabled={pictos === DEFAULT_PICTOS}
						/>
					</>
				)
			)}
		</Modal>
	);
}
