import { useState } from "react";

import modalStyle from "./Modal.module.css";
import ModalHeader from "./ModalHeader";
import ModalPictogramList from "./ModalPictogramList";

import Spinner from "../Spinner/Spinner";

export default function SearchPictoModal({ editor, isOpen, onClose }) {
    // Estados del modal
    const [pictogramList, setPictogramList] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // Funciones auxiliares
    // Funcion para obtener los pictogramas segun lo que busque el usuario
    const getPictograms = (searchParam, callback) => {
        setIsLoading(true);

        fetch(`https://api.arasaac.org/api/pictograms/es/search/${searchParam}`)
            .then((response) => response.json())
            .then(data => {
                let items = [];
                for (let i = 0; i < data.length && i < 20; i++) {
                    items.push(`https://static.arasaac.org/pictograms/${data[i]._id}/${data[i]._id}_500.png`)
                }

                setIsLoading(false);
                callback(items);
            })
            .catch(error => console.log(error));
    };

    if (!isOpen)
        return null;

    return (
        <div className={modalStyle.modalOverlay}>
            <div className={modalStyle.modalContainer} >
                <ModalHeader title="Buscar Pictogramas" onClose={onClose} />
                <form className={modalStyle.modalBody} onSubmit={(e) => {
                    e.preventDefault();

                    const searchParam = e.target.searchPictogram.value;
                    getPictograms(searchParam, setPictogramList);
                }} >
                    <div className={modalStyle.modalFormGroup}>
                        <label htmlFor="searchPictogram" className={modalStyle.modalLabel}>Buscador</label>
                        <input type="text" name="searchPictogram" id="searchPictogram" className={modalStyle.modalInput} required />
                    </div>
                    <input type="submit" value="Buscar" className={`${modalStyle.modalButton}  ${modalStyle.modalCenter}`} />
                </form>
                {pictogramList && <hr className={modalStyle.modalHorizontalRule} />}
                {isLoading ? <Spinner /> : <ModalPictogramList editor={editor} pictograms={pictogramList} />}
            </div>
        </div>
    );
}
