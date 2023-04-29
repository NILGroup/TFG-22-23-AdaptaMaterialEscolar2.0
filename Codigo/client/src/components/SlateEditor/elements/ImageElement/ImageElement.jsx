import React from "react";
import { useFocused, useSelected } from "slate-react";

export default function ImageElement({ attributes, children, element }) {
	const isSelected = useSelected();
	const isFocused = useFocused();

	const imageClass =
		isSelected && isFocused
			? "max-w-[2.25cm] border-2 border-black inline-block"
			: "max-w-[2.25cm] inline-block";

	return (
		<span {...attributes}>
			<span contentEditable={false} className="relative">
				<img src={element.url} className={imageClass} alt={element.alt} />
			</span>
			{children}
		</span>
	);
}
