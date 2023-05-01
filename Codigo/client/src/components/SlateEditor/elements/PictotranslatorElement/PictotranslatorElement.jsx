import React from "react";

export default function PictotranslatorElement({ attributes, children, element }) {
	return (
		<div {...attributes}>
			{children}
			<div className="inline-flex flex-wrap items-end gap-4">
				{element.values.words.map((word, index) => {
					if (word.pictograms.length > 0 && !word.disabled) {
						return (
							<span
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
							</span>
						);
					} else {
						return <span key={`word_${index}`}>{word.word}</span>;
					}
				})}
			</div>
		</div>
	);
}
