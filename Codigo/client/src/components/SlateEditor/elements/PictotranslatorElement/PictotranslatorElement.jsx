import React from "react";

export default function PictotranslatorElement({ attributes, children, element }) {
	return (
		<div {...attributes}>
			{children}
			<div>
				{element.values.words.map((word, index) => {
					if (!word) return null;

					if (word.pictograms.length > 0 && !word.disabled) {
						return (
							<span
								key={`pictogram_${index}`}
								className={`inline-flex ${
									element.values.textPosition === "Below" ? "flex-col-reverse" : "flex-col"
								} my-2 max-w-[2.25cm] rounded-md border-2 border-black align-bottom`}
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
					}

					if (word === " ") return <React.Fragment key={`nbsp-${index}`}>&nbsp;</React.Fragment>;

					if (word === "\n") return <br key={`linebreak-${index}`} />;

					if (word === "\t") return <React.Fragment key={`tab-${index}`}>&emsp;</React.Fragment>;

					if (/^[.,/#!$%^&*;:{}=\-_`~()´?¿!¡'"]$/.test(word))
						return <span key={`punctuationSign-${index}`}>{word}</span>;

					return <span key={`word_${index}`}>{word.word}</span>;
				})}
			</div>
		</div>
	);
}
