import React from "react";

export default function RelateConceptsTable({ title, values, setValores }) {
	let result = [];
	for (let i = 0; i < values?.length ?? 0; i++) {
		let temp = values[i].map((value, j) => {
			return (
				<div key={`flechas_${j}`} className="p-1">
					<input
						className="w-24 p-2 text-center"
						value={values[i][j]}
						onChange={(event) => {
							setValores((valor) => {
								const copiaValores = [...valor];
								copiaValores[i][j] = event.target.value;
								return copiaValores;
							});
						}}
					/>
				</div>
			);
		});
		result.push(
			<div key={`flechas_${i}`} className="flex flex-col divide-y divide-black rounded border border-black">
				{temp}
			</div>
		);
	}

	return (
		<div className="flex flex-col gap-3 p-4">
			<h4 className="text-modal-heading" htmlFor="newWord">
				{title}
			</h4>
			<div className="custom-scrollbar h-60 max-h-60 overflow-auto py-2">
				<div className="flex justify-around align-middle">{result}</div>
			</div>
		</div>
	);
}
