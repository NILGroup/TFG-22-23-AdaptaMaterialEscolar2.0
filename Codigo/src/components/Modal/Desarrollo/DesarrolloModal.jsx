import { useState } from "react";

import desarrolloModalStyle from "./DesarrolloModal.module.css";
import lineStyle from "../../SlateEditor/elements/Linea/Linea.module.css";

import Modal from "../Modal";

import { Transforms } from 'slate';

export default function DesarrolloModal({ editor, isOpen, onClose }) {

    const [textareaValue, setTextareaValue] = useState('');
    const [numFilas, setNumFilas] = useState(1);
    const [tipoPauta, setTipoPauta] = useState('lineaNormal');

    const handleChange = (event) => {
        setTextareaValue(event.target.value);
    };

    const handleNumFilasChange = (event) => {
        setNumFilas(event.target.value);
    }

    const handleTipoPautaChange = (event) => {
        setTipoPauta(event.target.value);
    }

    const renderLines = (numFilas, tipoPauta) => {

        let lines = [];

        let clase = lineStyle.lineaNormal;

        if (tipoPauta === "lineaNormal") {
            clase = lineStyle.lineaNormal;
        }
        else if (tipoPauta === "lineaDoblePauta") {
            clase = lineStyle.lineaDoblePauta;
        }
        else {
            clase = lineStyle.lineaNormal;
        }

        for (let i = 0; i < numFilas; i++) {
            lines.push(<div className={clase} key={i}></div>)
        }

        return lines;
    }

    const insertInEditor = (editor) => {
        const ejercicio = { type: 'desarrollo', children: [] };

        const enunciado = { type: 'enunciado', children: [{ text: textareaValue }] };

        ejercicio.children.push(enunciado);

        for (let i = 0; i < numFilas; i++) {
            ejercicio.children.push({ type: 'linea', tipoPauta: tipoPauta, children: [{ text: '' }] })
        }

        console.log(ejercicio.children)

        Transforms.insertNodes(editor, ejercicio);
    }

    const submit = (e) => {
        e.preventDefault()
        insertInEditor(editor);

        setTextareaValue("");
        setNumFilas(1);
        e.target.enunciado.value = "";
        e.target.num_filas.value = 1;
    }

    return (
        <Modal title="Ejercicio de desarrollo" isOpen={isOpen} onClose={onClose}>
            <div className={desarrolloModalStyle.modalBody}>

                <form onSubmit={submit}>

                    <div className={desarrolloModalStyle.enunciado}>
                        <h3>Enunciado</h3>
                        <textarea name="enunciado" id="" rows="5" onChange={handleChange}></textarea>
                    </div>

                    <div className={desarrolloModalStyle.numFilas}>
                        <label htmlFor="num_filas">Número de filas: </label>
                        <input type="number" name="num_filas" onChange={handleNumFilasChange} />
                    </div>

                    <div className={desarrolloModalStyle.tipoPauta}>
                        <h3>Tipo de pauta</h3>

                        <select value={tipoPauta} onChange={handleTipoPautaChange}>
                            <option value="lineaNormal">Normal</option>
                            <option value="lineaDoblePauta">Doble pauta</option>
                        </select>

                    </div>

                    {<hr className={desarrolloModalStyle.modalHorizontalRule} />}

                    <div className={desarrolloModalStyle.vistaPrevia}>
                        <div className={desarrolloModalStyle.vistaPreviaHeader}>
                            <h3>Vista previa</h3>
                        </div>
                        <div className={desarrolloModalStyle.vistaPreviaBody}>
                            {textareaValue}

                            {renderLines(numFilas, tipoPauta)}
                        </div>
                    </div>

                    <div className={desarrolloModalStyle.okButtonContainer}>
                        <button type="submit">OK</button>
                    </div>
                </form>

            </div>
        </Modal>
    );
}
