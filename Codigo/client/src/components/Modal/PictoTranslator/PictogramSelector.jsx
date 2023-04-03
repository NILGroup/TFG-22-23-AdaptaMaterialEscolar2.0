import React, { useState } from "react";

import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

export default function PictogramSelector({ pictograms, setPicto }) {
	const [currentPicto, setCurrentPicto] = useState(0);

	if (!pictograms || pictograms.length <= 0) return null;

	const changePicto = (increment) => {
		setCurrentPicto((previousIndex) => {
			const nextIndex = Math.min(Math.max(previousIndex + increment, 0), pictograms.length - 1);

			setPicto(nextIndex);

			return nextIndex;
		});
	};

	return (
		<div className="grid grid-cols-[_auto_1fr_auto] items-center gap-2 p-2">
			<button
				className="rounded-full bg-black bg-opacity-0 p-0.5 enabled:hover:bg-opacity-20 disabled:opacity-30"
				onClick={() => changePicto(-1)}
				disabled={currentPicto === 0}
			>
				<AiOutlineLeft size={25} />
			</button>
			<img src={pictograms[currentPicto]} alt="Pictogram" />
			<button
				className="rounded-full bg-black bg-opacity-0 p-0.5 enabled:hover:bg-opacity-20 disabled:opacity-30"
				onClick={() => changePicto(1)}
				disabled={currentPicto === pictograms.length - 1}
			>
				<AiOutlineRight size={25} />
			</button>
		</div>
	);
}
