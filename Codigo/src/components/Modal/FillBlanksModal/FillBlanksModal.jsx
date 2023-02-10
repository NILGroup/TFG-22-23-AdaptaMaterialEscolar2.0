import React, { useState } from "react";

import style from "../Modal.module.css";

import { GapType, getGapTypeInfo } from "./Gap";
import { ModalGapRadio } from "./ModalGapRadio";

import { Transforms } from "slate";
import Modal from "../Modal";

export default function FillBlanksModal({ editor, isOpen, onClose }) {
	const [isAddingGaps, setIsAddingGaps] = useState(false);
	const [originalText, setOriginalText] = useState("");
	const [words, setWords] = useState(null);
	const [gapType, setGapType] = useState(GapType.Medium);

	const handleInput = (e) => {
		const value = e.target.value;

		setOriginalText(value);

		if (!value) setWords(null);
		else setWords(value.split(" "));
	};

	const closeModal = () => {
		setIsAddingGaps(false);
		setOriginalText("");
		setWords(null);
		setGapType(GapType.Medium);

		onClose();
	};

	return (
		<Modal title="Completar Huecos" isOpen={isOpen} onClose={closeModal}>
			<form
				className={style.modalForm}
				onSubmit={(e) => {
					e.preventDefault();

					let exercise;
					if (!words) exercise = "";
					else
						exercise = `Resuelve el siguiente ejercicio completando los huecos con las palabras adecuadas:\n${words.join(
							" "
						)}`;

					Transforms.insertNodes(editor, {
						type: "paragraph",
						children: [{ text: exercise }],
					});

					closeModal();
				}}
			>
				<div className={style.modalFormGroup}>
					<h4 className={style.modalHeading}>Texto:</h4>
					{isAddingGaps ? (
						<>
							<p
								className={`${style.modalTooltip} ${style.modalCenter}`}
							>
								Haz clic izquierdo sobre las palabras para
								convertirlas en huecos
							</p>
							<div className={style.modalTextArea}>
								{words?.map((word, index, array) => {
									if (!word) return null;

									return (
										<span
											key={`word-${index}`}
											className={style.modalInteractable}
											onClick={(e) => {
												if (
													e.target.getAttribute(
														"data-gap"
													)
												) {
													const word =
														e.target.getAttribute(
															"data-gap"
														);

													e.target.removeAttribute(
														"data-gap"
													);
													e.target.innerText = word;

													array[index] = word;
												} else {
													const gapInfo =
														getGapTypeInfo(gapType);

													e.target.setAttribute(
														"data-gap",
														`${e.target.innerText}`
													);

													const gap = "_".repeat(
														gapInfo.length
													);
													e.target.innerText = gap;

													array[index] = gap;
												}
											}}
										>
											<span>{word}</span>
											{index < array.length - 1 && (
												<span>&nbsp;</span>
											)}
										</span>
									);
								})}
							</div>
						</>
					) : (
						<textarea
							name="originalText"
							id="originalText"
							className={style.modalTextArea}
							onChange={handleInput}
							value={originalText}
						/>
					)}
					<button
						className={`${style.modalButton} ${style.modalEnd}`}
						onClick={(e) => {
							e.preventDefault();

							setIsAddingGaps((prev) => !prev);
						}}
						disabled={words === null}
					>
						{!isAddingGaps ? "Añadir huecos" : "Editar texto"}
					</button>
				</div>
				<div className={style.modalFormGroup}>
					<h4 className={style.modalHeading}>Longitud del hueco:</h4>
					<ModalGapRadio
						gapType={GapType.Small}
						onChange={setGapType}
					/>
					<ModalGapRadio
						gapType={GapType.Medium}
						defaultChecked={true}
						onChange={setGapType}
					/>
					<ModalGapRadio
						gapType={GapType.Big}
						onChange={setGapType}
					/>
				</div>
				<button
					type="submit"
					className={`${style.modalButton} ${style.modalCenter}`}
					disabled={words === null}
				>
					Ok
				</button>
			</form>
		</Modal>
	);
}
