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
        const ejercicio = { type: 'desarrollo', children: [] };

        const enunciado = { type: 'enunciado', children: [{ text: textareaValue }]};

        ejercicio.children.push(enunciado);

        for(let i = 0; i < numFilas; i++){
            ejercicio.children.push({ type: 'linea', children: [{ text: '' }] })
        }

        console.log(ejercicio.children)

        Transforms.insertNodes(editor, ejercicio);
    }

    const submit = (e)=>{
        e.preventDefault()
        insertInEditor(editor);
        
        setTextareaValue("");
        setNumFilas(1);
        e.target.enunciado.value="";
        e.target.num_filas.value=1;
    }
    
    if (!isOpen)
        return null;

    return (
        <div className={modalStyle.modalOverlay}>
            <div className={modalStyle.modalContainer} >
                <ModalHeader title="Ejercicio de desarrollo" onClose={onClose} />

                <div className={desarrolloModalStyle.modalBody}>

                    <form onSubmit={submit}>

                        <div className={desarrolloModalStyle.enunciado}>
                            <h3>Enunciado</h3>
                            <textarea name="enunciado" id="" rows="5" onChange={handleChange}></textarea>
                        </div>

                        <div className={desarrolloModalStyle.numFilas}>
                            <label htmlFor="num_filas">Número de filas: </label>
                            <input type="number" name="num_filas" onChange={handleNumFilasChange}/>
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
                            <button type="submit">OK</button>
                        </div>
                    </form>

                </div>

                
            </div>
        </div>
    );
}
