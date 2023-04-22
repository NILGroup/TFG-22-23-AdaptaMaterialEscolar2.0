import React from "react";

import { HiOutlinePencil } from "react-icons/hi";
import { useFocused, useSelected } from "slate-react";
import { ModalType } from "../../../Modal/ModalFactory";
import staff from "../Staff/Staff.module.css";
import imagenes from "../../../../assets/imagenes.js"


export default function Definition({ attributes, children, element, openModal }) {
	const isSelected = useSelected();
	const isFocused = useFocused();

	const renderLines = () => {
		let lines = [];
		let renderOption = element.value === "" ? "doubleLine_2_5" : element.value;
		let space = () => /^doubleLine/.test(renderOption) && <div className={staff.space}></div>;
		if(renderOption === 'square'){
			lines.push(
				<div className='border border-black border-solid' style={{ height: `${5 * element.number}mm` }}>
				</div>
			);
		}
		else{
			for (let i = 0; i < element.number; i++) {
				lines.push(
					<div key={`pauta_${i}`}>
						<img src={imagenes[renderOption]} />
						{space()}
					</div>
				);
			}
		}
		
		return lines;
	};

	return (<div {...attributes}>
			{children}
			<div className={`relative border-2 ${isSelected && isFocused ? 'border-[#B4D5FF]': 'border-transparent'}`}>
					<span
						className={`absolute top-0 left-0 bg-button p-1 text-modal-base text-white hover:bg-button-dark
				${isSelected && isFocused ? "inline" : "hidden"} `}
						onClick={() => openModal(ModalType.definition, { 	concepts: element.concepts,
																				number: element.number,
																				value: element.value 
																			})}
					>
						<HiOutlinePencil />
					</span>
					{
						element.concepts.map((concept, i) => {
						return (
							<div key={`concepts_preview_${i}`} className="m-0">
								<p>{concept}:</p>
								{renderLines()}
							</div>
						);
						})
					}
			</div>	
	
	</div>);
}
