import React from "react";

export default function PictotranslatorElement({ attributes, children, element }) {
	return (
		<div {...attributes}>
			{children}
			<div className="flex flex-wrap gap-4 items-end" contentEditable={false}>
				{element.values.words.map((word, index) => {
					if (word.pictograms.length > 0 && !word.disabled) {
						return (
							<div
								key={`pictogram_${index}`}
								className={`flex ${
									element.values.textPosition === "Below" ? "flex-col-reverse" : "flex-col"
								} max-w-[2.25cm] rounded-md border-2 border-black`}
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
	);
}
