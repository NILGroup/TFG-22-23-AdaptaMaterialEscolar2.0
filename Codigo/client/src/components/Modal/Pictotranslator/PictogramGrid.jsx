import React from "react";

import PictogramSelector from "./PictogramSelector";

import { MdVisibility, MdVisibilityOff } from "react-icons/md";

export const TextPosition = Object.freeze({
	above: "Above",
	below: "Below",
	noText: "NoText",
});

export function PictogramGrid({ words, setPicto, disablePicto, textPosition, isBlackWhite }) {
	return (
		<div className="grid max-h-80 grid-cols-1 justify-center gap-8 overflow-y-auto break-words p-4 md:grid-cols-2 md:justify-evenly xl:grid-cols-4">
			{words.map((word, index) => {
				return (
					<div key={`pictogram-${index}`} className="flex flex-col gap-2">
						<div
							className={`flex ${
								textPosition === TextPosition.below ? "flex-col-reverse" : "flex-col"
							} rounded-md border-2 border-black ${word.disabled ? "opacity-30" : ""}`}
						>
							{textPosition !== TextPosition.noText && (
								<p
									className={`${
										textPosition === TextPosition.below ? "border-t-2" : "border-b-2"
									} border-black text-center`}
								>
									{word.word}
								</p>
							)}
							<PictogramSelector
								pictograms={word.pictograms}
								disabled={word.disabled}
								isBlackWhite={isBlackWhite}
								selectedPicto={word.currentPicto}
								setPicto={(pictoIndex) => setPicto(index, pictoIndex)}
							/>
						</div>
						<button
							className="flex h-[4vw] max-h-[2.5rem] min-h-[2rem] w-[4vw] min-w-[2rem] max-w-[2.5rem] items-center justify-center self-center rounded-full bg-button p-2 text-white hover:bg-button-dark"
							onClick={() => disablePicto(index)}
						>
							{word.disabled ? <MdVisibility /> : <MdVisibilityOff />}
						</button>
					</div>
				);
			})}
		</div>
	);
}
