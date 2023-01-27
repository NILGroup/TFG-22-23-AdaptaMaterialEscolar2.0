import modalStyle from "./Modal.module.css";

import ModalHeader from "./ModalHeader";

export default function WordSearchModal({ isOpen, onClose }) {
    if (!isOpen)
        return null;

    return (
        <div className={modalStyle.modalOverlay}>
            <div className={modalStyle.modalContainer} >
                <ModalHeader title="Sopa de Letras" onClose={onClose} />
                <div className={modalStyle.modalBody}>
                    <h4>Cuerpo Sopa de Letras</h4>
                </div>
            </div>
        </div>
    );
}


