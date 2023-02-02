import { useState } from "react";

import modalStyle from "./Modal.module.css";
import desarrolloModalStyle from "./DesarrolloModal.module.css";
import ModalHeader from "./ModalHeader";


export default function DesarrolloModal({ editor, isOpen, onClose }) {

    const [textareaValue, setTextareaValue] = useState('');

    const handleChange = (event) => {
        setTextareaValue(event.target.value);
    };
    
    if (!isOpen)
        return null;

    return (
        <div className={modalStyle.modalOverlay}>
            <div className={modalStyle.modalContainer} >
                <ModalHeader title="Ejercicio de desarrollo" onClose={onClose} />

                <div className={desarrolloModalStyle.modalBody}>

                    <div className={desarrolloModalStyle.enunciado}>
                        <h3>Enunciado</h3>
                        <textarea name="enunciado" id="" rows="5" onChange={handleChange}></textarea>
                    </div>

                    <div className={desarrolloModalStyle.numFilas}>
                        <label htmlFor="num_filas">Número de filas: </label>
                        <input type="number" />
                    </div>

                    <div className={desarrolloModalStyle.tipoPauta}>
                        <h3>Tipo de pauta</h3>

                    </div>


                    {<hr className={desarrolloModalStyle.modalHorizontalRule} />}

                    <div className={desarrolloModalStyle.vistaPrevia}>
                        <div className={desarrolloModalStyle.vistaPreviaHeader}>
                            <h3>Vista previa</h3>
                        </div>
                        <div className={desarrolloModalStyle.vistaPreviaBody}>
                            {textareaValue}
                        </div>
                    </div>

                </div>



                
            </div>
        </div>
    );
}
