import React from "react";

import { ModalType } from "../../../Modal/ModalFactory";

import ToolbarGroupButton from "./ToolbarGroupButton";

export default function ToolbarTextGroup({ editor, openModal }) {
	return (
		<>
			<ToolbarGroupButton onClick={() => openModal(ModalType.searchPicto)}>
				<span>Buscar Pictograma</span>
			</ToolbarGroupButton>
			<ToolbarGroupButton onClick={() => openModal(ModalType.colorLegend)}>
				<span>Leyenda de Colores</span>
			</ToolbarGroupButton>
			<ToolbarGroupButton onClick={() => openModal(ModalType.summary)}>
				<span>Generar Resumen</span>
			</ToolbarGroupButton>
		</>
	);
}
