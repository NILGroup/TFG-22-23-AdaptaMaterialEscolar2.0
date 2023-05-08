import React from "react";

export default function RelateConcepts({ attributes, children, element }) {
	let result = [];

	for (let i = 0; i < element.values?.length ?? 0; i++) {
		let temp = element.values[i]
			.filter((valor) => valor !== "")
			.map((valor, j) => {
				if (i === 0) {
					return (
						<div key={`flechas_${j}`} className="flex !max-w-[65mm] justify-end">
							<p>{valor}</p>
							<p className="ml-4">{element.icon}</p>
						</div>
					);
				}
				if (i === element.values.length - 1) {
					return (
						<div key={`flechas_${j}`} className="flex !max-w-[65mm] justify-start">
							<p className="mr-4">{element.icon}</p>
							<p>{valor}</p>
						</div>
					);
				}

				return (
					<div key={`flechas_${j}`} className="flex !max-w-[65mm] justify-between">
						<p className="mr-4">{element.icon}</p>
						<p key={`flechas_${j}`} className="text-start">
							{valor}
						</p>
						<p className="ml-4">{element.icon}</p>
					</div>
				);
			});

		result.push(
			<div key={`flechas_${i}`} className="flex flex-col justify-evenly gap-4">
				{temp}
			</div>
		);
	}

	return (
		<div {...attributes}>
			{children}
			<div className="flex justify-around p-3 align-middle">{result}</div>
		</div>
	);
}
