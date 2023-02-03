import SearchPictoModal from "./SearchPictoModal";
import WordSearchModal from "./WordSearchModal";
import TrueFalseModal from "./ModalTrueFalse";


export const ModalType = Object.freeze({
    searchPicto: Symbol("searchPicto"),
    wordSearch: Symbol("wordSearch"),
    TrueFalse: Symbol("TrueFalse"),
});

export function ModalFactory({ editor, isOpen, onClose, type }) {
    switch (type) {
        case ModalType.searchPicto:
            return <SearchPictoModal editor={editor} isOpen={isOpen} onClose={onClose} />;
        case ModalType.wordSearch:
            return <WordSearchModal editor={editor} isOpen={isOpen} onClose={onClose} />;
        case ModalType.TrueFalse:
            return <TrueFalseModal editor={editor} isOpen={isOpen} onClose={onClose} />;
        default:
            return null;
    }
};
