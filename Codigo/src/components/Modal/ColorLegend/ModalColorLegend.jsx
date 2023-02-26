import React, { useEffect, useState } from "react";

import Modal from "../common/Modal";
import ModalNewWordInput from "../common/ModalNewWordInput";
import ModalInputText from "../common/ModalInputText"
import ModalOkButton from "../common/ModalOkButton";
import ModalPreview from "../common/ModalPreview";
import ModalWordList from "../common/ModalWordList";
import  "../ColorLegend/estilo.css"

export default function ModalColorLegend({ editor, isOpen, onClose }) {
    const [conceptos, setConceptos] = useState([]);
    const [Colores, setColores] = useState([]);
    const [color, setColor] = useState("#000000");

    const changeColor = (event) => {
        setColor(event.target.value);
    };

    const submit = (newWord) => {
		setConceptos([...conceptos, newWord]);
       setColores([...Colores, color])
	};

    const editWord = (newValue, index) => {
		if (!conceptos)
			throw new Error("Cannot update word, word list does not exist!");

		if (index < 0 || index >= conceptos.length)
			throw new Error("Cannot update word, index out of range!");

            setConceptos((previousWordList) => {
			const newList = previousWordList.map((word, wordIndex) =>
				wordIndex === index ? String(newValue) : word
			);
		
			return newList;
		});
	};

    const deleteWord = (index) => {
		if (!conceptos)
			throw new Error("Cannot update word, word list does not exist!");

		if (index < 0 || index >= conceptos.length)
			throw new Error("Cannot update word, index out of range!");

            setConceptos((previousWordList) => {
			const newList = previousWordList.filter(
				(wordIndex) => wordIndex !== index
			);
			return newList;
		});
	};

	return (
		<Modal
			className="w-6/12"
			title="Leyenda de Colores"
			isOpen={isOpen}
			onClose={onClose}
		>
            <div>
                <div>
                    <ModalInputText
                        id="Titulo"
                        label="Título"
                        required
                    />
                </div>
              
                <div className="mt-5" >
                    <ModalNewWordInput
                        title="Color&nbsp;&nbsp; Conceptos"
                        attributes={ <input className="inputColor" id="color" type="color" value={color} onChange={changeColor} />}
                        onSubmit={(newWord) => submit(newWord)}
                    />
                </div> 

               
             
                <div>
                    
                    <ul>
                        {conceptos.map((elem, i) => {
                            return (
                                <li
                                    key={`concepto-${i}`}
                                    className="flex items-center"
                                    style={{ color: elem.color }}
                                >
                                    
                                    <p className="pl-1">{elem.word}</p>
                                </li>
                            );
                        })}
                    </ul>
				</div>
                    
            </div>
		
	    </Modal>
	);
}