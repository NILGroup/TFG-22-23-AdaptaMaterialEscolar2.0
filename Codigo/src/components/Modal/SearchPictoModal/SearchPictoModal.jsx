import React, { useState } from "react";

import style from "../common/Modal.module.css";
import ModalPictogramList from "./ModalPictogramList";

import Spinner from "../../Spinner/Spinner";
import Modal from "../common/Modal";
import ModalButton from "../common/ModalButton";

import { MdOutlineImageSearch } from "react-icons/md";

export default function SearchPictoModal({ editor, isOpen, onClose }) {
	// Estados del modal
	const [pictogramList, setPictogramList] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	// Funciones auxiliares
	// Funcion para obtener los pictogramas segun lo que busque el usuario
	const getPictograms = (searchParam, callback) => {
		setIsLoading(true);

		fetch(`https://api.arasaac.org/api/pictograms/es/search/${searchParam}`)
			.then((response) => response.json())
			.then((data) => {
				let items = [];
				for (let i = 0; i < data.length && i < 20; i++) {
					items.push(
						`https://static.arasaac.org/pictograms/${data[i]._id}/${data[i]._id}_500.png`
					);
				}

				setIsLoading(false);
				callback(items);
			})
			.catch((error) => console.log(error));
	};

	const closeModal = () => {
		setPictogramList(null);
		setIsLoading(false);

		onClose();
	};

	return (
		<Modal
			title="Buscar Pictograma"
			className="w-6/12"
			isOpen={isOpen}
			onClose={closeModal}
		>
			<form
				className="flex flex-col gap-5"
				onSubmit={(e) => {
					e.preventDefault();

					const searchParam = e.target.searchPictogram.value;
					getPictograms(searchParam, setPictogramList);
				}}
			>
				<div>
					<label
						htmlFor="searchPictogram"
						className="text-modal-heading"
					>
						Buscador
					</label>
					<input
						type="text"
						name="searchPictogram"
						id="searchPictogram"
						className="w-full rounded-md border-2 border-gray-300 bg-gray-100 px-2 py-1 focus:border-blue-300"
						required
					/>
				</div>
				<ModalButton
					type="submit"
					className="flex items-center gap-2 self-center py-2 px-4 text-modal-base-lg"
				>
					Buscar
					<MdOutlineImageSearch />
				</ModalButton>
			</form>
			{pictogramList && <hr className={style.modalHorizontalRule} />}
			{isLoading ? (
				<Spinner />
			) : (
				<ModalPictogramList
					editor={editor}
					pictograms={pictogramList}
					callback={closeModal}
				/>
			)}
		</Modal>
	);
}
