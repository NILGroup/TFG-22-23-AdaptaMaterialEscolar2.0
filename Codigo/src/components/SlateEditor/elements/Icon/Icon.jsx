import React from "react";

export default function Icon({ attributes, children, element }) {

	return (
		<span {...attributes}>
			<span contentEditable={false} className="relative w-max-[1cm] inline-block">
                {element.icon}
			</span>
			{children}
		</span>
	);
}
