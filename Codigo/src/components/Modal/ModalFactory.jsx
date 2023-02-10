import React from "react";

import FillBlanksModal from "./FillBlanksModal/FillBlanksModal";
import SearchPictoModal from "./SearchPictoModal/SearchPictoModal";
import WordSearchModal from "./WordSearchModal/WordSearchModal";
import DefinitionModal from "./Definition/DefinitionModal";
import TrueFalseModal from "./TrueFalse/ModalTrueFalse";
import DesarrolloModal from "./Desarrollo/DesarrolloModal";

export const ModalType = Object.freeze({
	searchPicto: Symbol("searchPicto"),
	wordSearch: Symbol("wordSearch"),
	fillBlanks: Symbol("fillBlanks"),
	definition: Symbol("definition"),
	TrueFalse: Symbol("TrueFalse"),
	desarrollo: Symbol("desarrollo"),
});

export function ModalFactory({ type, editor, isOpen, onClose }) {
	switch (type) {
		case ModalType.searchPicto:
			return (
				<SearchPictoModal
					editor={editor}
					isOpen={isOpen}
					onClose={onClose}
				/>
			);
		case ModalType.wordSearch:
			return (
				<WordSearchModal
					editor={editor}
					isOpen={isOpen}
					onClose={onClose}
				/>
			);
		case ModalType.fillBlanks:
			return (
				<FillBlanksModal
					editor={editor}
					isOpen={isOpen}
					onClose={onClose}
				/>
			);
		case ModalType.definition:
			return (
				<DefinitionModal
					editor={editor}
					isOpen={isOpen}
					onClose={onClose}
				/>
			);
		case ModalType.TrueFalse:
			return (
				<TrueFalseModal
					editor={editor}
					isOpen={isOpen}
					onClose={onClose}
				/>
			);
		case ModalType.desarrollo:
			return (
				<DesarrolloModal
					editor={editor}
					isOpen={isOpen}
					onClose={onClose}
				/>
			);
		default:
			return null;
	}
}
