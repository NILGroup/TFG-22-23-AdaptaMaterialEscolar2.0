import React, { useState } from "react";

import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import { HiOutlinePencil } from "react-icons/hi";
import { IoMdTrash } from "react-icons/io";

import style from "../common/Modal.module.css";

export default function ModalWordListItem({
	word,
	index,
	isEdittingWord,
	setIsEdittingWord,
	onEdit,
	onDelete,
}) {
	const [newValue, setNewValue] = useState(null);

	const editWord = (newValue) => {
		onEdit(newValue, index);

		setIsEdittingWord(null);
	};

	const cancelEdit = () => {
		setNewValue(word);

		setIsEdittingWord(null);
	};

	if (isEdittingWord !== index) {
		return (
			<li className={style.modalWordListItem}>
				<span>{word}</span>
				<div className={style.modalButtonContainer}>
					<button
						className="rounded-full bg-button p-2 text-modal-base text-white"
						onClick={() => {
							setNewValue(word);
							setIsEdittingWord(index);
						}}
					>
						<HiOutlinePencil />
					</button>
					<button
						className="rounded-full bg-button p-2 text-modal-base text-white"
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
					className={style.modalWordListItem}
					onSubmit={(e) => {
						e.preventDefault();

						const action = e.nativeEvent.submitter.name;

						if (action === "edit" && newValue) editWord(newValue);
						else cancelEdit();
					}}
				>
					<input
						type="text"
						name="editWord"
						id="editWord"
						value={newValue}
						onChange={(e) => setNewValue(e.target.value)}
						className={style.modalInput}
					/>
					<div className={style.modalButtonContainer}>
						<button
							type="submit"
							name="edit"
							className={style.modalIconButton}
						>
							<AiOutlineCheck />
						</button>
						<button
							type="submit"
							name="cancel"
							className={style.modalIconButton}
						>
							<AiOutlineClose />
						</button>
					</div>
				</form>
			</li>
		);
	}
}
