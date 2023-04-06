import React from "react";

import style from "./DrawingSpace.module.css";

export default function DrawingSpace({ attributes, children, element }) {
	return (
		<div contentEditable={false} {...attributes}>
			<div contentEditable={false} className={style[element.style]} style={{"height": element.height}}></div>
			{children}
		</div>
	);
}
