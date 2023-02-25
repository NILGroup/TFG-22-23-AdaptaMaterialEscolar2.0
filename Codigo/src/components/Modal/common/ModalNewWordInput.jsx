import React from "react";

import { AiOutlinePlus } from "react-icons/ai";

import ModalInputText from "./ModalInputText";

export default function ModalNewWordInput({ title, onSubmit,attributes ,...restProps }) {
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
			<h4 className="text-modal-heading" htmlFor="newWord">
				{title}
			</h4>
			<div className="grid grid-cols-[minmax(6rem,_1fr)_auto] gap-3 p-4">
				<div className="flex items-center">
					{attributes}
					<ModalInputText id="newWord" required />
				</div>
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
