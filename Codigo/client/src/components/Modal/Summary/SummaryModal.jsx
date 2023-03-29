import React, { useState } from "react";
import Spinner from "../../Spinner/Spinner";
import Modal from "../common/Modal";
import ModalButton from "../common/ModalButton";
import ModalOkButton from "../common/ModalOkButton";
import ModalPreview from "../common/ModalPreview";

import { Transforms } from "slate";

export default function SummaryModal({ editor, isOpen, onClose }) {
	// Valores iniciales del estado
	const DEFAULT_ORIGINAL_TEXT_LENGTH = null;
	const DEFAULT_SUMMARY_LENGTH = null;
	const DEFAULT_SUMMARY = null;
	const DEFAULT_IS_LOADING = false;

	// Estados del modal
	const [originalTextLength, setOriginalTextLength] = useState(DEFAULT_ORIGINAL_TEXT_LENGTH);
	const [summaryLength, setSummaryLength] = useState(DEFAULT_SUMMARY_LENGTH);
	const [summary, setSummary] = useState(DEFAULT_SUMMARY);
	const [isLoading, setIsLoading] = useState(DEFAULT_IS_LOADING);

	//#region Manejadores de eventos
	const handleOriginalTextChange = (e) => {
		const textLength = e.target.value.split(/(\s)/g).filter((word) => /[\S]/.test(word)).length;

		setOriginalTextLength(textLength > 0 ? textLength : null);

		if (textLength === 0) setSummaryLength(null);
		else if (summaryLength === null) setSummaryLength(100);
	};

	const handleSummarySizeChange = (e) => {
		const rangeValue = e.target.value;

		setSummaryLength(rangeValue);
	};

	const handleClose = () => {
		setOriginalTextLength(DEFAULT_ORIGINAL_TEXT_LENGTH);
		setSummaryLength(DEFAULT_SUMMARY_LENGTH);
		setSummary(DEFAULT_SUMMARY);
		setIsLoading(DEFAULT_IS_LOADING);

		onClose();
	};

	const handleOk = (e, summary) => {
		e.preventDefault();

		Transforms.insertNodes(editor, {
			type: "paragraph",
			children: [{ text: summary }],
		});

		handleClose();
	};
	//#endregion

	//#region Funciones auxiliares
	const summarize = async (originalText, summaryLength) => {
		setIsLoading(true);

		try {
			const response = await fetch("/summary", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ originalText, summaryLength }),
			});

			const responseJSON = await response.json();

			setSummary(responseJSON.summary);
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};
	//#endregion

	// Valores calculados al renderizar el componente
	const summaryDesiredWords = summaryLength !== null ? Math.round(originalTextLength * (summaryLength / 100)) : null;

	return (
		<Modal title="Generar Resumen" className="w-6/12" isOpen={isOpen} onClose={handleClose}>
			<form
				className="flex flex-col gap-5"
				onSubmit={(e) => {
					e.preventDefault();

					const originalText = e.target.originalText.value;

					summarize(originalText, summaryDesiredWords);
				}}
			>
				<div className="w-full max-w-full">
					<div className="flex items-center justify-between rounded-md rounded-b-none border-2 border-b-0 border-grey-dark bg-grey px-4 py-2">
						<h4 className="text-modal-heading">Texto original</h4>
						{summaryLength !== null && (
							<div className="flex flex-col gap-2">
								<p>
									<strong>Tamaño: </strong>
									{summaryDesiredWords} palabras
								</p>
								<input
									type="range"
									name="summarySize"
									id="summarySize"
									value={summaryLength}
									onChange={handleSummarySizeChange}
								/>
							</div>
						)}
					</div>
					<textarea
						name="originalText"
						id="originalText"
						className="input-textarea h-40 w-full rounded-t-none"
						onChange={handleOriginalTextChange}
					/>
				</div>
				<ModalButton
					type="submit"
					className="self-center py-2 px-4 text-modal-base-lg"
					disabled={originalTextLength === null || summaryDesiredWords === null || summaryDesiredWords === 0}
				>
					Resumir
				</ModalButton>

				<hr className="my-4" />
			</form>
			<ModalPreview>{isLoading ? <Spinner /> : summary}</ModalPreview>
			<ModalOkButton
				className="my-2 self-center"
				onClick={(e) => handleOk(e, summary)}
				disabled={summary === null}
			/>
		</Modal>
	);
}
