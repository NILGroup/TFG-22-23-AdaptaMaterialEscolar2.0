import React, { useState } from "react";
import WordListItemLegend from "./WordListItemLegend";

export default function ModalWordListLegend({ wordList, colorList, onEdit, onDelete }) {
	const [isEdittingWord, setIsEdittingWord] = useState(null);

	return (
		<ul className="custom-scrollbar mb-8 flex h-48 max-h-48 flex-col gap-3 overflow-y-auto p-4">
			{wordList &&
				wordList.map((word, index) => {
					return (
						<WordListItemLegend
							key={`word-${index}`}
							word={word}
							color={colorList[index]}
							index={index}
							isEdittingWord={isEdittingWord}
							setIsEdittingWord={setIsEdittingWord}
							onEdit={onEdit}
							onDelete={onDelete}
						/>
					);
				})}
		</ul>
	);
}
