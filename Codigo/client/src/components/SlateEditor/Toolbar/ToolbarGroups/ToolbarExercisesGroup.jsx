import React from "react";

import { ModalType } from "../../../Modal/ModalFactory";

import ToolbarGroupButton from "./ToolbarGroupButton";

export default function ToolbarExercisesGroup({ editor, openModal }) {
	return (
		<>
			<ToolbarGroupButton onClick={() => openModal(ModalType.fillBlanks)}>
				<span>Completar Huecos</span>
			</ToolbarGroupButton>
			<ToolbarGroupButton onClick={() => openModal(ModalType.wordSearch)}>
				<span>Sopa de Letras</span>
			</ToolbarGroupButton>
			<ToolbarGroupButton onClick={() => openModal(ModalType.definition)}>
				<span>Definiciones</span>
			</ToolbarGroupButton>
			<ToolbarGroupButton onClick={() => openModal(ModalType.TrueFalse)}>
				<span>Verdadero/Falso</span>
			</ToolbarGroupButton>
			<ToolbarGroupButton onClick={() => openModal(ModalType.desarrollo)}>
				<span>Desarrollo</span>
			</ToolbarGroupButton>
			<ToolbarGroupButton onClick={() => openModal(ModalType.relateConcepts)}>
				<span>Relacionar Conceptos</span>
			</ToolbarGroupButton>
			<ToolbarGroupButton onClick={() => openModal(ModalType.mathFormula)}>
				<span>Fórmula matemática</span>
			</ToolbarGroupButton>
			<ToolbarGroupButton onClick={() => openModal(ModalType.drawing)}>
				<span>Espacio para dibujar</span>
			</ToolbarGroupButton>
		</>
	);
}
