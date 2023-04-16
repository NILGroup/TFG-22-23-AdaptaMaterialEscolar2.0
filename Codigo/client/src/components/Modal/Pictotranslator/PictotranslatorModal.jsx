import React, { useEffect, useState } from "react";

import { Dropdown } from "flowbite-react";
import { HiChevronDown } from "react-icons/hi";
import { HiCog6Tooth } from "react-icons/hi2";

import Spinner from "../../Spinner/Spinner";
import Modal from "../common/Modal";
import ModalButton from "../common/ModalButton";
import ModalCheckbox from "../common/ModalCheckbox";
import ModalOkButton from "../common/ModalOkButton";
import ModalRadioButton from "../common/ModalRadioButton";
import { PictogramGrid, TextPosition } from "./PictogramGrid";

import { Transforms } from "slate";

export default function Pictotranslator({ editor, isOpen, onClose, data }) {
	// Valores iniciales del estado
	const DEFAULT_ORIGINAL_TEXT = null;
	const DEFAULT_SEARCHED_TEXT = null;
	const DEFAULT_TEXT_POSITION = TextPosition.above;
	const DEFAULT_IS_BLACK_WHITE = false;
	const DEFAULT_PICTOS = null;
	const DEFAULT_IS_LOADING = false;

	// Estados del modal
	const [originalText, setOriginalText] = useState(DEFAULT_ORIGINAL_TEXT);
	const [searchedText, setSearchedText] = useState(DEFAULT_SEARCHED_TEXT);
	const [textPosition, setTextPosition] = useState(DEFAULT_TEXT_POSITION);
	const [isBlackWhite, setIsBlackWhite] = useState(DEFAULT_IS_BLACK_WHITE);
	const [pictos, setPictos] = useState(DEFAULT_PICTOS);
	const [isLoading, setIsLoading] = useState(DEFAULT_IS_LOADING);

	//#region Manejadores de eventos
	const handleOriginalTextChange = (e) => {
		const newText = e.target.value;

		if (newText.length > 0) setOriginalText(newText);
		else setOriginalText(null);
	};

	const handleClose = () => {
		reset();

		onClose();
	};

	const handleOk = (e, pictos) => {
		e.preventDefault();

		const values = {
			textPosition,
			isBlackWhite,
			text: searchedText,
			words: pictos.filter((picto) => !picto.disabled),
		};

		if (data !== undefined) Transforms.setNodes(editor, { values });
		else {
			const pictograms = {
				type: "pictotranslator",
				values,
				children: [{ text: "" }],
			};

			Transforms.insertNodes(editor, pictograms);
		}

		handleClose();
	};
	//#endregion

	//#region Funciones auxiliares
	const pictotranslate = async (originalText) => {
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

			setSearchedText(originalText);
			setPictos(newPictos);
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};

	const setWordPicto = (wordIndex, pictoIndex) => {
		if (!pictos || pictos.length <= 0) return;

		setPictos((previousState) =>
			previousState.map((word, index) => (index === wordIndex ? { ...word, currentPicto: pictoIndex } : word))
		);
	};

	const disablePicto = (wordIndex) => {
		if (!pictos || pictos.length <= 0) return;

		setPictos((previousState) =>
			previousState.map((word, index) => (index === wordIndex ? { ...word, disabled: !word.disabled } : word))
		);
	};

	const reset = () => {
		setOriginalText(DEFAULT_ORIGINAL_TEXT);
		setSearchedText(DEFAULT_SEARCHED_TEXT);
		setTextPosition(DEFAULT_TEXT_POSITION);
		setIsBlackWhite(DEFAULT_IS_BLACK_WHITE);
		setPictos(DEFAULT_PICTOS);
		setIsLoading(DEFAULT_IS_LOADING);
	};
	//#endregion

	useEffect(() => {
		if (data !== undefined) {
			setOriginalText(data?.text ?? DEFAULT_ORIGINAL_TEXT);
			setSearchedText(data?.text ?? DEFAULT_SEARCHED_TEXT);
			setTextPosition(data?.textPosition ?? DEFAULT_TEXT_POSITION);
			setIsBlackWhite(data?.isBlackWhite ?? DEFAULT_IS_BLACK_WHITE);
			setPictos(
				data?.words.map((word) => {
					return { ...word };
				}) ?? DEFAULT_PICTOS
			);
			setIsLoading(false);
		} else reset();
	}, [isOpen]);

	return (
		<Modal title="Pictotraductor" className="w-6/12" isOpen={isOpen} onClose={handleClose}>
			<form
				className="flex flex-col gap-5"
				onSubmit={(e) => {
					e.preventDefault();

					if (originalText === null) return;

					pictotranslate(originalText);
				}}
			>
				<div className="w-full max-w-full">
					<div className="flex items-center justify-between rounded-md rounded-b-none border-2 border-b-0 border-grey-dark bg-grey px-4 py-2">
						<h4 className="text-modal-heading">Texto original</h4>
						<Dropdown
							label={
								<div className="flex items-center">
									<HiCog6Tooth size={25} />
									<HiChevronDown size={18} />
								</div>
							}
							arrowIcon={false}
							dismissOnClick={false}
							title="Opciones de Pictograma"
							class="rounded-md bg-button text-white enabled:hover:bg-button-dark disabled:bg-opacity-60"
						>
							<Dropdown.Item>
								<div className="flex flex-col">
									<h5 className="font-bold">Opciones de texto:</h5>
									<div className="mt-1.5 flex flex-col pl-2">
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
								</div>
							</Dropdown.Item>
							<Dropdown.Divider />
							<Dropdown.Item>
								<div className="flex flex-col">
									<h5 className="font-bold">Opciones de color:</h5>
									<div className="mt-1.5 flex flex-col pl-2 lg:flex-row lg:justify-evenly">
										<ModalCheckbox
											label="Blanco y negro"
											name="pictoColor"
											id="pictoColor"
											defaultChecked={isBlackWhite}
											onChange={(e) => {
												setIsBlackWhite(e.target.checked);
											}}
										/>
									</div>
								</div>
							</Dropdown.Item>
						</Dropdown>
					</div>
					<textarea
						name="originalText"
						id="originalText"
						className="input-textarea h-40 w-full rounded-t-none"
						value={originalText ?? ""}
						onChange={handleOriginalTextChange}
					/>
				</div>
				<ModalButton
					type="submit"
					className="self-center py-2 px-4 text-modal-base-lg"
					disabled={originalText === null}
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
						<h4 className="mt-2 text-modal-heading">Pictogramas</h4>
						<PictogramGrid
							words={pictos}
							setPicto={setWordPicto}
							disablePicto={disablePicto}
							textPosition={textPosition}
							isBlackWhite={isBlackWhite}
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
