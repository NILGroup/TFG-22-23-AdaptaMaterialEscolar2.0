import React,{ useState } from "react";

import { AiOutlineCheck,AiOutlineClose } from "react-icons/ai";
import { HiOutlinePencil } from "react-icons/hi";
import { IoMdTrash } from "react-icons/io";

import ModalInputText from "../common/ModalInputText";

export default function WordListItemLegend({
	word,
	color,
	index,
	isEdittingWord,
	setIsEdittingWord,
	onEdit,
	onDelete,
}) {
	const [newValue, setNewValue] = useState(null);
	const [newColor, setNewColor] = useState(null);

	const editWord = (newValue) => {
		onEdit(newValue, newColor, index);

		setIsEdittingWord(null);
	};

	const cancelEdit = () => {
		setNewValue(word);
		setNewColor(color);
		setIsEdittingWord(null);
	};

	if (isEdittingWord !== index) {
		return (
			<li className="grid grid-cols-[1fr_auto] items-center gap-4">
				<div className="items flex items-center ">
					<input className="inputColorl" id="color" type="color" value={color} disabled />
					<span className="max-w-48 overflow-x-auto">{word}</span>
				</div>

				<div className="flex flex-wrap items-center gap-2 px-3">
					<button
						className="rounded-full bg-button p-2 text-modal-base text-white hover:bg-button-dark"
						onClick={() => {
							setNewValue(word);
							setNewColor(color);
							setIsEdittingWord(index);
						}}
					>
						<HiOutlinePencil />
					</button>
					<button
						className="rounded-full bg-button p-2 text-modal-base text-white hover:bg-button-dark"
						onClick={() => {
							onDelete(index);
							setIsEdittingWord(null);
						}}
					>
						<IoMdTrash />
					</button>
				</div>
			</li>
		);
	} else {
		return (
			<li>
				<form
					className="grid grid-cols-[1fr_auto] items-center gap-4"
					onSubmit={(e) => {
						e.preventDefault();

						const action = e.nativeEvent.submitter.name;

						if (action === "edit" && newValue && newColor) {
							const newWord = String(newValue).trim();
							if (newWord.length > 0) editWord(newValue);
							else cancelEdit();
						} else cancelEdit();
					}}
				>
					<div className="flex flex-wrap items-center gap-2 px-3">
						<input
							className="inputColor"
							id="color"
							type="color"
							value={newColor}
							onChange={(e) => {
								setNewColor(e.target.value);
							}}
						/>
						<ModalInputText
							id="editWord"
							name="editWord"
							value={newValue}
							onChange={(e) => setNewValue(e.target.value)}
						/>
					</div>

					<div className="flex flex-wrap items-center gap-2">
						<button
							type="submit"
							name="edit"
							className="rounded-full bg-button p-2 text-modal-base text-white hover:bg-button-dark"
						>
							<AiOutlineCheck />
						</button>
						<button
							type="submit"
							name="cancel"
							className="rounded-full bg-button p-2 text-modal-base text-white hover:bg-button-dark"
						>
							<AiOutlineClose />
						</button>
					</div>
				</form>
			</li>
		);
	}
}
