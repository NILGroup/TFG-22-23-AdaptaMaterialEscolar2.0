import React from "react";

import ModalRadioButton from "../common/ModalRadioButton";

import { Gap, getGapTypeFromName, getGapTypeInfo } from "./Gap";

export function ModalGapRadio({ gapType, defaultChecked = false, onChange }) {
	const gapInfo = getGapTypeInfo(gapType);

	return (
		<div className="w-full min-w-[20rem] gap-4 md:grid md:w-2/4 md:grid-cols-2 md:items-end">
			<ModalRadioButton
				label={gapInfo.description}
				name="gapLength"
				id={`${gapInfo.name}GapRadio`}
				value={gapInfo.name}
				defaultChecked={defaultChecked}
				onChange={(e) => onChange(getGapTypeFromName(e.target.value))}
			/>
			<Gap gapType={gapType}></Gap>
		</div>
	);
}
