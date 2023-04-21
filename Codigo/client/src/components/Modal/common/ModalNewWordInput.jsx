import React from "react";

import { AiOutlinePlus } from "react-icons/ai";

import ModalInputText from "./ModalInputText";

export default function ModalNewWordInput({ title, onSubmit, attributes, ...restProps }) {
	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();

				const newWord = String(e.target.newWord.value).trim();

				if (newWord.length > 0) onSubmit(newWord);

				e.target.reset();
			}}
			{...restProps}
		>
			<h4 className="text-modal-heading mb-2" htmlFor="newWord">
				{title}
			</h4>
			<div className="grid grid-cols-[minmax(6rem,_1fr)_auto] items-center gap-3 pl-4">
				<div className="flex items-center">
					{attributes}
					<ModalInputText id="newWord" required />
				</div>
				<button
					type="submit"
					className="flex h-[4vw] max-h-[2.5rem] min-h-[2rem] w-[4vw] min-w-[2rem] max-w-[2.5rem] items-center justify-center rounded-full bg-button p-2 text-white hover:bg-button-dark"
				>
					<AiOutlinePlus size={45} />
				</button>
			</div>
		</form>
	);
}
