import React from "react";

import { HiOutlinePencil } from "react-icons/hi";
import { useFocused, useSelected } from "slate-react";
import { ModalType } from "../../../Modal/ModalFactory";

export default function PictotranslatorElement({ attributes, children, element, openModal }) {
	const isSelected = useSelected();
	const isFocused = useFocused();

	const pictogramClass =
		isSelected && isFocused
			? "flex justify-around align-middle p-3 border-2 border-[#B4D5FF] "
			: "flex justify-around align-middle p-3 border-2 border-transparent";

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
					{element.values.words
						.filter((word) => !word.disabled)
						.map((word, index) => {
							return (
								<div
									key={`pictogram_${index}`}
									className={`flex ${
										element.values.textPosition === "Below" ? "flex-col-reverse" : "flex-col"
									} rounded-md border-2 border-black`}
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
									<img src={word.pictograms[word.currentPicto]} alt="Pictogram" />
								</div>
							);
						})}
				</div>
			</div>
		</div>
	);
}
