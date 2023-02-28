import React, { useState } from "react";
import Modal from "../common/Modal";
import ModalButton from "../common/ModalButton";

export default function SummaryModal({ editor, isOpen, onClose }) {
	// Valores iniciales del estado
	const DEFAULT_SUMMARY = "";
	const DEFAULT_IS_LOADING = false;

	// Estados del modal
	const [summary, setSummary] = useState(DEFAULT_SUMMARY);
	const [isLoading, setIsLoading] = useState(DEFAULT_IS_LOADING);

	//#region Manejadores de eventos
	const handleClose = () => {
		setSummary(DEFAULT_SUMMARY);
		setIsLoading(DEFAULT_IS_LOADING);

		onClose();
	};
	//#endregion

	//#region Funciones auxiliares
	// Funcion para obtener los pictogramas segun lo que busque el usuario
	const summarize = (originalText) => {
		setIsLoading(true);

		// TODO: Fetch API
		console.log("Fetch API");

		setIsLoading(false);
	};
	//#endregion

	return (
		<Modal title="Generar Resumen" className="w-6/12" isOpen={isOpen} onClose={handleClose}>
			<form
				className="flex flex-col gap-5"
				onSubmit={(e) => {
					e.preventDefault();

					const originalText = e.target.originalText.value;
					summarize(originalText);
				}}
			>
				<div>
					<h4 className="text-modal-heading">Texto original</h4>
					<textarea name="originalText" id="originalText" className="input-textarea h-32 w-full" />
				</div>
				<ModalButton type="submit" className="flex items-center gap-2 self-center py-2 px-4 text-modal-base-lg">
					Resumir
				</ModalButton>
			</form>
			{/* TODO: Vista previa del resumen */}
		</Modal>
	);
}
