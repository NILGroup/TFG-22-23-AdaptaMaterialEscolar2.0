import React, { useState } from "react";
import Spinner from "../../Spinner/Spinner";
import Modal from "../common/Modal";
import ModalButton from "../common/ModalButton";
import ModalOkButton from "../common/ModalOkButton";
import ModalPreview from "../common/ModalPreview";

import { Transforms } from "slate";

export default function SummaryModal({ editor, isOpen, onClose }) {
	// Valores constantes
	const ERROR_SUMMARY =
		"No se ha podido resumir este texto. Puede que el texto sea demasiado breve o no tenga sentido.";
	const MIN_WORDS_SIZE = 15;

	// Valores iniciales del estado
	const DEFAULT_ORIGINAL_TEXT_LENGTH = null;
	const DEFAULT_SUMMARY_LENGTH = null;
	const DEFAULT_SUMMARY = null;
	const DEFAULT_ERRORS = null;
	const DEFAULT_IS_LOADING = false;

	// Estados del modal
	const [originalTextLength, setOriginalTextLength] = useState(DEFAULT_ORIGINAL_TEXT_LENGTH);
	const [summaryLength, setSummaryLength] = useState(DEFAULT_SUMMARY_LENGTH);
	const [summary, setSummary] = useState(DEFAULT_SUMMARY);
	const [errors, setErrors] = useState(DEFAULT_ERRORS);
	const [isLoading, setIsLoading] = useState(DEFAULT_IS_LOADING);

	//#region Manejadores de eventos
	const handleOriginalTextChange = (e) => {
		const textLength = e.target.value
			.trim()
			.split(/(\s)/g)
			.filter((word) => /[\S]/.test(word)).length;

		setOriginalTextLength(textLength > 0 ? textLength : null);

		if (textLength <= MIN_WORDS_SIZE) setSummaryLength(null);
		else if (summaryLength === null) setSummaryLength(textLength);
	};

	const handleSummarySizeChange = (e) => {
		const rangeValue = e.target.value;

		setSummaryLength(rangeValue);
	};

	const handleClose = () => {
		setOriginalTextLength(DEFAULT_ORIGINAL_TEXT_LENGTH);
		setSummaryLength(DEFAULT_SUMMARY_LENGTH);
		setSummary(DEFAULT_SUMMARY);
		setErrors(DEFAULT_ERRORS);
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

			const newSummary = await response.json();

			if (newSummary === "-1") {
				setErrors([ERROR_SUMMARY]);
				setSummary(DEFAULT_SUMMARY);
			} else {
				setErrors(DEFAULT_ERRORS);
				setSummary(newSummary);
			}
		} catch (error) {
			console.log(error);
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

					const originalText = e.target.originalText.value.trim();

					summarize(originalText, summaryLength ?? Math.min(MIN_WORDS_SIZE, originalTextLength));
				}}
			>
				<div className="w-full max-w-full">
					<div className="flex items-center justify-between rounded-md rounded-b-none border-2 border-b-0 border-grey-dark bg-grey px-4 py-2">
						<h4 className="text-modal-heading">Texto original</h4>
						{summaryLength !== null && originalTextLength > MIN_WORDS_SIZE && (
							<div className="flex flex-col gap-2">
								<p>
									<strong>Tamaño: </strong>
									{summaryLength} palabras
								</p>
								<input
									type="range"
									name="summarySize"
									id="summarySize"
									min={MIN_WORDS_SIZE}
									step="1"
									max={originalTextLength}
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
					disabled={originalTextLength === null}
				>
					Resumir
				</ModalButton>

				<hr className="my-4" />
			</form>
			<ModalPreview errors={errors}>{isLoading ? <Spinner /> : summary}</ModalPreview>
			<ModalOkButton
				className="my-2 self-center"
				onClick={(e) => handleOk(e, summary)}
				disabled={summary === DEFAULT_SUMMARY}
			/>
		</Modal>
	);
}
