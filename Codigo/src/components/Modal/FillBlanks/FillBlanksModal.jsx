import React, { useState } from "react";

import { GapType, getGapTypeInfo } from "./Gap";
import { ModalGapRadio } from "./ModalGapRadio";

import { Transforms } from "slate";
import Modal from "../common/Modal";
import ModalButton from "../common/ModalButton";
import ModalOkButton from "../common/ModalOkButton";

// TODO: Refactorizar componente --> UseReducer, pasar objetos complejos a componentes externos
export default function FillBlanksModal({ editor, isOpen, onClose }) {
	// Valores por defecto para el estado
	const DEFAULT_IS_ADDING_GAPS = false;
	const DEFAULT_ORIGNAL_TEXT = "";
	const DEFAULT_WORDS = null;
	const DEFAULT_GAPS = null;
	const DEFAULT_GAP_TYPE = GapType.Medium;

	// Estado del componente
	const [isAddingGaps, setIsAddingGaps] = useState(DEFAULT_IS_ADDING_GAPS);
	const [originalText, setOriginalText] = useState(DEFAULT_ORIGNAL_TEXT);
	const [words, setWords] = useState(DEFAULT_WORDS);
	const [gaps, setGaps] = useState(DEFAULT_GAPS);
	const [gapType, setGapType] = useState(DEFAULT_GAP_TYPE);

	const handleInput = (e) => {
		const value = e.target.value;

		setOriginalText(value);

		if (!value) {
			setWords(null);
			setGaps(null);
		} else {
			const newWords = value.split(/\s/g);

			setWords(newWords);
			setGaps(Array.from({ lenght: newWords.length }, () => false));
		}
	};

	const closeModal = () => {
		setIsAddingGaps(DEFAULT_IS_ADDING_GAPS);
		setOriginalText(DEFAULT_ORIGNAL_TEXT);
		setWords(DEFAULT_WORDS);
		setGaps(DEFAULT_GAPS);
		setGapType(DEFAULT_GAP_TYPE);

		onClose();
	};

	return (
		<Modal title="Completar Huecos" className="w-6/12" isOpen={isOpen} onClose={closeModal}>
			<form
				className="flex flex-col"
				onSubmit={(e) => {
					e.preventDefault();

					let exercise;
					if (!words) exercise = "";
					else
						exercise = `Resuelve el siguiente ejercicio completando los huecos con las palabras adecuadas:\n${words
							.map((word, index) => (gaps[index] ? "_".repeat(getGapTypeInfo(gapType).length) : word))
							.join(" ")}`;

					Transforms.insertNodes(editor, {
						type: "paragraph",
						children: [{ text: exercise }],
					});

					closeModal();
				}}
			>
				<div className="flex flex-col items-start gap-2">
					<h4 className="text-modal-heading">Texto:</h4>
					<div className="mt-2 flex w-full flex-col gap-4 px-4">
						{isAddingGaps ? (
							<>
								<p className="self-center text-tooltip text-opacity-75">
									Haz clic izquierdo sobre las palabras para convertirlas en huecos
								</p>
								<div className="input-textarea flex h-32 w-full flex-wrap">
									{words?.map((word, index, array) => {
										if (!word) return null;

										return (
											<span key={`word-${index}`}>
												<span
													className="cursor-pointer hover:font-bold hover:text-primary"
													onClick={() => {
														let newGaps = Array.from(gaps);
														newGaps[index] = !newGaps[index];
														setGaps(newGaps);
													}}
												>
													{gaps[index] ? "_".repeat(getGapTypeInfo(gapType).length) : word}
												</span>
												{index < array.length - 1 && <>&nbsp;</>}
											</span>
										);
									})}
								</div>
							</>
						) : (
							<textarea
								name="originalText"
								id="originalText"
								className="input-textarea h-32 w-full"
								onChange={handleInput}
								value={originalText}
							/>
						)}
						<ModalButton
							className="self-end py-2 px-3"
							onClick={(e) => {
								e.preventDefault();

								setIsAddingGaps((prev) => !prev);
							}}
							disabled={words === null}
						>
							{!isAddingGaps ? "Añadir huecos" : "Editar texto"}
						</ModalButton>
					</div>
				</div>
				<div className="">
					<h4 className="text-modal-heading font-normal">Longitud del hueco:</h4>
					<div className="mt-2 w-full px-4">
						<ModalGapRadio gapType={GapType.Small} onChange={setGapType} />
						<ModalGapRadio gapType={GapType.Medium} defaultChecked onChange={setGapType} />
						<ModalGapRadio gapType={GapType.Big} onChange={setGapType} />
					</div>
				</div>
				<ModalOkButton className="mt-5 self-center" disabled={words === null} />
			</form>
		</Modal>
	);
}
