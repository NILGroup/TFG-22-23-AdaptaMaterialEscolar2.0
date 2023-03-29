import React, { useState } from "react";

import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import { HiOutlinePencil } from "react-icons/hi";
import { IoMdTrash } from "react-icons/io";

import ModalInputText from "../common/ModalInputText";

export default function ModalWordListItem({ word, index, isEdittingWord, setIsEdittingWord, onEdit, onDelete }) {
	const [newValue, setNewValue] = useState(null);

	const editWord = (newValue) => {
		newValue = String(newValue).trim();

		if (newValue.length > 0) onEdit(newValue, index);

		setIsEdittingWord(null);
	};

	const cancelEdit = () => {
		setNewValue(word);

		setIsEdittingWord(null);
	};

	if (isEdittingWord !== index) {
		return (
			<li className="grid grid-cols-2 items-center gap-4">
				<span className="overflow-x-auto max-w-48">{word}</span>
				<div className="flex flex-wrap items-center gap-2">
					<button
						className="rounded-full bg-button p-2 text-modal-base text-white hover:bg-button-dark"
						onClick={() => {
							setNewValue(word);
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
					className="grid grid-cols-2 items-center gap-4"
					onSubmit={(e) => {
						e.preventDefault();

						const action = e.nativeEvent.submitter.name;
						
						if (action === "edit" && newValue){
							const newWord = String(newValue).trim();
							if (newWord.length > 0) editWord(newValue);
							else cancelEdit();
						} 
						else cancelEdit();
					}}
				>
					<ModalInputText
						id="editWord"
						name="editWord"
						value={newValue}
						onChange={(e) => setNewValue(e.target.value)}
					/>
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
