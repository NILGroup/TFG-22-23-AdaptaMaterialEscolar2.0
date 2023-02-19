import React from "react";

import style from "./Staff.module.css";

export default function Staff({ attributes, children, element }) {
	return (
		<div contentEditable={false} {...attributes}>
			<div contentEditable={false} className={style[element.style]}></div>
			{children}
		</div>
	);
}
