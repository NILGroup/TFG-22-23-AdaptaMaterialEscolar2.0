import React, { useState } from "react";

import { GapType, getGapTypeInfo } from "./Gap";
import { ModalGapRadio } from "./ModalGapRadio";

import { Transforms } from "slate";
import Modal from "../common/Modal";
import ModalButton from "../common/ModalButton";
import ModalOkButton from "../common/ModalOkButton";

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
		<Modal
			title="Completar Huecos"
			className="w-6/12"
			isOpen={isOpen}
			onClose={closeModal}
		>
			<form
				className="flex flex-col"
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
				<div className="flex flex-col items-start gap-2">
					<h4 className="text-[2rem]">Texto:</h4>
					<div className="mt-2 flex w-full flex-col gap-4 px-4">
						{isAddingGaps ? (
							<>
								<p className="self-center text-blue-500 text-opacity-75">
									Haz clic izquierdo sobre las palabras para
									convertirlas en huecos
								</p>
								<div className="h-32 resize-none self-stretch overflow-y-auto rounded-md border-2 border-gray-300 bg-gray-100 p-3">
									{words?.map((word, index, array) => {
										if (!word) return null;

										return (
											// TODO: Crear un componente para las palabras interactivas
											<span
												key={`word-${index}`}
												className="cursor-pointer hover:font-bold hover:text-red-300"
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
														e.target.innerText =
															word;

														array[index] = word;
													} else {
														const gapInfo =
															getGapTypeInfo(
																gapType
															);

														e.target.setAttribute(
															"data-gap",
															`${e.target.innerText}`
														);

														const gap = "_".repeat(
															gapInfo.length
														);
														e.target.innerText =
															gap;

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
								className="h-32 resize-none self-stretch overflow-y-auto rounded-md border-2 border-gray-300 bg-gray-100 p-3 focus:border-sky-500 focus:ring-8 focus:ring-opacity-25"
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
					<h4 className="text-[2rem] font-normal">
						Longitud del hueco:
					</h4>
					<div className="mt-2 w-full px-4">
						<ModalGapRadio
							gapType={GapType.Small}
							onChange={setGapType}
						/>
						<ModalGapRadio
							gapType={GapType.Medium}
							defaultChecked
							onChange={setGapType}
						/>
						<ModalGapRadio
							gapType={GapType.Big}
							onChange={setGapType}
						/>
					</div>
				</div>
				<ModalOkButton
					className="mt-5 self-center"
					disabled={words === null}
				/>
			</form>
		</Modal>
	);
}
