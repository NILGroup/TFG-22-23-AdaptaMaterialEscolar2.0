import FillBlanksModal from "./FillBlanksModal/FillBlanksModal";
import SearchPictoModal from "./SearchPictoModal/SearchPictoModal";
import WordSearchModal from "./WordSearchModal/WordSearchModal";

export const ModalType = Object.freeze({
    searchPicto: Symbol("searchPicto"),
    wordSearch: Symbol("wordSearch"),
    fillBlanks: Symbol("fillBlanks")
});

export function ModalFactory({ type, editor, isOpen, onClose }) {
    switch (type) {
        case ModalType.searchPicto:
            return <SearchPictoModal editor={editor} isOpen={isOpen} onClose={onClose} />;
        case ModalType.wordSearch:
            return <WordSearchModal editor={editor} isOpen={isOpen} onClose={onClose} />;
        case ModalType.fillBlanks:
            return <FillBlanksModal editor={editor} isOpen={isOpen} onClose={onClose} />;
        default:
            return null;
    }
};
