import React from "react";

import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

export default function PictogramSelector({ disabled, pictograms, isBlackWhite, selectedPicto, setPicto }) {
	if (!pictograms || pictograms.length <= 0) return null;

	const changePicto = (increment) => {
		const nextIndex = Math.min(Math.max(selectedPicto + increment, 0), pictograms.length - 1);

		setPicto(nextIndex);
	};

	return (
		<div className="grid grid-cols-[_auto_1fr_auto] items-center gap-2 p-2">
			<button
				className="rounded-full bg-black bg-opacity-0 p-0.5 enabled:hover:bg-opacity-20 disabled:opacity-30"
				onClick={() => changePicto(-1)}
				disabled={selectedPicto === 0 || disabled}
			>
				<AiOutlineLeft size={25} />
			</button>
			<img
				src={pictograms[selectedPicto]}
				alt="Pictogram"
				className={`${disabled ? "opacity-30" : ""} ${isBlackWhite ? "grayscale" : ""}`}
			/>
			<button
				className="rounded-full bg-black bg-opacity-0 p-0.5 enabled:hover:bg-opacity-20 disabled:opacity-30"
				onClick={() => changePicto(1)}
				disabled={selectedPicto === pictograms.length - 1 || disabled}
			>
				<AiOutlineRight size={25} />
			</button>
		</div>
	);
}
