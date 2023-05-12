import React from "react";

import { AiOutlineInfoCircle } from "react-icons/ai";
import ModalAlertButton from "../common/ModalAlertButton";

export default function RelateConceptsTable({ title, values, setValores }) {
	let result = [];
	for (let i = 0; i < values?.length ?? 0; i++) {
		let temp = values[i].map((value, j) => {
			return (
				<div key={`flechas_${j}`} className="!min-w-[75mm] p-1">
					<input
						className="!min-w-[75mm] p-2 text-center "
						value={values[i][j]}
						onChange={(event) => {
							if (event.target.value.match(/^\s+$/)) return;
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
			<div className="flex flex-row justify-between">
				<h4 className="text-modal-heading" htmlFor="newWord">
					{title}
				</h4>
				{values.filter((value) => value.length >= 2).length > 0 && (
					<ModalAlertButton
						icon={<AiOutlineInfoCircle size={30} />}
						iconButtonClassName="text-alert-info-dark hover:text-alert-info"
						defaultIsOpen={false}
						listStyle="list-none"
						placement="left"
						alertBoxClassName="bg-alert-info text-alert-info-dark"
						contentList={["No es necesario rellenar todos los huecos"]}
					/>
				)}
			</div>
			<div className="custom-scrollbar h-60 max-h-60 overflow-auto py-2">
				<div className="flex justify-evenly align-middle">{result}</div>
			</div>
		</div>
	);
}
