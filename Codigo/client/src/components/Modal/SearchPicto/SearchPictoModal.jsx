import React, { useState } from "react";

import ModalPictogramList from "./ModalPictogramList";

import Spinner from "../../Spinner/Spinner";
import Modal from "../common/Modal";
import ModalButton from "../common/ModalButton";
import ModalInputText from "../common/ModalInputText";

import { MdOutlineImageSearch } from "react-icons/md";

export default function SearchPictoModal({ editor, isOpen, onClose }) {
	// Estados del modal
	const [pictogramList, setPictogramList] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	// Funciones auxiliares
	// Funcion para obtener los pictogramas segun lo que busque el usuario
	const getPictograms = async (searchParam, callback) => {
		setIsLoading(true);

		let pictograms = [];

		try {
			const response = await fetch("/searchPictogram", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ searchParam }),
			});

			pictograms = await response.json();
		} catch (error) {
			console.log(error.message);
		} finally {
			callback(pictograms);

			setIsLoading(false);
		}
	};

	const closeModal = () => {
		setPictogramList(null);
		setIsLoading(false);

		onClose();
	};

	return (
		<Modal title="Buscar Pictograma" className="w-6/12" isOpen={isOpen} onClose={closeModal}>
			<form
				className="flex flex-col gap-5"
				onSubmit={(e) => {
					e.preventDefault();

					const searchParam = e.target.searchPictogram.value;
					getPictograms(searchParam, setPictogramList);
				}}
			>
				<div>
					<ModalInputText id="searchPictogram" label="Buscador" required />
				</div>
				<ModalButton type="submit" className="flex items-center gap-2 self-center py-2 px-4 text-modal-base-lg">
					Buscar
					<MdOutlineImageSearch />
				</ModalButton>
			</form>
			{pictogramList && <hr className="mt-8" />}
			{isLoading ? (
				<Spinner />
			) : (
				<ModalPictogramList editor={editor} pictograms={pictogramList} callback={closeModal} />
			)}
		</Modal>
	);
}
