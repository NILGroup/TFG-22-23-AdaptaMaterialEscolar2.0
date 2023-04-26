import React from "react";

import { HiOutlinePencil } from "react-icons/hi";
import { useFocused, useSelected } from "slate-react";
import { ModalType } from "../../../Modal/ModalFactory";

export default function PictotranslatorElement({ attributes, children, element, openModal }) {
	const isSelected = useSelected();
	const isFocused = useFocused();

	const commonClass = "flex flex-wrap gap-4 align-middle p-3";

	const pictogramClass =
		isSelected && isFocused
			? `${commonClass} border-2 border-[#B4D5FF]`
			: `${commonClass} border-2 border-transparent`;

	return (
		<div {...attributes}>
			{children}
			<div className="relative" contentEditable={false}>
				<span
					className={`absolute top-0 left-0 bg-button p-1 text-modal-base text-white hover:bg-button-dark
			${isSelected && isFocused ? "inline" : "hidden"} `}
					onClick={() => openModal(ModalType.pictotranslator, { ...element.values })}
				>
					<HiOutlinePencil />
				</span>
				<div className={pictogramClass}>
					{element.values.words.map((word, index) => {
						if (word.pictograms.length > 0 && !word.disabled) {
							return (
								<div
									key={`pictogram_${index}`}
									className={`flex ${
										element.values.textPosition === "Below" ? "flex-col-reverse" : "flex-col"
									} max-w-[10rem] rounded-md border-2 border-black`}
								>
									{element.values.textPosition !== "NoText" && (
										<p
											className={`${
												element.values.textPosition === "Below" ? "border-t-2" : "border-b-2"
											} border-black text-center`}
										>
											{word.word}
										</p>
									)}
									<img
										src={word.pictograms[word.currentPicto]}
										alt="Pictogram"
										className={`${element.values.isBlackWhite ? "grayscale" : ""}`}
									/>
								</div>
							);
						} else {
							return <span key={`word_${index}`}>{word.word}</span>;
						}
					})}
				</div>
			</div>
		</div>
	);
}
