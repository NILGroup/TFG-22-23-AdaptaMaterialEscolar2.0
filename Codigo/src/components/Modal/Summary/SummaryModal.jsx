import React, { useState } from "react";
import Spinner from "../../Spinner/Spinner";
import Modal from "../common/Modal";
import ModalButton from "../common/ModalButton";
import ModalOkButton from "../common/ModalOkButton";
import ModalPreview from "../common/ModalPreview";

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
	const summarize = async (originalText) => {
		setIsLoading(true);

		try {
			const response = await fetch(`https://holstein.fdi.ucm.es/nil-ws-api/v1/texto/resumen?longitud=${20}`, {
				method: "POST",
				mode: "no-cors",
				headers: {
					"Content-Type": "text/plain",
				},
				body: JSON.stringify(originalText),
			});

			// const summary = response.json().resumen;
			console.log(response);

			setSummary(summary);
		} catch (error) {
			console.error(error);
		} finally {
			setIsLoading(false);
		}
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
				<div className="w-full max-w-full">
					<div className="flex justify-between rounded-md rounded-b-none border-2 border-b-0 border-grey-dark bg-grey-medium px-4 py-2">
						<h4 className="text-modal-heading">Texto original</h4>
					</div>
					<textarea
						name="originalText"
						id="originalText"
						className="input-textarea h-32 w-full rounded-t-none"
					/>
				</div>
				<ModalButton type="submit" className="self-center py-2 px-4 text-modal-base-lg">
					Resumir
				</ModalButton>

				<hr className="my-4" />
			</form>9
			<ModalPreview>{isLoading ? <Spinner /> : <p>{summary}</p>}</ModalPreview>
			<ModalOkButton className="my-2 self-center" onClick={handleClose} />
		</Modal>
	);
}
