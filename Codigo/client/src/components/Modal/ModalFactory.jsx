import React from "react";

import ColorLegend from "./ColorLegend/ModalColorLegend";
import DefinitionModal from "./Definition/DefinitionModal";
import DesarrolloModal from "./Desarrollo/DesarrolloModal";
import DrawingModal from "./Drawing/DrawingModal";
import FillBlanksModal from "./FillBlanks/FillBlanksModal";
import MathFormulaModal from "./MathFormula/MathFormulaModal";
import Pictotranslator from "./Pictotranslator/PictotranslatorModal";
import RelateConceptsModal from "./RelateConcepts/RelateConceptsModal";
import SearchPictoModal from "./SearchPicto/SearchPictoModal";
import SummaryModal from "./Summary/SummaryModal";
import TrueFalseModal from "./TrueFalse/ModalTrueFalse";
import WordSearchModal from "./WordSearch/WordSearchModal";

export const ModalType = Object.freeze({
	searchPicto: Symbol("searchPicto"),
	wordSearch: Symbol("wordSearch"),
	fillBlanks: Symbol("fillBlanks"),
	definition: Symbol("definition"),
	TrueFalse: Symbol("TrueFalse"),
	desarrollo: Symbol("desarrollo"),
	relateConcepts: Symbol("relateConcepts"),
	colorLegend: Symbol("ColorLegend"),
	mathFormula: Symbol("mathFormula"),
	summary: Symbol("summary"),
	pictotranslator: Symbol("pictoTranslator"),
	drawing: Symbol("drawing"),
});

export function ModalFactory({ type, editor, isOpen, onClose, data}) {
	document.body.style.overflow = isOpen ? "hidden" : "auto";

	switch (type) {
		case ModalType.searchPicto:
			return <SearchPictoModal editor={editor} isOpen={isOpen} onClose={onClose} data={data}/>;
		case ModalType.wordSearch:
			return <WordSearchModal editor={editor} isOpen={isOpen} onClose={onClose} data={data}/>;
		case ModalType.fillBlanks:
			return <FillBlanksModal editor={editor} isOpen={isOpen} onClose={onClose} data={data}/>;
		case ModalType.definition:
			return <DefinitionModal editor={editor} isOpen={isOpen} onClose={onClose} data={data}/>;
		case ModalType.TrueFalse:
			return <TrueFalseModal editor={editor} isOpen={isOpen} onClose={onClose} data={data}/>;
		case ModalType.desarrollo:
			return <DesarrolloModal editor={editor} isOpen={isOpen} onClose={onClose} data={data}/>;
		case ModalType.relateConcepts:
			return <RelateConceptsModal editor={editor} isOpen={isOpen} onClose={onClose} data={data}/>;
		case ModalType.colorLegend:
			return <ColorLegend editor={editor} isOpen={isOpen} onClose={onClose} data={data}/>;
		case ModalType.mathFormula:
			return <MathFormulaModal editor={editor} isOpen={isOpen} onClose={onClose} data={data}/>;
		case ModalType.summary:
			return <SummaryModal editor={editor} isOpen={isOpen} onClose={onClose} data={data}/>;
		case ModalType.pictoTranslator:
			return <Pictotranslator editor={editor} isOpen={isOpen} onClose={onClose} data={data}/>;
		case ModalType.drawing:
			return <DrawingModal editor={editor} isOpen={isOpen} onClose={onClose} data={data}/>;
		default:
			return null;
	}
}
