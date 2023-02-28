import React, { useState } from "react";

import { Transforms } from "slate";
import Modal from "../common/Modal";
import ModalInputNumber from "../common/ModalInputNumber";

export default function DesarrolloModal({ editor, isOpen, onClose }) {

	const submit = (e) => {
		e.preventDefault();
		
	};


	return (
		<Modal
			title="Definir huecos de matemáticas"
			className="w-6/12"
			isOpen={isOpen}
			onClose={onClose}
		>
			<div className="">
				<form onSubmit={submit}>

					<h3>Formula</h3>

					<div className="flex justify-center">
						<button
							type="submit"
							className="mt-5 w-2/12 self-center rounded-md bg-sky-500 py-2 text-[1.4rem] text-white hover:bg-sky-600"
						>
							OK
						</button>
					</div>
				</form>
			</div>
		</Modal>
	);
}
