import { useState } from "react";
import modalStyle from "./Modal.module.css";

import ModalHeader from "./ModalHeader";

export default function SearchPictoModal({ isOpen, onClose }) {
    // Funcion para obtener los pictogramas segun lo que busque el usuario
    const getPictograms = (searchParam, callback) => {
        fetch(`https://api.arasaac.org/api/pictograms/es/search/${searchParam}`)
            .then((response) => response.json())
            .then(data => {
                let items = [];
                for (let i = 0; i < data.length && i < 20; i++) {
                    items.push(`https://static.arasaac.org/pictograms/${data[i]._id}/${data[i]._id}_500.png`)
                }

                callback(items);
            })
    };

    const [pictogramList, setPictogramList] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    if (!isOpen)
        return null;

    return (
        <div className={modalStyle.modalOverlay}>
            <div onClick={(e) => e.stopPropagation()} className={modalStyle.modalContainer} >
                <ModalHeader title="Buscar Pictogramas" onClose={onClose} />
                <form className={modalStyle.modalBody} onSubmit={(e) => {
                    e.preventDefault();

                    const searchParam = e.target.searchPictogram.value;
                    getPictograms(searchParam, setPictogramList);
                }} >
                    <div className={modalStyle.modalGroup}>
                        <label htmlFor="searchPictogram">Buscador</label>
                        <input type="text" name="searchPictogram" id="searchPictogram" />
                    </div>
                    <input type="submit" value="Buscar" className={`${modalStyle.modalButton} ${modalStyle.modalCenter}`} />
                </form>
                {pictogramList && <hr className={modalStyle.modalHorizontalRule} />}
                <div className={modalStyle.modalImageList}>
                    {pictogramList && pictogramList.map((pictogram, index) =>
                        <img key={`pictogram-${index}`} src={pictogram} alt={`Pictogram ${index}`} className={modalStyle.modalImage} />
                    )}
                </div>
            </div>
        </div>
    );
}
