import React from "react";

import imagenes from "../../../../assets/imagenes.js"


export default function Staff({ attributes, children, element }) {

	let space = () => /^doubleLine/.test(element.renderOption) && <div style={{ height: '5mm' }}></div>;
	return (
		<div {...attributes} contentEditable={false}>
			{
				element.renderOption === 'square' ? (<div className='border border-black border-solid' style={{ height: `${5 * element.number}mm` }}>
				</div>): element.renderOption === 'square_space' ?  (<div style={{ height: `${5 * element.number}mm` }}>
				</div>):
				<img src={imagenes[element.renderOption]} />
			}
			{space()}
			{children}
		</div>
	);
}
