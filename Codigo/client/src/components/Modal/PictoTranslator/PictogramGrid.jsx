import React from "react";

import PictogramSelector from "./PictogramSelector";

export default function PictogramGrid({ words, setPicto }) {
	return (
		<div className="grid max-h-80 grid-cols-1 justify-center gap-8 overflow-y-auto break-words p-4 md:grid-cols-2 md:justify-evenly xl:grid-cols-4">
			{words.map((word, index) => {
				if (word.pictograms.length > 0)
					return (
						<div key={`pictogram-${index}`} className="rounded-md border-2 border-black">
							<p className="border-b-2 border-black text-center">{word.word}</p>
							<PictogramSelector
								pictograms={word.pictograms}
								setPicto={(pictoIndex) => setPicto(index, pictoIndex)}
							/>
						</div>
					);
				else return null;
			})}
		</div>
	);
}
