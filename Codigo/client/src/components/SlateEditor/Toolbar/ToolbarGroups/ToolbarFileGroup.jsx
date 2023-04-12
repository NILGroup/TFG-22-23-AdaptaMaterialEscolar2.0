import React from "react";

import exportPDF from "../../utils/exportPDF";
import ToolbarGroupButton from "./ToolbarGroupButton";

export default function ToolbarFileGroup({ editor, openModal }) {
	return (
		<>
			<ToolbarGroupButton
				onClick={() => {
					exportPDF();
				}}
			>
				<span>Exportar a PDF</span>
			</ToolbarGroupButton>
			<ToolbarGroupButton onClick={() => {}}>
				<span>Exportar a Word</span>
			</ToolbarGroupButton>
			<ToolbarGroupButton onClick={() => {}}>
				<span>Importar documento</span>
			</ToolbarGroupButton>
		</>
	);
}
