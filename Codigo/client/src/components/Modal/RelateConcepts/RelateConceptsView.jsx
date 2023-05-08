import React from "react";

export default function RelateConceptsView({ icon, values }) {
	let result = [];
	for (let i = 0; i < values?.length ?? 0; i++) {
		let temp = values[i]
			.filter((valor) => valor !== "")
			.map((valor, j) => {
				if (i === 0) {
					return (
						<div key={`flechas_${j}`} className="flex !max-w-[65mm] justify-end">
							<p>{valor}</p>
							<p className="ml-4">{icon}</p>
						</div>
					);
				}
				if (i === values.length - 1) {
					return (
						<div key={`flechas_${j}`} className="flex !max-w-[65mm] justify-start">
							<p className="mr-4">{icon}</p>
							<p>{valor}</p>
						</div>
					);
				}

				return (
					<div key={`flechas_${j}`} className="flex !max-w-[65mm] justify-between">
						<p className="mr-4">{icon}</p>
						<p key={`flechas_${j}`} className="text-start">
							{valor}
						</p>
						<p className="ml-4">{icon}</p>
					</div>
				);
			});
		result.push(
			<div key={`flechas_${i}`} className="flex flex-col justify-evenly gap-4">
				{temp}
			</div>
		);
	}
	return <div className="flex justify-around align-middle">{result}</div>;
}
