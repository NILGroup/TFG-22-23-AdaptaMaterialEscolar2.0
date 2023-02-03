import { useState } from "react";

import modalStyle from "./Modal.module.css";
import desarrolloModalStyle from "./DesarrolloModal.module.css";
import ModalHeader from "./ModalHeader";

import { Transforms } from 'slate';



export default function DesarrolloModal({ editor, isOpen, onClose }) {

    const [textareaValue, setTextareaValue] = useState('');
    const [numFilas, setNumFilas] = useState(1);

    const handleChange = (event) => {
        setTextareaValue(event.target.value);
    };

    const handleNumFilasChange = (event) => {
        setNumFilas(event.target.value);
    }

    const renderLines = (numFilas) => {

        let lines = [];

        for(let i = 0; i < numFilas; i++){
            lines.push(<div className={desarrolloModalStyle.line} key={i}></div>)
        }

        return lines;
    }

    const insertInEditor = (editor) => {
        const text = { text: '' };
        const enunciado = { type: 'desarrollo', enunciado: textareaValue, children: [text] };
        Transforms.insertNodes(editor, enunciado);
    }
    
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
                        <input type="number" onChange={handleNumFilasChange}/>
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

                            {renderLines(numFilas)}
                        </div>
                    </div>

                    <div className={desarrolloModalStyle.okButtonContainer}>
                        <button onClick={event => {
                            event.preventDefault()
                            insertInEditor(editor)
                        }}>OK</button>
                    </div>

                </div>
                
            </div>
        </div>
    );
}
