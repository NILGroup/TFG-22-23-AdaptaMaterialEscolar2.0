import SearchPictoModal from "./SearchPictoModal";
import WordSearchModal from "./WordSearchModal";
import DesarrolloModal from "./DesarrolloModal";

export const ModalType = Object.freeze({
    searchPicto: Symbol("searchPicto"),
    wordSearch: Symbol("wordSearch"),
    desarrollo: Symbol("desarrollo")
});

export function ModalFactory({ editor, isOpen, onClose, type }) {
    switch (type) {
        case ModalType.searchPicto:
            return <SearchPictoModal editor={editor} isOpen={isOpen} onClose={onClose} />;
        case ModalType.wordSearch:
            return <WordSearchModal editor={editor} isOpen={isOpen} onClose={onClose} />;
        case ModalType.desarrollo:
            return <DesarrolloModal editor={editor} isOpen={isOpen} onClose={onClose} />;
        default:
            return null;
    }
};
