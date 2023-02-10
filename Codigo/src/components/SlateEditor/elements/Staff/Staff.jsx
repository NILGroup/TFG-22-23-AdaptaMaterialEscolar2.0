import React from "react";

import style from "./Staff.module.css";

export default function Staff({ attributes, children, element }) {
	return (
		<div {...attributes}>
			<div contentEditable={false} className={style[element.style]}></div>
		</div>
	);
}
