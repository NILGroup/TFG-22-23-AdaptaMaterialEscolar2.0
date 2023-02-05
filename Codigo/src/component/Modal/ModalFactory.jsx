import DefinitionModal from "./Definition/DefinitionModal";
import SearchPictoModal from "./SearchPictoModal";
import WordSearchModal from "./WordSearchModal";

export const ModalType = Object.freeze({
    searchPicto: Symbol("searchPicto"),
    wordSearch: Symbol("wordSearch"),
    definition: Symbol("definition")    
});

export function ModalFactory({ editor, isOpen, onClose, type }) {
    switch (type) {
        case ModalType.searchPicto:
            return <SearchPictoModal editor={editor} isOpen={isOpen} onClose={onClose} />;
        case ModalType.wordSearch:
            return <WordSearchModal editor={editor} isOpen={isOpen} onClose={onClose} />;
        case ModalType.definition:
            return <DefinitionModal editor={editor} isOpen={isOpen} onClose={onClose} />;
        default:
            return null;
    }
};
