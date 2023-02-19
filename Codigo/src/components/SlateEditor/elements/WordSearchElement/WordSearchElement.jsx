import React from "react";

import WordSearchGrid from "../../../Modal/WordSearchModal/WordSearchGrid";

export default function WordSearch({ attributes, children, element }) {
	return (
		<div {...attributes}>
			{children}
			<div contentEditable={false}>
				<WordSearchGrid wordSearchGrid={element.wordSearchGrid} />
			</div>
		</div>
	);
}
