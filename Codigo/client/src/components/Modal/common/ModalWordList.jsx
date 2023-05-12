import React, { useState } from "react";
import ModalWordListItem from "./WordListItem";

export default function ModalWordList({ className, wordList, onEdit, onDelete, setSelected, selected }) {
	const [isEdittingWord, setIsEdittingWord] = useState(null);

	return (
		<ul
			className={`${className} custom-scrollbar flex h-[15vw] max-h-48 min-h-[6.5rem] flex-col gap-3 overflow-y-auto`}
		>
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
							setSelected={setSelected}
							selected ={selected}
						/>
					);
				})}
		</ul>
	);
}
