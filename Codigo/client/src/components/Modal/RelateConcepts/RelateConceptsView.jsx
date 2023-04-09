import React from "react";

export default function RelateConceptsView({ icon, values }) {
	let result = [];
	for (let i = 0; i < values?.length ?? 0; i++) {
		let temp = values[i]
			.filter((valor) => valor !== "")
			.map((valor, j) => {
				return (
					<div key={`flechas_${j}`} className="flex items-center justify-between gap-3 p-1">
						{i !== 0 && icon}
						{valor}
						{i !== values.length - 1 && icon}
					</div>
				);
			});
		result.push(
			<div key={`flechas_${i}`} className="flex flex-col justify-center gap-4">
				{temp}
			</div>
		);
	}
	return <div className="flex justify-around align-middle">{result}</div>;
}
