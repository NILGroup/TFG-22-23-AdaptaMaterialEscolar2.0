import React from "react";

import style from "../Modal.module.css";

import { getGapTypeFromName, getGapTypeInfo, Gap } from "./Gap";

export function ModalGapRadio({ gapType, defaultChecked = false, onChange }) {
	const gapInfo = getGapTypeInfo(gapType);

	return (
		<div className={style.modalRadio}>
			<input
				type="radio"
				name="gapLength"
				id={`${gapInfo.name}GapRadio`}
				value={gapInfo.name}
				defaultChecked={defaultChecked}
				onChange={(e) => onChange(getGapTypeFromName(e.target.value))}
			/>
			<label htmlFor={`${gapInfo.name}GapRadio`}>
				{gapInfo.description}
			</label>
			<Gap gapType={gapType}></Gap>
		</div>
	);
}
