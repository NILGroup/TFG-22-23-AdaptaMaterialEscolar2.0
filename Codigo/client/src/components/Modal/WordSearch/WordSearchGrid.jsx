import React from "react";

export default function WordSearchGrid({ wordSearchGrid }) {
	return (
		<span className="my-4 mx-2 inline-flex w-full flex-col items-stretch text-[0.5cm]">
			{wordSearchGrid.map((row, rowIndex) => {
				return (
					<span key={`row-${rowIndex}`} className="inline-flex">
						{row.map((col, colIndex) => {
							return (
								<span
									key={`col-${colIndex}`}
									className={`inline-flex h-[1cm] w-[1cm] flex-shrink-0 items-center justify-center border-[1px] border-black text-black ${
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
