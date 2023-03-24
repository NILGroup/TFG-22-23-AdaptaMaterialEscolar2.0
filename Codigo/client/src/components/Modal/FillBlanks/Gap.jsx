import React from "react";

export const GapType = Object.freeze({
	Small: Symbol("small"),
	Medium: Symbol("medium"),
	Big: Symbol("big"),
});

export const getGapTypeFromName = (gapName) => {
	switch (gapName) {
		case "small":
			return GapType.Small;
		case "medium":
			return GapType.Medium;
		case "big":
			return GapType.Big;
		default:
			throw new Error("Undefined gap type!");
	}
};

export const getGapTypeInfo = (gapType) => {
	switch (gapType) {
		case GapType.Small:
			return {
				name: "small",
				description: "Pequeño",
				length: 5,
			};
		case GapType.Medium:
			return {
				name: "medium",
				description: "Mediano",
				length: 12,
			};
		case GapType.Big:
			return {
				name: "big",
				description: "Grande",
				length: 23,
			};
		default:
			throw new Error("Undefined gap type!");
	}
};

export function Gap({ gapType }) {
	const gap = getGapTypeInfo(gapType);

	return <span>{"_".repeat(gap.length)}</span>;
}
