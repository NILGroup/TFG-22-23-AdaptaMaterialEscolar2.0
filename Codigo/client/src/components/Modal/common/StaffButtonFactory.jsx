import React from "react";

import { AiOutlineBorderlessTable } from "react-icons/ai";
import { BiRectangle } from "react-icons/bi";
import { HiOutlineMinus } from "react-icons/hi";
import { IoMdArrowDropdown } from "react-icons/io";
import { TfiLineDouble } from "react-icons/tfi";
import ButtonSelect from "./ButtonSelect";
import { Button } from "flowbite-react";

const staff = {
	grid: {
		id: 0,
		option: [
			{ title: "5 mm", value: "grid_5" },
			{ title: "6 mm", value: "grid_6" },
			{ title: "8 mm", value: "grid_8" },
		],
	},
	doubleLine: {
		id: 1,
		option: [
			{ title: "2,5 mm", value: "doubleLine_2_5" },
			{ title: "3 mm", value: "doubleLine_3" },
			{ title: "3,5 mm", value: "doubleLine_3_5" },
		],
	},
	line: {
		id: 2,
		option: [
			{ title: "2,5 mm", value: "line_2_5" },
			{ title: "3 mm", value: "line_3" },
			{ title: "3,5 mm", value: "line_3_5" },
		],
	},
};

export const StaffType = Object.freeze({
	grid: Symbol("grid"),
	doubleLine: Symbol("doubleLine"),
	line: Symbol("line"),
	box: Symbol("box"),
	space: Symbol("space"),
});

export function StaffButtonFactory({ type, setValue }) {
	switch (type) {
		case StaffType.grid:
			return (
				<ButtonSelect
					options={staff.grid.option}
					setValue={setValue}
				>
					<AiOutlineBorderlessTable size={16} />
					<IoMdArrowDropdown size={16} />
				</ButtonSelect>
			);
		case StaffType.doubleLine:
			return (
				<ButtonSelect
					options={staff.doubleLine.option}
					setValue={setValue}
				>
					<TfiLineDouble size={16} />
					<IoMdArrowDropdown size={16} />
				</ButtonSelect>
			);
		case StaffType.line:
			return (
				<ButtonSelect
					options={staff.line.option}
					setValue={setValue}
				>
					<HiOutlineMinus size={16} />
					<IoMdArrowDropdown size={16} />
				</ButtonSelect>
			);
		case StaffType.box:
			return (
				<div className="flex flex-col">
					<Button color="light"
						onClick={() => setValue("square")}
					>
						<BiRectangle size={16} />
					</Button>
				</div>
			);
		case StaffType.space:
			return (
				<div className="flex flex-col">
					<Button color="light"
						onClick={() => setValue("square_space")}
					>
						<BiRectangle size={16} style={{ color: "transparent" }} />
					</Button>
				</div>
			);
		default:
			return null;
	}
}
