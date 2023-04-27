import React from "react";

export default function RelateConcepts({ attributes, children, element }) {
	let result = [];

	for (let i = 0; i < element.values?.length ?? 0; i++) {
		let temp = element.values[i]
			.filter((valor) => valor !== "")
			.map((valor, j) => {
				return (
					<div key={`flechas_${j}`} className="flex items-center justify-between gap-3 p-1">
						{i !== 0 && element.icon}
						{valor}
						{i !== element.values.length - 1 && element.icon}
					</div>
				);
			});

		result.push(
			<div key={`flechas_${i}`} className="flex flex-col justify-center gap-4">
				{temp}
			</div>
		);
	}

	return (
		<div {...attributes}>
			{children}
			<div className="flex justify-around align-middle p-3">{result}</div>
		</div>
	);
}
