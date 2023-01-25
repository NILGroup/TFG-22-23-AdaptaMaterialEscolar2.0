import SearchPictoModal from "./SearchPictoModal";
import WordSearchModal from "./WordSearchModal";

export const ModalType = Object.freeze({
    searchPicto: Symbol("searchPicto"),
    wordSearch: Symbol("wordSearch")
});

export function ModalFactory({ isOpen, onClose, type }) {
    switch (type) {
        case ModalType.searchPicto:
            return <SearchPictoModal isOpen={isOpen} onClose={onClose} />;
        case ModalType.wordSearch:
            return <WordSearchModal isOpen={isOpen} onClose={onClose} />;
        default:
            return null;
    }
};
