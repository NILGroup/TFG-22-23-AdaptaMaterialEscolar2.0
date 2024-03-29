import React from "react";

export default function WordSearchGrid({ className, wordSearchGrid }) {
	return (
		<span className={`${className} flex flex-col text-[0.5cm]`}>
			{wordSearchGrid.map((row, rowIndex) => {
				return (
					<span key={`row-${rowIndex}`} className="flex">
						{row.map((col, colIndex) => {
							return (
								<span
									key={`col-${colIndex}`}
									className={`flex h-[1cm] w-[1cm] flex-shrink-0 items-center justify-center border-[1px] border-black text-black ${
										rowIndex > 0 ? "border-t-0" : ""
									} ${colIndex > 0 ? "border-l-0" : ""}`}
								>
									{col}
								</span>
							);
						})}
					</span>
				);
			})}
		</span>
	);
}
