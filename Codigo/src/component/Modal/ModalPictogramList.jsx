import modalStyle from "./Modal.module.css";

import { Transforms } from 'slate';

export default function ModalPictogramList({ editor, pictograms }) {
    const insertImage = (editor, url) => {
        const text = { text: '' };
        const image = { type: 'image', url, children: [text] };
        //TODO: Seleccionar editor
        Transforms.insertNodes(editor, image);
    }

    if (pictograms === null)
        return null;

    if (pictograms.length <= 0)
        return <h4 className={modalStyle.modalWarning}>No se han encontrado imágenes.</h4>;

    return (
        <div className={modalStyle.modalPictogramList}>
            {pictograms.map((pictogram, index) =>
                <button key={`pictogram-${index}`} onClick={event => {
                    event.preventDefault()
                    insertImage(editor, pictogram)
                }} className={modalStyle.modalPictogram}>
                    <img src={pictogram} alt={`Pictogram ${index}`} className={modalStyle.modalImage} />
                </button>
            )}
        </div>
    );
}


