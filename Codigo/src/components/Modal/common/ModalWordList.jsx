import React, { useState } from "react";
import ModalWordListItem from "./WordListItem";

export default function ModalWordList({ wordList, onEdit, onDelete }) {
	const [isEdittingWord, setIsEdittingWord] = useState(null);

	return (
		<ul className="custom-scrollbar mb-8 flex max-h-48 flex-col gap-3 overflow-y-auto p-4">
			{wordList &&
				wordList.map((word, index) => {
					return (
						<ModalWordListItem
							key={`word-${index}`}
							word={word}
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
