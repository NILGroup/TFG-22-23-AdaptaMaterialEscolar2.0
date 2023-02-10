import React, { useState } from "react";

import { HiOutlinePencil } from "react-icons/hi";
import { IoMdTrash } from "react-icons/io";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";

import style from "../Modal.module.css";

export default function WordListItem({ word, index, onEdit, onDelete }) {
	const [newValue, setNewValue] = useState(word);
	const [isEdittingWord, setIsEdittingWord] = useState(false);

	const editWord = () => {
		onEdit(newValue, index);

		setIsEdittingWord(false);
	};

	const cancelEdit = (e) => {
		setNewValue(word);

		setIsEdittingWord(false);
	};

	if (!isEdittingWord) {
		return (
			<li className={style.modalWordListItem}>
				<span>{word}</span>
				<div className={style.modalButtonContainer}>
					<button
						className={style.modalIconButton}
						onClick={() => setIsEdittingWord(true)}
					>
						<HiOutlinePencil />
					</button>
					<button
						className={style.modalIconButton}
						onClick={() => onDelete()}
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
						else cancelEdit(false);
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
