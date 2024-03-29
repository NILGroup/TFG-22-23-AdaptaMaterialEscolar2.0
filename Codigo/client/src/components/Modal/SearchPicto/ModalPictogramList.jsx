import React from "react";

import { Transforms } from "slate";

export default function ModalPictogramList({ editor, pictograms, callback }) {
	const insertPictogram = (editor, url) => {
		const text = { text: "" };
		const pictogram = { type: "image", url, children: [text] };

		Transforms.insertNodes(editor, pictogram);
	};

	if (pictograms === null) return null;

	if (pictograms.length <= 0)
		return <h4 className="my-10 text-center text-modal-base-lg">No se han encontrado imágenes.</h4>;

	return (
		<div className="grid max-h-80 grid-cols-fluid justify-evenly gap-8 overflow-y-auto p-4">
			{pictograms.map((pictogram, index) => (
				<button
					key={`pictogram-${index}`}
					onClick={() => {
						insertPictogram(editor, pictogram);

						if (callback) callback();
					}}
					className="rounded-md shadow-[inner_0_0_0_2px] shadow-grey hover:shadow-black focus-visible:ring-4 focus-visible:ring-blue-300 focus-visible:ring-opacity-60"
					tabIndex="0"
				>
					<img src={pictogram} alt={`Pictogram ${index}`} />
				</button>
			))}
		</div>
	);
}
