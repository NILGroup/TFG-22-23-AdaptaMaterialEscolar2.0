import React from "react";

import style from "./WordSearch.module.css";

export default function WordSearch({ attributes, children, element }) {
	return (
		<div {...attributes}>
			{children}
			<div contentEditable={false} className={style.wordSearch}>
				{element.wordSearchGrid.map((row, index) => {
					return (
						<div
							key={`row-${index}`}
							className={style.wordSearchRow}
						>
							{row.map((col, index) => {
								return (
									<div
										key={`col-${index}`}
										className={style.wordSearchCol}
									>
										{col}
									</div>
								);
							})}
						</div>
					);
				})}
			</div>
		</div>
	);
}
