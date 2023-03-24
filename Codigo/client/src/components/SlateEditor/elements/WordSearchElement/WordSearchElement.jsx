import React from "react";

import WordSearchGrid from "../../../Modal/WordSearch/WordSearchGrid";

export default function WordSearch({ attributes, children, element }) {
	return (
		<span {...attributes}>
			<span contentEditable={false} className="relative">
				<WordSearchGrid wordSearchGrid={element.grid} />
			</span>
			{children}
		</span>
	);
}
