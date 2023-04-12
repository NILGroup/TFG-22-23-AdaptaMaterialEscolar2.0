import React from "react";

import { HiOutlinePencil } from "react-icons/hi";
import { useFocused, useSelected } from "slate-react";
import { ModalType } from "../../../Modal/ModalFactory";

export default function RelateConcepts({ attributes, children, element, openModal }) {
	const isSelected = useSelected();
	const isFocused = useFocused();

	const relateConceptsClass =
		isSelected && isFocused
			? "flex justify-around align-middle p-3 border-2 border-[#B4D5FF] "
			: "flex justify-around align-middle p-3 border-2 border-transparent";

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
			<div className="relative" contentEditable={false}>
				<span
					className={`absolute top-0 left-0 bg-button p-1 text-modal-base text-white hover:bg-button-dark
			${isSelected && isFocused ? "inline" : "hidden"} `}
					onClick={() => openModal(ModalType.relateConcepts, { values: element.values })}
				>
					<HiOutlinePencil />
				</span>
				<div className={relateConceptsClass}>{result}</div>
			</div>
		</div>
	);
}
