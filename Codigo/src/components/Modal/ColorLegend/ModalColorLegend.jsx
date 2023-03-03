import React, { useEffect, useState } from "react";

import Modal from "../common/Modal";
import ModalNewWordInput from "../common/ModalNewWordInput";
import ModalInputText from "../common/ModalInputText"
import  "../ColorLegend/estilo.css"
import ModalWordListLegend from "./ModalWordListLegend"


export default function ModalColorLegend({ editor, isOpen, onClose }) {
    const [conceptos, setConceptos] = useState([]);
    const [colores, setColores] = useState([]);
    const [color, setColor] = useState("#000000");

    const changeColor = (event) => {
        setColor(event.target.value);
    };

    const submit = (newWord) => {
		setConceptos([...conceptos, newWord]);
       setColores([...colores, color])
       setColor("#000000")
	};

    const editWord = (newValue,newColor, index) => {
		if (!conceptos)
			throw new Error("Cannot update word, word list does not exist!");

		if (index < 0 || index >= conceptos.length)
			throw new Error("Cannot update word, index out of range!");

            setConceptos((previousWordList) => {
                    const newList = previousWordList.map((word, wordIndex) =>
                    wordIndex === index ? String(newValue) : word
                );
			return newList;});
            console.log(newValue,newColor)
            setColores((previousWordList) => {
                const newList = previousWordList.map((color, colorIndex) =>
                colorIndex === index ? String(newColor) : color
            );
        return newList;});
	};

    const deleteWord = (index) => {
		if (!conceptos)
			throw new Error("Cannot update word, word list does not exist!");

		if (index < 0 || index >= conceptos.length)
			throw new Error("Cannot update word, index out of range!");
        
       const concetosNew= conceptos.filter((elem,i)=>{
            return i!==index
        })
        const ColoresNew= colores.filter((elem,i)=>{
            return i!==index
        })
        setConceptos(concetosNew);
        setColores(ColoresNew);
		
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

              
               <ModalWordListLegend
					wordList={conceptos}
                    colorList={colores}
					onEdit={(newValue,newColor, index) => editWord(newValue,newColor, index)}
					onDelete={(index) => deleteWord(index)}
				/>
            </div>
		
	    </Modal>
	);
}