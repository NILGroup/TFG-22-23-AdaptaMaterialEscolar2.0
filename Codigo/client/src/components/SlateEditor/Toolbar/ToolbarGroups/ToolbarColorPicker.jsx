import React from "react";

import { Dropdown } from "flowbite-react";
import { useState } from "react";

import { AiOutlineCheck } from "react-icons/ai";

const defaultColors = [
	"#000000",
	"#e60000",
	"#ff9900",
	"#ffff00",
	"#008a00",
	"#0066cc",
	"#9933ff",
	"#ffffff",
	"#facccc",
	"#ffebcc",
	"#ffffcc",
	"#cce8cc",
	"#cce0f5",
	"#ebd6ff",
	"#bbbbbb",
	"#f06666",
	"#ffc266",
	"#ffff66",
	"#66b966",
	"#66a3e0",
	"#c285ff",
	"#888888",
	"#a10000",
	"#b26b00",
	"#b2b200",
	"#006100",
	"#0047b2",
	"#6b24b2",
	"#444444",
	"#5c0000",
	"#663d00",
	"#666600",
	"#003700",
	"#002966",
	"#3d1466",
];

export default function ToolbarColorPicker({ label, value, transparentColorEnabled, onColorChange }) {
	const [isOpen, setIsOpen] = useState(false);

	const [timeoutId, setTimeoutId] = useState(null);

	const handleInputColorChange = (newColor) => {
		if (timeoutId) {
			clearTimeout(timeoutId);
		}

		const newTimeoutId = setTimeout(() => {
			onColorChange(newColor);
			setTimeoutId(null);
		}, 100);

		setTimeoutId(newTimeoutId);
	};

	return (
		<Dropdown
			label={label}
			class={`${
				isOpen ? "bg-opacity-70" : "bg-opacity-0"
			} flex items-center gap-1 rounded-sm bg-grey-dark hover:bg-opacity-40 focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-opacity-30`}
			style={{ color: value }}
			arrowIcon={false}
			size="xs"
			onClick={() => setIsOpen((previousState) => !previousState)}
		>
			<Dropdown.Header>Colores por defecto</Dropdown.Header>
			<Dropdown.Item onClick={() => setIsOpen((previousState) => !previousState)}>
				<div className="flex flex-col gap-2">
					<div className="mx-auto grid grid-cols-7 gap-x-2 gap-y-0.5">
						{defaultColors.map((color, index) => {
							return (
								<div
									key={`colorOption-${index}`}
									onClick={(e) => {
										onColorChange(color);
									}}
									className="h-4 w-4 outline-none hover:shadow-[0_0_0_2px_rgba(255,162,0,1)] focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-opacity-30"
									style={{ backgroundColor: color }}
									tabIndex="0"
								></div>
							);
						})}
					</div>
					{transparentColorEnabled && (
						<button
							className="flex w-full items-center justify-center gap-2 self-center rounded-sm bg-grey p-1 hover:bg-grey-dark focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-opacity-30"
							onClick={() => handleInputColorChange("transparent")}
						>
							<div className="h-4 w-4 border-2 border-black"></div>
							<p>Sin color</p>
						</button>
					)}
				</div>
			</Dropdown.Item>
			<Dropdown.Divider />
			<Dropdown.Header>Color personalizado</Dropdown.Header>
			<Dropdown.Item onClick={() => setIsOpen((previousState) => !previousState)}>
				<form
					className="flex w-full items-center justify-center gap-4"
					onSubmit={(e) => {
						e.preventDefault();

						handleInputColorChange(e.target.color.value);
					}}
				>
					<input
						className="h-8 w-8 cursor-pointer rounded-sm hover:shadow-[0_0_0_2px_rgba(255,162,0,1)] focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-opacity-30"
						id="color"
						name="color"
						type="color"
						onChange={(e) => {
							e.preventDefault();

							handleInputColorChange(e.target.value);
						}}
					/>
					<button type="submit">
						<AiOutlineCheck size={25} className="text-button hover:text-button-dark" />
					</button>
				</form>
			</Dropdown.Item>
		</Dropdown>
	);
}
