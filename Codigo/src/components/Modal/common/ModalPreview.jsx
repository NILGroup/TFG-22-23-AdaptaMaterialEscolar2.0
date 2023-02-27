import React from "react";

import style from "./Modal.module.css";

// TODO: Pasar visualizacion de errores a la vista previa
// {!errors || errors.length <= 0 ? (
// 							<>
// 								<p>{generateExerciseStatement()}</p>
// 								<WordSearchGrid wordSearchGrid={grid} />
// 							</>
// 						) : (
// 							<div className="flex h-full flex-col items-center justify-center gap-2 text-alert-danger">
// 								<p className="text-[2rem]">Ha habido un error.</p>
// 								<TbMoodSad className="flex-shrink-0 text-[3.5rem]" />
// 							</div>
// )}

export default function ModalPreview({ children, attributes }) {
	return (
		<div className="w-full max-w-full">
			<div className="flex justify-between rounded-md rounded-b-none border-2 border-gray-300 bg-gray-200 px-4 py-2">
				<h4 className={style.modalHeading}>Vista previa</h4>
				{attributes}
			</div>
			<div className="h-60 max-h-60 overflow-auto rounded-md rounded-t-none border-2 border-t-0 border-gray-300 bg-gray-100 px-4 py-2">
				{children}
			</div>
		</div>
	);
}
