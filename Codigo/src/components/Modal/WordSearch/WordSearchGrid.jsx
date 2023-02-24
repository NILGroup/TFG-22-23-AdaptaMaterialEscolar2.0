import React from "react";

export default function WordSearchGrid({ wordSearchGrid }) {
	return (
		<div className="my-4 mx-2 flex w-full flex-col items-stretch text-[0.5cm]">
			{wordSearchGrid.map((row, rowIndex) => {
				return (
					<div key={`row-${rowIndex}`} className="flex">
						{row.map((col, colIndex) => {
							return (
								<div
									key={`col-${colIndex}`}
									className={`flex h-[1cm] w-[1cm] flex-shrink-0 items-center justify-center border-[1px] border-black text-black ${
										rowIndex > 0 ? "border-t-0" : ""
									} ${colIndex > 0 ? "border-l-0" : ""}`}
								>
									{col}
								</div>
							);
						})}
					</div>
				);
			})}
		</div>
	);
}
