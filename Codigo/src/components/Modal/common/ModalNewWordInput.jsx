import React from "react";

import { AiOutlinePlus } from "react-icons/ai";

import style from "../common/Modal.module.css";

export default function ModalNewWordInput({ title, onSubmit, ...restProps }) {
	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();

				const newWord = e.target.newWord.value;

				onSubmit(newWord);

				e.target.reset();
			}}
			{...restProps}
		>
			<label className={style.modalHeading} htmlFor="newWord">
				{title}
			</label>
			<div className="grid grid-cols-[minmax(6rem,_1fr)_auto] gap-3 p-4">
				<input
					type="text"
					name="newWord"
					id="newWord"
					className="w-full rounded-md border-2 border-gray-300 bg-gray-50 py-1 pl-2"
					required
				/>
				<button
					type="submit"
					className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-500 p-2 text-white hover:bg-sky-600"
				>
					<AiOutlinePlus size={30} />
				</button>
			</div>
		</form>
	);
}
